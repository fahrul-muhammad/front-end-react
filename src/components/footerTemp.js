import React, { Component } from "react";
import "./footerTemp.scoped.css";
import logo from "../img/logo-min.png";

export default class footerTemp extends Component {
  render() {
    return (
      <div className="main-container">
        <section className="footer-container">
          <div className="first-area">
            <img src={logo} alt="logo" className="footer-logo" />
            <p>
              Plan and book your perfect trip with <br /> expert advice, travel tips for vehicle <br /> information from us
            </p>
            <h6>©2020 Vehicle Rental Center. All rights reserved</h6>
          </div>
          <div className="second-area">
            <h5>Destination</h5>
            <ul>
              <li>Bali</li>
              <li>Yogyakarta</li>
              <li>Jakarta</li>
              <li>Kalimantan</li>
              <li>Malang</li>
            </ul>
          </div>
          <div className="third-area">
            <h5>Vehicle</h5>
            <ul>
              <li>Bike</li>
              <li>Cars</li>
              <li>Motorbike</li>
              <li>Return time</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className="fourth-area">
            <h5>Interest</h5>
            <ul>
              <li>Advanture Travel</li>
              <li>Art And Culture</li>
              <li>Wildlife And Nature</li>
              <li>Family Holydays</li>
              <li>Culinary Trip</li>
            </ul>
          </div>
          <hr className="footer-line" />
          <div className="footer-icon">
            <div className="icon-wrapper">
              <i class="fa fa-twitter" aria-hidden="true" />
              <i class="fa fa-facebook" aria-hidden="true" />
              <i class="fa fa-instagram" aria-hidden="true" />
              <i class="fa fa-linkedin" aria-hidden="true" />
              <i class="fa fa-youtube-play" aria-hidden="true" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
