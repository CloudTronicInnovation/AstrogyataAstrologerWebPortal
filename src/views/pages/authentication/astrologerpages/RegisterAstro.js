import React from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, InputGroup, Form, Button } from "reactstrap";
import LayoutOne from "../../../layouts/LayoutOne";
import "../../../assets/scss/astroteam.scss";
import swal from "sweetalert";

import axiosConfig from "../../../axiosConfig";

class RegisterAstro extends React.Component {

  constructor() {
    super();
    this.state = {
      //  fullnames: 'React',
      fullname: "",
      email: "",
      mobile: "",
      otp: ""

    };

  }


  handlechange = (e) => {
    // e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  changeHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    // this.setState({ otp: false });
    axiosConfig
      .post("/user/signup", this.state)
      .then((response) => {
        console.log(response);
        localStorage.setItem("auth-token", response.data.token);
        this.setState({
          token: response.data.token,
        });
        swal("Success!", " OTP Send Your Register Mobile Number Successful Done!", "success");
        this.props.history.push("/otpverify");
      })
      .catch((error) => {
        console.log(error.response);
        swal("Error!", "Something went wrong", "error");
      });

  };

  render() {


    return (

      <LayoutOne headerTop="visible">
        <section>
          <Container>
            <Row>
              <Col lg="2">

              </Col>
              <Col lg="8">
                <div className="wal-amt">
                  <h1>Register Astrologer</h1>
                  <hr></hr>
                  <form onSubmit={this.submitHandler}>
                    <Row>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Name*</label>
                          <input
                            type="text"
                            name="fullname"
                            required
                            placeholder="Enter Your Fullname"
                            value={this.state.fullname}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Email address*</label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="Enter Your email"
                            value={this.state.email}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Mobile Number*</label>
                          <input
                            type="text"
                            name="mobile"
                            required
                            placeholder="Enter Your Number"
                            value={this.state.mobile}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="12" className="mt-3">
                        <Button className="btn btn-success">Get OTP</Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
              <Col lg="2">

              </Col>
            </Row>
          </Container>
        </section>
      </LayoutOne>
    );
  }
}


export default RegisterAstro;
