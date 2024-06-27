import React from "react";
import swal from "sweetalert";
import Swal from 'sweetalert2'
import Stepper from "bs-stepper";
import axiosConfig from "../../../../axiosConfig";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bs-stepper/dist/css/bs-stepper.min.css";
import { Route } from "react-router-dom";
import { Container, Row, Col, Input, Form, Button, Label } from "reactstrap";
import "../../../../assets/scss/pages/users.scss";
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      email: "",
      mobile: "",
    };
    this.state = {
      gender: "",
      dob: "",
      primary_skills: "",
      all_skills: "",
      language: "",
      exp_in_years: "",
      conrubute_hrs: "",
      hear_abt_astrology: "",
      other_online_platform: "",
      why_onboard_you: "",
      suitable_tym_interview: "",
      crnt_city: "",
      income_src: "",
      highest_qualification: "",
      degree_deploma: "",
      clg_scl_name: "",
      lrn_abt_astrology: "",
      insta_link: "",
      fb_link: "",
      linkedln_link: "",
      youtube_link: "",
      website_link: "",
      anybody_prefer: "",
      min_earning_expe: "",
      max_earning_expe: "",
      long_bio: "",
      status: "Active",
      callCharge: "",
      fullname: "",
      img: {},
      min_amount: "",
      max_amount: "",
      // availability: {},
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
      idType: "",
      idTypeLabel: "Government ID",
      aadharNumber: "",
      licenseNumber: "",
      inputDisabled: true, // Initially disable input fields
      selectedOption: "", ////dropdown,img
      dropdown: "",
      img1: "",
      Pancard: "",
      pancard: "",
      pancardError: "",
      dashboardName: "",
      password: "",
      cnfmPassword: "",
      approvedstatus: "false",
      otpverify: "true",
      selectedName: "",
      selectedFile: {},
    };
  }

  //Image Submit Handler
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ selectedName: event.target.files[0].name });
  };
  handleDropdownChange = (event) => {
    this.setState({ selectedOption: event.target.value });
  };

  componentDidMount() {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
  }

  handleskillsdetails() {
    // if(!this.state.gender && !this.state.dob && )
    this.stepper.next();
  }
  handleBackToLogin = (e) => {
    window.location.replace("/#/pages/login");
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    // Change label of the input field when a government ID type is selected
    if (name === "idType") {
      this.setState({
        idTypeLabel: value ? "Select" : "Government ID",
        inputDisabled: false, // Enable input fields when a government ID type is selected
      });
    }
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.cnfmPassword) {
      let astroId = localStorage.getItem("astroId");
      console.log("astroId", astroId);
      const data = new FormData();
      data.append("_id", astroId);
      data.append("gender", this.state.gender);
      data.append("dob", this.state.dob);
      // data.append("primary_skills", this.state.primary_skills);
      data.append("language", this.state.language);
      // data.append("all_skills", this.state.all_skills);
      data.append("exp_in_years", this.state.exp_in_years);
      data.append("conrubute_hrs", this.state.conrubute_hrs);
      // data.append("hear_abt_astrology", this.state.hear_abt_astrology);
      // data.append("other_online_platform", this.state.other_online_platform);
      // data.append("why_onboard_you", this.state.why_onboard_you);
      // data.append("suitable_tym_interview", this.state.suitable_tym_interview);
      // data.append("crnt_city", this.state.crnt_city);
      // data.append("income_src", this.state.income_src);
      data.append("highest_qualification", this.state.highest_qualification);
      // data.append("degree_deploma", this.state.degree_deploma);
      // data.append("clg_scl_name", this.state.clg_scl_name);
      // data.append("lrn_abt_astrology", this.state.lrn_abt_astrology);
      // data.append("insta_link", this.state.insta_link);
      // data.append("fb_link", this.state.fb_link);
      // data.append("linkedln_link", this.state.linkedln_link);
      // data.append("youtube_link", this.state.youtube_link);
      // data.append("website_link", this.state.website_link);
      // data.append("anybody_prefer", this.state.anybody_prefer);
      // data.append("min_earning_expe", this.state.min_earning_expe);
      // data.append("max_earning_expe", this.state.max_earning_expe);
      data.append("long_bio", this.state.long_bio);
      data.append("status", this.state.status);
      // data.append("callCharge", this.state.callCharge);
      data.append("fullname", this.state.fullname);
      // data.append("availability", this.state.availability);
      // data.append("max_amount", this.state.max_amount);
      // data.append("min_amount", this.state.min_amount);
      data.append("password", this.state.password);
      data.append("cnfmPassword", this.state.cnfmPassword);
      // data.append("sunday", this.state.Sunday);
      // data.append("monday", this.state.Monday);
      // data.append("tuesday", this.state.Tuesday);
      // data.append("wednesday", this.state.Wednesday);
      // data.append("thursday", this.state.Thursday);
      // data.append("friday", this.state.Friday);
      // data.append("saturday", this.state.Saturday);
      // data.append("email", this.state.email);
      // data.append("mobile", this.state.mobile);
      data.append("idType", this.state.idType);
      data.append("idTypeLabel", this.state.idTypeLabel);
      data.append("aadharNumber", this.state.aadharNumber);
      data.append("licenseNumber", this.state.licenseNumber);
      data.append("Pancard", this.state.Pancard);
      data.append("dashboardName", this.state.dashboardName); //dashboardName

      if (this.state.selectedFile !== null) {
        data.append("img", this.state.selectedFile);
      }

      axiosConfig
        .post(`/user/editAstroDetails/${this.state.userId}`, data)
        .then((response) => {
          console.log(response.data);
          // swal("Success!", "Admin team will contact you soon.!", "success");
          // this.props.history.push("/");
          // window.location.replace("/#/pages/login");
        })
        // .catch((error) => {
        //   swal("Error!", "You clicked the button!", "error");
        //   console.log(error.response);
        // });
    } else {
      swal("Error!", "Password Did Not Match", "error");
    }
  };

  stepperFirst = () => {
    const { email, mobile, fullname } = this.state;
    axiosConfig
      .post("/user/signup", {
        mobile: parseInt(mobile) !== isNaN ? parseInt(mobile) : "null",
        email: email,
        fullname: fullname,
        moblie: mobile,
      })
      .then((response) => {
        this.stepper.next();
        console.log("UserDetails", response.data);
        let userInfo = response.data.user;
        localStorage.setItem("astroId", response.data._id);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        swal("Error!", " Wrong details", "error");
      });
  };
  stepperSecond = () => {
    const { otp, mobile } = this.state;

    axiosConfig
      .post("/user/verifyotp", {
        otp: parseInt(otp, mobile) !== isNaN ? parseInt(otp) : "null",
        mobile: mobile,
      })
      .then((response) => {
        if (otp) {
          this.stepper.next();
          let userInfo = response.data.user;
          this.setState({ userId: response.data._id });
          localStorage.setItem("user_id", response.data._id);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          Swal.fire({
            icon: "success",
            title: "Admin team will contact you soon.!",
            timer: 2000
          });
          window.location.replace("/#/pages/login");
        } else {
          swal("Oops!", "Please Fill the OTP First", "error");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        swal("Error!", " Wrong UserName or Password", "error");
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    // Change label of the input field when a government ID type is selected
    if (name === "idType") {
      this.setState({
        idTypeLabel: value ? "Select" : "Government ID",
        inputDisabled: false, // Enable input fields when a government ID type is selected
      });
    }
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    // Validate PAN card number
    if (name === "pancard") {
      const isValidPAN = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/.test(value);
      this.setState({
        pancardError: isValidPAN ? "" : "Please enter a valid PAN card number",
      });
    }
  };

  render() {
    const {
      idType,
      idTypeLabel,
      aadharNumber,
      licenseNumber,
      pancard,
      pancardError,

      inputDisabled,
      selectedOption,
    } = this.state;
    return (
      <Container className="setpage">
        <section className="ptb-30 ">
          <div className="stp-1">
            <h4 className="th-2">Astrologer Register</h4>
            <div id="stepper1" className="bs-stepper">
              <div className="bs-stepper-header">
                <div className="step" data-target="#test-l-1">
                  <button className="step-trigger">
                    <span className="bs-stepper-circle">1</span>
                    <span className="bs-stepper-label">Personal Details</span>
                  </button>
                </div>
                <div className="line"></div>
                <div className="step" data-target="#test-otp">
                  <button className="step-trigger">
                    <span className="bs-stepper-circle">2</span>
                    <span className="bs-stepper-label">Verify OTP</span>
                  </button>
                </div>
                {/* <div className="line"></div>
                <div className="step" data-target="#test-l-2">
                  <button className="step-trigger">
                    <span className="bs-stepper-circle">3</span>
                    <span className="bs-stepper-label">Skill Details</span>
                  </button>
                </div>
                <div className="line"></div>
                <div className="step" data-target="#test-l-3">
                  <button className="step-trigger">
                    <span className="bs-stepper-circle">4</span>
                    <span className="bs-stepper-label">Other Details</span>
                  </button>
                </div> */}
                {/* <div className="line"></div>
                <div className="step" data-target="#test-l-4">
                  <button className="step-trigger">
                    <span className="bs-stepper-circle">5</span>
                    <span className="bs-stepper-label">Availability </span>
                  </button>
                </div> */}
              </div>
              <div className="bs-stepper-content">
                <Form className="m-1" onSubmit={this.submitHandler}>
                  <div id="test-l-1" className="content">
                    <Row>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>FullName*</Label>
                          <Input
                            type="text"
                            name="fullname"
                            required
                            placeholder="Enter Your Full Name"
                            value={this.state.fullname}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Astrologer Dashboard Name*</Label>
                          <Input
                            type="text"
                            name="dashboardName"
                            required
                            placeholder="Enter Your Name That You Want To Show On Dashboard"
                            value={this.state.dashboardName}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}

                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Email Address*</Label>
                          <Input
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
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-primary"
                        onClick={() => this.stepperFirst()}
                      >
                        Next
                      </button>
                      <Route
                        render={({ history }) => (
                          <div
                            className="ml-1"
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={this.handleBackToLogin}
                          >
                            Back To Login
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  <div id="test-otp" className="content">
                    <Row>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>OTP*</Label>
                          <Input
                            type="text"
                            required
                            name="otp"
                            placeholder="Enter Your OTP"
                            value={this.state.otp}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                    </Row>
                    {/* <button
                      className="btn btn-primary"
                      onClick={() => this.stepperSecond()}
                    >
                      Next
                    </button> */}
                    <Button
                      type="submit"
                      className="btn btn-primary mt-5"
                      color="primary"
                      onClick={() => this.stepperSecond()}
                    >
                      Submit
                    </Button>
                  </div>
                  </Form>
                  <div id="test-l-2" className="content">
                    <Row>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Gender*</Label>
                          <select
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.changeHandler}
                            name="gender"
                          >
                            <option selected>--select--</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>DOB*</Label>
                          <Input
                            type="date"
                            name="dob"
                            required
                            // maxLength="8"
                            value={this.state.dob}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Primary Skills*</Label>
                          <Input
                            type="text"
                            name="primary_skills"
                            required
                            placeholder="Primary Skills"
                            value={this.state.primary_skills}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>All Skills*</Label>
                          <Input
                            type="text"
                            name="all_skills"
                            required
                            placeholder="All Skills"
                            value={this.state.all_skills}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Minimum Amount*</Label>
                          <Input
                            type="number"
                            name="min_amount"
                            placeholder="Enter Amount"
                            required
                            value={this.state.min_amount}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Maximum Amount*</Label>
                          <Input
                            required
                            placeholder="Enter Amount"
                            name="max_amount"
                            type="number"
                            value={this.state.max_amount}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Language*</Label>
                          <Input
                            placeholder="Language"
                            name="language"
                            type="text"
                            value={this.state.language}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label for="expYears">Experience in years*</Label>
                          <select
                            className="form-control"
                            id="expYears"
                            name="exp_in_years"
                            value={this.state.exp_in_years}
                            onChange={this.changeHandler}
                          >
                            <option value="">Select Experience</option>
                            <option value="1">1 year</option>
                            <option value="2">2 years</option>
                            <option value="3">3 years</option>
                            <option value="4">4 year</option>
                            <option value="5">5 years</option>
                            <option value="6">6 years</option>
                            <option value="7">7 year</option>
                            <option value="8">8 years</option>
                            <option value="9">9 years</option>
                            <option value="10">10 year</option>
                            <option value="11">11+ years</option>

                            {/* Add more options for additional years */}
                          </select>
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label for="dailyHours">
                            How many hours you can contribute daily?*
                          </Label>
                          <select
                            className="form-control"
                            id="dailyHours"
                            name="contribute_hrs"
                            value={this.state.contribute_hrs}
                            onChange={this.handleChange}
                          >
                            <option value="">Select Daily Hours</option>
                            <option value="1">1 hours</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                            <option value="5">5 hours</option>
                            <option value="6">6 hours</option>
                            <option value="7">7 hours</option>
                            <option value="8">8 hours</option>
                            <option value="9">9 hours</option>
                            <option value="10">10 hours</option>
                            {/* Add more options for additional daily hours */}
                          </select>
                        </div>
                      </Col>
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Where did you hear about Astrotalk?*</Label>
                          <Input
                            required
                            type="text"
                            name="hear_abt_astrology"
                            placeholder="Where did you hear about Astrotalk"
                            value={this.state.hear_abt_astrology}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="12">
                        <p className="mb-0 mt-10">
                          Are you working on any other online platform?*
                        </p>
                        <Row>
                          <Col md="6">
                            <div className="form-group mtb-10">
                              <Label>Name of platform</Label>
                              <Input
                                type="text"
                                required
                                placeholder="Name of platform"
                                name="other_online_platform"
                                value={this.state.other_online_platform}
                                onChange={this.changeHandler}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col> */}
                    </Row>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => this.handleskillsdetails(e)}
                    >
                      Next
                    </button>
                  </div>
                  <div id="test-l-3" className="content mt-5">
                    <Row>
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>
                            Why do you think we should onboard you?*
                          </Label>
                          <Input
                            type="text"
                            required
                            name="why_onboard_you"
                            placeholder="Why do you think we should onboard you"
                            value={this.state.why_onboard_you}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>What is a suitable time for interview*</Label>
                          <Input
                            type="text"
                            required
                            placeholder="What is a suitable time for interview"
                            name="suitable_tym_interview"
                            value={this.state.suitable_tym_interview}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Which city do you currently live in?</Label>
                          <Input
                            type="text"
                            required
                            name="crnt_city"
                            placeholder="Which city do you currently live in"
                            value={this.state.crnt_city}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Call Rate</Label>
                          <Input
                            type="number"
                            required
                            name="callCharge"
                            placeholder="Call Rate"
                            value={this.state.callCharge}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>
                            Main source of business (other than astrology)*
                          </Label>
                          <Input
                            type="text"
                            required
                            name="income_src"
                            placeholder="source of business"
                            value={this.state.income_src}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Select your highest qualification*</Label>
                          <Input
                            type="text"
                            required
                            placeholder="qualification"
                            name="highest_qualification"
                            value={this.state.highest_qualification}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Degree/Diploma*</Label>
                          <Input
                            type="text"
                            required
                            placeholder="Degree/Diploma"
                            name="degree_deploma"
                            value={this.state.degree_deploma}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>College/School/University*</Label>
                          <Input
                            type="text"
                            name="clg_scl_name"
                            required
                            placeholder="College/School/University"
                            value={this.state.clg_scl_name}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>From where did you learn Astrology?</Label>
                          <Input
                            type="text"
                            name="lrn_abt_astrology"
                            required
                            placeholder="From where did you learn Astrology"
                            value={this.state.lrn_abt_astrology}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      <Col md="6">
                        <Label>Astrologer Image*</Label>
                        <Input
                          type="file"
                          required
                          className="form-control"
                          name="img"
                          onChange={this.onChangeHandler}
                        />
                      </Col>
                      {/* <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Instagram profile link</Label>
                          <Input
                            type="text"
                            name="insta_link"
                            required
                            placeholder="Instagram profile link"
                            value={this.state.insta_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Facebook Profile Link</Label>
                          <Input
                            type="text"
                            name="fb_link"
                            required
                            placeholder="Facebook Profile Link"
                            value={this.state.fb_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>LinkedIn Profile Link</Label>
                          <Input
                            type="text"
                            name="linkedln_link"
                            required
                            placeholder="LinkedIn Profile Link"
                            value={this.state.linkedln_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Youtube Channel Link</Label>
                          <Input
                            type="text"
                            name="youtube_link"
                            required
                            placeholder="Youtube Channel Link"
                            value={this.state.youtube_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Website Profile Link</Label>
                          <Input
                            type="text"
                            name="website_link"
                            required
                            placeholder="Website Profile Link"
                            value={this.state.website_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Name of the person who referred you?</Label>
                          <Input
                            type="text"
                            name="anybody_prefer"
                            required
                            placeholder="Name of the person who referred you"
                            value={this.state.anybody_prefer}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>
                            Minimum Earning Expectation from Astrogyata*
                          </Label>
                          <Input
                            type="number"
                            name="min_earning_expe"
                            required
                            placeholder="Minimum Earning Expectation from Astrogyata"
                            value={this.state.min_earning_expe}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>
                            Maximum Earning Expectation from Astrogyata*
                          </Label>
                          <Input
                            type="number"
                            name="max_earning_expe"
                            required
                            placeholder="Maximum Earning Expectation from Astrogyata"
                            value={this.state.max_earning_expe}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col> */}
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label for="idType">{idTypeLabel}*</Label>
                          <Input
                            type="select"
                            name="idType"
                            required
                            value={idType}
                            onChange={this.handleChange}
                          >
                            <option value="">Select Government ID</option>
                            <option value="aadhar">Aadhar Card</option>
                            <option value="drivingLicense">
                              Driving License
                            </option>
                          </Input>
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label
                            required
                            for={
                              idType === "aadhar"
                                ? "aadharNumber"
                                : "licenseNumber"
                            }
                          >
                            {idType === "aadhar"
                              ? "Aadhar Number"
                              : "License Number"}
                          </Label>
                          <Input
                            required
                            type="text"
                            name={
                              idType === "aadhar"
                                ? "aadharNumber"
                                : "licenseNumber"
                            }
                            placeholder={
                              idType === "aadhar"
                                ? "Aadhar Number"
                                : "License Number"
                            }
                            value={
                              idType === "aadhar" ? aadharNumber : licenseNumber
                            }
                            onChange={this.handleChange}
                            // disabled={inputDisabled} // Disable input fields if no government ID type is selected
                          />
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label for="dropdown">Bank Account*</Label>
                          <Input
                            type="select"
                            name="dropdown"
                            value={selectedOption}
                            onChange={this.handleDropdownChange}
                          >
                            <option value="">Select</option>
                            <option value="Bank Account">Bank Passbook</option>
                            <option value="Cancel Check">Cancel Check</option>
                          </Input>
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label for={selectedOption}>
                            {selectedOption || "Upload Image"}*
                          </Label>
                          <Input
                            type="file"
                            required
                            className="form-control"
                            name="img1"
                            onChange={this.onChangeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label for="pancard">Pancard</Label>
                          <Input
                            type="text"
                            name="pancard"
                            required
                            placeholder="Pan"
                            value={pancard}
                            onChange={this.handleChange}
                          />
                          {pancardError && (
                            <div className="text-danger">{pancardError}</div>
                          )}
                        </div>
                      </Col>

                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label>Password</Label>
                          <Input
                            type="password"
                            name="password"
                            required
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div className="form-group mtb-10">
                          <Label> Confirm Password</Label>
                          <Input
                            type="password"
                            name="cnfmPassword"
                            required
                            placeholder="Confirm Password"
                            value={this.state.cnfmPassword}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="12">
                        <div className="form-group mtb-10">
                          <Label>About (Bio)*</Label>
                          <textarea
                            type="text"
                            name="long_bio"
                            required
                            className="form-control"
                            value={this.state.long_bio}
                            onChange={this.changeHandler}
                            placeholder="Please let us know more about you"
                          />
                        </div>
                      </Col>
                    </Row>
                    <p className="ptb-10">
                      You can reach out to us for Astrologer onboarding support
                      team at onboarding@Astrogyata.com in case of any issues or
                      queries.
                    </p>

                    {/* <Button type="submit" className="btn  mt-5" color="primary">
                      Submit
                    </Button> */}
                  </div>
                {/* </Form> */}
              </div>
            </div>
          </div>
        </section>
      </Container>
    );
  }
}
export default Register;
