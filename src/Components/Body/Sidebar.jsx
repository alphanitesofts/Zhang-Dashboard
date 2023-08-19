import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {

    useEffect(() => {
        const trees = window.$('[data-widget="treeview"]');
        trees.Treeview("init");
        // SetLocalLogin();
    }, []);


    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="index3.html" className="brand-link">
                    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">Zhang 张</span>
                </a>
                <div className='scroll-view-two scrollbar-secondary-two'>
                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                            </div>
                            <div className="info">
                                <a href="#" className="d-block">Admin</a>
                            </div>
                        </div>

                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                <li className="nav-item menu treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-user mr-2" />
                                        <p>
                                            Users
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/AllUsers" className="nav-link ">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Users Sheet</p>
                                            </Link>
                                        </li>

                                    </ul>
                                </li>

                                <li className="nav-item menu treeview">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fa-solid fa-cart-shopping mr-2" />
                                        <p>
                                            Categories
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/AllCategories" className="nav-link ">
                                                <i className="far fa-circle nav-icon" />
                                                <p>All Category</p>
                                            </Link>
                                        </li>

                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </aside>

        </div>
    )
}

export default Sidebar