import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./components/seasonDisplay/SeasonDisplay";
import Loader from "./components/loader/Loader"

class App extends React.Component {
  // this short hand is the equivalent to a constructor in babel
  state = {
    latitude: null,
    errorMessage: ""
  };

  componentDidMount() {
    console.log("My component mounted");
    let getLocation = position => {
      this.setState({ latitude: position.coords.latitude });
      console.log(this.state.latitude);
    };

    let errorLocation = err => {
      console.log(err);
      this.setState({ errorMessage: err.message });
    };

    window.navigator.geolocation.getCurrentPosition(getLocation, errorLocation);
  }

  renderContent(){
      // this pattern allows me not to have multiple return statement inside a render method
      // when ever I have conditional logic put it in a helper method
      if (this.state.errorMessage && !this.state.latitude) {
        return <div> Error: {this.state.errorMessage}</div>;
      } else if (!this.state.errorMessage && !this.state.latitude) {
        return <Loader message="Please allow location access..." />;
      } else {
        return <SeasonDisplay lat={this.state.latitude} />;
      }
  }
  render() {
   return (
     <div className="app">
       {this.renderContent()}
     </div>
   )
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
