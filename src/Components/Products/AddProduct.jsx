import React, { useState } from 'react'
import colorScheme from '../sourceFiles/Styles'
import { toast } from 'react-toastify'

const AddProduct = () => {

    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [description, setDescription] = useState('')
    const [vendorId, setVendorId] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState("")
    const [types, setTypes] = useState('')
    const [addOn, setAddOn] = useState('')
    const [variations, setVariations] = useState("")

    const [fieldStatus, setFieldStatus] = useState('')

    const postProduct = () => {
        var formdata = new FormData();
        formdata.append("title", "Coffee");
        formdata.append("category_id", "1");
        formdata.append("description", "milky sweet");
        formdata.append("vendor_id", "fdfdsf");
        formdata.append("price", "9 dollar");
        formdata.append("type", "yes,no");
        formdata.append("image", image);
        formdata.append("add_on", "sprinkles,cream");
        formdata.append("variation", "small,medium,large");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BASE_URL}post_product`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "200") {
                    toast.success("Data has been saved successfully")
                }
                else if (result.status === "401") {
                    toast.warn("Error while adding product")
                }
                console.log(result)
            })
            .catch(error => {
                toast.danger("Something went wrong...")
                console.log('error', error)
            });
    }


    return (
        <div>
            <div>
                <div className="scroll-view-two scrollbar-secondary-two">
                    <div className="content-wrapper p-3">
                        <section className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>
                                            Products
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="content">
                            <div className="">
                                <div className="row">
                                    <div className="col-12">

                                        <div className="card" style={{ color: colorScheme.card_txt_color, boxShadow: colorScheme.box_shadow_one, }}>
                                            <div className="card-header">
                                                <h5>Add Products </h5>
                                                <div className="row p-2">

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className='input-group w-100'>
                                                            <select className="form-select textColor" style={{ borderColor: categoryId === "Select Security Question" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setCategoryId(e.target.value)} aria-label="Default select example">
                                                                <option>Category ID</option>
                                                                <option>Title</option>
                                                                <option>What is your best friend name?</option>
                                                                <option>What is your father name?</option>
                                                                <option>What is your school name?</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className='input-group w-100'>
                                                            <select className="form-select textColor" style={{ borderColor: categoryId === "Select Security Question" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setCategoryId(e.target.value)} aria-label="Default select example">
                                                                <option>Vendor ID</option>
                                                                <option>What is your hobby?</option>
                                                                <option>What is your best friend name?</option>
                                                                <option>What is your father name?</option>
                                                                <option>What is your school name?</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-12 mt-2 mb-1'>
                                                        <div className="form-control mt-2 formStyle d-flex" style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className='placeHolderStyle' placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>


                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control formStyle d-flex" style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className=' placeHolderStyle' placeholder="Price" onChange={(e) => setTitle(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <input className="form-control" type="file" style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }} id="formFile" />
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control formStyle d-flex" style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className=' placeHolderStyle' placeholder="Type" onChange={(e) => setTitle(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control formStyle d-flex" style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className=' placeHolderStyle' placeholder="Add on" onChange={(e) => setTitle(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-12 mt-2'>
                                                        <textarea className="form-control formStyle d-flex" placeholder='Description for Product' onChange={(e) => setTitle(e.target.value)} style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }} />
                                                    </div>



                                                </div>
                                                <div className="btn btn-outline-secondary w-25 mt-2 float-right ms-2">Summit</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct