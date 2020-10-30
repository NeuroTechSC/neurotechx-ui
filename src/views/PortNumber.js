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
    console.log(this.state.PortNum)
    return false;
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
        <label>  PORTNUM : {this.state.PortNum} </label>
      </div>
    );
  }
}
export default PortNumber;
