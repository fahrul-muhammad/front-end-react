import React from "react";
import "./popularVehc.scoped.css";

function popularVehc(props) {
  console.log(props);
  return (
    <div class="content">
      <h1>Popular In Town</h1>
      <div class="img-container">
        <div class="img-gallery-1">
          <figcaption>
            <h4>Merapi</h4>
            <p>Yogyakarta</p>
          </figcaption>
        </div>
        <div class="img-gallery-2">
          <figcaption>
            <h4>Teluk Bogam</h4>
            <p>Kalimantan</p>
          </figcaption>
        </div>
        <div class="img-gallery-3">
          <figcaption>
            <h4>Bromo</h4>
            <p>Malang</p>
          </figcaption>
        </div>
        <div class="img-gallery-4">
          <figcaption>
            <h4>Malioboro</h4>
            <p>Yogyakarta</p>
          </figcaption>
          <div class="next-btn">
            <i class="bi bi-chevron-right" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default popularVehc;
