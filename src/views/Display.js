import React, { useEffect, useState } from "react";
import { Container, Button } from "shards-react";
import "./Display.css";

function Display() {
  const [question, setQuestion] = useState("Loading...");
  const [currenttime, setCurrentTime] = useState("Loading...");
  const [convert, setConvert] = useState("Loading...");
  const [prevQuestion, getPrevQuestion] = useState("Loading...");

  function refreshPage() {
    window.location.reload(false);
  }

  //Countdown Timer
  var timeleft = 2;
  var downloadTimer = setInterval(function() {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = "Countdown: Finished";
    } else {
      document.getElementById("countdown").innerHTML =
        "Countdown: " + timeleft + " seconds remaining";
    }
    timeleft -= 1;
  }, 1000);

  useEffect(() => {
    fetch("/time/")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
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

      <div id="popupDisplay" className="overlay1">
        <div class="popup">
          <div className="App" id="mainDisplay">
            <header className="App-header">
              <div className="headerPopup">
                <p className="Time">Current Time: {currenttime}</p>
                <br></br>
                <br></br>
                <br></br>
                <div id="countdown"></div>
              </div>
              <br></br>
              <div class="questionaire">
                <p className="question-pNew">{question}</p>
                {/*
              <a class="ans-yes"  href="#acc">Yes</a>
              <a class="ans-no" href="#acc">No</a>
              */}

                <button className="ans-yesNew" onClick="#acc">
                  Yes
                </button>
                <br></br>
                <button className="ans-noNew" href="#acc">
                  No
                </button>
              </div>
              {/*
              <a className="ans-yesNew" href="#acc">
                Yes
              </a>
              <br></br>
              <br></br>
              <a className="ans-noNew" href="#acc">
                No &nbsp;
              </a>
              */}
              <div class=".listContainer"></div>
            </header>
            {/*id="acc" class="overlay" ....class="popupAcc"*/}

            <div class="accuracy">
              <a class="close" href="#">
                {" "}
                &times;
              </a>
              <div>
                <h1 className="accQ"> Was it accurate?</h1>
                <a className="ans-yesNew" href="#popupDisplay">
                  Yes
                </a>
                <br></br>
                <br></br>
                <a className="ans-noNew" href="#popupDisplay">
                  No &nbsp;
                </a>
              </div>
            </div>

            <div id="next">
              <div class="footerPopup">
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
              </div>
              <a class="close" href="#">
                {" "}
                &times;
              </a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Display;
