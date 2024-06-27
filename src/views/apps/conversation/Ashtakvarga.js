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
class Ashtakvarga extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      ashtakvargaDetail: [],
    };
  }

  componentDidMount() {
    let astroId = localStorage.getItem("astroId");
    axiosConfig
      .get(`/user/birth_detailsByAstroid/${astroId}`)
      .then((response) => {
        console.log(response.data.data);
        this.setState({ ashtakvargaDetail: response.data.data });
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
              <div>
                <Breadcrumb listTag="div">
                  <BreadcrumbItem href="/analyticsDashboard" tag="a">
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/app/setting/bank/bankList" tag="a">
                    Ashtakvarga Details
                  </BreadcrumbItem>
                  <BreadcrumbItem active> Ashtakvarga</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  BirthDetails
                </h1>
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
              <Table bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ayanamsha</th>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Day</th>
                    <th>Hour</th>
                    <th>Min</th>
                    <th>timezone</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Sunrise</th>
                    <th>Sunset</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.ashtakvargaDetail.map((detail) => {
                    return (
                      <tr key={detail._id}>
                        <th scope="row">1</th>
                        <td>{detail.ayanamsha}</td>
                        <td>{detail.year}</td>
                        <td>{detail.month}</td>
                        <td>{detail.day}</td>
                        <td>{detail.hour}</td>
                        <td>{detail.min}</td>
                        <td>{detail.tzone}</td>
                        <td>{detail.lat}</td>
                        <td>{detail.lon}</td>
                        <td>{detail.sunrise}</td>
                        <td>{detail.sunset}</td>
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
export default Ashtakvarga;
