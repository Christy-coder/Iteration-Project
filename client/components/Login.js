import React, {useState} from 'react';
import logo from '../public/WobbeUp.png';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

//initial state of user to initialize loginInfo state
const initialLoginState = {
  username: '',
  password: ''
}

/**
 * const loginInfo = {
  username: '',
  password: ''
}
 */
const url = 'http://localhost:3000/'

const Login = (props) => {
  //using react hook to make state props
  const [loginInfo, setLoginInfo] = useState(initialLoginState);
  const [infoFromDB, setInfoFromDB] = useState({})
  const [redirect, setRedirect] = useState(false);

  //function to update loginInfo from event
  const updateInfo = (e) => {
    const {name, value} = e.target
    setLoginInfo({
      ...loginInfo,
      [name] : value
    })
  }

  //function for a submit button for login form
  const submitLogin = (e) =>{
    e.preventDefault();
    console.log("login: ",loginInfo)
    //axios instead of fetch to make a request to a server
    axios.get(url + 'account/login', {
    params: {
      username: loginInfo.username,
      password: loginInfo.password
    }
    })
    .then(response => {
      console.log(response);
      //if the user was found in the database, update the InfoFromDB and redirect
      if(response.status === 200){
        console.log('res: ', response.data);
        setInfoFromDB(response.data);
        setRedirect(true);
      }else {
        //otherwise, if the user was not in the database, let user know
        //and reset the loginInfo
        window.alert('Incorrect Username and/or Password!!!')
        setLoginInfo(initialLoginState)
      }
    }).catch(err => {
       console.log(err)
    });
  }

    //check if user attempted login
    //if the user did not, render login page
    return (
      redirect === false ?
      <div className='login-container'>
          <div className='loginLogo'>
            <img className="login-logo" src={logo}></img>
          </div>
        <div className='login-form-div'>
         <div className='login-title'>
            <h1 className="logo-name">Login to WOBBE UP!</h1>
          </div>
          <form className="loginform" autoComplete="off" onSubmit={submitLogin}>
            <label className="loginlabel"> Username: </label>
            <input className="logininput"
              onChange={updateInfo}
              type='text'
              name='username'
              value={loginInfo.username}
            />
            <label className="loginlabel"> Password: </label>
            <input className="logininput"
            onChange={updateInfo}
            type='password'
            name='password'
            value={loginInfo.password}
            /><br/>
            <Link to="/signup">
              <button className="signupbutton">Sign Up!</button>
            </Link>
            <input className="logininput loginsubmit"
              type="submit" 
              value="Submit"
            />
          </form>
        </div>
      </div>
      :
      <Redirect 
      to={{
        pathname: '/',
        state: infoFromDB
    }}
    />
    );
}
 
export default Login;