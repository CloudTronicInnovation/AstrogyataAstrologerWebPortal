import React from "react";
import { FormattedMessage } from 'react-intl';
import {
  Row,
  Col,
  Button,
  Form,
  Label,
  Input,
  Card,
  CardTitle,
} from "reactstrap";
import swal from "sweetalert";
import { Check } from "react-feather";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axiosConfig from "../../../axiosConfig";
import "../../../assets/scss/pages/users-profile.scss";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import CheckBoxesVuexy from "../../../components/@vuexy/checkbox/CheckboxesVuexy";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      mobile: "",
      img: "",
      selectedName: "",
      selectedFile: null,
      approvedstatus: "",
      data: {},
      callCharge: "",
      all_skills: "",
      callingStatus: "",
      dob: "",
      exp_in_years: "",
      gender: "",
      highest_qualification: "",
      language: "",
      max_earning_expe: "",
      min_earning_expe: "",
      max_tym: "",
      min_tym: "",
    };
  }

  //Image Submit Handler
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ selectedName: event.target.files[0].name });
    console.log(event.target.files[0]);
  };

  getData = () => {
    const astroId = localStorage.getItem("astroId");
    axiosConfig
      .get(`/admin/getoneAstro/${astroId}`)
      .then((response) => {
        
        // console.log(response.data.data);
        this.setState({
          data: response.data.data,
          fullname: response.data.data.fullname,
          email: response.data.data.email,
          mobile: response.data.data.mobile,
          img: response.data.data.img,
          callCharge: response.data.data.callCharge,
          all_skills: response.data.data.all_skills,
          callingStatus: response.data.data.callingStatus,
          dob: response.data.data.dob,
          exp_in_years: response.data.data.exp_in_years,
          gender: response.data.data.gender,
          highest_qualification: response.data.data.highest_qualification,
          language: response.data.data.language,
          max_earning_expe: response.data.data.max_earning_expe,
          min_earning_expe: response.data.data.min_earning_expe,
          max_tym: response.data.data.max_tym,
          min_tym: response.data.data.min_tym,
          availableAmt: response.data.data.availableAmt,
        });
      })
      .catch((error) => {
        // swal("Error!", "You clicked the button!", "error");
        console.log(error);
      });
  };
  componentDidMount() {
    this.getData();
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullname", this.state.fullname);
    data.append("email", this.state.email);
    data.append("mobile", this.state.mobile);
    data.append("callCharge", this.state.callCharge);
    data.append("all_skills", this.state.all_skills);
    data.append("exp_in_years", this.state.exp_in_years);
    data.append("highest_qualification", this.state.highest_qualification);
    data.append("language", this.state.language);
    data.append("max_tym", this.state.max_tym);
    data.append("min_tym", this.state.min_tym);
    if (this.state.selectedFile !== null) {
      data.append("img", this.state.selectedFile);
    }

    let astroId = localStorage.getItem("astroId");
    axiosConfig
      .post(`/user/editAstroDetails/${astroId}`, data)
      .then((response) => {
        this.setState({
          data: response.data.data,
          fullname: response.data.data.fullname,
          email: response.data.data.email,
          mobile: response.data.data.mobile,
          callCharge: response.data.data.callCharge,
          all_skills: response.data.data.all_skills,
          exp_in_years: response.data.data.exp_in_years,
          highest_qualification: response.data.data.highest_qualification,
          language: response.data.data.language,
          max_tym: response.data.data.max_tym,
          min_tym: response.data.data.min_tym,
        });
        console.log(response);
        swal("Success!", "Your details updated successfully!", "success");
        setTimeout(() => {
          window.location.href = "/";
        },1000);
      })

      .catch((error) => {
        swal("Error!", "Something Went Wrong", "error");
      });
  };
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle={ <FormattedMessage id="Profile" defaultMessage="Profile"/>}
          breadCrumbParent={ <FormattedMessage id="Pages" defaultMessage="Pages"/>}
          breadCrumbActive={ <FormattedMessage id="Profile" defaultMessage="Profile"/>}
        />
        <div id="user-profile">
          <Row className="m-0 justify-content-center">
            <Col lg="4" md="4" xl="4" sm="12">
              <Card className="bg-authentication rounded-0 mb-0 w-100">
                <div className="profile-img text-center st-1">
                  <img
                    src={this.state.data.img}
                    alt="porfileImg"
                    className="img-fluid img-border rounded-circle box-shadow-1 rt-1"
                  />
                  <ul className="lst-1">
                    <li className="lst-2">
                    <FormattedMessage id="Name" defaultMessage="Name"/>:
                      <span className="lst-3">{this.state.data.fullname}</span>
                    </li>
                    <li className="lst-2">
                      <FormattedMessage id="MOBILE_NO." defaultMessage="MOBILE_NO."/>:
                      <span className="lst-3">{this.state.data.mobile}</span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Email" defaultMessage="Email"/>:
                      <span className="lst-3">{this.state.data.email}</span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="CallRate" defaultMessage="Call Rate"/>:
                      <span className="lst-3">
                        Rs {this.state.data.callCharge}
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="All Skills" defaultMessage="All Skills"/>:
                      <span className="lst-3">
                        {this.state.data.all_skills}
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Calling Status" defaultMessage="Calling Status"/>:
                      <span className="lst-3">
                        {this.state.data.callingStatus}
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Birth Time" defaultMessage="Birth Time"/>:
                      <span className="lst-3">{this.state.data.dob}</span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Experience" defaultMessage="Experience"/>:
                      <span className="lst-3">
                        {this.state.data.exp_in_years}Year
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Gender" defaultMessage="Gender"/>:
                      <span className="lst-3">{this.state.data.gender}</span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Higher Qualification" defaultMessage="Higher Qualification"/>:
                      <span className="lst-3">
                        {this.state.data.highest_qualification}
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="School/College" defaultMessage="School/College"/>:
                      <span className="lst-3">
                        {this.state.data.clg_scl_name}
                      </span>
                    </li>
                    {/* <li className="lst-2">
                    <FormattedMessage id="Degree Diploma" defaultMessage="Degree Diploma"/>:
                      <span className="lst-3">
                        {this.state.data.degree_deploma}
                      </span>
                    </li> */}
                    <li className="lst-2">
                    <FormattedMessage id="CITY" defaultMessage="City"/>:
                      <span className="lst-3">{this.state.data.crnt_city}</span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Language" defaultMessage="Language"/>:
                      <span className="lst-3">{this.state.data.language}</span>
                    </li>
                    {/* <li className="lst-2">
                      Maximum Earning:
                      <span className="lst-3">
                        Rs{this.state.data.max_earning_expe}
                      </span>
                    </li>
                    <li className="lst-2">
                      Minimum Earning:
                      <span className="lst-3">
                        Rs{this.state.data.min_earning_expe}
                      </span>
                    </li>
                    <li className="lst-2">
                      Maximum Time:
                      <span className="lst-3">{this.state.data.max_tym}</span>
                    </li>
                    <li className="lst-2">
                      Minimum Time:
                      <span className="lst-3">{this.state.data.min_tym}</span>
                    </li> */}
                    <li className="lst-2">
                    <FormattedMessage id="Available Amount" defaultMessage="Available Amount"/>:
                      <span className="lst-3">
                        {this.state.data.availableAmt}
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Approved Status" defaultMessage="Approved Status"/>:
                      <span className="lst-3">
                        {this.state.data.approvedstatus}
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Average Rating" defaultMessage="Avarage Rating"/>:
                      <span className="lst-3">
                        {this.state.data.avg_rating}
                      </span>
                    </li>
                    <li className="lst-2">
                       <FormattedMessage id="Facebook" defaultMessage="Facebook Link"/>:
                      <span className="lst-3">{this.state.data.fb_link}</span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Instagram" defaultMessage="Instagram Link"/>:
                      <span className="lst-3">
                        {this.state.data.insta_link}
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="LinkedIn" defaultMessage="LinkedIn Link"/>:
                      <span className="lst-3">
                        {this.state.data.linkedln_link}
                      </span>
                    </li>
                    <li className="lst-2">
                    <FormattedMessage id="Youtube" defaultMessage="Youtube Link"/>:
                      <span className="lst-3">
                        {this.state.data.youtube_link}
                      </span>
                    </li>
                    <li className="lst-2">
                      <FormattedMessage id="Other Online Platform" defaultMessage="Other Online PlateForm"/>:
                      <span className="lst-3">
                        {this.state.data.other_online_platform}
                      </span>
                    </li>
                  </ul>
                </div>
              </Card>
            </Col>
            <Col
              sm="12"
              xl="8"
              lg="8"
              md="8"
              className="d-flex justify-content-center"
            >
              <Card className="bg-authentication rounded-0 mb-0 w-100">
                <Form className="m-1" onSubmit={this.submitHandler}>
                  <div className="st-2">
                    <CardTitle>
                      <h4 className="mb-3"> <FormattedMessage id="edit.profile" defaultMessage="Edit Profile"/></h4>
                      <Col></Col>
                    </CardTitle>
                    <Row className="m-0">
                      <Col sm="12" className="p-0">
                        <Label><FormattedMessage id="Name" defaultMessage="Name"/></Label>
                        <Input
                          type="text"
                          name="fullname"
                          placeholder="Name"
                          value={this.state.fullname}
                          onChange={this.changeHandler}
                        />
                        <br></br>
                        <Label><FormattedMessage id="Email" defaultMessage="Email"/></Label>
                        <Input
                          type="email"
                          name="email"
                          placeholder="email"
                          disabled
                          value={this.state.email}
                          onChange={this.changeHandler}
                        />
                        <br></br>
                        <Label><FormattedMessage id="MOBILE_NO." defaultMessage="Mobile"/></Label>

                        <div className="form-group mtb-10">
                          <PhoneInput
                            countryCodeEditable={false}
                            className="mob-int"
                            // disabled
                            country={"in"}
                            value={(this.state?.mobile).toString()}
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

                        <Label><FormattedMessage id="CallRate" defaultMessage="Call Rate"/></Label>
                        <Input
                          type="number"
                          name="callCharge"
                          placeholder="Call Charge"
                          value={this.state.callCharge}
                          onChange={this.changeHandler}
                        />
                        <br></br>
                        <Label><FormattedMessage id="All Skills" defaultMessage="All Skills"/></Label>
                        <Input
                          type="text"
                          name="all_skills"
                          placeholder="All Skills"
                          value={this.state.all_skills}
                          onChange={this.changeHandler}
                        />
                        <br></br>

                        {/* <Label> Calling Status</Label>
                         <select
                          className=" form-control mt-2"
                          onChange={(e) =>
                            this.setState({ callingStatus: e.target.value })
                          }
                          id="availability"
                        >
                          <option value="Available">Available</option>
                          <option value="Busy">Busy</option>
                          <option value="Wait">Wait</option>
                        </select>
                        <br></br> */}
                        <Label><FormattedMessage id="Experience" defaultMessage="Experience"/></Label>
                        <Input
                          type="number"
                          name="exp_in_years"
                          placeholder="Experience"
                          value={this.state.exp_in_years}
                          onChange={this.changeHandler}
                        />
                        <br></br>
                        <Label><FormattedMessage id="Higher Qualification" defaultMessage="Highest Qualification"/></Label>
                        <Input
                          type="text"
                          name="highest_qualification"
                          placeholder="Highest Qualification"
                          value={this.state.highest_qualification}
                          onChange={this.changeHandler}
                        />
                        <br></br>
                        {/* <Label>Maximum Time</Label>
                        <Input
                          type="number"
                          name="max_tym"
                          placeholder="Maximum Time"
                          value={this.state.max_tym}
                          onChange={this.changeHandler}
                        />
                        <br></br> */}
                        <Label><FormattedMessage id="Language" defaultMessage="Language"/></Label>
                        <Input
                          type="text"
                          name="language"
                          placeholder="Language"
                          value={this.state.language}
                          onChange={this.changeHandler}
                        />
                        {/* <br></br>
                        <Label>Minimum Time</Label>
                        <Input
                          type="number"
                          name="min_tym"
                          placeholder="Minimum  Time"
                          value={this.state.min_tym}
                          onChange={this.changeHandler}
                        /> */}
                        <br></br>
                        <Label><FormattedMessage id="USER_IMAGE" defaultMessage="User Image"/></Label>
                        <Input
                          className="form-control"
                          type="file"
                          name="img"
                          onChange={this.onChangeHandler}
                        />
                        <br></br>
                        <CheckBoxesVuexy
                          color="primary"
                          icon={<Check className="vx-icon" size={16} />}
                          label={<FormattedMessage id="I accept the terms & conditions." defaultMessage="I accept the terms & conditions."/>}
                          defaultChecked={true}
                        />
                        <br></br>
                        <div className="d-flex justify-content-between">
                          <Button.Ripple color="primary" type="submit">
                          <FormattedMessage id="Submit" defaultMessage="Submit"/>
                          </Button.Ripple>
                        </div>
                        {/* </Form> */}
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
export default Profile;
