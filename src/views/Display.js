import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "shards-react";


function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => { // Request from Flask
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <Container fluid className="main-content-container px-4">
    <div className="App">
      <header className="App-header">



        <p>The current time is {currentTime}.</p>
      </header>
    </div>
    <div className = 'response'>
          <Button theme="primary" className="mb-2 mr-1">
              Response
           </Button>
           </div>
        </Container>
  );
}
// const Display = () => (
// <Container fluid className="main-content-container px-4">
//       <div className = 'response'>
//         <Button theme="primary" className="mb-2 mr-1">
//           Primary
//         </Button>
//       </div>
//
//     </Container>
//
//   );



export default App;
