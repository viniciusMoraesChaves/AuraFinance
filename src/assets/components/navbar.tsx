import { forwardRef } from "react"
import { useNavigate } from "react-router-dom";
import auraLogo from "../img/aurafinance_logo.png"

import "./navbar.css"


const Navbar = forwardRef(function Navbar(_props, ref) {
    const navigate = useNavigate();
    return (
        <header ref={ref} className="navbar">
            <img className="navbar__logo" src={auraLogo} alt="AuraFinance" />
            <h1 className="navbar__title">AuraFinance</h1>
            <button className="navbar__button" onClick={() => navigate("/login")}>Entrar</button>
        </header>
    )
})

export default Navbar