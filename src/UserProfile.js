import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

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
    const placeholderAlreadySet = false;
    return (
        <Form>
            <Form.Row className="justify-content-md-center">
                <Form.Group as={Col} controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Your Name" />
                </Form.Group>
            </Form.Row>
        </Form>
    );
}

export default UserProfileGrid;