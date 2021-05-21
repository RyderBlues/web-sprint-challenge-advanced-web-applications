import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const [credentials, setCredentials] = useState({
    credentials: {
        username: 'Lambda School',
        password: 'i<3Lambd4',
    }
  });

  const [error, setError] = useState();
  

  const handleChange = (e) => {
    console.log(credentials);
    setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
    })
}

  const { push } = useHistory();

  const login = e => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/login', credentials)
      .then(res=>{
        localStorage.setItem("token", res.data.payload);
        console.log(res);
        push('/bubblepage');
      })
      .catch(err=>{
        console.log(err);
        setError('Wrong username or password.');
      });
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
 

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
          <form onSubmit={login}>
                        <input 
                          type="text"
                          name="username"
                          value={credentials.username}
                          onChange={handleChange}
                          placeholder="Username"
                          data-testid="username"
                          />
                        <input 
                          type="password"
                          name="password"
                          value={credentials.password}
                          onChange={handleChange}
                          placeholder="Password"
                          data-testid="password"
                        />
                        <button>Log in</button>
          </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.