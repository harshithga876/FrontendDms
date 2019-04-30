import React, { Component } from "react";
import axios from "axios";
import "./Newcard.css";
import Cards from "./Cards";
class Newcard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: [],
      files: []

    };
    this.changeData = this.changeData.bind(this);
    this.postIt = this.postIt.bind(this);
    this.datedaat = this.datedaat.bind(this);
  }
  componentWillMount() {
    var token = localStorage.getItem("tokenId");
    let userid = window.localStorage.getItem('userId')

    console.log(localStorage.getItem('tokenId'));
    var header = {
      headers: {
        tokenId: token,
        'Access-Control-Allow-Origin': '*',

      }
    }
    axios.get("http://192.168.1.20:8090/v1/doctype", header).then(response => {
      axios({
        method: 'get',
        url: "http://192.168.1.20:8090/v1/view",
        headers: {
          tokenId: token,
          'Access-Control-Allow-Origin': '*',
        },
        params: {
          'userId': userid
        }
      }).then(responses => {
        this.setState({
          values: response.data,
          files: responses.data
        })
      })

    }).catch(error => {
      console.log(error)
    })
  }
  changeData(name, e) {
    this.state({
      [name]: e.target.value
    });
  }
  postIt(e) {
    console.log(this.state);
    e.preventdefault();
  }
  datedaat(element) {
    console.log(this.state);

    return <div className="container" />;
  }
  render() {
    return (
      <div className="container">
        
        {this.state.values.map((object, i) => {
          console.log(this.state.files.length)
          return <Cards fileData={this.state.files} element={object} />;
        })
        }
      </div>
    );
  }
}
export default Newcard;
