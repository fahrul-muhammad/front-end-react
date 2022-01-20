import React from "react";
import "./Card.scoped.css";

function Card(props) {
  return (
    <>
      <div class="img-container">
        <div class="img-gallery">
          <img src={props.image} alt="vehicle" />
          <figcaption>
            <h4>{props.name}</h4>
            <p>{props.city}</p>
          </figcaption>
        </div>
      </div>
    </>
  );
}

export default Card;
