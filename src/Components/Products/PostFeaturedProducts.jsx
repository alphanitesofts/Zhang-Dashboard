import React, { useEffect, useState } from 'react'
import colorScheme from '../sourceFiles/Styles'
import { toast } from 'react-toastify'
toast.configure()

const PostFeaturedProducts = () => {

    const [productId, setProductId] = useState("Product ID")
    const [vendorId, setVendorId] = useState("Vendor ID")
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [products, setProducts] = useState([])
    const [vendors, setVendors] = useState([])

    const [fieldStatus, setFieldStatus] = useState(false)

    useEffect(() => {
        getVendorId();
        getProductId();
    }, [])

    const checkValidation = () => {
        if (startDate === "" || productId === "Product ID" || vendorId === "Vendor ID" || endDate === "") {
            toast.warn("Please fill all fields")
            setFieldStatus(true)
        }
        else {
            postProduct()
        }
    }

    const postProduct = () => {
        var formdata = new FormData();
        formdata.append("vendor_id", vendorId);
        formdata.append("product_id", productId);
        formdata.append("start_date", "2023-09-12");
        formdata.append("end_date", "2023-09-13");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BASE_URL}post_featured_product`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "200") {
                    toast.success("Data has been saved successfully")
                }
                else if (result.status === "401") {
                    toast.warn(result.message)
                }
                console.log(result)
            })
            .catch(error => {
                toast.warn("Something went wrong...")
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

    const getProductId = () => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        fetch(`${process.env.REACT_APP_BASE_URL}get_all_products`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setProducts(result.data);
                console.log(result)
            })
            .catch(error => {

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
                                            Featured Products
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
                                                <h5>Post Featured Products</h5>
                                                <div className="row p-2">

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className='input-group w-100'>
                                                            <select className="form-select textColor" style={{ borderColor: productId === "Product ID" && fieldStatus === true ? "red" : '#ced4da' }} onChange={(e) => setProductId(e.target.value)} aria-label="Default select example">
                                                                <option>Product ID</option>
                                                                {
                                                                    products.map((items) => {
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
                                                        <div className="form-control mt-2 formStyle d-flex" style={{ borderColor: startDate === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className='placeHolderStyle' placeholder="startDate" onChange={(e) => setStartDate(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
                                                    </div>

                                                    <div className='col-lg-6 mt-2 mb-1'>
                                                        <div className="form-control mt-2 formStyle d-flex" style={{ borderColor: endDate === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                                            <input type="text" className=' placeHolderStyle' placeholder="endDate" onChange={(e) => setEndDate(e.target.value)} />
                                                            <span className="fas fa-pen" />
                                                        </div>
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

export default PostFeaturedProducts