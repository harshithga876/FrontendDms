import React, { Component } from 'react';
import { Row, CardGroup, Col, } from "reactstrap";
import './NewcardEmp'
import './Newcardhr'
import "./Newcard.css";
import axios from 'axios'
class Cards extends Component {

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileType: event.target.id,
            loaded: 100

        });
    };
    handleUpload = event => {
        event.preventDefault();
        console.log(this.state.selectedFile);

        let token = window.localStorage.getItem("tokenId");
        console.log(token);
        let userid = window.localStorage.getItem('userId')
        console.log(userid)

        var data = new FormData();
        data.append("file", this.state.selectedFile);
        data.append("name", "test");

        axios
            .post(
                "http://192.168.1.20:8090/v1/upload", data,


                {
                    params: {
                        'login': token,
                        'userId': userid,
                        'fileType': this.state.selectedFileType

                    }
                }
            )
            .then(response => {

                (window.alert("Document uploaded Succesfully"));
                
            })
            
        {
            this.setState({
                isUploaded: true,
                isDownloaded: false,
                isDeleted: false,
                fileChosen: true,
                text: this.props.element.displayName


            });
        }
    };
    handleDownload = event => {
        event.preventDefault()
        let token = window.localStorage.getItem("tokenId");
        console.log(token)
        let name = this.props.element.fileType
        // var params= new URLSearchParams()
        // params.append('login',token)
        // params.append('fileType',name)
        axios.get('http://192.168.1.20:8090/v1/download',
            {
                params: {
                    'login': token,
                    'fileType': name
                }
            }
        )
            //     fetch('http://192.168.1.20:8090/v1/download', {
            //         method: "GET",
            //         params: {'login': token,
            //         'fileType':name
            //     }
            // }
            //     )



            .then(response => {
                let filename = response.headers.get('Content-Disposition').split('')[1]
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });
            });


    }

    handleDelete = event => {

        event.preventDefault()
        let token = window.localStorage.getItem("tokenId");
        console.log(token)
        let name = this.props.element.fileType

        axios.get(`http://192.168.1.20:8090/v1/delete?fileType=` + name, {
            params: {
                'login': token
            }
        })
            .then((response) => {
                alert('deleted')
            });

        {
            this.setState({
                isDeleted: false
            });
        }


    }
    constructor(props) {
        super(props);
        this.state = {
            isUploaded: false,
            isDownloaded: true,
            isDeleted: true,
            fileChosen: false,
            text: ''


        }
    }
    render() {
        console.log(this.props);
        return (
            <div className='container'>
                <Row sm='4'>
                    <Col xl="4">
                        <CardGroup>
                            <div className="card bg-light border-dark mb-3" >

                                <div className="card-header">{this.props.element ? this.props.element.displayName : ""}</div>
                                <div className="card-body">
                                    <h5 className="card-title"><input type='file' id={this.props.element ? this.props.element.fileType : ""} onChange={this.handleselectedFile} disabled={(this.state.fileChosen ? "disabled" : "")}></input></h5>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleUpload} disabled={this.state.isUploaded}>Upload</button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleDownload} disabled={this.state.isDownloaded}>Download</button>
                                    <button type="button" className="btn btn-secondary" onClick={this.handleDelete} disabled={this.state.isDeleted}>Delete</button>
                                   
                                </div>
                            </div>

                        </CardGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Cards;