
import React, {  } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useState} from 'react'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();

        const data = await login()

        console.log(data)

        

        //Successful login
        if(data.message == "Login successful") {
            setMessage(data.message)
            const logUser = data.user._id;
            localStorage.setItem("loggedUser", logUser);

            // remember which portfolio belongs to this user (the Templates link needs it)
            try {
                const res = await fetch("http://localhost:5001/portfolio/discover");
                const list = await res.json();
                const mine = list.find((p) => p?.user_id?._id === logUser);
                if (mine) localStorage.setItem("loggedPortfolio", mine._id);
                else localStorage.removeItem("loggedPortfolio");
            } catch (error) {
                console.log(error)
            }
            navigate(`/user/${logUser}`)
            
            
        //Unsuccessful login
        } else {
            setMessage(data.message)
        }
        
        

    }
    
    const login = async () => {

        try {
            const res = await fetch("http://localhost:5001/account/login", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email, password:password})
            })

            const response = await res.json();

            
            

            console.log(response);
            return response
        } catch(error) {
            console.log(error)
        }
    }
        



    
  return (
    <div>
        <div className="login-page">
        <h1>Login</h1>

        <div className='register-form'>
            <form>
                <div className='label-input'>
                    <label htmlFor="user">Email:</label>
                    <input onChange={(e)=> setEmail(e.target.value)} type="text" id="user" name="user" />
                </div>

                <div className='label-input'>
                    <label htmlFor="pass">Password:</label>
                    <input onChange={(e)=> setPassword(e.target.value)} type="password" id="pass" user="pass"/>
                </div>

                <input type="submit" value="Login" onClick={(e) => handleSubmit(e)}/>
                
            </form>
    </div>


    <div className="message">{message ? <p>{message}</p>: null}</div>
       
     
    </div>
     <div className='extra-register'>
            <a>Forgot password?</a>
            <a>Forgot email/username?</a>
            <a href="/signup">Don't have an account?</a>
        </div>
    </div>
  )
}
export default Login