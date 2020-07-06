import React from 'react'
import {Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <div>
        <Link to={`/admin/login`}>
        <button>admin</button>  
        </Link>       
      </div>  
      <div>
      <Link to={'/user/login'}>
        <button>student</button>
      </Link>
      </div>
    </div>
  )
}

export default Home;
