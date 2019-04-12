import React from "react";
import axios from "axios";

const NavItem = props => {
  //   const pageURI = window.location.pathname + window.location.search;
  //   const liClassName = props.path === pageURI ? "nav-item active" : "nav-item";
  //   const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
  //   return (
  //     <li className={liClassName}>
  //       <a href={props.path} className={aClassName}>
  //         {props.name}
  //         {props.path === pageURI ? (
  //           <span className="sr-only">(current)</span>
  //         ) : (
  //           ""
  //         )}
  //       </a>
  //     </li>
  //   );
};

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.redirectMethod = this.redirectMethod.bind(this);
  }
  redirectMethod = event => {
    console.log(event);
  };

  handleSearch = event => {
    let token = window.localStorage.getItem("tokenId");
    console.log(token);
    let header = {
      headers: {
        tokenId: token
      }
    };
    if (event.target && event.target.value.length >= 3) {
      axios
        .get(
          "http://192.168.1.20:8081/v1/search?text=" + event.target.value,
          header
        )
        .then(response => {
          this.setState({
            result: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    console.log(this.state.result.length);
    return (
      <div>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={this.handleSearch}
          />
        </form>
        {this.state.result.map((name, index) => {
          return (
            <div
              key={index}
              value={name}
              onClick={this.redirectMethod.bind(this, name)}
            >
              <li> {name.emailId} </li>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Navigation;
