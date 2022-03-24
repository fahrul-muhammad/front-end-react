import React, { useState } from "react";
import "./search.scoped.css";
import Default from "../img/default-car.jpg";

export default function Search(props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onImageError = () => {
    setError(true);
  };
  console.log(loaded);

  let imgSrc = !error ? `${process.env.REACT_APP_HOST}/${props.image}` : Default;

  return (
    <div className="data-container">
      <div className="vehicle-img">
        <img
          src={imgSrc}
          onError={() => {
            onImageError();
          }}
          onLoad={() => {
            onImageLoaded();
          }}
          alt=""
        />
      </div>
      <p className="name">{props.name}</p>
      <p className="location">Location : {props.location}</p>
      <p className="type">Category : {props.type}</p>
      <a href={`/vehicle/detail/${props.link}`}>
        <div className="button">
          <button className="btn btn-warning">Detail</button>
        </div>
      </a>
      <p className="price">Rp.{props.price}/Day</p>
    </div>
  );
}
