import React from 'react'
import "./index.scss"

import { HeartFilled } from '@ant-design/icons'


const Footer = () => {
  return (
   
      <div className="footer">
        <p className="footer-text">Designed and Developed with <span style={{color: "#8564E8"}}><HeartFilled /></span> by </p>
        <a 
        href="https://github.com/Shreyaschorge"
        target="_blank"
        rel="noreferrer"
        className="footer-link">Shreyas Chorge</a>
      </div>
 
  )
}

export default Footer
