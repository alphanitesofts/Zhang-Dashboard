import React, { useEffect, useState } from 'react'
import colorScheme from '../sourceFiles/Styles'
import { toast } from 'react-toastify'
toast.configure()
const AddProduct = () => {

    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState("Category ID")
    const [vendorId, setVendorId] = useState("Vendor ID")
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState("")
    const [types, setTypes] = useState('')
    const [addOn, setAddOn] = useState('')
    const [variations, setVariations] = useState("")

    const [categories, setCategories] = useState([])
    const [vendors, setVendors] = useState([])

    const [fieldStatus, setFieldStatus] = useState(false)

    useEffect(() => {
        getVendorId();
        getCategoryId();
    }, [])

    const checkValidation = () => {
        if (title === "" || categoryId === "Category ID" || description === "" || vendorId === "Vendor ID" || price === "" || !image || types === "" || addOn === "") {
            toast.warn("Please fill all fields")
            setFieldStatus(true)
        }
        else {
            postProduct()
        }
    }

    const postProduct = () => {
        var formdata = new FormData();
        formdata.append("title", title);
        formdata.append("category_id", categoryId);
        formdata.append("description", description);
        formdata.append("vendor_id", vendorId);
        formdata.append("price", price);
        formdata.append("type", types);
        formdata.append("image", image);
        formdata.append("add_on", addOn);
        formdata.append("variation", variations);

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

    const getVendorId = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BASE_URL}fetch_all_vendors`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setVendors(result.Vendors);
            })
            .catch(error => console.log('error', error));
    }

    const getCategoryId = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BASE_URL}fetch_all_categorys`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setCategories(result.Categorys);
            })
            .catch(error => console.log('error', error));
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
                                                            <select className="form-select textColor" style={{ borderColor: categoryId === "Category ID" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setCategoryId(e.target.value)} aria-label="Default select example">
                                                                <option>Category ID</option>
                                                                {
                                                                    categories.map((items) => {
                                                                        return (
                                                                            <>
                                                                                <option value={items.id}>{items.title}</option>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className='input-group w-100'>
                                                            <select className="form-select textColor" style={{ borderColor: vendorId === "Vendor ID" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setVendorId(e.target.value)} aria-label="Default select example">
                                                                <option>Vendor ID</option>
                                                                {
                                                                    vendors.map((items) => {
                                                                        return (
                                                                            <>
                                                                                <option value={items.id}>{items.shop_name}</option>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control mt-2 formStyle d-flex" style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className='placeHolderStyle' placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control mt-2 formStyle d-flex" style={{ borderColor: variations === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className='placeHolderStyle' placeholder="Variations" onChange={(e) => setVariations(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>


                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control formStyle d-flex" style={{ borderColor: price === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className=' placeHolderStyle' placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} style={{ borderColor: image === "" && fieldStatus === true ? "red" : '#ced4da' }} id="formFile" />
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control formStyle d-flex" style={{ borderColor: types === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className=' placeHolderStyle' placeholder="Type" onChange={(e) => setTypes(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control formStyle d-flex" style={{ borderColor: addOn === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className=' placeHolderStyle' placeholder="Add on" onChange={(e) => setAddOn(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-12 mt-2'>
                                                        <textarea className="form-control formStyle d-flex" placeholder='Description for Product' onChange={(e) => setDescription(e.target.value)} style={{ borderColor: description === "" && fieldStatus === true ? "red" : '#ced4da' }} />
                                                    </div>

                                                </div>
                                                <button className="btn btn-secondary w-25 mt-2 float-right ms-2" onClick={checkValidation} >Summit</button>

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