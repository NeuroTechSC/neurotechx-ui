import React, { useEffect, useState } from "react";
import { Container, Button } from "shards-react";

function Display() {
  const [question, setQuestion] = useState('Loading...');
  const [currenttime, setCurrentTime] = useState('Loading...');


  function refreshPage() {
    window.location.reload(false);
  }

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

          <Button theme="primary" onClick={refreshPage} className="mb-2 mr-1">
              Next Question
          </Button>

          <form action="/csv" method="post">
            <Button name="downloadBtn" type="submit">Download Data</Button>
          </form>

    </div>

    </Container>
  );
}

export default Display;
