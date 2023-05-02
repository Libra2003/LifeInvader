import React from 'react'
import './Join.css'
//import emailjs from '@emailjs/browser'
//import React, { useRef } from 'react';

const Join = () => {
    //const form = useRef()
  return (
    <div className="Join" id="join-us">
        <div className="left-j">
            <hr />
            <div>
                <span className='stroke-text'>READY TO</span>
                <span>LEVEL UP</span>
            </div>
            <div>
                <span>YOUR BODY</span>
                <span className='stroke-text'>WITH US?</span>
            </div>
        </div>
        <div className="right-j">
            <form className="email-container">
                <input type="email" name='user_email' placeholder='Enter your Email Address here'   />
                <button className="btn btn-j">Join now</button>
            </form>
        </div>
    </div>
  )
}

export default Join
