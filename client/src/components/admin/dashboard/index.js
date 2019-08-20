import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../header/adminHeader';
import axios from 'axios';



let data  = [
    {
      question:"In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
      options: [
        {
        id:'A',
        val: "William and Elizabeth"
      },
        {
          id: 'B',
          val: "Joseph and Catherine"
        },
        {
          id: 'C',
          val: "John and Mary"
        },
        {
          id: 'D',
          val: "George and Anne"
        }
    ]
  },
  {
    question: "When did the Liberty Bell get its name?",
    options: [
      {
        id: 'A',
        val: "when it was made, in 1701"
      },
      {
        id: 'B',
        val: " when it rang on July 4, 1776"
      },
      {
        id: 'C',
        val: "in the 19th century, when it became a symbol of the abolition of slavery"
      },
      {
        id: 'D',
        val: "none of the above"
      }
    ]
  }
];

class AdminDashboard extends Component {
  constructor(){
    super();
    this.state = {
      questions:data,
      selectedQuestion:'',
      selectedOptinon:'',
      isEditing:false,

    }
  }
  componentDidMount(){
    this.getData();
  }
  getData = async () => {
    const request = await axios.get("http://localhost:3001/api/admin/profile")
      .then(res => res.data)
    
    console.log(request)

  }
  render() {
    const {questions} = this.state;
    return (<div>
      <Header/>
      { 
        questions ?
        questions.map((queObj, qindex)=>{
          return(
          <div key={qindex}>
            <div>
              <span>{qindex+1}. </span>
              <span>{queObj.question}</span>
            </div>
            <div>
              {   
                queObj.options ?
                queObj.options.map((opt, optindex)=>(
                  <div key={optindex}>
                    <span>{opt.id}. </span>
                    <span>{opt.val}</span>
                  </div>
                ))
                :
                null
              }
            </div>
          </div>
        )
      }):
      null
    }
    </div>);
  }
}

export default AdminDashboard;