import React, { Component } from "react";
import "./index.scoped.css";
import axios from "axios";
import FormData from "form-data";

// component
import Header from "../../components/navLogin";
import Footer from "../../components/footerTemp";

// redux
import { connect } from "react-redux";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      category: "",
      image: "",
      location: "",
      stock: 1,
      description: "",
      result: [],
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
    const file = event.target.files[0];
    const data = { ...this.state };
    if (file) {
      data.image = file;
      this.setState(data);
    }
    event.preventDefault();
  };

  _setData = () => {
    const forms = new FormData();
    forms.append("name", this.state.name);
    forms.append("price", this.state.price);
    forms.append("category", this.state.category);
    forms.append("image", this.state.image);
    forms.append("location", this.state.location);
    forms.append("stock", this.state.stock);
    forms.append("description", this.state.description);
    return forms;
  };

  postVehicle = (e) => {
    console.log(this.state);
    const forms = this._setData();
    const URL = process.env.REACT_APP_HOST + "/vehicle";
    axios({
      url: URL,
      method: "POST",
      data: forms,
      headers: { "content-type": "multipart/form-data" },
    })
      .then((res) => {
        this.setState({ result: res.data.result.id });
        this.props.history.push(`/vehicle/detail/${this.state.result}`);
      })
      .catch((err) => {
        this.errResponse();
      });
  };

  errResponse() {
    var x = document.getElementById("toast");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
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
    return (
      <>
        <Header />
        <a href="/vehicle" className="back-button">
          <i class="bi bi-arrow-left-circle" />
          <h3>Add New Item</h3>
        </a>
        <div className="main-container">
          <div className="left-container">
            <div className="img-container">
              <div className="first" />
              <div className="left-img" />
              <div className="right-img">
                <input type="file" name="image" hidden onChange={this.fileChange} ref={this.inputFile} />
                <button className="add" onClick={this.handleFile} />
              </div>
            </div>
          </div>
          <div className="right-container">
            <input class="form-control" type="text" name="name" placeholder="Name (Max up to 50 word)" onChange={this.formChange} aria-label="default input example" />

            <input class="form-control" type="text" placeholder="Location" name="location" onChange={this.formChange} aria-label="default input example" />

            <input class="form-control" type="text" placeholder="Description (max up to 150 words)" aria-label="default input example" name="description" onChange={this.formChange} />

            <div className="input-price">
              <p>Price :</p>
              <input class="form-control" type="text" placeholder="Description (max up to 150 words)" aria-label="default input example" name="price" onChange={this.formChange} />
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
              <select class="form-select" name="category" aria-label="Default select example" onChange={this.formChange}>
                <option selected>Add Item To</option>
                <option value="1">Car</option>
                <option value="2">Motorbike</option>
                <option value="3">Bike</option>
              </select>
            </div>
            <i class="bi bi-caret-down-fill" />
          </div>
          <div className="right-button">
            <button type="button" class="btn btn-warning" onClick={this.postVehicle}>
              Save item
            </button>
          </div>
        </div>
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-body">
            Hello, world! This is a toast message.
            <div class="mt-2 pt-2 border-top">
              <button type="button" class="btn btn-primary btn-sm">
                Take action
              </button>
              <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="toast">
                Close
              </button>
            </div>
          </div>
        </div>
        <div id="toast">Terjadi Kesalahan, Silahkan Coba lagi</div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(index);
