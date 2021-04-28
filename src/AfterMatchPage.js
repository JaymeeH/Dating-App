import React, { useEffect } from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';


function DisplayMatchPage(props) {
  
  // Place the chat where the empty card is currently
  return (
    <Accordion defaultActiveKey='0'>
      <MatchProfile />
      <FakeChatFeature />
    </Accordion>
  );
}


function MatchProfile(props) {
  return (
    <Card className="mt-5">
        <Card.Header className='justify-content-md-center'>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Meet UserName
          </Accordion.Toggle>
        </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Text Goes Here</Card.Body>
          </Accordion.Collapse>
      </Card>
  );
}


function FakeChatFeature(props) {
  return (
    <Card className="mt-0">
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