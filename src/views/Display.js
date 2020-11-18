import React, {Component, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {Container, Button} from "shards-react";

import "./Display.css";


function Display() {
    const [question, setQuestion] = useState("Loading...");
    const [responseID, setResponseID] = useState("Loading...");
    const [currenttime, setCurrentTime] = useState("Loading...");
    const [convert, setConvert] = useState("Loading...");
    const [prevQuestion, getPrevQuestion] = useState("Loading...");
    const [prediction, setPrediction] = useState("Loading...");
    const [accuracy, setAccuracy] = useState("Loading...");

    const [port, setPort] = useState("Loading...");

    //
    // function setVal() {
    //       // axios.post('http://localhost:5000/recordSubvocalization/', { name: 'predictionVal' })
    //       //   .then((res) => res.json())
    //       //           .then((data) => {
    //       //               // Request from Flask
    //       //               setPrediction(data.prediction);
    //       //               console.log(prediction);
    //       //           });
    //
    //                 fetch(`/recordSubvocalization/?questionid=${responseID}`)
    //                     .then((res) => res.json())
    //                     .then((data) => {
    //                         // Request from Flask
    //                         setPrediction(data.prediction);
    //                     });
    // }


    function refreshPage() {
        window.location.reload(false);
    }

    function start() {
      //Countdown Timer
      var timeleft = 2.0;
      var downloadTimer = setInterval(function () {
          if (timeleft <= 0) {
              clearInterval(downloadTimer);
              document.getElementById("countdown").innerHTML = "Countdown: 0 seconds";
          } else {
              document.getElementById("countdown").innerHTML =
                  "Countdown: " + timeleft + " seconds";
          }
          timeleft -= 1;
      }, 1000);
    }

    function sleep(milliseconds) {
        const date = Date.now();
        let currentDate = null;
        do {
            currentDate = Date.now();
        } while (currentDate - date < milliseconds);
    }

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time =
            date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
        return time;
    }

    function round(value, decimals) {
        return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
    }

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
                setResponseID(data[1].responseID);
                console.log(responseID);
            });
    }, []);

    useEffect(() => {
        fetch("/getAccuracy/")
            .then((res) => res.json())
            .then((data) => {
                // Request from Flask
                setAccuracy(round(data.accuracy, 3));
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

    useEffect(() => {
        fetch("/getPort/")
            .then((res) => res.json())
            .then((data) => {
                // Request from Flask
                console.log(data.PortNum);
                setPort(data.PortNum);
            });
        }, []);

    function Click(answer) {
        console.log(answer)

        fetch("/Insert-Correction/"+responseID+"/?answer="+answer)
            // .then((res) => res.json())
        console.log(answer)
        // console.log(responseID)
    }

    return (
        <Container fluid className="main-content-container px-4">
            <div className="introDisplay">
                <h2 style={{color: "#96C0CE", paddingLeft: "25px"}}>
                    Subvocal Recognition
                </h2>
                <p style={{paddingLeft: "55px"}}></p>
                <p style={{paddingLeft: "25px"}}>
                    <a
                        class="button"
                        href="#popupDisplay"
                        style={{textDecoration: "none"}}
                    >
                        Start
                    </a>
                    
                    {/*<a href='QuestionDisplay.js' class= "button" target ="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>Go To </a>
                    <a class = "button" onClick= "QuestionDisplay.js" style ={{textDecoration: "none"}} > Open</a>    onclick="location.href='QuestionDisplay.js'"
                    <a class = "button" href= "./QuestionDisplay.js" target ="_blank" style= {{textDecoration: "none"}}> Open</a>*/}
                  </p>
            </div>

            <div id="popupDisplay" className="overlay1">
                <div class="popup">
                    <div className="App" id="mainDisplay">
                        <header className="App-header">

                            <div className="headerPopup">
                                    <div style={{color: "EAC435", fontWeight:"bold"}}>{currenttime}</div> {/* color: #EAC435*/}

                                    <div id="countdown" style={{color: "EAC435", fontWeight: "bold"}}>Countdown:</div>

                                    <br/>
                                    <br/>

                                      <Button type="submit"
                                              id='timer'
                                              theme="primary"
                                              onClick={() => {
                                                        start();
                                                      }}
                                              >
                                          Start Time
                                                    </Button>
                                                    



                                <br/>
                                <br/>

                            </div>
                            <div class="questionaire">
                                <p className="question-pNew">{question}</p>

                                {/*<button className="ans-yesNew" onClick={Click.bind(this, "yes")}>Yes</button>
                                <br></br>
                                <button className="ans-noNew" onClick={Click.bind(this, "no")}>No</button>*/}
                                    <div className="question-pNew" id = "prediction">Prediction: {prediction}</div>


                            </div>

                            <div class=".listContainer"></div>
                        </header>

                        <div class="accuracy">
                            <a class="close" href="#">
                                {" "}
                                &times;
                            </a>
                            <div>
                                <h1 className="accQ"> Was it accurate?</h1>
                                {/*<a className="ans-yesNew" href="#popupDisplay">
                                                Yes
                                              </a>
                                              <br></br>
                                              <br></br>
                                              <a className="ans-noNew" href="#popupDisplay">
                                                No &nbsp;
                                </a>*/}
                                <button className="ans-yesNew" href="#popupDisplay" onClick={Click.bind(this, "True")}>
                                    Yes
                                </button>
                                <button className="ans-noNew" href="#popupDisplay" onClick={Click.bind(this, "")}>
                                    No
                                </button>
                                <br/>
                                <br/>
                                <div style={{marginBottom: "15%"}}>
                                <h3
                                        style={{
                                            color: "white",
                                            borderTop: "2px solid #B9732F",
                                            paddingTop: "7%",
                                        }}
                                    >
                                    </h3>
                                    <p style={{color: "whitesmoke"}}>
                                        Port Number: {port}
                                        <br />
                                        Prediction: {prediction}
                                        <br/>
                                        Accuracy: {accuracy}
                                        <br/>
                                        id: {responseID}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div id="next" class="Next">
                            <div class="footerPopup">
                                <br/>
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
                        </div>
                    </div>
                    {" "}
                </div>
            </div>
        </Container>
    );
}

export default Display;
/*#B9732F*/