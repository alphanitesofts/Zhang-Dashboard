import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to='/' className="nav-link">Home</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                            <i className="fas fa-expand-arrows-alt" />
                        </a>
                    </li>
                    <li className="nav-item dropdown" >
                        <a className="nav-link" data-toggle="dropdown" href="#" >
                            <i className="fa-solid fa-right-from-bracket " />
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <div className="dropdown-divider" />
                            <a href="/" className="dropdown-item"   >
                                <i className="fas fa-lock mr-2" />logout </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar