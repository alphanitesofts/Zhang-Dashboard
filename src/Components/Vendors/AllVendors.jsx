import React, { useState, useEffect } from 'react'
import colorScheme from '../sourceFiles/Styles'
import AddUser from '../Users/AddUser'
import { toast } from 'react-toastify';
import baseUrlImages from '../sourceFiles/BaseUrlImages';
import AddVendor from './AddVendor';


const AllVendors = () => {


    const [vendors, setVendors] = useState([]);
    const [totalVendors, setTotalVendors] = useState("")
    const [vendorId, setVendorId] = useState('')
    // filters
    const [vId, setVid] = useState('');
    const [vendorDate, setVendorDate] = useState('');
    const [vendorShop, setVendorShop] = useState('');
    const [vendorPhone, setVendorPhone] = useState('');


    const [loader, setLoader] = useState(false)
    const [shouldShow, setShouldShow] = useState(false)
    const [editModal, setEditModal] = useState(false)

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        setLoader(true)

        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BASE_URL}fetch_all_vendors`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoader(false)
                if (result.status === "200") {

                    setVendors(result.Vendors)
                    setTotalVendors(result.total_vendors)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
    }

    const loadingSection = () => {
        if (vendors.length < 1) {
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

    const filteredData =
        vId && !vendorPhone && !vendorShop && !vendorDate
            ? vendors.filter((objects) => objects.id === vId)
            : vendorPhone && !vId && !vendorShop && !vendorDate
                ? vendors.filter((objects) => objects.phone_number === vendorPhone)
                : vendorShop && !vId && !vendorPhone && !vendorDate
                    ? vendors.filter((objects) => objects.shop_name === vendorShop)
                    : vendorDate && !vId && !vendorShop && !vendorPhone
                        ? vendors.filter((objects) => objects.Idate === vendorDate)
                        : vId && vendorPhone && !vendorShop && !vendorDate
                            ? vendors.filter((objects) => objects.id === vId && objects.phone_number == vendorPhone)
                            : vId && !vendorPhone && vendorShop && !vendorDate
                                ? vendors.filter((objects) => objects.id === vId && objects.shop_name == vendorPhone)
                                : vId && !vendorPhone && !vendorShop && vendorDate
                                    ? vendors.filter((objects) => objects.id === vId && objects.Idate == vendorPhone)
                                    //  sequence 2
                                    : !vId && vendorPhone && vendorShop && !vendorDate
                                        ? vendors.filter((objects) => objects.phone_number === vendorPhone && objects.shop_name == vendorShop)
                                        : !vId && vendorPhone && !vendorShop && vendorDate
                                            ? vendors.filter((objects) => objects.phone_number === vendorPhone && objects.Idate == vendorDate)
                                            //  sequence 3
                                            : !vId && !vendorPhone && vendorShop && vendorDate
                                                ? vendors.filter((objects) => objects.shop_name === vendorShop && objects.Idate == vendorDate)
                                                //  sequence 4
                                                : vId && !vendorPhone && !vendorShop && vendorDate
                                                    ? vendors.filter((objects) => objects.id === vId && objects.Idate == vendorDate)
                                                    : !vId && !vendorPhone && vendorShop && vendorDate
                                                        ? vendors.filter((objects) => objects.shop_name === vendorPhone && objects.Idate == vendorDate)
                                                        //  sequence 5
                                                        : vId && vendorPhone && vendorShop && !vendorDate
                                                            ? vendors.filter((objects) => objects.id === vId && objects.phone_number == vendorPhone && objects.shop_name == vendorShop)
                                                            : vId && vendorPhone && !vendorShop && vendorDate
                                                                ? vendors.filter((objects) => objects.id === vId && objects.phone_number == vendorPhone && objects.Idate == vendorDate)
                                                                : vId && !vendorPhone && vendorShop && vendorDate
                                                                    ? vendors.filter((objects) => objects.id === vId && objects.shop_name == vendorShop && objects.Idate == vendorDate)
                                                                    : vendors


    function Content({ items, index }) {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{items.id}</td>
                <td>{items.shop_name}</td>
                <td>{items.phone_number}</td>
                <td>{items.address}</td>
                <td>{items.location}</td>
                <td>{items.rating}</td>
                <td>{items.status}</td>
                <td><img src={`${process.env.REACT_APP_IMAGES_URL}${items.restraunt_pic}`} alt="" /></td>
                <td>{items.Idate}</td>
                <td><button className='btn btn-outline-danger' onClick={() => deleteVendor(items.id)}>Delete Vendor &nbsp;<i className='fa-solid fa-xmark' /></button></td>
            </tr>
        )
    }

    const deleteVendor = (id) => {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_BASE_URL}deletevendorwithid/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status === "200") {
                    toast.success("Entry has been delete")
                    console.log(result)
                }
                else if (result.status === "401") {
                    toast.error('Error in deleting entry')
                }
            })
            .catch(error => {
                toast.error('Something went wrong')
                console.log('error', error)
            });
    }

    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }

    function openEditModal(id) {
        setVendorId(id)
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
                                            Vendors Sheet
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
                                                <h5>Total Vendors {totalVendors}</h5>
                                                <button className="btn btn-outline-info btn-sm" onClick={() => { window.location.reload() }}>Reset Filters</button>
                                                <button className="btn btn-outline-info btn-sm float-end" onClick={oncloseModal}>Add Vendor &nbsp;<i className='fa-solid fa-plus' /></button>
                                                <div className="row p-2">

                                                    <div className="col-sm-3">
                                                        <label htmlFor="" className="form-label "> Search with User ID:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search with Vendor ID..."
                                                                style={{
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setVid(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3">
                                                        <label htmlFor="" className="form-label "> Search with Vendor Shop:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by vendorShop..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setVendorShop(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3">
                                                        <label htmlFor="" className="form-label "> Search with Phone:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by Phone..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setVendorPhone(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3">
                                                        <label htmlFor="" className="form-label "> Search with Date:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by Date..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setVendorDate(e.target.value)}
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
                                                                        <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="categoryId">
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
                                                                        <th>Vendor ID</th>
                                                                        <th>Shop Name</th>
                                                                        <th>Phone Number</th>
                                                                        <th>Address</th>
                                                                        <th>Location</th>
                                                                        <th>Rating</th>
                                                                        <th>Status</th>
                                                                        <th>Restaurant Pic</th>
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
                        vendors ?
                            < AddVendor
                                closeModal={oncloseModal}
                                shouldShow={shouldShow}
                            /> : null
                    }


                </div>
            </div>
        </div>
    )
}

export default AllVendors