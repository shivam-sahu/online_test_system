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
      <button>student</button>
      </div>
    </div>
  )
}

export default Home;
