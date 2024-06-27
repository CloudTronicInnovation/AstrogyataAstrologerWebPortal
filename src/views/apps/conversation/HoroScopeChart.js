import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Table,
} from "reactstrap";
import { history } from "../../../history";

import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import axiosConfig from "../../../axiosConfig";
import { Route } from "react-router-dom";
class HoroScopeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      horoScopeDetail: [],
      planetDetail: [],
      yoginiDetail: [],
      ashtakvargaList: [],
    };
  }

  componentDidMount() {
    axiosConfig
      .get(`/user/horo_chart_list`)
      .then((response) => {
        console.log("horo_chart_list", response.data.data);
        this.setState({ horoScopeDetail: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axiosConfig
      .get(`/user/planets_list`)
      .then((response) => {
        console.log("planetDetail", response.data.data);
        this.setState({ planetDetail: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axiosConfig
      .get(`/user/yogini_dasha_list`)
      .then((response) => {
        console.log("yoginiDetail", response.data.data);
        this.setState({ yoginiDetail: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axiosConfig
      .get(`/user/ashtakvarga_list`)
      .then((response) => {
        console.log("ashtakvargaList", response.data.data);
        this.setState({ ashtakvargaList: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <Row>
            <Col sm="12">
              {/* <div>
                <Breadcrumb listTag="div">
                  <BreadcrumbItem href="/analyticsDashboard" tag="a">
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/app/setting/bank/bankList" tag="a">
                    HoroScope Details
                  </BreadcrumbItem>
                  <BreadcrumbItem active>View HoroScope</BreadcrumbItem>
                </Breadcrumb>
              </div> */}
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col lg="3" md="6" sm="12">
                <h4 className="float-left">HoroScope Details</h4>
              </Col>
              <Col lg="9" md="6" sm="12">
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push("/app/conversation/intakelist")
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    {/* <th>Ayanamsha</th> */}
                    <th>Year</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Hour</th>
                    <th>Min</th>
                    <th>timezone</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    {/* <th>Sunrise</th> */}
                    {/* <th>Sunset</th> */}
                  </tr>
                </thead>
                <tbody>
                  {this.state.horoScopeDetail.map((detail) => {
                    return (
                      <tr key={detail._id}>
                        <th scope="row">1</th>
                        <td>{detail.year}</td>
                        <td>{detail.month}</td>
                        <td>{detail.day}</td>
                        <td>{detail.hour}</td>
                        <td>{detail.min}</td>
                        <td>{detail.tzone}</td>
                        <td>{detail.lat}</td>
                        <td>{detail.lon}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h4 col-sm-6 className="float-left">
                  Yogini Dasha
                </h4>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push("/app/conversation/intakelist")
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Hour</th>
                    <th>Min</th>
                    <th>timezone</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.yoginiDetail.map((detail) => {
                    return (
                      <tr key={detail._id}>
                        <th scope="row">1</th>
                        <td>{detail.year}</td>
                        <td>{detail.month}</td>
                        <td>{detail.day}</td>
                        <td>{detail.hour}</td>
                        <td>{detail.min}</td>
                        <td>{detail.tzone}</td>
                        <td>{detail.lat}</td>
                        <td>{detail.lon}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h4 col-sm-6 className="float-left">
                  Planet Dasha
                </h4>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push("/app/conversation/intakelist")
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Hour</th>
                    <th>Min</th>
                    <th>timezone</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.planetDetail.map((detail) => {
                    return (
                      <tr key={detail._id}>
                        <th scope="row">1</th>
                        <td>{detail.year}</td>
                        <td>{detail.month}</td>
                        <td>{detail.day}</td>
                        <td>{detail.hour}</td>
                        <td>{detail.min}</td>
                        <td>{detail.tzone}</td>
                        <td>{detail.lat}</td>
                        <td>{detail.lon}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h4 col-sm-6 className="float-left">
                  Ashtakvarga Details
                </h4>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push("/app/conversation/intakelist")
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Hour</th>
                    <th>Min</th>
                    <th>timezone</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ashtakvargaList.map((detail) => {
                    return (
                      <tr key={detail._id}>
                        <th scope="row">1</th>
                        <td>{detail.year}</td>
                        <td>{detail.month}</td>
                        <td>{detail.day}</td>
                        <td>{detail.hour}</td>
                        <td>{detail.min}</td>
                        <td>{detail.tzone}</td>
                        <td>{detail.lat}</td>
                        <td>{detail.lon}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
export default HoroScopeChart;
