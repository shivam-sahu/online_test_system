import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import setAuthToken from '../../utils/setAuthToken';

class AdminLogin extends Component {
  constructor(props) {
    super(props);

    this.state={
      adminId:'',
      password:'',
      success:false,
      error:''
    }
  }
  componentDidMount(){
    // this.postData()
    // console.log();
    // this.props.history.push("/admin/dashboard");

    
  }
  
  postData = async (obj) => {
    const request = await axios.post("http://localhost:3001/api/admin/login", obj)
      .then(res=>res.data
      )
  const {token} = request;
  localStorage.setItem('jwtToken',token);
  setAuthToken(token);
  // const decoded =  jwt_decode(token);
  // console.log(decoded);
  if(request.isAuth) {
    this.props.history.push("/admin/dashboard");
    }
  }


  render() {
    const{adminId, password}  = this.state;
    return (<div>
      
      <form>
        Username/Id:<br></br>
        <input type="text" value={adminId} onChange={(e)=>this.handleAdminIdChange(e)}></input><br></br>
        password:<br></br>
        <input type="password" value={password} onChange={(e)=>this.handlePasswordChange(e)}></input><br></br>
        <button onClick={(e) => this.loginbtnClk(e,adminId, password)}>Login</button>
      </form>
      <Link to={`/admin/dashboard`}> admin </Link>
    </div>
    );
  }

  handleAdminIdChange = (e)=>{
    this.setState({
      adminId:e.target.value
    });
  }

  handlePasswordChange = (e)=>{
    this.setState({
      password:e.target.value
    });
  }



  loginbtnClk =(e,adminId, password)=>{
    e.preventDefault();
    if(!adminId || !password){
      console.log("enter username and password");
    }else if(password.length<8){
      console.log("password must contain at least 8 characters!");
    }
    else{
      const credentials  = {
        adminId,
        password
      }
      this.postData(credentials);
      this.setState({
        adminId: '',
        password: '',
        success: true
      });
    }        
  }

}

export default AdminLogin;