import React, { Component } from 'react';
import axios from 'axios' 
import CardsView from './CardsView'


class ViewFile extends Component {
    constructor(props){
        super(props)
        this.state={
            files:[]

        }
    }
    
    componentWillMount(){
        var token =localStorage.getItem('tokenId')
        console.log('tokenId')
        let userid=window.localStorage.getItem('userId')
        console.log(userid)
        var header = {
          headers: {
              tokenId: token,
              'Access-Control-Allow-Origin': '*',
              // 'Access-Control-Allow-Methods': 'GET',
              // 'Access-Control-Allow-Headers': 'Content-Type',
              // 'Access-Control-Allow-Credentials': 'true'
          }
      }
        
        axios.get('http://192.168.1.20:8090/v1/view?userId='+userid,header
            // {
            //     params: {
            //         'login': token,
            //         'userId':userid
            //     }
            // }
            )
        .then(response =>{
          this.setState({
            files:response.data
          })
        })
      }
      changeData(name, e) {
        this.state({
          [name]: e.target.files
        });
      }
      postIt(e) {
        console.log(this.state);
        e.preventdefault();
      }
    
    
      datedaat(element) {
        console.log(this.state);
    
        return <div className="container" />;
      }
    render()
     {let cards = [];


        // Outer loop to create parent
        this.state.files.forEach(element => {
          console.log(this.state);
          //Create the parent and add the children
          cards.push(this.datedaat(element));
        });
        console.log(cards);
        return(
           
         <div className="container">
             
        {this.state.files.map(function (object, i) {
          return <CardsView element={object} key={i} />;
        })}
        
      </div> 
        )
        
    }
}
 
export default ViewFile;