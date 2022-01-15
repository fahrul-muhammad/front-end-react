import React from "react";
import "./Card.scoped.css";

function Card(props) {
  return (
    <div class="content">
      <h1>{props.content}</h1>
      <div class="img-container">
        <div class="img-gallery-1">
          <img src={props.firstImg} alt="vehicle" />
          <figcaption>
            <h4>{props.firstPlace}</h4>
            <p>{props.firstCity}</p>
          </figcaption>
        </div>
        <div class="img-gallery-2">
          <img src={props.secondImg} alt="vehicle" />
          <figcaption>
            <h4>{props.secondPlace}</h4>
            <p>{props.secondCity}</p>
          </figcaption>
        </div>
        <div class="img-gallery-3">
          <img src={props.thirdImg} alt="vehicle" />
          <figcaption>
            <h4>{props.thirdPlace}</h4>
            <p>{props.thirdCity}</p>
          </figcaption>
        </div>
        <div class="img-gallery-4">
          <img src={props.fourthImg} alt="vehicle" />
          <figcaption>
            <h4>{props.fourthPlace}</h4>
            <p>{props.fourthCity}</p>
          </figcaption>
          <div class="next-btn">
            <i class="bi bi-chevron-right" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
