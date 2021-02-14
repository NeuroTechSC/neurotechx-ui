import React from "react";
import ReactDOM from "react-dom";
import {Container, Button} from "shards-react";

const API = val => {
  return new Promise(res => {
    setTimeout(res.bind(null, val), 2000);
  });
};

function refreshPage() {
  window.location.reload(false);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const Fetch = () => {
  let kvStates = [
                    [0, 'alabama'],
                    [1, 'alaska'],
                    [2, 'arizona'],
                    [3, 'arkansas'],
                    [4, 'california'],
                    [5, 'colorado'],
                    [6, 'connecticut'],
                    [7, 'delaware'],
                    [8, 'florida'],
                    [9, 'georgia'],
                    [10, 'hawaii'],
                    [11, 'idaho']
                  ];

  let states = new Map(kvStates);

  // console.log(states.get(getRandomInt(1)));
  return API(`https://suncatcherstudio.com/uploads/patterns/us-states/map-outlines/svg/${states.get(getRandomInt(12))}-map-outline-dddddd.png`);
};

class States extends React.Component {
  state = {
    image: "",
    loading: true
  };

  componentDidMount() {
    Fetch().then(image => { 
      this.setState({ image, loading: false });
    });
  }

  render() {

    
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
                                <div style={{color: "EAC435", fontWeight:"bold"}}></div> {/* color: #EAC435*/}

                                <div id="countdown" style={{color: "EAC435", fontWeight: "bold"}}>Countdown:</div>

                                <br/>
                                <br/>

                                  <Button type="submit"
                                          id='timer'

                                          onClick={() => {
                                                    
                                                  }}
                                          >
                                      Start Time
                                                </Button>




                            <br/>
                            <br/>

                        </div>
                        <div class="questionaire">
                            <p className="question-pNew"></p>

                                <div className="question-pNew" id = "prediction">
                                
                                  <img src={this.state.image} />

                                </div>
                                                  

                        </div>

                        <div class=".listContainer"></div>
                    </header>

                    <div class="accuracy">
                        <a class="close" href="#">
                            {" "}
                        
                        </a>
                        <div>
                            <h1 className="accQ"> Was it accurate?</h1>
                      
                            <button className="ans-yesNew" href="#popupDisplay" >
                                Yes
                            </button>
                            <button className="ans-noNew" href="#popupDisplay" >
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
                                <p style={{color: "whitesmoke", textAlign: "left"}}>
                                    <b style={{fontWeight: "900"}}>Port Number: </b>
                                    <br />
                                    <b style={{fontWeight: "900"}}>Prediction: </b>
                                    <br/>
                                    <b style={{fontWeight: "900"}}>Accuracy: </b>
                                    <br/>
                                    <b style={{fontWeight: "900"}}>id: </b>
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
}

const rootElement = document.getElementById("root");
ReactDOM.render(<States />, rootElement);

export default States;
