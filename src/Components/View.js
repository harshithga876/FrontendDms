import React, { Component } from 'react';
import NavbarEmp from './NavbarEmp'



import ViewFile from './ViewFile';
//import './Toolbar.css'
class View extends Component {

    render() {
        return (
            <div>
                <NavbarEmp />


                <ViewFile />
            </div>);
    }
}

export default View;