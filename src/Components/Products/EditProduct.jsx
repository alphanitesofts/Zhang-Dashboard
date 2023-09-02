import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import baseUrl from '../sourceFiles/Baseurl';
import { Modal } from 'pretty-modal';

toast.configure();
const EditProduct = ({ productId, products, openEditModal, editModal }) => {


    const [loader, setLoader] = useState(false)
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState("Category ID")
    const [vendorId, setVendorId] = useState("Vendor ID")
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState("")
    const [types, setTypes] = useState('')
    const [addOn, setAddOn] = useState('')
    const [variations, setVariations] = useState("")

    const [productData, setProductData] = useState([])
    const [categories, setCategories] = useState([])
    const [vendors, setVendors] = useState([])

    const [fieldStatus, setFieldStatus] = useState(false)

    useEffect(() => {
        fetchProduct();
        getVendorId();
        getCategoryId();
    }, [productId])

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


    const fetchProduct = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };


        fetch(`${process.env.REACT_APP_BASE_URL}get_product_by_id/${productId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoader(false)
                if (result.status === "200") {
                    console.log(result.data)
                    setProductData(result.data)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
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

                                <div className="">

                                    <div className='mt-2 mb-1'>
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

                                    <p>Select the category ID want to you want to make change in</p>

                                    <div className='mt-2 mb-1'>
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

                                    <div className='mt-2 mb-1'>
                                        <div className="form-control mt-2 formStyle d-flex" style={{ borderColor: title === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                            <input type="text" className='placeHolderStyle' defaultValue={productData.title} placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                                            <span className="fas fa-pen" />
                                        </div>
                                    </div>

                                    <div className='mt-2 mb-1'>
                                        <div className="form-control mt-2 formStyle d-flex" style={{ borderColor: variations === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                            <input type="text" className='placeHolderStyle' defaultValue={productData.variation} placeholder="Variations" onChange={(e) => setVariations(e.target.value)} />
                                            <span className="fas fa-pen" />
                                        </div>
                                    </div>


                                    <div className='mt-2 mb-1'>
                                        <div className="form-control formStyle d-flex" style={{ borderColor: price === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                            <input type="text" className=' placeHolderStyle' defaultValue={productData.price} placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                                            <span className="fas fa-pen" />
                                        </div>
                                    </div>

                                    <div className='mt-2 mb-1'>
                                        <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} defaultValue={productData.image} style={{ borderColor: image === "" && fieldStatus === true ? "red" : '#ced4da' }} id="formFile" />
                                    </div>

                                    <div className='mt-2 mb-1'>
                                        <div className="form-control formStyle d-flex" style={{ borderColor: types === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                            <input type="text" className=' placeHolderStyle' defaultValue={productData.type} placeholder="Type" onChange={(e) => setTypes(e.target.value)} />
                                            <span className="fas fa-pen" />
                                        </div>
                                    </div>

                                    <div className='mt-2 mb-1'>
                                        <div className="form-control formStyle d-flex" style={{ borderColor: addOn === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                            <input type="text" className=' placeHolderStyle' defaultValue={productData.add_on} placeholder="Add on" onChange={(e) => setAddOn(e.target.value)} />
                                            <span className="fas fa-pen" />
                                        </div>
                                    </div>

                                    <div className='mt-2'>
                                        <textarea className="form-control formStyle d-flex" defaultValue={productData.description} placeholder='Description for Product' onChange={(e) => setDescription(e.target.value)} style={{ borderColor: description === "" && fieldStatus === true ? "red" : '#ced4da' }} />
                                    </div>

                                </div>


                                <div className="row mt-1">
                                    <div className="col-6 ms-auto mt-2">
                                        {
                                            loader === true ?
                                                <button className='btn btn-secondary btn-block'>Loading ...</button>
                                                :
                                                <button className='btn btn-secondary btn-block' onClick={checkValidation}>Edit Category</button>
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

export default EditProduct