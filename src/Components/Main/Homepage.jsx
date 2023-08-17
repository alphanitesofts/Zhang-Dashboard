import React from 'react'

const Homepage = () => {



    return (
        <div>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>150</h3>
                                        <p>New Orders</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                                        <p>Bounce Rate</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-stats-bars" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>44</h3>
                                        <p>User Registrations</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>65</h3>
                                        <p>Unique Visitors</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-pie-graph" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                        </div>

                        <div className='row'>
                            <div className="col-md-4">
                                {/* Widget: user widget style 1 */}
                                <div className="card card-widget widget-user">
                                    {/* Add the bg color to the header using any of the bg-* classes */}
                                    <div className="widget-user-header bg-info">
                                        <h3 className="widget-user-username">Admin</h3>
                                        <h5 className="widget-user-desc">Founder &amp; CEO</h5>
                                    </div>
                                    <div className="widget-user-image">
                                        <img className="img-circle elevation-2" src="../dist/img/user1-128x128.jpg" alt="User Avatar" />
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-sm-4 border-right">
                                                <div className="description-block">
                                                    <h5 className="description-header">3,200</h5>
                                                    <span className="description-text">SALES</span>
                                                </div>
                                                {/* /.description-block */}
                                            </div>
                                            {/* /.col */}
                                            <div className="col-sm-4 border-right">
                                                <div className="description-block">
                                                    <h5 className="description-header">13,000</h5>
                                                    <span className="description-text">CATEGORY</span>
                                                </div>
                                                {/* /.description-block */}
                                            </div>
                                            {/* /.col */}
                                            <div className="col-sm-4">
                                                <div className="description-block">
                                                    <h5 className="description-header">35</h5>
                                                    <span className="description-text">PRODUCTS</span>
                                                </div>
                                                {/* /.description-block */}
                                            </div>
                                            {/* /.col */}
                                        </div>
                                        {/* /.row */}
                                    </div>
                                </div>
                                {/* /.widget-user */}
                            </div>


                            <div className="col-lg-8">
                                <div className="card" >
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <i className="fa-solid fa-user fa-2x"></i>
                                            </div>
                                            <div className="col-sm-9 d-flex align-self-center">
                                                {/* <h5 class=" mb-0">{ mem.username}</h5> */}
                                                <h5 class=" mb-0">Admin Name</h5>

                                            </div>
                                        </div>

                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <i className="fa-solid fa-envelope fa-2x"></i>
                                            </div>
                                            <div className="col-sm-9 d-flex align-self-center">
                                                {/* <h5 class=" mb-0">{mem.email}</h5> */}
                                                <h5 class=" mb-0">admin@zhang.com</h5>

                                            </div>
                                        </div>

                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-3">
                                                <i className="fa-solid fa-phone fa-2x"></i>
                                            </div>
                                            <div className="col-sm-9 d-flex align-self-center">
                                                <h5 class=" mb-0">0091389 456 455 44</h5>
                                            </div>
                                        </div>

                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <i className="fa-solid fa-money-bill-wave fa-2x"></i>
                                            </div>
                                            <div className="col-sm-9 d-flex align-self-center">
                                                <h5 class=" mb-0">25000</h5>
                                            </div>
                                        </div>
                                        <hr />

                                        <div className="row">
                                            <div className="col-sm-3">
                                                <i className="fa-solid fa-pen fa-2x"></i>
                                            </div>
                                            <div className="col-sm-9 d-flex align-self-center">
                                                <h5 class=" mb-0">Your referral code #b4fd8S5</h5>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </section>
                {/* /.content */}
            </div>



        </div>
    )
}

export default Homepage