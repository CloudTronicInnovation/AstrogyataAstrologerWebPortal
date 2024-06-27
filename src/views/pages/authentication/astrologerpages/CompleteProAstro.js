import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import LayoutOne from "../../../layouts/LayoutOne";
import "../../../assets/scss/astroteam.scss";
class CompleteProAstro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <LayoutOne headerTop="visible">
        <section>
          <Container>
            <Row>
              <Col lg="2"></Col>
              <Col lg="8">
                <div className="wal-amt">
                  <h1>Complete Profile Astrologer</h1>
                  <hr></hr>
                  <form>
                    <Row>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Gender*</label>
                          <select
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.changeHandler}
                            name="gender"
                          >
                            <option selected>--select--</option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>DOB*</label>
                          <input
                            type="date"
                            required
                            name="dob"
                            maxLength="8"
                            value={this.state.dob}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Primary Skills*</label>
                          {/* <Select
                                              isMulti
                                              name="primary_skills"
                                              required
                                              className="basic-multi-select"
                                              classNamePrefix="select"
                                              onChange={this.changeHandler}
                                            /> */}
                          <input
                            placeholder="Primary Skills"
                            name="primary_skills"
                            type="text"
                            value={this.state.primary_skills}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>All Skills*</label>
                          {/* <Select
                                              isMulti
                                              name="all_skills"
                                              required
                                              className="basic-multi-select"
                                              classNamePrefix="select"
                                              value={this.state.all_skills}
                                              onChange={this.changeHandler}
                                            /> */}
                          <input
                            placeholder="All Skills"
                            name="all_skills"
                            type="text"
                            value={this.state.all_skills}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Language*</label>
                          {/* <Select
                                              isMulti
                                              required
                                              name="language"
                                              className="basic-multi-select"
                                              classNamePrefix="select"
                                              onChange={this.changeHandler}
                                              value={this.state.language}
                                            /> */}
                          <input
                            placeholder="language"
                            name="language"
                            type="text"
                            value={this.state.language}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Experience in years*</label>
                          <input
                            type="text"
                            name="exp_in_years"
                            required
                            value={this.state.exp_in_years}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>
                            How many hours you can contribute daily?*
                          </label>
                          <input
                            type="text"
                            name="conrubute_hrs"
                            required
                            value={this.state.conrubute_hrs}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Where did you hear about Astrotalk?*</label>
                          <input
                            type="text"
                            name="hear_abt_astrology"
                            value={this.state.hear_abt_astrology}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="12">
                        <p className="mb-0 mt-10">
                          Are you working on any other online platform?*
                        </p>
                        <Row>
                          <Col md="6">
                            <div class="form-group mtb-10">
                              <label>Name of platform</label>
                              <input
                                type="text"
                                name="other_online_platform"
                                value={this.state.other_online_platform}
                                onChange={this.changeHandler}
                              />
                            </div>
                          </Col>
                          <Col md="6">
                            <div class="form-group mtb-10">
                              <label>Monthly Earning</label>
                              <input
                                type="text"
                              // name="max_earning_expe"
                              // value={this.state.max_earning_expe}
                              // onChange={this.changeHandler}
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>What is a suitable time for interview*</label>
                          <input
                            type="text"
                            required
                            name="suitable_tym_interview"
                            value={this.suitable_tym_interview}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Which city do you currently live in?</label>
                          <input
                            type="text"
                            required
                            name="crnt_city"
                            value={this.crnt_city}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>
                            Main source of business (other than astrology)*
                          </label>
                          {/* <Select
                                              value={this.state.income_src}
                                              required
                                              onChange={this.changeHandler}
                                          /> */}
                          <input
                            placeholder="source of business"
                            name="income_src"
                            type="text"
                            value={this.state.income_src}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Select your highest qualification*</label>
                          {/* <Select
                                              value={this.state.highest_qualification }
                                              required
                                              options={qualioption}
                                              onChange={this.changeHandler}
                                          /> */}
                          <input
                            placeholder="qualification"
                            name="highest_qualification"
                            type="text"
                            value={this.state.highest_qualification}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Degree/Diploma*</label>
                          {/* <Select
                                              value={this.state.degree_deploma}
                                              required
                                              onChange={this.changeHandler}
                                          /> */}
                          <input
                            placeholder="Degree/Diploma"
                            name="degree_deploma"
                            type="text"
                            value={this.state.degree_deploma}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>College/School/University*</label>
                          <input
                            type="text"
                            name="clg_scl_name"
                            required
                            value={this.clg_scl_name}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>From where did you learn Astrology?</label>
                          <input
                            type="text"
                            name="lrn_abt_astrology"
                            required
                            value={this.lrn_abt_astrology}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Instagram profile link</label>
                          <input
                            type="text"
                            name="insta_link "
                            required
                            value={this.insta_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Facebook profile link</label>
                          <input
                            type="text"
                            name="fb_link"
                            required
                            value={this.fb_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>LinkedIn profile link</label>
                          <input
                            type="text"
                            name="linkedln_link"
                            required
                            value={this.linkedln_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Youtube channel link</label>
                          <input
                            type="text"
                            name="youtube_link"
                            required
                            value={this.youtube_link}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Name of the person who referred you?</label>
                          <input
                            type="text"
                            name="anybody_prefer"
                            required
                            value={this.anybody_prefer}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>
                            Minimum Earning Expectation from Astrogyata*
                          </label>
                          <input
                            type="text"
                            name="min_earning_expe"
                            required
                            value={this.min_earning_expe}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>
                            Maximum Earning Expectation from Astrogyata*
                          </label>
                          <input
                            type="text"
                            name="max_earning_expe"
                            required
                            value={this.max_earning_expe}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>
                      <Col md="6">
                        <div class="form-group mtb-10">
                          <label>Website profile link</label>
                          <input
                            type="text"
                            name="max_earning_expe"
                            required
                            value={this.max_earning_expe}
                            onChange={this.changeHandler}
                          />
                        </div>
                      </Col>

                      <Col md="12">
                        <div class="form-group mtb-10">
                          <label>Long bio*</label>
                          <textarea
                            type="text"
                            class="form-control"
                            name="long_bio"
                            required
                            value={this.long_bio}
                            onChange={this.changeHandler}
                            placeholder="Please let us know more about you"
                          />
                        </div>
                      </Col>
                      <Col md="12" className="mt-3">
                        <Button className="btn btn-success">Submit</Button>
                      </Col>
                    </Row>
                  </form>
                </div>
              </Col>
              <Col lg="2"></Col>
            </Row>
          </Container>
        </section>
      </LayoutOne>
    );
  }
}

export default CompleteProAstro;
