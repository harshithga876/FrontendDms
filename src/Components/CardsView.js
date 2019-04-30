import React, { Component } from 'react';
import { Row, CardGroup, Col, } from "reactstrap";

import './Newcardhr'
class CardsView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            isUploaded: true,
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

                                <div className="card-header">{this.props.element ? this.props.element.fileType : ""}</div>
                                
                            </div>

                        </CardGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CardsView;