import React from "react";
import './footer.css';
import { Mail, Linkedin, Github } from 'lucide-react'; // Capitalized and correct spelling

export const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <h4>CloudyBuddy &copy; 2025</h4>
                    <p>Made by Amisha Panwar</p>
                </div>
                <div className="socials"> {/* Corrected spelling */}
                    <a href="mailto:amishapanwar512@gmail.com" className="social-link">
                        <Mail size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/amisha-panwar-562680251"
                       className="social-link"
                       target="_blank"
                       rel="noopener noreferrer">
                        <Linkedin size={24} />
                    </a>
                    <a href="https://github.com/amishapanwar512"  // Corrected to a valid GitHub URL
                       className="social-link"
                       target="_blank"
                       rel="noopener noreferrer">
                        <Github size={21} />
                    </a>
                </div>
            </footer>
        </>
    );
}
