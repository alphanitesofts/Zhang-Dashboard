import React,{useState, useEffect} from 'react'
import colorScheme from '../sourceFiles/Styles'

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [userDate, setUserDate] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUsername] = useState('');
  const [referalCode, setReferalCode] = useState('');


  const fetchUsers = () => {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    
    fetch(`${process.env.REACT_APP_BASE_URL}fetch_all_users?page=1`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        if(result.status === "200"){
          setUsers(result.Users)
        }
      })
      .catch(error => console.log('error', error));
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
                      <h5>Users Sheet</h5>
                      <button className="btn btn-outline-info btn-sm" onClick={() => { window.location.reload() }}>Reset Filters</button>
                      <div className="row p-2">
                        <div className="col-sm-3">
                          <label htmlFor="" className="form-label "> Search with Date:</label>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search by Date..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setUserDate(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="" className="form-label "> Search with Phone:</label>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search by Phone..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setUserPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="" className="form-label "> Search with Username:</label>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search by Username..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="col-sm-3">
                          <label htmlFor="" className="form-label "> Search with Refer Code:</label>
                          <div className="form-group">
                            <input type="text" className="form-control" placeholder="Search with Refer Code..."
                              style={{
                                background: colorScheme.card_bg_color,
                                color: colorScheme.card_txt_color,
                              }}
                              onChange={(e) => setReferalCode(e.target.value)}
                            />
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="card-body table-responsive p-2">

                      <table className="table  text-nowrap">
                        <thead className="text-center">
                          <tr>
                            <th>#</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Title</th>
                            <th>Address</th>
                            <th>Client Type</th>
                            <th>D-O-B</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">


                        </tbody>
                      </table>


                      {/* 
                                <div className="text-center">
                                    <h2>No Record Found</h2>
                                </div> */}



                    </div>
                  </div>



                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

export default AllUsers