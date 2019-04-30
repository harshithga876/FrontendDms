import React, { Component } from "react";
import "./App.css";
import { GoogleLogin } from "react-google-login";
import Axios from "axios";

class Login extends Component {
    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: "" };
    }

    logout = () => {
        this.setState({ isAuthenticated: false, token: "", user: null });
    };

    googleResponse = googleResponse => {
        var header = {
            headers: {
                tokenId: googleResponse.getAuthResponse().id_token,
                'Access-Control-Allow-Origin': '*',
                
            }
        }   

        Axios.get("http://192.168.1.20:8090/v1/signin" , header)
            .then(responseText => {

                window.localStorage.setItem("tokenId", googleResponse.getAuthResponse().id_token);
                let token = window.localStorage.getItem("tokenId");

                console.log(token)
                let data = JSON.stringify(responseText)

                console.log("Signed in as: " + data);
                let res = JSON.parse(data)

                let uid = (res.data.userId)
                console.log(uid)
                window.localStorage.setItem('userId', uid)
                let userid = window.localStorage.getItem('userId')
                console.log(userid)
                 let view =(res.data.view)
                 console.log(view) 
                 if (view ==='intern') {
                    window.location.href = "/Toolbarhr";
                     
                 }
                 else
                 {
                     window.location.href='/ToolbarEmp'
                 }






                window.location.href = "/ToolbarEmp";

            })
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
                        
                        <GoogleLogin
                            clientId="467598396544-usbqpbfg4h2v6282tdr64dgim05klu5v.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.googleResponse}
                            onFailure={this.onFailure}
                        />
                        
                    </div>
                </div>
            );

        return <div className="App">{content}</div>;
    }
}

export default Login;
