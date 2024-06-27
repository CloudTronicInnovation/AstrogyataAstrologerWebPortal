import React from "react";
import { CardBody, FormGroup, Form, Input, Button, Label } from "reactstrap";
import { loginWithJWT } from "../../../../redux/actions/auth/loginActions";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import swal from "sweetalert";
import axiosConfig from "../../../../axiosConfig";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

class LoginJWT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      otpMsg: "",
      otp: "",
    };
  }

  handlechange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignUp = (e) => {
    window.location.replace("/#/pages/register");
  };

  handleLogin = (e) => {
    e.preventDefault();
    console.log("Sending OTP to mobile:", this.state.mobile); // Log the mobile number being used
    axiosConfig
      .post("/user/loginsendotp", {
        mobile: this.state.mobile,
      })
      .then((response) => {
        console.log("OTP API Response:", response.data); // Log the response

        if (response.data.msg) {
          this.setState({ otpMsg: response.data.msg });

          if (response.data.msg === "Waiting for Admin Approval") {
            swal("Waiting for Admin Approval");
          } else if (response.data.msg === "otp Send Successfully") {
            swal("OTP Sent Successfully");
          } else {
            swal("Unknown response message: " + response.data.msg);
          }
        } else {
          swal("Error: No message in response");
        }
      })
      .catch((error) => {
        console.error("OTP API Error:", error.response);
        swal(
          "Error!",
          "Invalid! Please enter valid Phone No. or Password",
          "error"
        );
      });
  };

  handleOtp = (e) => {
    e.preventDefault();
    console.log("Verifying OTP for mobile:", this.state.mobile); // Log the mobile number
    console.log("OTP entered:", this.state.otp); // Log the entered OTP
    axiosConfig
      .post("/user/loginVerify", {
        mobile: this.state.mobile,
        otp: this.state.otp,
      })
      .then((response) => {
        console.log("OTP Verify Response:", response.data); // Log the response

        if (response.data.msg === "otp verified") {
          swal("Login Successful");

          localStorage.setItem("astroId", response.data._id);
          localStorage.setItem("astroData", JSON.stringify(response.data));
          localStorage.setItem("ad-token", JSON.stringify(response.data.token));
          window.location.replace("/#/");
        } else {
          swal("Error: " + response.data.msg);
        }
      })
      .catch((error) => {
        console.error("OTP Verify Error:", error.response);
        swal("Error!", "Invalid! Please enter valid Phone No.", "error");
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.otpMsg === "otp Send Successfully" ? (
          <CardBody className="pt-1">
            <Form onSubmit={this.handleOtp}>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <Input
                  type="number"
                  name="otp"
                  required
                  placeholder="Enter OTP"
                  maxLength={6}
                  value={this.state.otp}
                  onChange={this.handlechange}
                />
                <Label>OTP*</Label>
              </FormGroup>
              <div className="d-flex justify-content-center">
                <Route
                  render={({ history }) => (
                    <Button.Ripple color="primary" type="submit">
                      Login
                    </Button.Ripple>
                  )}
                />
              </div>
            </Form>
          </CardBody>
        ) : (
          <CardBody className="pt-1">
            <Form onSubmit={this.handleLogin}>
              <FormGroup className="form-label-group position-relative has-icon-left">
                <div className="form-group mtb-10">
                  <Label>Mobile Number*</Label>
                  <PhoneInput
                    countryCodeEditable={false}
                    className="mob-int"
                    country={"in"}
                    value={this.state.mobile}
                    onChange={(mobile) => {
                      this.setState({ mobile: mobile });
                    }}
                  />
                  {this.state.mobileError !== "" ? (
                    <span style={{ color: "red" }}>
                      {this.state.mobileError}
                    </span>
                  ) : null}
                </div>
              </FormGroup>
              <div className="d-flex justify-content-center">
                <Route
                  render={({ history }) => (
                    <Button.Ripple color="primary" type="submit">
                      Get OTP
                    </Button.Ripple>
                  )}
                />
              </div>
            </Form>
            <div className="d-flex mt-2 justify-content-between">
              <div>New On Our Platform</div>
              <Route
                render={({ history }) => (
                  <div
                    className=""
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={this.handleSignUp}
                  >
                    Sign Up
                  </div>
                )}
              />
            </div>
          </CardBody>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};

export default connect(mapStateToProps, { loginWithJWT })(LoginJWT);
