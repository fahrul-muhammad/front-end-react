import React, { Component } from "react";
import "./index.scoped.css";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

// component
import Navbar from "../../components/navLogin";
import Footer from "../../components/footerTemp";
import Card from "../../components/history_card";
import Loading from "../../animation/Loading";

// image
import Lambo from "../../img/lamborgini-min.jpg";
import jeep from "../../img/white-JEEP-min.jpg";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
      show: false,
    };
  }
  buttonHandler() {
    this.setState({ show: !this.state.show });
  }

  userHistory = () => {
    const token = this.props.token;
    const URL = `${process.env.REACT_APP_HOST}/history/myhistory`;
    axios({
      url: URL,
      headers: { token },
    })
      .then((res) => {
        console.log(res);
        this.setState({ history: res.data.result });
        console.log("HISTORY STATE", this.state.history);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.userHistory();
  }

  render() {
    const formatRupiah = (money) => {
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(money);
    };
    return (
      <>
        {this.state.history.length < 0 ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <div className="wrapper">
              <div className="search-container">
                <div class="row height d-flex justify-content-center align-items-center">
                  <div class="col-md-6">
                    <div class="form">
                      {" "}
                      <input type="text" class="form-control form-input" placeholder="Search anything..." />{" "}
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
              <div className="text-container">
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
              </div>

              <div className="history-container">
                <h5>A Week Ago</h5>
                {this.state.history.map((val) => {
                  return (
                    <Card
                      image={`${process.env.REACT_APP_HOST}/${val.image}`}
                      name={val.vehicle}
                      isBack={val.status === "NOT RETURN " ? false : true}
                      date={val.date}
                      price={formatRupiah(val.prepayment)}
                      status={val.status}
                      rating={val.rating}
                      key={val.id}
                    />
                  );
                })}
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
            <Footer />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(index);
