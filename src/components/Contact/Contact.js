import React from 'react'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';


import './Contact.css'



const Contact = () => {

  //hooks
  const [open, setOpen] = React.useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
   emailjs.sendForm('service_w9pnbuw','template_drkcemh', form.current,'luMc5kjzk2VZrE3tl')
      .then((result) => {
        setOpen(true);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  }



  return (
    <div className="contact-container">
    <div className="contact-form-container">
      <h1 className="contact-title">Contact US</h1>
      <p className="contact-subtitle">Feel free to reach out to me for any questions !</p>
      <form ref={form} onSubmit={handleSubmit} className="contact-form">
        <h3 className="contact-form-title">Email Me 🚀</h3>
        <input className="contact-input" placeholder="Your Email" name="user_email" />
        <input className="contact-input" placeholder="Your Name" name="user_name" />
       
        <input className="contact-textarea" placeholder=""  name="message" />
        <button type="submit" value="Send" className='cta btn-primary'>Send</button>
      </form>
      <div
        open={open}
        autoHideDuration={6000}
        onClose={()=>setOpen(false)}
        message="Email sent successfully!"
        severity="success"
      />
    </div>
  </div>
  )
}

export default Contact