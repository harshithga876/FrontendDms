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
            loaded: 100,
            isUploaded: false


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

        axios({
            method: 'post',
            url: "http://192.168.1.20:8090/v1/upload",
            headers: {
                tokenId: token,
                'Access-Control-Allow-Origin': '*',

            },
            params: {

                'fileType': this.state.selectedFileType,
                'userId': userid

            },
            data: data
        })
            .then(response => {
                console.log(response)
                let data = JSON.stringify(response)
                let result = JSON.parse(data)
                let status = (result.data.message)
                let mes = (result.data.details)
                window.alert(mes)
                console.log(status)
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
                        isUploaded:false,
                        fileChosen:false
                    })
                    console.log(responses)
                })

            }).catch(error => {

            })
        
        {
            this.setState({
                isUploaded: true,
                isDownloaded: false,
                isDeleted: false,
                fileChosen: true,
                


            });
        }
    };
    handleDownload = event => {
        event.preventDefault()
        let token = window.localStorage.getItem("tokenId");
        console.log(token)
        let name = this.props.element.fileType
        var header = {
            headers: {
                tokenId: token,
                'Access-Control-Allow-Origin': '*',

            }
        }
        fetch('http://192.168.1.20:8090/v1/download?fileType=' + name, header)

            .then(response => {
                let filename = response.headers.get('Content-Disposition')
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = this.props.element.fileType;
                    a.click();
                });
            });

        {
            this.setState({
                isDownloaded: false,

            });
        }
    };

    handleDelete = event => {

        event.preventDefault()
        let token = window.localStorage.getItem("tokenId");
        console.log(token)

        let userid = window.localStorage.getItem('userId')


        axios({
            method: 'post',
            url: "http://192.168.1.20:8090/v1/delete",
            headers: {
                tokenId: token,
                'Access-Control-Allow-Origin': '*',

            },
            params: {

                'fileType': this.state.selectedFileType,
                'userId': userid

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
            isUploaded: true,
            isDownloaded: true,
            isDeleted: true,
            fileChosen: false,
            


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