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
      this.setState({
        values: response.data
      });
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
        files:response.data
      })
        console.log(responses)
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
    let cards = [];
    // Outer loop to create parent
    this.state.values.forEach(element => {
      console.log(this.state);
      //Create the parent and add the children
      cards.push(this.datedaat(element));
    });
    console.log(cards);
    return (
      <div className="container">
        {this.state.values.map(function (object, i) {
          return <Cards element={object} key={i} />;
        })}
      </div>
    );
  }
}
export default Newcard;
