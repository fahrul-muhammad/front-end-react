import React, { Component } from "react";
import "./index.scoped.css";
import axios from "axios";
import { connect } from "react-redux";

// component
import NavLogin from "../../components/navLogin";
import Navbar from "../../components/header";
// import Popular from "../../components/popularVehc";
import Card from "../../components/Card";
import Footer from "../../components/footerTemp";
import Search from "../../components/search";
import Loading from "../../animation/Loading";

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
      order: "ASC",
      sorting: "name",
      result: [],
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

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState({ search: data });
  };

  search = () => {
    const token = this.props.token;
    const URL = `${process.env.REACT_APP_HOST}/vehicle/search?keyword=${this.state.search}&page=${this.state.page}&limit=5&order=${this.state.order}&sorting=${this.state.sorting}`;

    // this.props.history.push(`/vehicle/search?keyword=${this.state.search}&page=${this.state.page}&limit=5&order=${this.state.order}&sorting=${this.state.sorting}`);
    axios({
      url: URL,
      method: "GET",
      headers: { token },
    })
      .then((res) => {
        const result = res.data.result.result.data;
        console.log("RESULT SEARCH", res.data.result.result.data);
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
    this.getPopular();
    // this.search();
    if (this.props.token) {
      this.setState({ isLogin: false });
    } else {
      this.setState({ isLogin: true });
    }
    console.log("HISTORY PROPS", this.props.history.location);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page || prevState.order !== this.state.order || prevState.sorting !== this.state.sorting) {
      // this.props.history.push(`${this.props.history.location.pathname}/search?keyword=${this.state.search}&page=${this.state.page}&limit=5&order=${this.state.order}&sorting=${this.state.sorting}`);
      this.search();
    }
  }

  render() {
    console.log(this.props.history);
    return (
      <>
        {this.state.car.length < 1 || this.state.bike.length < 1 || this.state.bike.length < 1 ? (
          <Loading />
        ) : (
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
              <div className="select">
                <select
                  class="form-select shadow-none"
                  aria-label="Default select example"
                  onChange={(e) => {
                    this.setState({ sorting: e.target.value });
                  }}
                >
                  <option selected>{this.state.sorting}</option>
                  <option value="name">Name (default)</option>
                  <option value="id">Neweset</option>
                  <option value="price">Price</option>
                </select>
                <select
                  class="form-select shadow-none"
                  aria-label="Default select example"
                  onChange={(e) => {
                    this.setState({ order: e.target.value });
                  }}
                >
                  <option selected>{this.state.order}</option>
                  <option value="ASC">ASCENDING</option>
                  <option value="DESC">DESCENDING</option>
                </select>
              </div>
              <div className="button-search">
                <button type="button" class="btn btn-warning" onClick={this.cancel}>
                  Cancel
                </button>
              </div>
            </div>
            {this.state.searchResult.length > 0 ? (
              <div className="wrapper">
                {this.state.searchResult.map((val) => {
                  return <Search image={val.Image} name={val.Vehicle_Name} location={val.location} type={val.Category} link={val.id} price={val.Price} />;
                })}
              </div>
            ) : null}
            {this.state.searchResult.length <= 0 ? null : (
              <div className="paginasi-container">
                <button type="button" class="btn btn-warning" onClick={this.prevPage}>
                  Previous
                </button>
                <h1>{this.state.page}</h1>
                <button disabled={this.state.searchResult.length <= 0 ? true : false} type="button" class="btn btn-warning" onClick={this.nextPage}>
                  Next
                </button>
              </div>
            )}

            <div className="popular-container">
              <h1>Popular in Town</h1>
              <div className="popular">
                {this.state.result.map((val) => {
                  return <Card isShow={true} id={val.vehicle_id} image={`${process.env.REACT_APP_HOST}/${val.photo}`} name={val.name} city={val.location} />;
                })}
              </div>
            </div>
            {this.state.car.length > 0 ? (
              <div class="car">
                <h1>Cars</h1>
                <h1
                  className="viewall"
                  onClick={() => {
                    this.props.history.push("/vehicle/car?page=1&limit=8&order=DESC&sorting=id");
                  }}
                >
                  View All
                </h1>
                <div class="cards-containers">
                  {this.state.car.map((val) => {
                    return <Card isShown={true} id={val.id} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
                  })}
                </div>
              </div>
            ) : null}

            {this.state.motor.length > 0 ? (
              <div class="motor">
                <h1>Motorbike</h1>
                <h1
                  className="viewall"
                  onClick={() => {
                    this.props.history.push("/vehicle/motorbike?page=1&limit=8&order=DESC&sorting=id");
                  }}
                >
                  View All
                </h1>
                <div class="cards-containers">
                  {this.state.motor.map((val) => {
                    return <Card isShown={true} id={val.id} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
                  })}
                </div>
              </div>
            ) : null}

            {this.state.bike.length > 0 ? (
              <div class="bike">
                <h1>Bike</h1>
                <h1
                  className="viewall"
                  onClick={() => {
                    this.props.history.push("/vehicle/bike?page=1&limit=8&order=DESC&sorting=id");
                  }}
                >
                  View All
                </h1>
                <div class="cards-containers">
                  {this.state.bike.map((val) => {
                    return <Card isShown={true} id={val.id} image={`${process.env.REACT_APP_HOST}/${val.photos}`} name={val.Vehicle_Name} city={val.lokasi} />;
                  })}
                </div>
              </div>
            ) : null}

            <div id="snackbar">Vehicle Not Found</div>
            <Footer />
          </main>
        )}
      </>
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
