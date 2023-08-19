import React, { useState, useEffect } from 'react'
import colorScheme from '../sourceFiles/Styles'
import AddUser from '../Users/AddUser'
import { toast } from 'react-toastify';

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState("")

  // filters
  const [userId, setUserId] = useState('')
  const [userDate, setUserDate] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUsername] = useState('');

  const [loader, setLoader] = useState(false)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    fetchUsers();
  }, [])


  const fetchUsers = () => {
    setLoader(true)
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_BASE_URL}fetch_all_users?page=1`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setLoader(false)
        if (result.status === "200") {
          setUsers(result.Users)
          setTotalUsers(result.total_users)
        }
        else {
          console.log("error in fetch_all_users")
        }
      })
      .catch(error => console.log('error', error));
  }

  const loadingSection = () => {
    if (users.length < 1) {
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
    userId && !userPhone && !userName && !userDate
      ? users.filter((objects) => objects.id === userId)
      : userPhone && !userId && !userName && !userDate
        ? users.filter((objects) => objects.phone_number === userPhone)
        : userName && !userId && !userPhone && !userDate
          ? users.filter((objects) => objects.username === userName)
          : userDate && !userId && !userName && !userPhone
            ? users.filter((objects) => objects.Idate === userDate)
            : userId && userPhone && !userName && !userDate
              ? users.filter((objects) => objects.id === userId && objects.phone_number == userPhone)
              : userId && !userPhone && userName && !userDate
                ? users.filter((objects) => objects.id === userId && objects.username == userPhone)
                : userId && !userPhone && !userName && userDate
                  ? users.filter((objects) => objects.id === userId && objects.Idate == userPhone)
                  //  sequence 2
                  : !userId && userPhone && userName && !userDate
                    ? users.filter((objects) => objects.phone_number === userPhone && objects.username == userName)
                    : !userId && userPhone && !userName && userDate
                      ? users.filter((objects) => objects.phone_number === userPhone && objects.Idate == userDate)
                      //  sequence 3
                      : !userId && !userPhone && userName && userDate
                        ? users.filter((objects) => objects.username === userName && objects.Idate == userDate)
                        //  sequence 4
                        : userId && !userPhone && !userName && userDate
                          ? users.filter((objects) => objects.id === userId && objects.Idate == userDate)
                          : !userId && !userPhone && userName && userDate
                            ? users.filter((objects) => objects.username === userPhone && objects.Idate == userDate)
                            //  sequence 5
                            : userId && userPhone && userName && !userDate
                              ? users.filter((objects) => objects.id === userId && objects.phone_number == userPhone && objects.username == userName)
                              : userId && userPhone && !userName && userDate
                                ? users.filter((objects) => objects.id === userId && objects.phone_number == userPhone && objects.Idate == userDate)
                                : userId && !userPhone && userName && userDate
                                  ? users.filter((objects) => objects.id === userId && objects.username == userName && objects.Idate == userDate)
                                  : users


  function Content({ items, index }) {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{items.id}</td>
        <td>{items.username}</td>
        <td>{items.phone_number}</td>
        <td>{items.Idate}</td>
        <td><button className='btn btn-outline-danger' onClick={()=> deleteUser(items.id)}><i className='fa-solid fa-xmark' /></button></td>
      </tr>
    )
  }

  function oncloseModal() {
    setShouldShow((prev) => !prev)
  }

  const deleteUser = (id) => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };

    fetch(`${process.env.REACT_APP_BASE_URL}deleteuserwithid/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if (result.status === "200") {
          toast.success(result.message)
          setInterval(() => {
            window.location.reload()
          }, 1500);
        }
        else if (result.status === "401") {
          console.log("error ")
        }
      })
      .catch(error => {
        console.log('error', error)
      });
  }
  return (
    <div>
      <div className="scroll-view-two scrollbar-secondary-two">
        <div className="content-wrapper p-3">
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>
                    Users Sheet
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
                      <h5>Total Users {totalUsers}</h5>
                      <button className="btn btn-outline-info btn-sm" onClick={() => { window.location.reload() }}>Reset Filters</button>
                      <button className="btn btn-outline-info btn-sm float-end" onClick={oncloseModal}>Add User</button>
                      <div className="row p-2">

                        <div className="col-sm-3">
                          <label htmlFor="" className="form-label "> Search with User ID:</label>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search with User ID..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setUserId(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="" className="form-label "> Search with Username:</label>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search by Username..."
                              style={{
                                borderRadius: '10px',
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setUsername(e.target.value)}
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
                              onChange={(e) => setUserPhone(e.target.value)}
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
                              onChange={(e) => setUserDate(e.target.value)}
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
                                  <div className="spinner-border" style={{ height: "5rem", width: "5rem" }} role="userId">
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
                                  <th>Username</th>
                                  <th>Phone</th>
                                  <th>Date</th>
                                  <th>Actions</th>

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
          users ?
            < AddUser
              users={users}
              closeModal={oncloseModal}
              shouldShow={shouldShow}
            /> : null
        }

      </div>
    </div>
  )
}

export default AllUsers