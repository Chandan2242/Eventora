import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo */}
          <div>
            <h2 className="text-3xl font-bold text-white">
              Eventora
            </h2>

            <p className="mt-4 text-sm leading-7">
              Discover, book and enjoy amazing events near you.
              Eventora makes event booking simple, secure and
              enjoyable.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-500 transition"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FaLinkedinIn size={20} />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FaGithub size={20} />
              </a>

            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="hover:text-blue-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/events"
                  className="hover:text-blue-400"
                >
                  Events
                </Link>
              </li>

              <li>
                <Link
                  to="/my-bookings"
                  className="hover:text-blue-400"
                >
                  My Bookings
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="hover:text-blue-400"
                >
                  Profile
                </Link>
              </li>

            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Support
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-blue-400"
                >
                  Terms & Conditions
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Lucknow, Uttar Pradesh, India</span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <span>support@eventora.com</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-400" />
                <span>+91 98765 43210</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">

          © {new Date().getFullYear()} Eventora. All Rights Reserved.

        </div>

      </div>
    </footer>
  );
};

export default Footer;