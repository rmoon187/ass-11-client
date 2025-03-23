import { Link } from "react-router-dom";
import logo from "../assets/software.png"; // Replace with actual logo path
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-10  mx-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Logo and Name */}
                <div className="flex flex-col items-center md:items-start">
                    <div className="flex items-center space-x-2 mb-4">
                        <img src={logo} alt="RecomHub Logo" className="h-12" />
                        <span className="text-3xl font-bold">RecomHub</span>
                    </div>
                    <p className="text-sm text-gray-200 max-w-xs">
                        Your trusted platform for product recommendations. Discover, compare, and choose the best products tailored for you.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
                        <li><Link to="/queries" className="hover:text-gray-200">Queries</Link></li>
                        <li><Link to="/recommendations" className="hover:text-gray-200">Recommendations</Link></li>
                        <li><Link to="/contact" className="hover:text-gray-200">Contact Us</Link></li>
                    </ul>
                </div>

                {/* Social Media & Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4 mb-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 text-2xl">
                            <FaFacebook />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 text-2xl">
                            <FaLinkedin />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 text-2xl">
                            <FaInstagram />
                        </a>
                    </div>
                    <p className="text-sm text-gray-200">Email: support@recomhub.com</p>
                    <p className="text-sm text-gray-200">Phone: +1 234 567 890</p>
                </div>
            </div>

            <div className="mt-8 text-center border-t border-gray-300 pt-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} RecomHub. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
