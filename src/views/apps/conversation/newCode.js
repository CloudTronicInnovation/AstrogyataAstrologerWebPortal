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
const style = {
  table: {
    width: "100%",
    display: "table",
    borderSpacing: 0,
    borderCollapse: "separate",
  },
};
class YoginiDasha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      yoginiDasha: [],
      selected: "",
      horoChart: [],
      Ashtakvarga: [],
      ashtalData: [],
      dropdownList: "",
    };
  }

  //   list = [
  //     {
  //       label: "Chalit Chart",
  //       value: "chalit",
  //     },
  //     {
  //       label: "Sun Chart",
  //       value: "SUN",
  //     },
  //     {
  //       label: "Moon Chart",
  //       value: "MOON",
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
    this.setState({ selected: e.target.value });
  };
  ashtakChange = (e) => {
    this.setState({ dropdownList: e.target.value });
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
  //   handleSubmit = () => {
  //     axiosConfig
  //       .post(
  //         `/user/horo_chart/${this.state.selected}`,
  //         this.state.yoginiDasha[0]
  //       )
  //       .then((response) => {
  //         this.setState({ horoChart: response.data.data });
  //         console.log("yogini", response.data.data);
  //       })
  //       .catch((error) => {
  //         console.log("Error BirthDetails", error);
  //         swal("Error!", "You clicked the button!", "error");
  //       });
  //   };
  handleSubmitList = () => {
    console.log(this.state.dropdownList);
    axiosConfig
      .post(
        `/user/Ashtakvarga/${this.state.dropdownList}`,
        this.state.yoginiDasha[0]
      )
      .then((response) => {
        this.setState({ Ashtakvarga: response.data.data });
        this.setState({
          ashtalData: response.data.data.ashtak_points.aquarius,
        });
        console.log("CVCVCV", response.data.data.ashtak_points.aquarius);
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
          {/* <Row>
            <Col sm="12">
              <div>
                <Breadcrumb listTag="div">
                  <BreadcrumbItem href="/analyticsDashboard" tag="a">
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem href="/app/setting/bank/bankList" tag="a">
                    Horoscope Details
                  </BreadcrumbItem>
                  <BreadcrumbItem active> Horoscope</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row> */}
          {/* <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  Horoscope List
                </h1>
              </Col>
              <Col>
                <select name="selected" onChange={(e) => this.handleChange(e)}>
                  {this.list.map((option) => (
                    <>
                      <option> Select Horoscope</option>
                      <option value={option.value}> {option.label}</option>
                    </>
                  ))}
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
              <Table bordered responsive={true}>
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
                          <td>{detail.planet}</td>
                          <td>{detail.planet_small}</td>
                          <td>{detail.planet_degree}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </CardBody>
          </Card> */}
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col lg="3" md="4" sm="6" className="my-1">
                <h4 col-sm-6 className="float-left">
                  Ashtakvarga List
                </h4>
              </Col>
              <Col lg="3" md="3" sm="6">
                <select
                  name="dropdownList"
                  className="mt-2"
                  onChange={(e) => this.ashtakChange(e)}
                >
                  <option> Select Ashtakvarga</option>
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
              <Col lg="3" md="3" sm="6" className="my-1">
                <Button
                  size="sm"
                  onClick={this.handleSubmitList}
                  className="ml-1  btn btn-success "
                >
                  Submit
                </Button>
              </Col>
              <Col lg="3" md="3" sm="6" className="my-1">
                <Route
                  render={({ history }) => (
                    <Button
                      size="sm"
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
              <div
                style={{
                  maxHeight: "200px",
                  overflowY: "auto",
                }}
              >
                <Table responsive style={style.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ascendant</th>
                      <th>jupiter</th>
                      <th>mars</th>
                      <th>mercury</th>
                      <th>moon</th>
                      <th>saturn</th>
                      <th>sun</th>
                      <th>total</th>
                      <th>venus</th>
                      <th>Sign Id</th>
                      <th>Sign Name</th>
                      <th>Type</th>
                      <th>Planet</th>
                      <th>total</th>
                      <th>venus</th>
                      <th>Sign Id</th>
                      <th>Sign Name</th>
                      <th>Type</th>
                      <th>Planet</th>
                      <th>total</th>
                      <th>venus</th>
                      <th>Sign Id</th>
                      <th>Sign Name</th>
                      <th>Type</th>
                      <th>Planet</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>{this.state.ashtalData.ascendant}</td>
                      <td>{this.state.ashtalData.jupiter}</td>
                      <td>{this.state.ashtalData.mars}</td>
                      <td>{this.state.ashtalData.mercury}</td>
                      <td>{this.state.ashtalData.moon}</td>
                      <td>{this.state.ashtalData.saturn}</td>
                      <td>{this.state.ashtalData.sun}</td>
                      <td>{this.state.ashtalData.total}</td>
                      <td>{this.state.ashtalData.venus}</td>
                      <td>{this.state.Ashtakvarga?.ashtak_varga?.sign_id}</td>

                      <td>{this.state.Ashtakvarga?.ashtak_varga?.type}</td>
                      <td>{this.state.Ashtakvarga?.ashtak_varga?.planet}</td>
                      <td>{this.state.Ashtakvarga?.ashtak_varga?.sign}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
export default YoginiDasha;
