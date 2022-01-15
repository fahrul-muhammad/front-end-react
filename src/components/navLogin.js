import React, { Component } from "react";
import "./navLogin.scoped.css";
import logo from "../img/logo-min.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../redux/actions/test";

// import profile from "../img/profilepic-min.png";

class navLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
    };
  }

  formChange = (e) => {
    const data = { ...this.state };
    data[e.target.name] = e.target.value;
    this.setState(data);
  };

  componentDidMount() {
    this.setState({ users: this.props.users });
    // this.userData();
  }

  usersOut = () => {
    this.props.logout();
  };

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light log-nav">
        <div className="container-fluid me-2">
          <a className="navbar-brand brand-logo" href="/#">
            <img src={logo} alt="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto nav-list">
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/vehicle_type">
                  vehicle type
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/history">
                  history
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  about
                </a>
              </li>
            </ul>
          </div>
          <a href="/chat">
            <div className="nav-email">
              <div className="unread-msg">1</div>
            </div>
          </a>
          <div className="profile-img">
            <div class="btn-group dropstart ">
              {/* <img src={"http://localhost:8000" + this.state.profilepic} alt="" /> */}
              <img src={"http://localhost:8000/" + this.state.users.profilepic} alt="" />
              <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" />
              <ul class="dropdown-menu ">
                <li>
                  <a class="dropdown-item" href="/profile">
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/">
                    Help
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/" onClick={this.usersOut}>
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.auth.userData,
  };
};

const mapDispacthToProps = (dispatch) => {
  return {
    logout: bindActionCreators(logout, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispacthToProps
)(navLogin);
