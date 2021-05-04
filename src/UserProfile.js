import React, { useRef, useEffect } from 'react';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';

function UserProfileGrid(props) {
  const { email, setMatchEmail } = props;
  return (
    <Container>
      <Row>
        <Col>
          <UserProfileForm email={email} setMatchEmail={setMatchEmail} />
        </Col>
      </Row>
    </Container>
  );
}

function UserProfileForm(props) {
  const googleNameRef = useRef(null);
  const nickNameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const bioRef = useRef(null);

  const { email, setMatchEmail } = props;
  const PROFILE_REQUEST_URL = '/api/v1/user_profile';
  const MATCH_URL = 'api/v1/match';

  function saveUserProfile(nickName, age, gender, bio) {
  // Send to server
    const profileInfo = {
      email: email,
      oath_name: googleNameRef.current.value,
      nickname: nickName,
      age: age,
      gender: gender,
      bio: bio,
    };
    fetch(PROFILE_REQUEST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileInfo),
    }).then((response) => response.json()).then((data) => {
      console.log(data);
    }); // need nothing cause sending
  }

  function findMatch(gender, name) {
    document.getElementById("createProfile").style.display = "none";
    transition();
    // Send to server
    const json_packed_data = {
      'name': name,
      'gender': gender,
      'email': email,
    }
    
    fetch(MATCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json_packed_data)
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      // setMatchStatus()
      setMatchEmail(data.email);
    });
  }
  function transition(){
    console.log('transition');
    document.getElementById("Transition").style.display = "block";
  }

  function loadData(userEmail) {
    // Get data from server for this user
    // Then fill out the form with the current data
    const url = `${`${PROFILE_REQUEST_URL}?email=`}${userEmail}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      if (({}).hasOwnProperty.call(data, 'oath_name') && data.oath_name !== null) googleNameRef.current.value = data.oath_name;
      if (({}).hasOwnProperty.call(data, 'nickname') && data.nickname !== null) nickNameRef.current.value = data.nickname;
      if (({}).hasOwnProperty.call(data, 'age') && data.age !== null) ageRef.current.value = data.age;
      if (({}).hasOwnProperty.call(data, 'gender') && data.gender !== null) {
        switch (data.gender) {
          case 'Male':
            genderRef.current.selectedIndex = 0;
            break;
          case 'Female':
            genderRef.current.selectedIndex = 1;
            break;
          case 'Non-Binary':
            genderRef.current.selectedIndex = 2;
            break;
          default:
            genderRef.current.selectedIndex = 0;
            break;
        }
      }
      if (({}).hasOwnProperty.call(data, 'bio') && data.bio !== null) bioRef.current.value = data.bio;
    });
  }

  // Load existing profile data for user if exists on page load
  useEffect(() => {
    loadData(email);
  }, [email]);

  return (
  <div>
    <Form className = "createProfile" id= "createProfile">
      <Form.Row className="justify-content-md-center">
        <Col xs={4}>
          <Form.Group controlId="googleName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" ref={googleNameRef} placeholder="NameFromOath" readOnly />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-md-center">
        <Col xs={4}>
          <Form.Group controlId="formName">
            <Form.Label>Nick Name</Form.Label>
            <Form.Control ref={nickNameRef} type="text" placeholder="Nickname" />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-md-center">
        <Col xs={4}>
          <Form.Group controlId="formAge">
            <Form.Label>Age</Form.Label>
            <Form.Control ref={ageRef} type="number" placeholder="18" />
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group controlId="formGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control ref={genderRef} as="select" defaultValue="Choose...">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-md-center">
        <Col xs={8}>
          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control ref={bioRef} as="textarea" rows={3} />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="justify-content-md-center">
        <Col xs={3}>
          <Button variant="success" onClick={() => saveUserProfile(nickNameRef.current.value, ageRef.current.value, genderRef.current.value, bioRef.current.value)}>
            Save Profile
          </Button>
        </Col>
        <Col xs={3}>
          <Button variant="danger" onClick={() => findMatch(genderRef.current.value, googleNameRef.current.value)}>
            Find a Match
          </Button>
        </Col>
      </Form.Row>
    </Form>
    <div className = "Transition" id = "Transition">
      Searching for Match
    </div>
  </div>
  );
}

export default UserProfileGrid;
