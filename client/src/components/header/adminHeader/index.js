import React from 'react';
import Requests from './requests';

const Header=()=>{
  return(
    <div>
      <Requests/>
      <button>Logout</button>
    </div>
  )
}

export default Header;