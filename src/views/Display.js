import React, { useEffect, useState } from "react";
import { Container, Button } from "shards-react";

function Display() {
  const [question, setQuestion] = useState(0);
  const [currenttime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/question').then(res => res.json()).then(data => { // Request from Flask
      setQuestion(data.question);
    });
  }, []);
  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => { // Request from Flask
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
    <div className="App">
      <header className="App-header">
        <p>{question}</p>
        <p>Current Time: {currenttime}</p>

      </header>
    </div>
    <div className = 'Next'>
    <form action="question" method="post">
          <Button theme="primary" className="mb-2 mr-1">
              Next
          </Button>
    </form>
    </div>

    </Container>
  );
}

export default Display;
