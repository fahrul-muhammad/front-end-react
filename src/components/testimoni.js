import React, { Component } from "react";
import "./testimoni.scoped.css";

export default class testimoni extends Component {
  render() {
    return (
      <main>
        <section class="testimoni">
          <h3>Testimoni</h3>
          <div class="star">
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
            <i class="bi bi-star-fill" />
          </div>
          <h6>”It was the right decision to rent vehicle here, I spent less money and enjoy the trip. It was an amazing experience to have a ride for wildlife trip!”</h6>
          <h2>Edward Newgate</h2>
          <h4>Founder Circle</h4>
          <div class="testimoni-img">
            <figcaption class="figure-caption">
              <i class="fa fa-smile-o" aria-hidden="true" />
              <i class="fa fa-plane" aria-hidden="true" />
            </figcaption>
          </div>
        </section>
      </main>
    );
  }
}
