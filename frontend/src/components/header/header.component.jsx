import {ReactComponent as LogoSVG} from "../../assets/logo.svg"
import {Link, useLocation} from "react-router-dom";

import SellerNavbar from "../navbar/seller-navbar/seller-navbar.component";
import CustomerNavbar from "../navbar/customer-navbar/customer-navbar.component";

const Header = () => {
    const location = useLocation();
    return (
        <header>
            <div style={{backgroundColor: "black"}}>
                <Link to={
                    localStorage.getItem("is_seller") === "true"
                        ? "/seller-main"
                        : localStorage.getItem("is_admin") === "true"
                            ? "/admin/dashboard"
                            : "/"
                }>
                    <LogoSVG height="60" width="350"/>
                </Link>
            </div>
            {location.pathname.match("seller") || location.pathname.match("add") ? (
                <SellerNavbar/>
            ) : (
                <CustomerNavbar/>
            )}
        </header>
    );
};

export default Header

