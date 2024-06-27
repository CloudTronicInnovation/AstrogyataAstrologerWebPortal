import React from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, InputGroup, Form, Button } from "reactstrap";
import LayoutOne from "../../../layouts/LayoutOne";
import "../../../assets/scss/astroteam.scss";
import axiosConfig from "../../../axiosConfig";
import swal from "sweetalert";


class OtpVerify extends React.Component {

  state = { otp: '' };
  constructor() {
    super();
    this.state = {
      customer_email: "",
      // visible : false,
      mobile: "",
      otp: "123456",
      msg: "",

      //   "status": true,


      input: {},
      errors: {},

    }
    //     this.handleChange = otp => this.setState({ otp });
    //     this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = (otp) => this.setState({ otp });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resenddd = () => {
    this.setState({ otp: '' })
    this.interval()
    this.sendOtp()
  }
  interval() {
    this.setState({ seconds: 26 });

    // let myInterval = setInterval(() => {
    //     if (this.state.seconds == 0) {
    //         clearInterval(myInterval);
    //     } else {
    //         this.setState({ seconds: this.state.seconds - 1 });
    //     }
    // }, 1000)
  }
  handleChange(evt) {
    // const value=evt.target.value;
    this.setState({ [evt.target.name]: evt.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();
    // this.otpIntegration()
    // handleverifyotp=()=>{
    //   const sendData = {
    //     customer_email:localStorage.getItem('customer_email'),
    //     status: this.state.status,
    //   };

    axiosConfig.post("/user/verifyotp", this.state)

      .then(res => {
        console.log(res);
        alert("anjali")
        swal("Success!", " OTP Verify Successful Done!", "success");
        this.props.history.push("/completeproastro");
      })
      .catch((error) => {
        console.log(error.response)
      });
  }



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
                  <h1>Verify OTP</h1>
                  <hr></hr>
                  <form onSubmit={this.handleSubmit}>
                    <Row>
                      <Col md="12">
                        <label>Enter Your OTP Here</label>
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          name="otp"
                          value={this.state.otp}
                          onChange={this.changeHandler}
                        />
                      </Col>
                      <Col md="12" className="mt-3">
                        <Button className="btn btn-success">Submit</Button>
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


export default OtpVerify;
