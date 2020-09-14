import React, { useEffect, useState } from "react";
import { Container, Button } from "shards-react";
import "./Display.css";

function Display() {
  const [question, setQuestion] = useState("Loading...");
  const [currenttime, setCurrentTime] = useState("Loading...");
  const [convert, setConvert] = useState("Loading...");

  function refreshPage() {
    window.location.reload(false);
  }

  
  useEffect(() => {
    fetch('/time/').then(res => res.json()).then(data => { // Request from Flask
      setCurrentTime(data.time);
    });
    fetch("/question/")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setQuestion(data[0].question);
      });
  }, []);
  useEffect(() => {
    fetch("/time/")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setCurrentTime(data.time);
      });
  }, []);

  useEffect(() => {
    fetch("/convertData")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setConvert(data.convertData);
      });
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
      <div className="introDisplay">
        <h2 style={{ color: "#96C0CE", paddingLeft: "25px" }}>
          Subvocal Recognition
        </h2>
        <p style={{ paddingLeft: "55px" }}>
          {" "}
          words words words words words words words words words words words
          words words words words words words words words words words words
          words words words words words words words words words words words
          words words words words words words words words words words words
          words words words words words words words words words words words
          words words words words words words words words words words words
          words words words words words words words words words words words
          words words words words words words words words words words words
          words words words words words words words
        </p>
        <a
          class="button"
          href="#popupDisplay"
          style={{ textDecoration: "none" }}
        >
          Start
        </a>
      </div>

      <div id="popupDisplay" class="overlay">
        <div class="popup">
          <div className="App" id="mainDisplay">
            <header className="App-header">
              <p className="Time" id="left">
                Current Time: {currenttime}
              </p>
              <br></br>
              <p className="question-pNew">{question}</p>
              {/*
              <a class="ans-yes"  href="#acc">Yes</a>
              <a class="ans-no" href="#acc">No</a>
              */}
              <button className="ans-yesNew" href="#acc">
                Yes
              </button>
              <br></br>
              <button className="ans-noNew" href="#acc">
                No
              </button>
            </header>
          </div>
          <div className="Neext">
            <Button theme="primary" onClick={refreshPage} className="mb-2 mr-1">
              Next Question
            </Button>

            <form action="/csv/" method="post">
              <Button name="downloadBtn" type="submit">
                Download Data
              </Button>
            </form>
          </div>
          <a class="close" href="#">
            {" "}
            &times;
          </a>
        </div>
      </div>

      <div id="acc" class="overlayAcc">
        <div class="popupAcc">
          <div>
            <p className="accuracy" id="right">
              Accuracy: <input type="radio" name="checkAcc" value="Yes"></input>
              <label for="checkAcc">Yes</label>{" "}
              <input type="radio" name="checkAcc" value="No"></input>
              <label for="checkAcc">No</label>
            </p>
          </div>
          <a class="close" href="#">
            {" "}
            &times;
          </a>
        </div>
      </div>

      {/*
      <div className="App" id="mainDisplay">
        <header className="App-header">
          <p className="Time" id="left">
            Current Time: {currenttime}
          </p>
          <p className="accuracy" id="right">
            Accuracy:{" "}
            <input type="radio" name="checkAcc" value="Yes"></input>
            <label for="checkAcc">Yes</label>
            {" "}
            <input type="radio" name="checkAcc" value="No"></input>
            <label for="checkAcc">No</label>
          </p>

          <br></br>
          <p className="question-p">{question}</p>
          <button className="ans-yes">Yes</button>
          <button className="ans-no">No</button>
          {/*<p className="Time">Current Time: {currenttime}</p>
        </header>
      </div>

      <div className="Next">

        <Button theme="primary" onClick={refreshPage} className="mb-2 mr-1">
              Next Question
          </Button>

          <form action="/csv/" method="post">
            <Button name="downloadBtn" type="submit">Download Data</Button>
          </form>
      </div>
    */}
    </Container>
  );
}

export default Display;
