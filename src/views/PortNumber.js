import React from "react";

class PortNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {PortNum: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    console.log("making request")
    fetch('/inputPort/')
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(json => {
      console.log=(json)
      this.setState({PortNum: json[0]})
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} action="http://localhost:5000/inputPort/" method="get">
        <label>
          PORT NUM :
          <input type="text" name="PortNum"/>
          <input type="submit" onChange={this.handleChange} value={this.state.value} />
        </label>
      </form>
        <label>  PORTNUM : {this.state.PORTNUM} </label>
      </div>
    );
  }
}
export default PortNumber;