import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 container mx-auto px-4">
          
          {/* SignUp/Login Section */}
          <div className="signUp-login">
            <h3 className="font-semibold mb-4">Account</h3>
            <ul>
              <li><Link to="/signup" className="hover:text-purple-500">Sign Up</Link></li>
              <li><Link to="/login" className="hover:text-purple-500">Login</Link></li>
            </ul>
          </div>

          {/* Pages Section */}
          <div>
            <h3 className="font-semibold mb-4">Pages</h3>
            <ul>
              <li><Link to="/" className="hover:text-purple-500">Home</Link></li>
              <li><Link to="/blog" className="hover:text-purple-500">Blog</Link></li>
              <li><Link to="/about" className="hover:text-purple-500">About</Link></li>
              <li><Link to="/contact" className="hover:text-purple-500">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul>
              <li><Link to="mailto:contact@blogapp.com" className="hover:text-purple-500">Email Us</Link></li>
              <li><Link to="tel:+123456789" className="hover:text-purple-500">Call Us</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <ul>
              <li><Link to="#" className="hover:text-purple-500">Facebook</Link></li>
              <li><Link to="#" className="hover:text-purple-500">Twitter</Link></li>
              <li><Link to="#" className="hover:text-purple-500">Instagram</Link></li>
            </ul>
          </div>
          
        </div>
      </footer>
    </div>
  );
}

export default Footer;
