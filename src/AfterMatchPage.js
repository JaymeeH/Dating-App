import React, { useEffect, useState } from 'react';
import {
  Accordion, Card, Button, Container, Row, Col, Image
} from 'react-bootstrap';

function DisplayMatchPage(props) {
  const { email, setMatchEmail } = props;
  // Place the chat where the empty card is currently
  return (
    <Container>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
            <MatchProfileShell email={email} setMatchEmail={setMatchEmail} />
            <FakeChatFeatureShell />
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

function MatchProfileShell(props) {
  const [name, setName] = useState('Unnamed User');
  const [age, setAge] = useState('Unknown Age');
  const [bio, setBio] = useState('No bio');
  const { email, setMatchEmail } = props;
  const PROFILE_REQUEST_URL = '/api/v1/user_profile';

  function getProfile(email) {
    const url = `${`${PROFILE_REQUEST_URL}?email=`}${email}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      if (({}).hasOwnProperty.call(data, 'nickname')) {
        setName(data.nickname);
      } if (({}).hasOwnProperty.call(data, 'age')) {
        setAge(data.age);
      } if (({}).hasOwnProperty.call(data, 'bio')) {
        setBio(data.bio);
      }
    });
  }

  useEffect(() => {
    getProfile(email);
  }, []);

  return (
    <Card className="text-center">
      <Card.Header>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          Meet {name}
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="0">
        <MatchProfile name={name} age={age} bio={bio} email={email} setMatchEmail={setMatchEmail}/>
      </Accordion.Collapse>
    </Card>
  );
}

function MatchProfile(props) {
  const { name, age, bio, email, setMatchEmail } = props;
  
  function unmatchFunction() {
    // Later: change match status in DB, add current email as already matched
    const UNMATCH_URL = '/api/v1/unmatch';
    const payload = {
      'email': email
    }
    
    fetch(UNMATCH_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    }).then((response) => response.json()).then((data) => {
      setMatchEmail('');
    });
  }
  
  return (
    <Card.Body>
      <Image src='https://i.imgur.com/MiLY8Lq.png' roundedCircle />
      <Card.Title>
        {name}, {age}
      </Card.Title>
      <Card.Title>
        A Little Bit About Me
      </Card.Title>
      <Card.Text sm={4}>
        {bio}
      </Card.Text>
      <Button variant='danger' onClick={() => unmatchFunction()}>
        Unmatch
      </Button>
    </Card.Body>
  );
}

function FakeChatFeatureShell(props) {
  return (
    <Card className="text-center">
      <Card.Header>
        <Accordion.Toggle as={Card.Header} eventKey="1">
          Chat
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
        <Card.Body>Chat Goes Here</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default DisplayMatchPage;
