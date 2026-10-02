import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'


const Signup = () => {

    const navigate = useNavigate()
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
  
    async function handleSubmit(e) {
      e.preventDefault()

      const data = await signup()

      if (data.message){
        setMessage(data.message)
      } else {
        navigate('/login')
      }

    }

    const signup = async () => {
      try{

        const res = await fetch("http://localhost:5001/account/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, 
        body:JSON.stringify({firstname: firstname, lastname:lastname, email:email, password:password})
      })

      const response = await res.json()

      return response
      } catch (error) {
        console.log(error)
      }
      
    }
    return (
    <div>
      <h1>Sign up</h1>
      <div className="login-page">

      <div className='register-form'>
      <form>
         <label htmlFor="user">First Name:</label>
        <input onChange={(e)=> setFirstName(e.target.value)} type="text" id="firstname" name="user" />

        <label htmlFor="pass">Last Name:</label>
        <input onChange={(e)=> setLastName(e.target.value)} type="text" id="lastname" user="pass"/>

        <label htmlFor="user">Email:</label>
        <input onChange={(e)=> setEmail(e.target.value)} type="text" id="user" name="user" />

        <label htmlFor="pass">Password:</label>
        <input onChange={(e)=> setPassword(e.target.value)} type="password" id="pass" user="pass"/>

        <input type="submit" value="Sign up" onClick={(e) => handleSubmit(e)}/>
        
      </form>
      

      <div className = "message">{message ? <p>{message}</p>: null}</div>
      </div>
    </div>
    </div>
  )
}

export default Signup