import React, { useState, useEffect } from 'react'
import colorScheme from '../sourceFiles/Styles'
import AddUser from '../Users/AddUser'
import { toast } from 'react-toastify';
import EditProduct from './EditProduct';

const AllProducts = () => {


    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState("")
    const [productId, setProductId] = useState()
    // filters
    const [filterId, setFilterId] = useState('')
    const [productDate, setProductDate] = useState('');
    const [productTitle, setProductTitle] = useState('');

    const [loader, setLoader] = useState(false)
    const [editModal, setEditModal] = useState(false)


    // alert(productId)
    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = () => {
        setLoader(true)
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BASE_URL}get_all_products`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoader(false)
                if (result.status === "200") {
                    setProducts(result.data)
                    setTotalProducts(result.total_count)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
    }

    const deleteProduct = (id) => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BASE_URL}delete_product/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoader(false)
                if (result.status === "200") {
                    toast.success("Product Deleted Successfully");
                    setInterval(() => {
                        window.location.reload()
                    }, 1500);
                }
                else {
                    toast.warn("Error while Deleting")
                }
            })
            .catch(error => {
                console.log('error', error)
                toast.danger("Something went wrong")
            });
    }

    const loadingSection = () => {
        if (products.length < 1) {
            return <h2 className='text-center text-white'>No Data Available</h2>
        }
        else {
            return <DataRender />
        }
    }

    const DataRender = () => {
        return (
            <>
                {
                    filteredData.map((items, index) => {
                        return (
                            <Content items={items} index={index} />
                        )
                    }
                    )}
            </>
        )
    }

    const filteredData = filterId && !productTitle && !productDate ?
        products.filter((objects) => objects.id === (filterId)) :
        productTitle && !filterId && !productDate ?
            products.filter((objects) => objects.title === productTitle) :
            productDate && !filterId && !productTitle ?
                products.filter((objects) => objects.Idate === productDate) :
                filterId && productTitle && !productDate ?
                    products.filter((objects) => objects.id === (filterId) && objects.title == productTitle) :
                    productTitle && productDate && !filterId ?
                        products.filter((objects) => objects.title === productTitle && objects.Idate == productDate) :
                        filterId && productTitle && productDate ?
                            products.filter((objects) => objects.id === (filterId) && objects.title === productTitle && objects.Idate === productDate) :
                            products


    function Content({ items, index }) {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{items.id}</td>
                <td>{items.title}</td>
                <td>{items.vendor_shop_name}</td>
                <td>{items.price}</td>
                <td>{items.type}</td>
                <td>{items.description}</td>
                <td>{items.image}</td>
                <td>{items.Idate}</td>
                <td>
                    <button className='btn btn-outline-secondary me-1' onClick={() => openEditModal(items.id)}><i className='fa-solid fa-pen' /></button>
                    <button className='btn btn-outline-danger ms-1' onClick={() => deleteProduct(items.id)}><i className='fa-solid fa-xmark' /></button>
                </td>
            </tr>
        )
    }

    function openEditModal(id) {
        setProductId(id)
        setEditModal((prev) => !prev)
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
                                            Products Sheet
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
                                                <h5>Total Products {totalProducts}</h5>
                                                <button className="btn btn-outline-info btn-sm" onClick={() => { window.location.reload() }}>Reset Filters</button>
                                                {/* <button className="btn btn-outline-info btn-sm float-end" onClick={openEditModal}>Edit Category &nbsp;<i className='fa-solid fa-plus' /></button> */}
                                                <div className="row p-2">

                                                    <div className="col-sm-3 col-lg-4">
                                                        <label htmlFor="" className="form-label "> Search with Product ID:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search with Product ID..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setFilterId(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-lg-4">
                                                        <label htmlFor="" className="form-label "> Search with Name:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by Product Name..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setProductTitle(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-lg-4">
                                                        <label htmlFor="" className="form-label "> Search with Date:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by Date..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setProductDate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="card-body table-responsive p-2">
                                                <table className="table  text-nowrap">

                                                    {
                                                        loader === true ?
                                                            <>
                                                                <div className=''>
                                                                    <div className="loader">
                                                                        <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="filterId">
                                                                            <span className="sr-only">Loading...</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            :
                                                            <>
                                                                <thead className="text-center">
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>ID</th>
                                                                        <th>Name</th>
                                                                        <th>Vendor Shop Name</th>
                                                                        <th>Price</th>
                                                                        <th>Type</th>
                                                                        <th>Description</th>
                                                                        <th>Image</th>
                                                                        <th>Date</th>
                                                                        <th>Action</th>

                                                                    </tr>
                                                                </thead>
                                                                <tbody className='text-center'>
                                                                    {
                                                                        loadingSection()
                                                                    }
                                                                </tbody>
                                                            </>
                                                    }

                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {
                        products ?
                            < EditProduct
                                openEditModal={openEditModal}
                                editModal={editModal}
                                productId={productId}
                            /> : null
                    }

                </div>
            </div>
        </div>
    )
}

export default AllProducts