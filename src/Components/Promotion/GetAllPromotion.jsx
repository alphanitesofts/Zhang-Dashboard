import React, { useState, useEffect } from 'react'
import colorScheme from '../sourceFiles/Styles'
import AddUser from '../Users/AddUser'
import { toast } from 'react-toastify';
import AddPromotion from './AddPromotion';

const GetAllPromotion = () => {

    const [promotions, setPromotions] = useState([]);
    const [userId, setUserId] = useState('')
    // filters
    const [promoID, setPromoID] = useState('')
    const [promoDate, setPromoDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [categoryTitle, setPromoCode] = useState('');

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

        fetch(`${process.env.REACT_APP_BASE_URL}fetch_all_promocodes`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoader(false)
                if (result.status === "200") {

                    setPromotions(result.Promo_codes)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
    }

    const loadingSection = () => {
        if (promotions.length < 1) {
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
        promoID && !expiryDate && !categoryTitle && !promoDate
            ? promotions.filter((objects) => objects.id === promoID)
            : expiryDate && !promoID && !categoryTitle && !promoDate
                ? promotions.filter((objects) => objects.phone_number === expiryDate)
                : categoryTitle && !promoID && !expiryDate && !promoDate
                    ? promotions.filter((objects) => objects.username === categoryTitle)
                    : promoDate && !promoID && !categoryTitle && !expiryDate
                        ? promotions.filter((objects) => objects.Idate === promoDate)
                        : promoID && expiryDate && !categoryTitle && !promoDate
                            ? promotions.filter((objects) => objects.id === promoID && objects.phone_number == expiryDate)
                            : promoID && !expiryDate && categoryTitle && !promoDate
                                ? promotions.filter((objects) => objects.id === promoID && objects.username == expiryDate)
                                : promoID && !expiryDate && !categoryTitle && promoDate
                                    ? promotions.filter((objects) => objects.id === promoID && objects.Idate == expiryDate)
                                    //  sequence 2
                                    : !promoID && expiryDate && categoryTitle && !promoDate
                                        ? promotions.filter((objects) => objects.phone_number === expiryDate && objects.username == categoryTitle)
                                        : !promoID && expiryDate && !categoryTitle && promoDate
                                            ? promotions.filter((objects) => objects.phone_number === expiryDate && objects.Idate == promoDate)
                                            //  sequence 3
                                            : !promoID && !expiryDate && categoryTitle && promoDate
                                                ? promotions.filter((objects) => objects.username === categoryTitle && objects.Idate == promoDate)
                                                //  sequence 4
                                                : promoID && !expiryDate && !categoryTitle && promoDate
                                                    ? promotions.filter((objects) => objects.id === promoID && objects.Idate == promoDate)
                                                    : !promoID && !expiryDate && categoryTitle && promoDate
                                                        ? promotions.filter((objects) => objects.username === expiryDate && objects.Idate == promoDate)
                                                        //  sequence 5
                                                        : promoID && expiryDate && categoryTitle && !promoDate
                                                            ? promotions.filter((objects) => objects.id === promoID && objects.phone_number == expiryDate && objects.username == categoryTitle)
                                                            : promoID && expiryDate && !categoryTitle && promoDate
                                                                ? promotions.filter((objects) => objects.id === promoID && objects.phone_number == expiryDate && objects.Idate == promoDate)
                                                                : promoID && !expiryDate && categoryTitle && promoDate
                                                                    ? promotions.filter((objects) => objects.id === promoID && objects.username == categoryTitle && objects.Idate == promoDate)
                                                                    : promotions




    function Content({ items, index }) {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{items.id}</td>
                <td>{items.code}</td>
                <td>{items.discount}</td>
                <td>{items.discount_type}</td>
                <td>{items.expiry_date}</td>
                <td>{items.Idate}</td>
                {/* <td><button className='btn btn-outline-danger' onClick={() => openEditModal(items)}><i className='fa-solid fa-pen' /></button></td> */}
            </tr>
        )
    }

    function oncloseModal() {
        setShouldShow((prev) => !prev)
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
                                            Promotions
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
                                                <h5>Promotions Sheet</h5>
                                                <button className="btn btn-outline-info btn-sm" onClick={() => { window.location.reload() }}>Reset Filters</button>
                                                <button className="btn btn-outline-info btn-sm float-end" onClick={oncloseModal}>Add Promotions &nbsp;<i className='fa-solid fa-plus' /></button>
                                                <div className="row p-2">

                                                    <div className="col-sm-3 col-lg-3">
                                                        <label htmlFor="" className="form-label "> Search with Category ID:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search with Promo ID..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setPromoID(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-lg-3">
                                                        <label htmlFor="" className="form-label "> Search with Title:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by PromoCode..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setPromoCode(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-lg-3">
                                                        <label htmlFor="" className="form-label "> Search with Date:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by Expiry Date..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setExpiryDate(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-lg-3">
                                                        <label htmlFor="" className="form-label "> Search with Date:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by Posting Date..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setPromoDate(e.target.value)}
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
                                                                        <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="promoID">
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
                                                                        <th>Promo Code</th>
                                                                        <th>Discount</th>
                                                                        <th>Discount Type</th>
                                                                        <th>Expiry Date</th>
                                                                        <th>Posting Date</th>
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
                        promotions ?
                            <AddPromotion
                                promotions={promotions}
                                oncloseModal={oncloseModal}
                                shouldShow={shouldShow}
                            /> : null
                    }

                </div>
            </div>
        </div>
    )
}

export default GetAllPromotion