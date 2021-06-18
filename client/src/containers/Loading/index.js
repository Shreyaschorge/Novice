import React from 'react'
import './index.scss';
import spinner from 'images/spinner.gif'

const Loading = () => {
  return (
    <div className="loading">
      <img src={spinner} alt="spinner"/>  
    </div>
    
  )
}

export default Loading
