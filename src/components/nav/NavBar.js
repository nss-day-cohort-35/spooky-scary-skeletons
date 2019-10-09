import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"


class NavBar extends Component {

    handleLogout = () => {
        this.props.clearUser();
        this.props.history.push('/');
    };

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills nav-fill">
                    {this.props.user ? (

                        <li className="nav-item">
                            <Link className="nav-link" to="/">Chatroom</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">News</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="events">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Tasks</Link>
                        </li>
                        <li>
                            <span className='nav-link' onClick={this.handleLogout}>Logout</span>
                        </li>
                    ) :
                        (
                            <li>
                                <Link className='nav-link' to='/login'>Login</Link>
                            </li>
                        )}
                </ul>
            </nav>
        )
    }
}

export default withRouter(NavBar)
