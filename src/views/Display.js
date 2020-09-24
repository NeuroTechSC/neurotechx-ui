import React, { useEffect, useState } from "react";
import { Container, Button } from "shards-react";
import "./Display.css";

function Display() {
  const [question, setQuestion] = useState("Loading...");
  const [currenttime, setCurrentTime] = useState("Loading...");
  const [convert, setConvert] = useState("Loading...");
  const [prevQuestion, getPrevQuestion] = useState("Loading...");
  const [prediction, setPrediction] = useState("Loading...");

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
    fetch("/recordSubvocalization/")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setPrediction(data.prediction);
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
          
        </p>

        <a
          class="button"
          href="#popupDisplay"
          style={{ textDecoration: "none" }}
        >
          Start
        </a>
      </div>

      <div id="popupDisplay" className="overlay1">
        <div class="popup">
          <div className="App" id="mainDisplay">
            <header className="App-header">
              <p className="Time" id="left">
                Current Time: {currenttime}
                <br />
                Prediction: {prediction}
              </p>
              <br></br>
              <p className="question-pNew">{question}</p>
              {/*
              <a class="ans-yes"  href="#acc">Yes</a>
              <a class="ans-no" href="#acc">No</a>
              */}

              {/*<button action="recordAnswer" className="ans-yesNew" onClick="#acc" >
                Yes
              </button>
              <br></br>
              <button className="ans-noNew" href="#acc" >
                No
            </button>*/}

              <a className="ans-yesNew" href="#acc">
                Yes
              </a>
              <br></br>
              <br></br>
              <a className="ans-noNew" href="#acc">
                No &nbsp;
              </a>

              <div class=".listContainer"></div>
            </header>

            <div id="next">
            <br />
                <Button
                  theme="primary"
                  onClick={refreshPage}
                  className="mb-2 mr-1"
                >
                  Next Question
                </Button>

                <form action="/csv/" method="post">
                  <Button name="downloadBtn" type="submit">
                    Download Data
                  </Button>
                </form>
              <a class="close" href="#">
                {" "}
                &times;
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="acc" class="overlay">
        <div class="popupAcc">
          <header>
            <p className="Time" id="left">
              Current Time: {currenttime}
            </p>
          </header>
          <a class="close" href="#">
            {" "}
            &times;
          </a>
          <div>
            {/*
            <p className="accuracy" id="right">
              Accuracy: <input type="radio" name="checkAcc" value="Yes" href="#next"></input>
              <label for="checkAcc">Yes</label>{" "}
              <input type="radio" name="checkAcc" value="No" href="#next"></input>
              <label for="checkAcc">No</label>
            </p>
            */}
            <h1 className="accQ"> Was it accurate?</h1>
            <a className="ans-yesNew" href="#popupDisplay" value="y">
              Yes
            </a>
            <br></br>
            <br></br>
            <a className="ans-noNew" href="#popupDisplay" value="n">
              No &nbsp;
            </a>
          </div>
          {/*a <class="close" href="#">
            {" "}
            &times;
          </a>*/}
        </div>
      </div>

    </Container>
  );
}

export default Display;
