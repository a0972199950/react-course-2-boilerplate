import React from "react";
// BrowserRouter用來裝入所有的routes，而Route則用來實際宣告route`
// Switch則是用來創建404 page
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <NavLink className="header__title" to="/dashboard">
                    <h1>Boilerplate</h1>
                </NavLink>
                <button className="button button--link" onClick={startLogout}>Logout</button>
            </div>
        </div>        
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
