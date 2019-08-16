import React,{Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  
  
  componentDidMount() {
    axios.get("http://localhost:3001/api/users")
      .then(response => {
        console.log(response.data);
      });
  }
  render(){

    return (
    <div className="App">
     Hello!
    </div>
  );}
}

export default App;
