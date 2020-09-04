import React, { useEffect, useState } from "react";
import { Container, Button } from "shards-react";
import "./Display.css";

function Display() {
  const [question, setQuestion] = useState('Loading...');
  const [currenttime, setCurrentTime] = useState('Loading...');
  const [convert, setConvert] = useState('Loading...');


  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    fetch('/question/').then(res => res.json()).then(data => { // Request from Flask
      setQuestion(data.question);
      console.log(data)
    });
  }, []);
  useEffect(() => {
    fetch('/time/').then(res => res.json()).then(data => { // Request from Flask
      setCurrentTime(data.time);
    });
    fetch("/question")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setQuestion(data.question);
      });
  }, []);
  useEffect(() => {
    fetch("/time")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setCurrentTime(data.time);
      });
  }, []);
  useEffect(() => {
    fetch('/convertData').then(res => res.json()).then(data => { // Request from Flask
      setConvert(data.convertData);
    });
  }, []);


  return (
    <Container fluid className="main-content-container px-4">
      <div className="App">
        <header className="App-header">
          <p className="Time" id="left">Current Time: {currenttime}</p>
          <p className="accuracy" id="right">Accuracy (doesnt do anything yet)</p>
          <span className="checkmark"> &#10003;</span> {/*great you made a checkmark. now do something with it*/}
          <br></br>
          <p className="question-p">{question}</p>
          <button className="ans-yes">Yes</button>
          <button className="ans-no">No</button>
          {/*<p className="Time">Current Time: {currenttime}</p>*/}
        </header>
      </div>
      <div className="Next">
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

