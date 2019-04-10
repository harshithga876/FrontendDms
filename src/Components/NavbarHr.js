import React from 'react';
import axios from 'axios'


class Toolbar extends React.Component {
  constructor(props) {
    super(props);



  }


  handleSearch=(e)=>{
    e.preventDefault()

    var token = localStorage.getItem("tokenId");
        console.log(localStorage.getItem("tokenId"))

        let headers = {
            "Control-Allow-Origin": "*",
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "tokenId": token
        }

        axios
            .get("http://192.168.1.20:8080/v1/doctype", headers)
            .then(response => {
                this.setState({
                    values: response.data

                });

            });



  } 

  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">NINEDOCS</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/Toolbarhr">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/ViewListhr">View</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Notify
        </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  
                </div>
              </li>

            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" onKeyPress={this.handleSearch} placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>


      </div>
    );
  }
}
export default Toolbar