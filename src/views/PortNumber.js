import React from "react";

function link_Display() {
  const url = 'http://localhost:3000/Display#popupDisplay';
  window.open(url, '_blank');
}

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
          <button type="submit" onChange={this.handleChange} value={this.state.value} onClick={() => {
                    link_Display();
                  }} >Submit</button>
        </label>
      </form>
      </div>
    );
  }
}
export default PortNumber;
