import "./popularVehc.scoped.css";
import axios from "axios";
import Default from "../img/default-car.jpg";

import React, { Component } from "react";

export default class popularVehc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
      error: false,
      loaded: false,
    };
  }

  getPopular = () => {
    const URL = `${process.env.REACT_APP_HOST}/history/popular`;
    axios({
      url: URL,
      method: "GET",
    })
      .then((res) => {
        const { result } = res.data;
        console.log(result);
        this.setState({ result: result });
        console.log("STATE RESULT", this.state.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getPopular();
  }

  onImageLoaded = () => {
    this.setState({ loaded: true });
  };

  onImageError = () => {
    this.setState({ error: true });
  };

  render() {
    // let imgSrc = !this.state.error ?
    return (
      <>
        {this.state.result.map((val) => {
          console.log(val);
          return (
            <div class="img-container">
              <div class="img-gallery">
                <a href={`/vehicle/detail/${val.vehicle_id}`}>
                  <img
                    onError={() => {
                      this.onImageError();
                    }}
                    onLoad={() => {
                      this.onImageLoaded();
                    }}
                    src={`${process.env.REACT_APP_HOST}/${val.photo}`}
                    alt="vehicle"
                  />
                  <figcaption>
                    <h4>{val.name}</h4>
                    <p>{val.location}</p>
                  </figcaption>
                </a>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
