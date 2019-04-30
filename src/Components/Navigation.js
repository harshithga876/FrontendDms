import React from "react";
import axios from "axios";
import { Redirect } from "react-router";

const NavItem = props => {};

class Navigation extends React.Component {
constructor(props) {
super(props);
this.state = {
result: [],
redirect: false

};

this.handleSearch = this.handleSearch.bind(this);
this.redirectMethod = this.redirectMethod.bind(this);
}
redirectMethod = event => {
console.log(event);

this.setState({
redirect: true
});

//<Redirect to="/" />;
};

handleSearch = event => {
let token = window.localStorage.getItem("tokenId");
console.log(token);
let header = {
headers: {
tokenId: token
}
};
if (event.target && event.target.value.length >= 3) {
axios
.get(
"http://192.168.1.154:8090/v1/search?text=" + event.target.value,
header
// {
// // params: {
// // login: token
// }
// }
)
.then(response => {
  

this.setState({
result: response.data
})



  // window.localStorage.setItem('searchId', usid)
  // let searchid = window.localStorage.getItem('searchId')
  // console.log(searchid)
})
.catch(error => {
console.log(error);
});
}
};

render() {
console.log(this.state.result.length);
return (
<div>
<form className="form-inline my-2 my-lg-0">
<input
className="form-control mr-sm-2"
type="search"
placeholder="Search"
aria-label="Search"
onChange={this.handleSearch}
/>
</form>

{this.state.result.map((name, index) => {
return (
<div
key={index}
value={name}
onClick={this.redirectMethod.bind(this, name)}
>
<div>
<ul>
<li> {name.emailId} </li>
</ul>
</div>
{this.state.redirect && <Redirect to="/View" />}
</div>
);
})}
</div>
);
}
}

export default Navigation
