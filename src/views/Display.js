import React, { useEffect, useState } from "react";
import { Container, Button } from "shards-react";

import "./Display.css";


function Display() {
  const [question, setQuestion] = useState("Loading...");
  const [responseID, setResponseID] = useState("Loading...");
  const [currenttime, setCurrentTime] = useState("Loading...");
  const [convert, setConvert] = useState("Loading...");
  const [prevQuestion, getPrevQuestion] = useState("Loading...");
  const [prediction, setPrediction] = useState("Loading...");
  const [accuracy, setAccuracy] = useState("Loading...");


  function refreshPage() {
    window.location.reload(false);
  }

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
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
        setResponseID(data[1].responseID);
        console.log(responseID);
      });
  }, []);

  useEffect(() => {
    fetch("/getAccuracy/")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setAccuracy(round(data.accuracy,3));
      });
  }, []);

  useEffect(() => {
    fetch("/time/")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setCurrentTime(timeConverter(data.time));
      });
  }, []);


  useEffect(() => {
    fetch(`/recordSubvocalization/?questionid=${responseID}`)
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
        <p style={{ paddingLeft: "25px" }}>
        <a
          class="button"
          href="#popupDisplay"
          style={{ textDecoration: "none" }}
        >
          Start
        </a>
        </p>
      </div>

      <div id="popupDisplay" className="overlay1">
        <div class="popup">
          <div className="App" id="mainDisplay">
            <header className="App-header">
              <p className="Time" id="left">
                {currenttime}
                <br />
                Prediction: {prediction}
                <br />
                Accuracy: {accuracy}
                <br />
                id: {responseID}
              </p>
              <br />
              <br />
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
              {currenttime}
              <br />
              Prediction: {prediction}
              <br />
              Accuracy: {accuracy}
              <br />
              id: {responseID}
            </p>
            <br />
            <br />
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
