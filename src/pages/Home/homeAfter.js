import React, { Component } from "react";
import HeaderLogin from "../../components/navLogin";
import Header from "../../components/header";
import Footer from "../../components/footerTemp";
import Galleryimg from "../../components/popularVehc";
import Testimoni from "../../components/testimoni";
import { connect } from "react-redux";
import "./home.scoped.css";

class homeAfter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      isOwner: false,
    };
  }

  componentDidMount() {
    this.isOwner();
    console.log(this.props.token);
    if (this.props.token) {
      this.setState({ isLogin: false });
    } else {
      this.setState({ isLogin: true });
    }
  }

  isOwner = () => {
    const { role_id } = this.props.auth;
    console.log(role_id);
    if (role_id === 2) {
      this.setState({ isOwner: true });
    } else {
      this.setState({ isOwner: false });
    }
  };

  render() {
    return (
      <main>
        {!this.state.isLogin ? <HeaderLogin /> : <Header />}
        <div className="jumbotron">
          <h2>
            Explore And <br /> Travel
          </h2>
          <h4>Vehicle Finder</h4>
          <hr />
          <div className="jumbotron-button">
            <div className="input-area">
              <input type="category" class="form-control home-input" id="exampleFormControlInput1" placeholder="Type the vehicle (ex. motorbike)" />
            </div>
            <div className="location-area">
              <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle location-dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  location
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="date-area">
              <div class="dropdown">
                <button class="btn btn-secondary  btn-md dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                  Date
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li>
                    <button class="dropdown-item" type="button">
                      Action
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                      Another action
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                      Something else here
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="button-area">
              <button type="button" class="btn btn-warning">
                Search
              </button>
            </div>
          </div>
        </div>
        <Galleryimg />
        <div className={this.state.isOwner ? "add-button" : "hide"}>
          <a href="/add_vehicle">
            <button className="btn btn-secondary">Add new item</button>
          </a>
        </div>
        <Testimoni />
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

export default connect(mapStateToProps)(homeAfter);
