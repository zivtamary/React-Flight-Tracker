import React from 'react'

const Logout = props => {


  return (
    <div>
      <button className="btn btn-primary" onClick={()=>{props.logout()}}>Logout</button>
    </div>
  )
}

export default Logout