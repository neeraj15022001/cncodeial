import React, { Component } from 'react';
import { Button, Card, Container, FormControl } from 'react-bootstrap';
import { ChatFill } from 'react-bootstrap-icons';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: '',
      isOpen: false,
    };
  }
  toggleChat = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        isOpen: !prevState.isOpen,
      };
    });
  };
  render() {
    const { messages, message, isOpen } = this.state;
    return (
      <Container
        className={'position-absolute'}
        style={{ bottom: 50, right: 50, zIndex: 10, width: 60, height: 60 }}
        fluid
      >
        <Button
          variant={'primary rounded-circle shadow-lg'}
          style={{ height: 60, width: 60 }}
          onClick={this.toggleChat}
        >
          <ChatFill className={'fs-3'} />
        </Button>
        {/*  Chat Container*/}
        {isOpen && (
          <Container
            className={'position-absolute bg-light shadow-lg rounded-3 p-0'}
            style={{
              width: '300px',
              height: '350px',
              top: 60,
              left: 5,
              transform: 'translate(-100%, -100%)',
            }}
            fluid
          >
            <Card className={'h-100'}>
              <Card.Header>Chat With Us</Card.Header>
              <Card.Body>Content here</Card.Body>
              <Card.Footer className={'d-flex align-items-center'}>
                <FormControl
                  placeholder={'Enter Message Here'}
                  className={'flex-1 me-1'}
                />
                <Button variant={'primary'}>Send</Button>
              </Card.Footer>
            </Card>
          </Container>
        )}
      </Container>
    );
  }
}

export default Chat;
