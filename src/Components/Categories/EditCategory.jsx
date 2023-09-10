import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from '../sourceFiles/Baseurl';
import { Modal } from 'pretty-modal';

toast.configure();
const EditCategory = ({ userId, category, openEditModal, editModal }) => {

    const [getData, setData] = useState([])

    const [title, setTitle] = useState(category.title)
    const [description, setDescription] = useState("")
    const [types, setTypes] = useState("")
    
    const [loader, setLoader] = useState(false)
    const [fieldStatus, setFieldStatus] = useState(false)

    // alert(userId) 

    useEffect(() => {
        getCategorywithId()
    }, [userId])

    const registerAdmin = () => {
        setFieldStatus(true)
        if (
            title === "" ||
            types === "" ||
            description === ""
        ) {
            toast.warn("Please fill all fields");
        } else {
            postCategory();
        }
    }

    const postCategory = () => {
        setLoader(true)

        var formdata = new FormData();
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("types", types);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${baseUrl}updateCategory/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoader(false)
                if (result.status === "200") {
                    setFieldStatus(false)
                    toast.success("Registered Successfully")
                    setInterval(() => {
                        window.location.reload(true)
                    }, 2000)
                }
                else if (result.status === "401") {
                    setFieldStatus(false)
                    toast.warn(result.data)
                }

            })
            .catch(error => {
                setLoader(false)
                setFieldStatus(false)
                toast.warn('Error while submitting details')
                console.log('error', error)
            });
    }


    const getCategorywithId = (userId) => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`${baseUrl}fetchcategorywithid/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if (result.status === "200") {
                    setData(result.data)
                }
                else {
                    console.log("error in api fetchcategorywithid")
                }
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    return (
        <div>
            <div className='content-wrapper'>
                <Modal open={editModal}>

                    <div className='card-body'>
                        <div className='d-flex'>
                            <div className=''>
                                <a className='text-white ms-auto'>Zhang App</a>
                            </div>
                            <button onClick={() => openEditModal()} className='btn btn-outline-danger btn-sm ms-auto' >X</button>
                        </div>

                        <div>
                            <h5 className="mt-3 mb-2">Edit Category</h5>
                            <div>

                                <div className="form-control formStyle d-flex" style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                    <input type="text" className=' placeHolderStyle' placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                                    <span className="fas fa-pen" />
                                </div>
                                {/* <p>{title === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p> */}
                                <p className="form-text mb-0" style={{ fontSize: "12px" }}>
                                    Write the Types of the description of the Category Below:
                                </p>
                                <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: types === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                    <input type="text" className="placeHolderStyle" placeholder="Types" value={types} onChange={(e) => setTypes(e.target.value)} />
                                    <span className="fa-solid fa-paper-plane" />
                                </div>


                                <textarea className="form-control mt-3 formStyle d-flex" placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description} style={{ borderColor: description === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                    {/* <input type="text" className="placeHolderStyle form-control" rows="4" placeholder="Description" onChange={(e) => setDescription(e.target.value)} /> */}
                                    {/* <span className="fa-solid fa-envelope" /> */}
                                </textarea>


                                <div className="row mt-1">
                                    <div className="col-6 ms-auto mt-2">
                                        {
                                            loader === true ?
                                                <button className='btn btn-secondary btn-block'>Loading ...</button>
                                                :
                                                <button className='btn btn-secondary btn-block' onClick={registerAdmin}>Edit Category</button>
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