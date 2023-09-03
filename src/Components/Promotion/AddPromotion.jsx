import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from '../sourceFiles/Baseurl';
import { Modal } from 'pretty-modal';

toast.configure();
const AddPromotion = ({ promotions, oncloseModal, shouldShow }) => {

    const [code, setCode] = useState("")
    const [discount, setDiscount] = useState('')


    const [expiryDate, setExpiryDate] = useState('')
    const [DiscountType, setDiscountType] = useState('')

    const [loader, setLoader] = useState(false)
    const [fieldStatus, setFieldStatus] = useState(false)

    const registerAdmin = () => {
        setFieldStatus(true)
        if (
            code === "" ||
            discount === ""

        ) {
            toast.warn("Please fill all fields");
        } else {
            postCategory();
        }

    }

    const postCategory = () => {
        setLoader(true)

        var formdata = new FormData();
        formdata.append("code", code);
        formdata.append("expiry_date", expiryDate);
        formdata.append("discount", discount);
        formdata.append("discount_type", DiscountType);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };


        fetch(`${baseUrl}post_promo_code`, requestOptions)
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

    return (
        <div>
            <div className='content-wrapper'>
                <Modal open={shouldShow}>

                    <div className='card-body'>
                        <div className='d-flex'>
                            <div className=''>
                                <a className='text-white ms-auto'>Zhang App</a>
                            </div>
                            <button onClick={() => oncloseModal()} className='btn btn-outline-danger btn-sm ms-auto' >X</button>
                        </div>

                        <div>
                            <h5 className="mt-3 mb-2">Add Category</h5>
                            <div>
                                <div className="form-control formStyle d-flex" style={{ borderColor: code === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                    <input type="text" className=' placeHolderStyle' placeholder="Discount Code" onChange={(e) => setCode(e.target.value)} />
                                    <span className="fas fa-pen" />
                                </div>
                                {/* <p>{code === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p> */}
                                <p className="form-text mb-0" style={{ fontSize: "12px" }}>
                                    Write the Code of the Discount you want to give:
                                </p>

                                <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: discount === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                    <input type="text" className="placeHolderStyle" placeholder="20% 30% etc" onChange={(e) => setDiscount(e.target.value)} />
                                    <span className="fa-solid fa-paper-plane" />
                                </div>

                                <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: discount === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                    <input type="text" className="placeHolderStyle" placeholder="Early, monthly etc" onChange={(e) => setDiscountType(e.target.value)} />
                                    <span className="fa-solid fa-paper-plane" />
                                </div>

                                <div className="form-control mt-3 formStyle d-flex" style={{ borderColor: discount === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                    <input type="text" className="placeHolderStyle" placeholder="Set Expiry Date" onChange={(e) => setExpiryDate(e.target.value)} />
                                    <span className="fa-solid fa-paper-plane" />
                                </div>



                                <div className="row mt-1">
                                    <div className="col-6 ms-auto mt-2">
                                        {
                                            loader === true ?
                                                <button className='btn btn-secondary btn-block'>Loading ...</button>
                                                :
                                                <button className='btn btn-secondary btn-block' onClick={registerAdmin}>Add Category</button>
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

export default AddPromotion