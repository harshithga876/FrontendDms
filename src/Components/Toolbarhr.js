import React, { Component } from 'react';
import NavbarHr from './NavbarHr'


import Newcardhr from './Newcardhr';
//import './Toolbar.css'
class Toolbar extends Component {
   
    render() {
        return (
            <div>
                <NavbarHr />
                    

                <Newcardhr />
            </div>);
    }
}

export default Toolbar;