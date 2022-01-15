import React, { Component } from "react";
import "./index.scoped.css";
import { Modal, Button } from "react-bootstrap";

// component
import Navbar from "../../components/navLogin";
import Footer from "../../components/footerTemp";

// image
import Lambo from "../../img/lamborgini-min.jpg";
import jeep from "../../img/white-JEEP-min.jpg";
import vespa from "../../img/vesmet-min.jpg";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  buttonHandler() {
    this.setState({ show: !this.state.show });
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="wrapper">
          <div className="search-container">
            <div class="row height d-flex justify-content-center align-items-center">
              <div class="col-md-6">
                <div class="form">
                  {" "}
                  <i class="fa fa-search" /> <input type="text" class="form-control form-input" placeholder="Search anything..." />{" "}
                </div>
              </div>
            </div>
            <div className="checkbox">
              <label htmlFor="" className="from-check-label">
                Select
              </label>
              <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle filter" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                Filter
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button class="dropdown-item" type="button">
                    Type
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button">
                    Date Added
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button">
                    Name
                  </button>
                </li>
                <li>
                  <button class="dropdown-item" type="button">
                    Favorite Product
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <aside className="card-container">
            <p> New Arrival</p>
            <div className="card">
              <img src={Lambo} alt="new Arrive" />
              <figcaption>
                <strong>Lamborgini</strong>
                <br />
                South Jakarta
              </figcaption>
            </div>
            <div className="card">
              <img src={jeep} alt="new Arrive" />
              <figcaption>
                <strong>White JEEP</strong>
                <br />
                Kalimantan
              </figcaption>
            </div>
          </aside>
          <div className="history-container">
            <h3>Today</h3>
            <div className="text-card">
              <div className="text">
                <p>Please finish your payment for vespa for Vespa Rental Jogja</p>
                <i class="bi bi-chevron-right" />
              </div>
              <div className="check-box">
                <div className="checkbox">
                  <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                </div>
              </div>
            </div>
            <div className="text-card">
              <div className="text">
                <p>Your payment has been confirmed!</p>
                <i class="bi bi-chevron-right" />
              </div>
              <div className="check-box">
                <div className="checkbox">
                  <input class="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                </div>
              </div>
            </div>
            <h5>A Week Ago</h5>
            <div className="card-history">
              <div className="img">
                <img src={vespa} alt="vehicle" />
              </div>
              <p className="vehicle">
                <strong>Vespa Matic </strong> <br />
                Jan 18 to 21 2021
              </p>
              <p className="price">
                <strong>Prepayment : Rp. 245.000 </strong>
              </p>
              <p className="status">
                {" "}
                <strong>Has been Returned</strong>{" "}
              </p>
              <div className="aka">
                <div className="checkbox">
                  <input class="form-check-input check" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                </div>
              </div>
            </div>
            <div className="card-history">
              <div className="img">
                <img src={vespa} alt="vehicle" />
              </div>
              <p className="vehicle">
                <strong>Vespa Matic </strong> <br />
                Jan 18 to 21 2021
              </p>
              <p className="price">
                <strong>Prepayment : Rp. 245.000 </strong>
              </p>
              <p className="status">
                {" "}
                <strong>Has been Returned</strong>{" "}
              </p>
              <div className="aka">
                <div className="checkbox">
                  <input class="form-check-input check" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                </div>
              </div>
            </div>
            <div className="modal-container">
              <Button
                className="btn btn-warning btn-modal"
                onClick={() => {
                  this.buttonHandler();
                }}
              >
                Delete selected item
              </Button>
              <Modal show={this.state.show} className="modal">
                <Modal.Body className="modal-body">
                  <h1>Are you sure do you want to delete selected item?</h1>
                  <div className="modal-btn">
                    <Button
                      className="btn btn-warning"
                      onClick={() => {
                        this.buttonHandler();
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      className="btn btn-secondary"
                      onClick={() => {
                        this.buttonHandler();
                      }}
                    >
                      No
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
