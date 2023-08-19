import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from '../sourceFiles/Baseurl';

const EditCategory = () => {

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
    <div>
         <div className='content-wrapper'>
        <Modal open={shouldShow}>

          <div className='card-body'>
            <div className='d-flex'>
              <div className=''>
                <a className='text-white ms-auto'>Zhang App</a>
              </div>
              <button onClick={() => closeModal()} className='btn btn-outline-danger btn-sm ms-auto' >X</button>
            </div>

            <div>
              <h5 className="mt-3 mb-2">Register a new membership</h5>
              <div>

                <div className="form-control formStyle d-flex" style={{ borderColor: username === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                  <input type="text" className=' placeHolderStyle' placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                  <span className="fas fa-user" />
                </div>
                {/* <p>{username === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p> */}

                <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: phone === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                  <input type="number" className="placeHolderStyle" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
                  <span className="fa-solid fa-phone" />
                </div>

                <div className='input-group mt-3 mb-3 w-100'>
                  <select className="form-select textColor" style={{ borderColor: question === "Select Security Question" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setQuestion(e.target.value)} aria-label="Default select example">
                    <option>Select Security Question</option>
                    <option>What is your hobby?</option>
                    <option>What is your best friend name?</option>
                    <option>What is your father name?</option>
                    <option>What is your school name?</option>
                  </select>
                  
                  {/* <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-key" />
                  </div>
                </div> */}
                </div>
                <p className="form-text mb-0" style={{ fontSize: "12px" }}>
                    These Questions will help you in case you forgot your
                    password
                  </p>

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

                  <div className="col-4 ms-auto mt-2">
                    {
                      loader === true ?
                        <button className='btn btn-secondary btn-block'>Loading ...</button>
                        :
                        <button className='btn btn-secondary btn-block' onClick={registerAdmin}>Register</button>
                    }
                  </div>
                </div>
              </div>
            </div>

          </div>

        </Modal>
      </div>

    </div>
  )
}

export default EditCategory