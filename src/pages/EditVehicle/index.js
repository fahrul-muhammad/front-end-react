import React, { Component } from "react";
import "./index.scoped.css";
import axios from "axios";
import { connect } from "react-redux";

// component
import Header from "../../components/navLogin";
import Footer from "../../components/footerTemp";

import { Modal, Button } from "react-bootstrap";

class index extends Component {
  constructor() {
    super();
    this.state = {
      value: 1,
      vehicle: [],
      show: false,
      name: "",
      price: 0,
      category: "",
      image: "",
      location: "",
      stock: 1,
      description: "",
      image_src: null,
      use_src: false,
    };
    this.inputFile = React.createRef();
  }

  handleFile = (event) => {
    this.inputFile.current.click();
    event.preventDefault();
  };

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
  };

  fileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const data = { ...this.state };
    if (file) {
      data.image = file;
      this.setState(data);
      const reader = new FileReader();
      reader.onload = () => {
        this.setState({ image_src: reader.result, use_src: true }, () => {
          console.log(this.state);
        });
      };

      reader.readAsDataURL(file);
    }
  };

  _setData = () => {
    const forms = new FormData();
    if (this.state.name !== "") {
      forms.append("name", this.state.name);
    }
    if (this.state.price !== 0) {
      forms.append("price", this.state.price);
    }
    if (this.state.category !== "") {
      forms.append("category", this.state.category);
    }
    if (this.state.image !== "") {
      forms.append("image", this.state.image);
    }
    if (this.state.location !== "") {
      forms.append("location", this.state.location);
    }
    if (this.state.stock !== 1) {
      forms.append("stock", this.state.stock);
    }
    if (this.state.description !== "") {
      forms.append("description", this.state.description);
    }
    return forms;
  };

  editVehicle = () => {
    const forms = this._setData();
    const URL = process.env.REACT_APP_HOST + "/vehicle/update/" + this.state.vehicle.id;
    const token = this.props.token;
    axios({
      url: URL,
      method: "PATCH",
      data: forms,
      headers: { token, "content-type": "multipart/form-data" },
    })
      .then((res) => {
        this.setState({ use_src: !this.state.use_src });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getVehicle = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/detail/${this.props.match.params.id}`;
    console.log(URL);
    axios({
      url: URL,
    })
      .then((res) => {
        const vehicle = res.data.result.result[0];
        this.setState({ vehicle: vehicle });
        console.log("THIS IS VEHICLE STATE", vehicle);
      })
      .then((err) => {
        console.log(err);
      });
  };

  deletVehicle = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/${this.state.vehicle.id}`;
    const token = this.props.token;
    axios({
      url: URL,
      method: "DELETE",
      headers: { token },
    })
      .then((res) => {
        this.props.history.push("/vehicle");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ModalTriger = () => {
    this.setState({ show: !this.state.show });
  };

  componentDidMount() {
    this.getVehicle();
  }

  onClickPlus = () => {
    const number = this.state.stock;
    this.setState({ stock: number + 1 });
  };

  onClickMinus = () => {
    const number = this.state.stock;
    if (number > 1) {
      this.setState({ stock: number - 1 });
    } else {
      return;
    }
  };
  render() {
    const { image } = this.state.vehicle;
    return (
      <>
        <Header />
        <input type="file" name="image" hidden ref={this.inputFile} onChange={this.fileChange} />
        <a href={`/vehicle/detail/${this.state.vehicle.id}`} className="back-button">
          <i class="bi bi-arrow-left-circle" />
          <h3>Edit Item</h3>
        </a>
        <div className="main-container">
          <div className="left-container">
            <div className="img-container">
              <div className="first">
                <img src={!this.state.use_src ? `${process.env.REACT_APP_HOST}/${image}` : this.state.image_src} alt="" onClick={this.handleFile} />
              </div>
              <div className="left-img">
                <img src={!this.state.use_src ? `${process.env.REACT_APP_HOST}/${image}` : this.state.image_src} alt="" onClick={this.handleFile} />
              </div>
              <div className="right-img">
                <img src={!this.state.use_src ? `${process.env.REACT_APP_HOST}/${image}` : this.state.image_src} alt="" onClick={this.handleFile} />
              </div>
            </div>
          </div>
          <div className="right-container">
            <input class="form-control" type="text" placeholder={this.state.vehicle.name} name="name" aria-label="default input example" onChange={this.formChange} />
            <input class="form-control" type="text" placeholder={this.state.vehicle.location} aria-label="default input example" name="location" onChange={this.formChange} />
            <input class="form-control" type="text" placeholder={this.state.vehicle.description} aria-label="default input example" name="description" onChange={this.formChange} />
            <div className="input-price">
              <p>Price : </p>
              <input class="form-control" type="text" placeholder={`Rp. ${this.state.vehicle.price}/day`} aria-label="default input example" name="price" onChange={this.formChange} />
            </div>
            <div className="status">
              <p>Status :</p>
              <div className="dropdown-sort">
                <select class="form-select" aria-label="Default select example">
                  <option value="">Select Status</option>
                  <option value="1">Available</option>
                  <option value="2">Full Boocked</option>
                </select>{" "}
              </div>
            </div>
            <div className="stock">
              <p>Stock : </p>
              <div className="counter">
                <button type="button" class="btn btn-light" onClick={this.onClickMinus}>
                  -
                </button>
                <p>{this.state.stock}</p>
                <button type="button" class="btn btn-warning" onClick={this.onClickPlus}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <div className="left-button">
            <div className="dropdown-sort">
              <select class="form-select" aria-label="Default select example" name="category" onChange={this.formChange}>
                <option selected>Add Item To</option>
                <option value="1">Car</option>
                <option value="2">Motorbike</option>
                <option value="2">Bike</option>
              </select>{" "}
            </div>
            <i class="bi bi-caret-down-fill" />
          </div>
          <div className="btn-mid">
            <button type="button" class="btn btn-warning" onClick={this.editVehicle}>
              Save item
            </button>
          </div>
          <div className="right-button">
            <button type="button" class="btn btn-secondary" onClick={this.ModalTriger}>
              Delet
            </button>
          </div>
        </div>
        <div className="modal-container">
          <Modal show={this.state.show} className="modal">
            <Modal.Body className="modal-body">
              <p>Are you sure to delet this vehicle ?</p>
              <div className="modal-btn">
                <Button
                  className="btn btn-warning"
                  onClick={() => {
                    this.deletVehicle();
                  }}
                >
                  Yes
                </Button>
                <Button
                  className="btn btn-secondary"
                  onClick={() => {
                    this.ModalTriger();
                  }}
                >
                  No
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>

        <Footer />
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
