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
import Select from "react-select";
import { history } from "../../../history";

import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import axiosConfig from "../../../axiosConfig";
import { Route } from "react-router-dom";
import swal from "sweetalert";
class VimshottariDasha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      yoginiDasha: [],
      selected: "",
      horoChart: [],
    };
  }

  //   list = [

  //     {
  //       label: "sun",
  //       value: "sun",
  //     },
  //     {
  //       label: "moon",
  //       value: "moon",
  //     },
  //     {
  //       label: "mars",
  //       value: "mars",
  //     },
  //     {
  //       label: "Brith Chart",
  //       value: "D1",
  //     },
  //     {
  //       label: "Hora Chart",
  //       value: "D2",
  //     },
  //     {
  //       label: "Dreshkan Chart",
  //       value: "D3",
  //     },
  //     {
  //       label: "Chathurthamasha Chart",
  //       value: "D4",
  //     },
  //     {
  //       label: "Panchmansha Chart",
  //       value: "D5",
  //     },
  //     {
  //       label: "Saptamansha Chart",
  //       value: "D7",
  //     },
  //     {
  //       label: "Ashtamansha Chart",
  //       value: "D8",
  //     },
  //     {
  //       label: "Navamansha Chart",
  //       value: "D9",
  //     },
  //     {
  //       label: "Dashamansha Chart",
  //       value: "D10",
  //     },
  //     {
  //       label: "Dwadashamsha Chart",
  //       value: "D12",
  //     },
  //     {
  //       label: "Shodashamsha Chart",
  //       value: "D16",
  //     },
  //     {
  //       label: "Vishamansha Chart",
  //       value: "D20",
  //     },
  //     {
  //       label: "Chaturvimshamsha Chart",
  //       value: "D24",
  //     },
  //     {
  //       label: "Bhamsha Chart",
  //       value: "D27",
  //     },
  //     {
  //       label: "Trishamansha Chart",
  //       value: "D30",
  //     },
  //     {
  //       label: "Khavedamsha Chart",
  //       value: "D40",
  //     },
  //     {
  //       label: "Akshvedansha Chart",
  //       value: "D45",
  //     },
  //     {
  //       label: "Shashtymsha Chart",
  //       value: "D60",
  //     },
  //   ];
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    let astroId = localStorage.getItem("astroId");
    axiosConfig
      .get(`/user/birth_detailsByAstroid/${astroId}`)
      .then((response) => {
        // console.log(response.data.data);
        this.setState({ yoginiDasha: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSubmit = () => {
    let payload = {
      day: 6,
      month: 1,
      year: 2000,
      hour: 7,
      min: 45,
      lat: 19.132,
      lon: 72.342,
      tzone: 5.5,
    };
    axiosConfig
      .post(`/user/ashtakvarga/${this.state.selected}`, payload)
      .then((response) => {
        this.setState({ horoChart: response.data.data });
        console.log("yogini", response.data.data);
      })
      .catch((error) => {
        console.log("Error BirthDetails", error);
        swal("Error!", "You clicked the button!", "error");
      });
  };

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
                    Horoscope Details
                  </BreadcrumbItem>
                  <BreadcrumbItem active> Horoscope Details</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  Horoscope List
                </h1>
              </Col>
              <Col>
                {/* <select name="selected" onChange={(e) => this.handleChange(e)}>
                  {this.list.map((option) => (
                    <option value={option.value}> {option.label}</option>
                  ))}
                </select> */}

                <select
                  className="mt-2"
                  //   onChange={(e) => setNewStatus(e.target.value)}
                  //   id="availability"
                >
                  <option value="sun">sun</option>
                  <option value="moon">moon</option>
                  <option value="mars">mars</option>
                  <option value="mercury">mercury</option>
                  <option value="jupiter">jupiter</option>
                  <option value="venus">venus</option>
                  <option value="saturn">saturn</option>
                  <option value="ascendant">ascendant</option>
                </select>
              </Col>
              <Col>
                <Button
                  onClick={this.handleSubmit}
                  className="ml-1  btn btn-success "
                >
                  Submit
                </Button>
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
                    <th>Sign</th>
                    <th>Sign Name</th>
                    <th>Planet</th>
                    <th>Planet Small</th>
                    <th> Planet Degree</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.horoChart &&
                    this.state.horoChart.map((detail) => {
                      return (
                        <tr key={detail._id}>
                          <th scope="row">1</th>
                          <td>{detail.sign}</td>
                          <td>{detail.sign_name}</td>
                          <td>{detail.planet ? detail.planet : "_"}</td>
                          <td>
                            {detail.planet_small ? detail.planet_small : "_"}
                          </td>
                          <td>
                            {detail.planet_degree ? (
                              detail.planet_degree
                            ) : (
                              <span>_</span>
                            )}
                          </td>
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
export default VimshottariDasha;
