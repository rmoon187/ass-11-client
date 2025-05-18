import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Layout = () => {
    return (
        <div className="">
            <Navbar />
            <Banner></Banner>
            <div className="min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
