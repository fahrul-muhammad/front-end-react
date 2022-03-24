import React, { useState } from "react";
import "./Card.scoped.css";
import Default from "../img/default-car.jpg";

function Card(props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onImageError = () => {
    setError(true);
  };

  let imgSrc = !error ? props.image : Default;
  console.log(loaded);

  return (
    <div className="wrapper">
      <div class="img-container">
        <div class="img-gallery">
          <a href={`/vehicle/detail/${props.id}`}>
            <img
              src={imgSrc}
              onError={() => {
                onImageError();
              }}
              onLoad={() => {
                onImageLoaded();
              }}
              placeholder={Default}
              alt="vehicle"
            />
            <figcaption>
              <h4>{props.name}</h4>
              <p>{props.city}</p>
            </figcaption>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Card;
