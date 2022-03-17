import React from "react";

import "../components/history_card.scoped.css";

export default function history_card(props) {
  return (
    <>
      <div className="card-history">
        <div className="img">
          <img src={props.image} alt="vehicle" />
        </div>
        <p className="vehicle">
          <strong>{props.name} </strong> <br />
          {props.date}
        </p>
        <p className="rating">
          Rating : <strong>{props.rating}</strong>{" "}
        </p>
        <p className="price">
          <strong>Prepayment : {props.price} </strong>
        </p>
        <p className={props.isBack ? "status-success" : "status-not"}>
          {" "}
          <strong>{props.status}</strong>{" "}
        </p>
        <div className="aka">
          <div className="checkbox">
            <input class="form-check-input check" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
          </div>
        </div>
      </div>
    </>
  );
}
