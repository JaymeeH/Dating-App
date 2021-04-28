import React, { useEffect } from 'react';
import { Accordion, Card, Button, Container, Row, Col } from 'react-bootstrap';


function DisplayMatchPage(props) {
  
  // Place the chat where the empty card is currently
  return (
    <Accordion defaultActiveKey='0'>
      <MatchProfileShell />
      <FakeChatFeatureShell />
    </Accordion>
  );
}


function MatchProfileShell(props) {
  return (
    <Card className="text-center">
        <Card.Header>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Meet UserName
          </Accordion.Toggle>
        </Card.Header>
          <Accordion.Collapse eventKey="0">
            <MatchProfile />
          </Accordion.Collapse>
      </Card>
  );
}


function MatchProfile(props) {
  return (
    <Card.Body>
      <Card.Title>
        NickName, Age
      </Card.Title>
      <Card.Title>
        A Little Bit About Me
      </Card.Title>
      <Card.Text sm={4}>
        Body with a lot of stuff in it because I want to test to see if it automatically wraps down so this looks somewhat decent lets keep writing something here ok
      </Card.Text>
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