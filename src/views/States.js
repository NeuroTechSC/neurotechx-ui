import React from "react";
import ReactDOM from "react-dom";

const API = val => {
  return new Promise(res => {
    setTimeout(res.bind(null, val), 2000);
  });
};

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
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    return <img src={this.state.image} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<States />, rootElement);

export default States;
