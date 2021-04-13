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

  function saveUserProfile(nickName, age, gender, bio) {
  // pass

  }

  function findMatch() {
    // pass

  }

  return (
    <Form>
      <Form.Row className="justify-content-md-center">
        <Form.Group as={Col} controlId="googleName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="NameFromOath" readOnly />
        </Form.Group>
      </Form.Row>
      <Form.Row className="justify-content-md-center">
        <Form.Group as={Col} controlId="formName">
          <Form.Label>NickName</Form.Label>
          <Form.Control ref={nickNameRef} type="text" placeholder="Nickname" />
        </Form.Group>
      </Form.Row>
      <Form.Row className="justify-content-md-center">
        <Form.Group as={Col} controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control ref={ageRef} type="number" placeholder="18" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control ref={genderRef} as="select" defaultValue="Choose...">
            <option>Male</option>
            <option>Female.</option>
            <option>Non-Binary</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row className="justify-content-md-center">
        <Form.Group as={Col} controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control ref={bioRef} as="textarea" rows={3} />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Button as={Col} variant="success" onClick={() => saveUserProfile(nickNameRef.current, ageRef.current, genderRef.current, bioRef.current)}>
          Save Profile
        </Button>
        <Button as={Col} variant="danger" onClick={() => findMatch()}>
          Find a Match
        </Button>
      </Form.Row>
    </Form>
  );
}

export default UserProfileGrid;
