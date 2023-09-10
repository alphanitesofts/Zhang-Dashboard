import React, { useState, useEffect } from 'react'
import colorScheme from '../sourceFiles/Styles'
import AddUser from '../Users/AddUser'
import { toast } from 'react-toastify';

const GetAllTickets = () => {


    const [tickets, setTickets] = useState([]);
    const [userId, setUserId] = useState('')
    // filters
    const [ticketsId, setTicketsId] = useState('')
    const [ticketDate, setTicketDate] = useState('');
    const [ticketUserName, setTicketUserName] = useState('');

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

        fetch(`${process.env.REACT_APP_BASE_URL}fetch_all_ticket`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setLoader(false)
                if (result.status === "200") {

                    setTickets(result.data)
                }
                else {
                    console.log("error in fetch_all_users")
                }
            })
            .catch(error => console.log('error', error));
    }

    const loadingSection = () => {
        if (tickets.length < 1) {
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

    const filteredData = ticketsId && !ticketUserName && !ticketDate ?
        tickets.filter((objects) => objects.id === (ticketsId)) :
        ticketUserName && !ticketsId && !ticketDate ?
            tickets.filter((objects) => objects.title === ticketUserName) :
            ticketDate && !ticketsId && !ticketUserName ?
                tickets.filter((objects) => objects.Idate === ticketDate) :
                ticketsId && ticketUserName && !ticketDate ?
                    tickets.filter((objects) => objects.id === (ticketsId) && objects.title == ticketUserName) :
                    ticketUserName && ticketDate && !ticketsId ?
                        tickets.filter((objects) => objects.title === ticketUserName && objects.Idate == ticketDate) :
                        ticketsId && ticketUserName && ticketDate ?
                            tickets.filter((objects) => objects.id === (ticketsId) && objects.title === ticketUserName && objects.Idate === ticketDate) :
                            tickets



    function Content({ items, index }) {
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{items.user_id}</td>
                <td>{items.username}</td>
                <td>{items.title}</td>
                <td>{items.body}</td>
                <td>{items.status}</td>
                <td>{items.Idate}</td>
                <td><button className='btn btn-outline-danger' onClick={() => openEditModal(items)}><i className='fa-solid fa-pen' /></button></td>

            </tr>
        )
    }

    function oncloseModal() {
        setShouldShow((prev) => !prev)
    }

    function openEditModal(id) {
        setUserId(id)
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
                                            Tickets
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
                                                <h5>Tickets Sheet </h5>
                                                <button className="btn btn-outline-info btn-sm" onClick={() => { window.location.reload() }}>Reset Filters</button>
                                                {/* <button className="btn btn-outline-info btn-sm float-end" onClick={oncloseModal}>Add Category &nbsp;<i className='fa-solid fa-plus' /></button> */}
                                                <div className="row p-2">

                                                    <div className="col-sm-3 col-lg-4">
                                                        <label htmlFor="" className="form-label "> Search with User ID:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search with User ID..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setTicketsId(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-sm-3 col-lg-4">
                                                        <label htmlFor="" className="form-label "> Search with Username:</label>
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" placeholder="Search by Username..."
                                                                style={{
                                                                    borderRadius: '10px',
                                                                    background: colorScheme.card_bg_color,
                                                                    color: colorScheme.card_txt_color,
                                                                }}
                                                                onChange={(e) => setTicketUserName(e.target.value)}
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
                                                                onChange={(e) => setTicketDate(e.target.value)}
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
                                                                        <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="ticketsId">
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
                                                                        <th>User ID</th>
                                                                        <th>Username</th>
                                                                        <th>Title</th>
                                                                        <th>Body</th>
                                                                        <th>Status</th>
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


                    {/* {
                        tickets ?
                            < EditCategory
                                tickets={tickets}
                                openEditModal={openEditModal}
                                editModal={editModal}
                                userId={userId}
                            /> : null
                    } */}

                </div>
            </div>
        </div>
    )
}

export default GetAllTickets