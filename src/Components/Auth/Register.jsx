import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from '../sourceFiles/Baseurl';

toast.configure();
const Register = () => {
  const [username, setUserName] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [question, setQuestion] = useState("Select Security Question")
  const [answer, setAnswer] = useState('')

  const [loader, setLoader] = useState(false)
  const [fieldStatus, setFieldStatus] = useState(false)

  const registerAdmin = () => {
    setFieldStatus(true)
    if (
      username === "" ||
      question === "Select Security Question" ||
      answer === "" ||
      password === "" ||
      confirmPassword === "" ||
      phone === ""
    ) {
      toast.warn("Please fill all fields");
    } else {
      if (password.length < 6) {
        toast.warn("Password should be atleast 6 characters");
      } else if (confirmPassword !== password) {
        toast.warn("Password should match");
      } else {
        checkRegister();
      }
    }
  }

  const checkRegister = () => {
    setLoader(true)
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("phone_number", phone);
    formdata.append("question", question);
    formdata.append("answer", answer);
    formdata.append("password", password);
    formdata.append("password_confirmation", confirmPassword);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${baseUrl}register`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.response === "200") {
          setLoader(false)
          setFieldStatus(false)
          toast.success("Registered Successfully")
          setInterval(() => {
            window.location.reload(true)
          }, 2000)
        }
        else if (result.status === "401") {
          setLoader(false)
          setFieldStatus(false)
          toast.warn(result.message)
        }

      })
      .catch(error => {
        setLoader(false)
        setFieldStatus(false)
        toast.warn('Error while submitting details')
        console.log('error', error)
      });
  }



  return (
    <div className='hold-transition register-page'>
      <div className="register-box">
        <div className="register-logo">
          <a><b>Zhang</b> App</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            <div>

              <div className="form-control formStyle d-flex" style={{ borderColor: username === "" && fieldStatus === true ? "red" : '#ced4da', marginTop: "20px" }}>
                <input type="text" className=' placeHolderStyle' placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                <span className="fas fa-user" />
              </div>
              {/* <p>{username === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p> */}

              <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: phone === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="number" className="placeHolderStyle" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
                <span className="fa-solid fa-phone" />
              </div>

              <div className='input-group mt-3 mb-3'>
                <select className="form-select textColor" style={{ borderColor: question === "Select Security Question" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setQuestion(e.target.value)} aria-label="Default select example">
                  <option>Select Security Question</option>
                  <option>What is your hobby?</option>
                  <option>What is your best friend name?</option>
                  <option>What is your father name?</option>
                  <option>What is your school name?</option>
                </select>
                <p className="form-text mb-0" style={{ fontSize: "12px" }}>
                  These Questions will help you in case you forgot your
                  password
                </p>
                {/* <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-key" />
                  </div>
                </div> */}
              </div>

              <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: answer === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="text" className="placeHolderStyle" placeholder="Answer" onChange={(e) => setAnswer(e.target.value)} />
                <span className="fa-solid fa-paper-plane" />
              </div>

              <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: password === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="password" className="placeHolderStyle" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <span className="fas fa-lock" />
              </div>

              <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: confirmPassword === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="password" className="placeHolderStyle" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <span className="fas fa-lock" />
              </div>

              <div className="row mt-1">
                <div className="col-8">
                  <div className="icheck-primary">
                    &nbsp;<input type="checkbox" id="agreeTerms" username="terms" defaultValue="agree" />
                    &nbsp;<label htmlFor="agreeTerms">
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                </div>
                <div className="col-4">
                  {
                    loader === true ?
                      <button className='btn btn-secondary btn-block'>Loading ...</button>
                      :
                      <button className='btn btn-secondary btn-block' onClick={registerAdmin}>Register</button>
                  }
                </div>
              </div>
            </div>
            <Link to="/" className="mt-2 btn btn-block btn-primary text-center">I already have a membership</Link>
          </div>
        </div>
      </div>

    </div >

  )
}
export default Register