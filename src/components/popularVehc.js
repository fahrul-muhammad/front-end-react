import "./popularVehc.scoped.css";
import axios from "axios";

import React, { Component } from "react";

export default class popularVehc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
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
  render() {
    return (
      <>
        {this.state.result.map((val) => {
          console.log(val);
          return (
            <div class="img-container">
              <div class="img-gallery">
                <a href={`/vehicle/detail/${val.vehicle_id}`}>
                  <img src={`${process.env.REACT_APP_HOST}/${val.photo}`} alt="vehicle" />
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
