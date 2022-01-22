import React, { Component } from "react";
import "./navLogin.scoped.css";
import logo from "../img/logo-min.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../redux/actions/test";
import defaultImg from "../img/dummy-profile.png";

// import profile from "../img/profilepic-min.png";

class navLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
    };
  }

  componentDidMount() {
    this.setState({ users: this.props.users });
  }

  LogoutModal = () => {
    let myModal = document.getElementById("myModal");
    let myInput = document.getElementById("myInput");

    myModal.addEventListener("shown.bs.modal", function() {
      myInput.focus();
    });
  };

  LogOut = () => {
    this.props.logout();
    window.location.reload();
  };

  render() {
    console.log(this.props);
    const profilepic = this.props.users.profilepic || defaultImg;
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
                <a className="nav-link " href="/vehicle">
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
            <div className="btn-group dropstart ">
              {/* <img src={"http://localhost:8000" + this.state.profilepic} alt="" /> */}
              <img src={process.env.REACT_APP_HOST + profilepic || defaultImg} alt="" />
              <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" />
              <ul className="dropdown-menu ">
                <li>
                  <a className="dropdown-item" href="/profile">
                    Edit Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Help
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" data-bs-toggle="modal" data-bs-target="#exampleModal" href="/" onClick={this.LogoutModal}>
                    Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">Are you sure to LogOut?</div>
                <div className="modal-footer">
                  <div className="modal-cancel">
                    <button type="button" className="btn btn-danger  " data-bs-dismiss="modal">
                      CANCEL
                    </button>
                  </div>
                  <div className="modal-confirm">
                    <button type="button" className="btn btn-success  " onClick={this.LogOut} data-bs-dismiss="modal">
                      YES
                    </button>
                  </div>
                </div>
              </div>
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
