import React, { Component } from "react";
import "./jumbotron.scoped.css";

export default class jumbotron extends Component {
  render() {
    return (
      <main>
        <section class="jumbotron-home jumbotron-fluid">
          <h1>Explore and Travel</h1>
          <h5>Vehicle Finder</h5>
          <h6>——</h6>
          <section class="dropdown-home">
            <form action="#" className="location" placeholder="Location">
              <select name="Location" id="Loc">
                <option value="Jakarta">Jakarta</option>
                <option value="Bali">Bali</option>
                <option value="Yogyakarta">Yogyakarta</option>
                <option value="Kalimantan">Kalimantan</option>
              </select>
            </form>
            <form action="#" className="type-vehicle" placeholder="type-vehicle">
              <select name="type-vehicle" id="typ">
                <option value="Bike">Bike</option>
                <option value="Car">Car</option>
                <option value="Motorbike">Motorbike</option>
              </select>
            </form>
            <form action="#" className="payment" placeholder="Payment">
              <select name="Payment" id="pay">
                <option value="Cash">Cash</option>
                <option value="Pre-Payment">Pre-Payment</option>
              </select>
            </form>
            <input type="date" value="2017-01-01" min="2005-01-01" className="date-picker" />
            <button type="button" class="btn btn-warning explore">
              Expolre
            </button>
          </section>
        </section>
      </main>
    );
  }
}

/* 
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='22' viewBox='0 0 20 22'%3E%3Cg fill='none' fill-rule='evenodd' stroke='%23688EBB' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' transform='translate(1 1)'%3E%3Crect width='18' height='18' y='2' rx='2'/%3E%3Cpath d='M13 0L13 4M5 0L5 4M0 8L18 8'/%3E%3C/g%3E%3C/svg%3E
*/
