import React, { Component } from "react";
import "./index.scoped.css";
import axios from "axios";
import { connect } from "react-redux";

// component
import NavLogin from "../../components/navLogin";
import Navbar from "../../components/header";
import Popular from "../../components/popularVehc";
import Card from "../../components/Card";
import Footer from "../../components/footerTemp";
import Search from "../../components/search";

class index extends Component {
  constructor(props, keyword) {
    super(props);
    this.state = {
      isLogin: true,
      car: [],
      motor: [],
      bike: [],
      page: 1,
      search: "",
      searchResult: [],
      isShow: false,
    };
  }

  getCar = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/car?page=${this.state.page}&limit=4`;
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        console.log("THIS IS CAR RESULT", result.result.meta);
        this.setState({ car: result.result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getMotor = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/motorbike?page=${this.state.page}&limit=4`;
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        this.setState({ motor: result.result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getBike = () => {
    const URL = `${process.env.REACT_APP_HOST}/vehicle/bike?page=${this.state.page}&limit=4`;
    axios
      .get(URL)
      .then((res) => {
        const { result } = res.data;
        this.setState({ bike: result.result.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState({ search: data });
  };

  search = () => {
    const token = this.props.token;
    const URL = `${process.env.REACT_APP_HOST}/vehicle/search?name=${this.state.search}`;
    axios({
      url: URL,
      method: "GET",
      headers: { token },
    })
      .then((res) => {
        const result = res.data.result;
        console.log(res.data);
        this.setState({ searchResult: result, isShow: true });
      })
      .catch((err) => {
        this.setState({ isShow: false });
      });
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  cancel = () => {
    this.setState({ searchResult: [] });
  };

  nextPage = () => {
    const number = this.state.page;
    this.setState({ page: number + 1 }, () => {
      this.getCar();
      this.getMotor();
      this.getBike();
    });
  };

  prevPage = () => {
    const number = this.state.page;
    if (number >= 1) {
      this.setState({ page: number - 1 }, () => {
        this.getCar();
        this.getMotor();
        this.getBike();
      });
    } else {
      return;
    }
  };

  componentDidMount() {
    this.getCar();
    this.getMotor();
    this.getBike();
    // this.search();
    if (this.props.token) {
      this.setState({ isLogin: false });
    } else {
      this.setState({ isLogin: true });
    }
  }

  render() {
    console.log(this.state.searchResult);
    return (
      <main>
        {!this.state.isLogin ? <NavLogin /> : <Navbar />}
        <div className="search-container">
          <div class="row height d-flex justify-content-center align-items-center">
            <div class="col-md-11">
              <div class="form">
                <i class="fa fa-search" />
                <input
                  type="text"
                  class="form-control form-input"
                  placeholder="Search anything..."
                  name="search"
                  onChange={(e) => {
                    this.setState({ search: e.target.value });
                  }}
                  onKeyDown={this._handleKeyDown}
                />
                <span class="left-pan">
                  <i class="fa fa-microphone" />
                </span>{" "}
              </div>
            </div>
          </div>
          <div className="button-search">
            <button type="button" class="btn btn-warning" onClick={this.cancel}>
              Cancel
            </button>
          </div>
        </div>
        {this.state.searchResult.length > 0 ? (
          this.state.searchResult.map((val) => {
            return <Search image={val.Image} name={val.Vehicle_Name} location={val.location} type={val.Category} link={val.id} price={val.Price} />;
          })
        ) : (
          <h1 className="not-found">keyword not found, try another</h1>
        )}
        <div className="paginasi-container">
          <button type="button" class="btn btn-warning" onClick={this.prevPage}>
            Previous
          </button>
          <h1>{this.state.page}</h1>
          <button type="button" class="btn btn-warning" onClick={this.nextPage}>
            Next
          </button>
        </div>

        <div className="popular-container">
          <h1>Popular in Town</h1>
          <div className="popular">
            <Popular />
          </div>
        </div>
        <div class="car">
          <h1>Cars</h1>
          <div class="cards-containers">
            {this.state.car.map((val) => {
              return <Card isShown={true} id={val.id} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
            })}
          </div>
        </div>
        <div class="motor">
          <h1>Motorbike</h1>
          <div class="cards-containers">
            {this.state.motor.map((val) => {
              return <Card isShown={true} id={val.id} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
            })}
          </div>
        </div>
        <div class="bike">
          <h1>Bike</h1>
          <div class="cards-containers">
            {this.state.bike.map((val) => {
              return <Card isShown={true} id={val.id} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
            })}
          </div>
        </div>
        <div id="snackbar">Vehicle Not Found</div>
        <Footer />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.userData,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(index);
