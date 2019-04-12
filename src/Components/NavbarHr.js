import React from 'react';
import axios from 'axios'
import Email from './Email'
import Autosuggest from 'react-autosuggest'
import { debounce } from 'throttle-debounce'


class Toolbar extends React.Component {
  render() {
    return (
      <div>
      
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <a class="navbar-brand" href="/">NINEDOCS</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="/Toolbarhr">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/ViewListhr">View</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Notify
        </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  
                </div>
              </li>

            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" value={this.state.values} onChange={e => this.onChangeHandler(e)} placeholder="Search" aria-label="Search" />
              {this.renderNames}
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>


      </div>
    );
  }
}

export default Toolbar