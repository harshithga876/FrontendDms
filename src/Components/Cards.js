import React, { Component } from 'react';
import { Card, CardTitle, Button, Row, CardGroup, Col, CardText, } from "reactstrap";
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
        let data = new FormData();
        data.append("file", this.state.selectedFile);
        data.append("name", "test");

        axios
            .post(
                "http://192.168.1.20:8080/v1/upload?fileType=" +
                this.state.selectedFileType,
                data,
                {
                    headers: {
                        //"Content-Type": "multipart/form-data",
                        "tokenId": token
                    }
                }
            )
            .then(response => {

                (window.alert("Document uploaded Succesfully"));
            });
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
        let name=this.props.element.fileType
        const FileDownload = require('js-file-download');
        axios.get(`http://192.168.1.20:8080/v1/download?fileType=`+ name,{
            headers:{
                'tokenId':token
            }
        })
            .then((response) => {
                FileDownload(response.data, 'report.xls');
            });
     
        {
            this.setState({
                isDownloaded: false

            });
        }
    }

    handleDelete = event => {
        event.preventDefault()
        let token = window.localStorage.getItem("tokenId");
        console.log(token)

        axios.get(
            "http://192.168.1.20:8080/v1/download?fileType=" + this.state.selectedFileType
            , {
                headers: {
                    "tokenId": token
                },


            }
        )



            .then(response => {
                const filename = response.headers.get('Content-Disposition').split('filename=')[1];
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    a.click();
                });
            });
        this.setState({
            isDeleted: false

        });

    }
    constructor(props) {
        super(props);
        this.state = {
            isUploaded: false,
            isDownloaded: true,
            isDeleted: true,
            fileChosen: false,
            text:''


        }
    }
    render() {
        console.log(this.props);
        return (
            <div className='container'>
                <Row sm='4'>
                    <Col xl="4">
                        <CardGroup>
                            <Card body inverse style={{ backgroundColor: '#333', borderColor: 'primary' }}>
                                <CardTitle>{this.props.element ? this.props.element.displayName : ""}</CardTitle>
                                <CardText><input type='file' id={this.props.element ? this.props.element.fileType : ""} onChange={this.handleselectedFile} disabled={(this.state.fileChosen ? "disabled" : "")}></input></CardText>
                                <Button color='success' onClick={this.handleUpload} disabled={this.state.isUploaded}>Upload</Button>
                                <Button color='primary' onClick={this.handleDownload} disabled={this.state.isDownloaded} >Download</Button>
                                <Button color='danger' onClick={this.handleDelete} disabled={this.state.isDeleted} >Archive</Button>

                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Cards;