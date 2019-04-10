import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <section>
          <header>
            <img src="./images/logo.jpg" width="200" alt="logo" />
            <div>
              <ul>
                <li>HOME</li>
                <li>ABOUT</li>
                <li>SERVICES</li>
                <li>BLOG</li>
              </ul>
            </div>
          </header>
        </section>

        <section id="main">
          <div className="main-text">
            <span>NineDocs.</span> <br /> Get to your documents <br />
            anywhere , anytime
          </div>

          <img src="./images/leaf.png" width="520" alt="leaf-main-image" />
        </section>
      </div>
    );
  }
}

export default App;
