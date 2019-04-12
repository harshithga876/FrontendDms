import React, { Component } from 'react';
import {  Row, CardGroup, Col, } from "reactstrap";
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
                "http://192.168.1.151:8090/v1/upload?fileType=" +
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
        let name = this.props.element.fileType
        const FileDownload = require('js-file-download');
        axios({
            url: `http://192.168.1.151:8090/v1/download?fileType=` + name,
            method: 'GET',
            responseType: 'blob', // important
            headers:"token"
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', name); //or any other extension
             document.body.appendChild(link);
             link.click();
          });





        // axios.get(`http://192.168.1.151:8090/v1/download?fileType=` + name, {
        //     headers: {
        //         'tokenId': token
        //     }
        // })
        //     .then((response) => {
        //         FileDownload(response.data, this.props.element.fileType);
        //     });

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
        let name = this.props.element.fileType

        axios.get(`http://192.168.1.151:8090/v1/delete?fileType=` + name, {
            headers: {
                'tokenId': token
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
                            <div class="card bg-light border-dark mb-3" >

                                <div class="card-header">{this.props.element ? this.props.element.displayName : ""}</div>
                                <div class="card-body">
                                    <h5 class="card-title"><input type='file' id={this.props.element ? this.props.element.fileType : ""} onChange={this.handleselectedFile} disabled={(this.state.fileChosen ? "disabled" : "")}></input></h5>
                                    <button type="button" class="btn btn-secondary" onClick={this.handleUpload} disabled={this.state.isUploaded}>Upload</button>
                                    <button type="button" class="btn btn-secondary" onClick={this.handleDownload} disabled={this.state.isDownloaded}>Download</button>
                                    <button type="button" class="btn btn-secondary" onClick={this.handleDelete} disabled={this.state.isDeleted}>Delete</button>
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