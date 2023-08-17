import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import baseUrl from '../sourceFiles/Baseurl';

toast.configure()
const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fieldStatus, setFieldStatus] = useState(false)

  const submitData = () => {

    setFieldStatus(true)
    if (!username || !password) {
      toast.warning("Please fill all fields")
    }
    else if (!username && password) {
      toast.warning("Please Enter your Email")
    }
    else if (username && !password) {
      toast.warning("Please Enter your Password")
    }
    else {

      const userObj = {
        username: username,
        password: password
      }

      axios.post(`${baseUrl}login`, userObj)
        .then((res) => {
          localStorage.setItem('logIN', JSON.stringify(true));
          localStorage.setItem('username', JSON.stringify(username));
          localStorage.setItem('password', JSON.stringify(password));

          localStorage.setItem('user', JSON.stringify(res.data.user));

          toast.info("Successfully Logged In")
          setInterval(() => {
            window.location.reload(true)
          }, 1500)
        }
        )
        .catch((error) => {
          toast.warn("Incorrect Credentials");
          console.log(error)
        })
    }

  }

  return (
    <div className='hold-transition login-page'>
      <div className="login-box">
        <div className="login-logo">
          <a href="#"><b>Zhang</b> App</a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <div>
              <div className="mb-3 form-control formStyle d-flex" style={{ borderColor: username === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="text" className="placeHolderStyle" name='Username' onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <span className="fas fa-envelope" />
              </div>
              <p style={{ fontSize: '14px' }}>{username === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

              <div className="mb-3 form-control formStyle d-flex" style={{ borderColor: password === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="password" className="placeHolderStyle" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <span className="fas fa-lock" />
              </div>
              <p style={{ fontSize: '14px' }}>{password === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

              <div className="row">
                <div className="col-8">
                  <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                      Remember Me
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  <button type="submit" className="btn btn-secondary btn-block" onClick={submitData}>Sign In</button>
                </div>
              </div>
            </div>
            <p className="mb-1 mt-2">
              <Link to="/Forgotpassword" className='btn btn-block btn-danger'>I forgot my password</Link>
            </p>
            <p className="mb-0">
              <Link to="/Register" className="text-center btn btn-block btn-primary">Register a new membership</Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login