import React, { useState } from "react";
import "./index.scoped.css";
import { forgotPassword, setNewPassowrd } from "../../utils/http/auth";
// footer
import Footer from "../../components/footerTemp";
import Loading from "../../animation/Loading/index";

function Index(props) {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSend, setSend] = useState(false);
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [change, setChange] = useState(false);
  const [show, setShow] = useState(false);
  const [check, setCheck] = useState(false);
  const [message, setMessage] = useState("");
  const [checkPass, setCheckPass] = useState(false);

  const sendEmail = async () => {
    try {
      setLoading(true);
      if (email === "") {
        setMessage("Email Empty");
        setShow(true);
        setLoading(false);
        setTimeout(() => {
          setShow(false);
        }, 2800);
        return;
      }
      const body = {
        email: email,
      };
      const result = await forgotPassword(body);
      console.log("RESULT", result.data.result.pesan);
      setLoading(false);
      if (result.data.result.pesan === "OTP are sending to your email, please check your email") {
        setCheck(true);
      }
      setTimeout(() => {
        setCheck(false);
        setSend(true);
        setChange(true);
      }, 2500);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const sendNewPassword = async () => {
    try {
      setCheckPass(false);
      if (password.length < 8) {
        setCheckPass(true);
        return;
      }
      const body = {
        pin: pin,
        password: password,
      };
      const result = await setNewPassowrd(body);
      console.log(result.data);
      setMessage("Reset password done, login with new Password");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2800);
      setTimeout(() => {
        props.history.push("/login");
      }, 2900);
    } catch (error) {
      console.log(error);
      setMessage("Some thing Error, Try Again");
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 2800);
    }
  };

  return (
    <main>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="jumbotron">
            <div className="back-button">
              <a href="/login">
                <i className="bi bi-arrow-left-circle-fill" />
              </a>
            </div>
            <h1>Don't Worry We Got Your Back</h1>
            <div className="form-container">
              {isSend ? (
                <>
                  <input className="form-control" onChange={(e) => setPin(e.target.value)} type="text" placeholder="Enter OTP" aria-label="default input example" />
                  <input className="form-control" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your New Password" aria-label="default input example" />
                  <p className="valid" hidden={!checkPass}>
                    Password must be at least 8 character
                  </p>
                </>
              ) : (
                <>
                  <input className="form-control" onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your email address" aria-label="default input example" />
                  <p hidden={!check} className="check">
                    Please Check Your Email
                  </p>
                </>
              )}
              {change ? (
                <button type="button" onClick={() => sendNewPassword()} className="btn btn-warning">
                  Reset Password
                </button>
              ) : (
                <button type="button" onClick={() => sendEmail()} className="btn btn-warning">
                  Send Email
                </button>
              )}
              {change ? null : (
                <p>
                  You will receive a link to reset your password. If you haven't received any link, <a href="/#">click Resend Link</a>{" "}
                </p>
              )}
            </div>
          </div>
          <div className="toast" hidden={!show}>
            <p className="toastText">{message}</p>
          </div>
          <Footer />
        </>
      )}
    </main>
  );
}

export default Index;
