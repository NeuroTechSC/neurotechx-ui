import React, { useEffect, useState } from "react";
import { Container,Button, Row, Col, Card, CardHeader, CardBody } from "shards-react";

import PageTitle from "../components/common/PageTitle";



function Tables() {

  const [id, setId] = useState("Loading...");
  const [question, setQuestion] = useState("Loading...");
  const [response, setResponse] = useState("Loading...");
  const [correct, setCorrect] = useState("Loading...");
  const [time, setTime] = useState("Loading...");
  const [expected, setExpected] = useState("Loading...");


function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ' : ' + min + ' : ' + sec ;
  return time;
}

  useEffect(async () => {
    fetch("/getPrevQuestion/")
      .then((res) => res.json())
      .then((data) => {
        // Request from Flask
        setId(data.slice(-1)[0].id);
        setQuestion(data.slice(-1)[0].question);
        setResponse(data.slice(-1)[0].recordedResponse);
        setCorrect(data.slice(-1)[0].correct);
        setTime(timeConverter(data.slice(-1)[0].time));
        setExpected(data.slice(-1)[0].expectedResponse)
      });

  }, []);

return(
  <Container>
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title="Data" subtitle="View Previous Question Data" className="text-sm-left" />
    </Row>

    {/* Default Light Table */}

    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Previous Question</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    ID
                  </th>
                  <th scope="col" className="border-0">
                    Question
                  </th>
                  <th scope="col" className="border-0">
                    Recorded Response
                  </th>
                  <th scope="col" className="border-0">
                    Correct
                  </th>
                  <th scope="col" className="border-0">
                    Time
                  </th>
                  <th scope="col" className="border-0">
                    Expected Response
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{id}</td>
                  <td><p>{question}</p></td>
                  <td>{response}</td>
                  <td>{correct}</td>
                  <td>{time}</td>
                  <td>{expected}</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>

    {/* Default Dark Table */}
    <Row>
      <Col>
        <Card small className="mb-4 overflow-hidden">
          <CardHeader className="bg-dark">
            <h6 className="m-0 text-white">Accuracy</h6>
          </CardHeader>



        </Card>
      </Col>
    </Row>
  </Container>
);
}

export default Tables;
