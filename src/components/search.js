import React from "react";
import "./search.scoped.css";

export default function search(props) {
  return (
    <div className="data-container">
      <div className="vehicle-img">
        <img src={`${process.env.REACT_APP_HOST}/${props.image}`} alt="" />
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
