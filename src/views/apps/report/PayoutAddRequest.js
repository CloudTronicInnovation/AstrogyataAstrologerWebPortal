import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
// import { useParams } from "react-router-dom";
//import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import swal from "sweetalert";

export class PayoutAddRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      astroId: "",
      Astrodata: "",
      payout_amt: "",
      RequestedAmount: "",
      transactionId: "",
      status: "",
    };
  }
  componentDidMount = () => {
    let astroId = localStorage.getItem("astroId");
    axiosConfig
      .get(`/admin/getoneAstro/${astroId}`)
      .then((res) => {
        this.setState({ Astrodata: res.data.data });
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    let astroId = localStorage.getItem("astroId");
    e.preventDefault();
    if (this.state.RequestedAmount < this.state.Astrodata?.ownamount) {
      let payload = {
        astroId: astroId,
        transactionId: new Date().getTime(),
        payout_amt: this.state.RequestedAmount,
        status: "Pending",
      };
      axiosConfig
        .post(`/user/add_PayOut`, payload)
        .then((response) => {
          console.log(response);
          swal("Success!", "Submitted SuccessFully", "Success");
          this.props.history.push("/app/report/payoutReport");
        })
        .catch((error) => {
          console.log(error);
        });
    } else
      swal(
        `Your Current Balance is ${this.state.Astrodata?.ownamount}`,
        `Your can withdrawl less than ${this.state.Astrodata?.ownamount}`
      );
  };
  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Add Payout Request"
          breadCrumbParent="Home"
          breadCrumbActive="Add Payout Request "
        />
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Add Payout Request
              </h1>
            </Col>
            <Col>
              <h3 col-sm-6 className="float-left">
                Your Current Balance is ₹ {this.state.Astrodata?.ownamount}
              </h3>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() => history.push("/app/report/payoutReport")}
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Current Amount</Label>
                  <Input
                    required
                    disabled
                    type="text"
                    name="payout_amt"
                    placeholder="Current Amount"
                    value={this.state.Astrodata?.ownamount}
                    // onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Request Amount</Label>
                  <Input
                    required
                    type="number"
                    name="RequestedAmount"
                    placeholder="Request Amount"
                    value={this.state.RequestedAmount}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
              </Row>

              {/* <Col lg="6" md="6" sm="6" className="mb-2">
                <Label className="mb-1">Status</Label>
                <div
                  className="form-label-group"
                  onChange={(e) => this.changeHandler1(e)}
                >
                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Active"
                  />
                  <span style={{ marginRight: "20px" }}>Active</span>

                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Inactive"
                  />
                  <span style={{ marginRight: "3px" }}>Inactive</span>
                </div>
              </Col> */}
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Save
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default PayoutAddRequest;
