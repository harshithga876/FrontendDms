import React, { Component } from 'react';
class NavbarEmp extends Component {
  state = {}
  render() {
    return (<div>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

        <a className="navbar-brand text-xl-left" href="/ToolbarEmp">NINEDOCS</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Logout</a>
            </li>
            <li className='nav-item active'>
              <a className='nav-link' href='/View'>View</a>
            </li>
          </ul>
        </div>
      </nav>

    </div>);
  }
}

export default NavbarEmp;