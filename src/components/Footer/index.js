import React from "react";

import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoLinkedin } from "react-icons/io";

import qrLogo from "../../images/qr/qrcode_chrome.png";

import "./style.css";
import { Input } from "@material-ui/core";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Chăm sóc khách hàng</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <Link key="1" to="/" className="footer-item__link">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li className="footer-item">
                <Link key="2" to="/" className="footer-item__link">
                  Cell Electronic Mall
                </Link>
              </li>
              <li className="footer-item">
                <Link key="3" to="/" className="footer-item__link">
                  Hướng dẫn mua hàng
                </Link>
              </li>
            </ul>
          </div>
          {/* <div className="grid__column-2-4">
            <h3 className="footer__heading">Giới thiệu</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <Link key="4" to="/" className="footer-item__link">
                  Giới thiệu
                </Link>
              </li>
              <li className="footer-item">
                <Link key="5" to="/" className="footer-item__link">
                  Tuyển dụng
                </Link>
              </li>
              <li className="footer-item">
                <Link key="6" to="/" className="footer-item__link">
                  Điều khoản
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="grid__column-2-8">
            <h3 className="footer__heading">Liên hệ</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <label className="contact-info">Tên: </label>
                <Input key="7" to="/" className="footer-item__link"></Input>
              </li>
              <li className="footer-item">
                <label className="contact-info">Email: </label>
                <Input key="8" to="/" className="footer-item__link"></Input>
              </li>
              <li className="footer-item">
                <label className="contact-info">Phản hồi: </label>
                <Input key="9" to="/" className="footer-item__link"></Input>
              </li>
            </ul>
            <ul className="footer-list">
              <button className="footer-contact-submit">Gửi</button>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Theo dõi</h3>
            <ul className="footer-list">
              <li className="footer-item">
                <a
                  key="10"
                  href="https://www.facebook.com/neukhongthulamsaobietduoc"
                  className="footer-item__link"
                  target="_blank"
                  // rel="noopener noreferrer"
                >
                  <FaFacebook className="footer-item__icon" /> Facebook
                </a>
              </li>
              <li className="footer-item">
                <a
                  key="11"
                  href="https://www.instagram.com/Heoo0603/"
                  className="footer-item__link"
                  target="_blank"
                >
                  <AiFillInstagram className="footer-item__icon" /> Instagram
                </a>
              </li>
              <li className="footer-item">
                <Link key="12" to="/" className="footer-item__link">
                  <IoLogoLinkedin className="footer-item__icon" /> Linkedin
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
            <div className="footer__download">
              <img src={qrLogo} alt="" className="footer_download-qr" />
              <div className="footer__download-apps">
                <Link key="13" to="/" className="footer__download-app-link">
                  <img
                    src="data:image/png;base64,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"
                    alt="Google Play"
                    className="footer__download-apps-img"
                  />
                </Link>
                <Link key="14" to="/" className="footer__download-app-link">
                  <img
                    src="data:image/png;base64,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"
                    alt="App Store"
                    className="footer__download-apps-img"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="grid">
          <p className="footer__text">
            2021 - Bản quyền thuộc về Công ty MyApp
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
