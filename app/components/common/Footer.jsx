"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import { IoChevronUp } from "react-icons/io5";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    { href: "#", icon: FaInstagram },
    { href: "#", icon: FaLinkedinIn },
    { href: "#", icon: FaFacebookF },
    { href: "#", icon: FaXTwitter },
  ];

  return (
    <footer className="bg-white text-neutral-900 border-t">
      <div className="mx-auto max-w-screen-xl px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          {/* Copyright */}
          <p className="text-center lg:text-start">
            Copyright © {currentYear} All rights reserved{" "}
            <Link href="/" className="text-primary hover:underline">
              Academia
            </Link>
          </p>

          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.icon.name}
                className="hover:text-primary transition-colors duration-200"
              >
                <social.icon className="w-4 h-4" />
              </Link>
            ))}
            
            <button
              onClick={scrollToTop}
              title="Back to Top"
              type="button"
              className="bg-primary rounded-full text-white p-2 hover:bg-primary/90 transition-colors duration-200"
            >
              <IoChevronUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;