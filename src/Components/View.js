import React, { Component } from 'react';
import NavbarHr from './NavbarHr'



import ViewFile from './ViewFile';
//import './Toolbar.css'
class View extends Component {

    render() {
        return (
            <div>
                <NavbarHr />


                <ViewFile />
            </div>);
    }
}

export default View;