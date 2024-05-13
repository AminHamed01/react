import React, { Component } from 'react';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: true // Set showMessage to true initially
    };
  }

  componentDidMount() {
    // After 3 seconds, hide the message
    this.timer = setTimeout(() => {
      this.setState({ showMessage: false });
    }, 3000);
  }

  componentWillUnmount() {
    // Clean up the timer
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        {this.state.showMessage && <p>Redirect to Movies page</p>}
      </div>
    );
  }
}

export default NotFound;
