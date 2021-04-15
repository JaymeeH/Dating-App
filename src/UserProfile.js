import React, { useRef } from 'react';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';

function UserProfileGrid(props) {
  return (
    <Container>
      <Row>
        <Col>
          <UserProfileForm />
        </Col>
      </Row>
    </Container>
  );
}

function UserProfileForm(props) {
  const nickNameRef = useRef(null);
  const ageRef = useRef(null);
  const genderRef = useRef(null);
  const bioRef = useRef(null);

  const { email } = props;

  function saveUserProfile(nickName, age, gender, bio) {
  // pass
    const profileInfo = {
      email: 'test email',
      nickname: nickName,
      age,
      gender,
      bio,
    };
    console.log(profileInfo);
    fetch('/api/v1/user_profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileInfo),
    }).then((response) => response.json()).then((data) => {
      console.log(data);
    }); // need nothing cause sending
  }

  function findMatch() {
    // pass

  }

  return (
    <Form>
      <Form.Row className="justify-content-md-center">
        <Col xs={4}>
          <Form.Group controlId="googleName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="NameFromOath" readOnly />
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
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
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
          <Button variant="danger" onClick={() => findMatch()}>
            Find a Match
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default UserProfileGrid;
