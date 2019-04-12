import React, { Component } from 'react';
import NavbarEmp from './NavbarEmp'


import NewcardEmp from './NewcardEmp';
//import './Toolbar.css'
class Toolbar extends Component {

    render() {
        return (
            <div>
                <NavbarEmp />


                <NewcardEmp />
            </div>);
    }
}

export default Toolbar;