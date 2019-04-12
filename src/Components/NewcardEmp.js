import React, { Component } from "react";
import axios from "axios";
import "./Newcard.css";
import Cards from "./Cards"
class Newcard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            values: [],

        };

        this.changeData = this.changeData.bind(this);
        this.postIt = this.postIt.bind(this);
        this.datedaat = this.datedaat.bind(this);
    }

    componentWillMount() {
        var token = localStorage.getItem("tokenId");
        console.log(localStorage.getItem("tokenId"))

        let headers = {
            headers: {
                "Control-Allow-Origin": "*",
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                "tokenId": localStorage.getItem("tokenId")
            }

        }

        axios
            .get("http://192.168.1.151:8090/v1/doctype", headers)
            .then(response => {
                this.setState({
                    values: response.data

                });

            });
    } git

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

        return (
            <div className='container'>
            </div>

        );
    }
    render() {
        let cards = []

        // Outer loop to create parent
        this.state.values.forEach(element => {
            console.log(this.state)
            //Create the parent and add the children
            cards.push(this.datedaat(element))
        })
        console.log(cards);
        return <div className="container">
            {this.state.values.map(function (object, i) {
                return <Cards element={object} key={i} />
            })}

        </div>;
    }
}

export default Newcard;
