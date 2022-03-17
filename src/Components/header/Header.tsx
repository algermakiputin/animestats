import React from "react";
import './Header.css';
import { Link } from 'react-router-dom'

class Header extends React.Component {

    render() {
        return (
            <section className="navigation">
                <div className="nav-container">
                    <div className="brand">
                        <a href="#!">AnimaWeb.</a>
                    </div>
                    <nav>
                        <div className="nav-mobile"><a id="navbar-toggle" href="#!"><span></span></a></div>
                        <ul className="nav-list">
                            <li>
                                <Link to={'/'} >
                                    Home
                                </Link>
                            </li> 
                            <li>
                                <a href="#!">Top List</a>
                            </li> 
                            <li>
                                <a href="#!">Recommendations</a>
                            </li> 
                            <li className="search-container">
                                <form>
                                    <input className="form-search" placeholder="search" type="text" />
                                    <button type="submit"><img width={14} src={require('../../assets/search.png')} /></button>
                                </form>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>
        );
    }
}

export default Header;