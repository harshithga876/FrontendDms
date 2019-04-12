import React, { Component } from "react";
import "./App.css";
import { GoogleLogin } from "react-google-login";

class Login extends Component {
    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: "" };
    }

    logout = () => {
        this.setState({ isAuthenticated: false, token: "", user: null });
    };

    googleResponse = response => {
        console.log(response);

        let id_token = response.getAuthResponse().id_token;
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://192.168.1.20:8081/v1/signin");

        xhr.setRequestHeader("WE", "tokenId");
        xhr.onload = function () {
            let data = xhr.responseText
            console.log("Signed in as: " + data);
            window.localStorage.setItem("view", data)
            window.location.href = "/ToolbarEmp";



        };

        xhr.send(id_token);
        window.localStorage.setItem("tokenId", id_token);
        let token = window.localStorage.getItem("tokenId");

        console.log(token);




    };
    onFailure = error => {
        console.log("****************");
        alert(error);
    };

    render() {
        let content = !!this.state.isAuthenticated ? (
            <div className="App">
                <p>Authenticated</p>

                <div>{this.state.user.email}</div>
                <div>
                    <button onClick={this.googleResponse} className="button">
                        Log out
          </button>
                </div>
            </div>
        ) : (
                <div className="body">
                    <div className="login">
                        <h1>Welcome To Document Management System</h1>
                        <h2>Login To access dcouments</h2>
                        {/* <Link to='/Navbar'> */}
                        <GoogleLogin
                            clientId="467598396544-usbqpbfg4h2v6282tdr64dgim05klu5v.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.googleResponse}
                            onFailure={this.onFailure}
                        />
                        {/* </Link> */}
                    </div>
                </div>
            );

        return <div className="App">{content}</div>;
    }
}

export default Login;
