import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  CustomInput,
  Label,
  Button,
  CardTitle,
  CardText,
  TabPane,
  TabContent,
  NavLink,
  NavItem,
  Nav,
  Table,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { Route, useHistory } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import classnames from "classnames";
// import swal from "sweetalert";

function YoginiDashaImage(props) {
  const [category, setCategory] = useState("");
  const [userData, setuserData] = useState("");
  const [yoginiDasha, setyoginiDasha] = useState("");
  const [svgData1, setSvgData] = useState("");
  const [DOB, setDOB] = useState("");
  const [currentActiveTab, setCurrentActiveTab] = useState("1");

  const history = useHistory();
  const list = [
    {
      id: "1",
      label: "Chalit Chart",
      value: "ChalitChart",
    },
    {
      id: "2",
      label: "Sun Chart",
      value: "SunChart",
    },
    {
      id: "3",
      label: "Moon Chart",
      value: "MOONChart",
    },
    {
      id: "4",
      label: "Brith Chart",
      value: "Brith Chart",
    },
    {
      id: "5",
      label: "Hora Chart",
      value: "HoraChart",
    },
    {
      id: "6",
      label: "Dreshkan Chart",
      value: "DreshkanChart",
    },
    {
      label: "Chathurthamasha Chart",
      value: "ChathurthamashaChart",
    },
    {
      label: "Panchmansha Chart",
      value: "PanchmanshaChart",
    },
    {
      label: "Saptamansha Chart",
      value: "SaptamanshaChart",
    },
    {
      label: "Ashtamansha Chart",
      value: "AshtamanshaChart",
    },
    {
      label: "Navamansha Chart",
      value: "NavamanshaChart",
    },
    {
      label: "Dashamansha Chart",
      value: "D10",
    },
    {
      label: "Dwadashamsha Chart",
      value: "DwadashamshaChart",
    },
    {
      label: "Shodashamsha Chart",
      value: "ShodashamshaChart",
    },
    {
      label: "Vishamansha Chart",
      value: "VishamanshaChart",
    },
    {
      label: "Chaturvimshamsha Chart",
      value: "ChaturvimshamshaChart",
    },
    {
      label: "Bhamsha Chart",
      value: "BhamshaChart",
    },
    {
      label: "Trishamansha Chart",
      value: "TrishamanshaChart",
    },
    {
      label: "Khavedamsha Chart",
      value: "KhavedamshaChart",
    },
    {
      label: "Akshvedansha Chart",
      value: "AkshvedanshaChart",
    },
    {
      label: "Shashtymsha Chart",
      value: "ShashtymshaChart",
    },
  ];

  // Toggle active state for Tab
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };
  useEffect(() => {
    console.log(props?.history.location?.state?.date_of_time);
    const lat = props?.latitude;
    const long = props?.longitude;
    const arr = props?.history.location?.state?.date_of_time?.split(":");
    console.log(arr, parseInt(arr[0]), parseInt(arr[1]));
    const hour = parseInt(arr[0]);
    const min = parseInt(arr[1]);
    console.log(min);
    let dob = props?.history.location.state?.dob;
    const date = new Date(dob);
    const Year = date.getFullYear();
    const month = date.getMonth();
    const actualmonth = month + 1;
    const Day = date.getDate();
    setDOB({
      day: Day,
      month: actualmonth,
      year: Year,
      hour: hour,
      min: min,
      lat: lat,
      lon: long,
      tzone: 5.5,
    });
    setuserData(props?.history.location.state);
  }, []);

  const changeHandler1 = (e) => {
    setCategory(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    axiosConfig
      .post(`/user/ChartImage/${category}`, DOB)
      .then((response) => {
        console.log(response.data);
        setSvgData(response.data);
      })
      .catch((error) => {
        console.log("Error BirthDetails", error);
      });
  };

  return (
    <div>
      <Breadcrumbs
        breadCrumbTitle="HoroScope Chart"
        breadCrumbParent=" HoroScope List"
        breadCrumbActive="HoroScope Chart"
      />
      <Card>
        <Row className="m-2">
          <Col>
            <h1 col-sm-6 className="float-left">
              HoroScope Chart
            </h1>
          </Col>
          <Col>
            <Route
              render={({ history }) => (
                <Button
                  className=" btn btn-danger float-right"
                  onClick={() => history.push("app/conversation/intakelist")}
                >
                  Back
                </Button>
              )}
            />
          </Col>
        </Row>
        <CardBody>
          <Form className="m-1" onSubmit={submitHandler}>
            <Row>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>Select For Chart</Label>
                <CustomInput
                  required
                  type="select"
                  name="category"
                  value={category}
                  onChange={changeHandler1}
                >
                  <option>Select.....</option>
                  {list?.map((catList) => (
                    <option key={catList.id} value={catList.value}>
                      {catList.value}
                    </option>
                  ))}
                </CustomInput>
              </Col>
            </Row>
            <Row>
              <Col>
                <div dangerouslySetInnerHTML={{ __html: svgData1 }} />
              </Col>
            </Row>
            <Row>
              <Col lg="6" md="6" sm="6" className="mb-2">
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                >
                  Submit
                </Button.Ripple>
              </Col>
            </Row>
          </Form>
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "1",
                  })}
                  onClick={() => {
                    toggle("1");
                  }}
                >
                  Basic Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "2",
                  })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Planetary Position
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "3",
                  })}
                  onClick={() => {
                    toggle("3");
                  }}
                >
                  Predictions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "4",
                  })}
                  onClick={() => {
                    toggle("4");
                  }}
                >
                  Pratharashtakvarga
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "5",
                  })}
                  onClick={() => {
                    toggle("5");
                  }}
                >
                  Shodashvarga
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "6",
                  })}
                  onClick={() => {
                    toggle("6");
                  }}
                >
                  Fivefold Friendship
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "7",
                  })}
                  onClick={() => {
                    toggle("7");
                  }}
                >
                  Ashtakvarga
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "8",
                  })}
                  onClick={() => {
                    toggle("8");
                  }}
                >
                  Vimshottari Dasha
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: currentActiveTab === "9",
                  })}
                  onClick={() => {
                    toggle("9");
                  }}
                >
                  Yogini Dasha
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={currentActiveTab}>
              <TabPane tabId="1">
                {/* <Row>
                  <Col sm="12">
                    <h5>Basic Details</h5>
                  </Col>
                </Row> */}
                <Row>
                  <Col lg="6" md="6" sm="6">
                    <Table striped>
                      <tr>
                        <thead>
                          <th>Name</th>
                        </thead>
                        <td>{props?.location?.state?.mobile}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Birth Date</th>
                        </thead>
                        <td>{props?.location?.state?.dob}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Birth Time</th>
                        </thead>
                        <td>{props?.location?.state?.date_of_time}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Birth Place</th>
                        </thead>
                        <td>{props?.location?.state?.birthPlace}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Ascendant</th>
                        </thead>
                        <td>{props?.location?.state?.date_of_time}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Latitude </th>
                        </thead>
                        <td>{props?.location?.state?.latitude}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Longitude </th>
                        </thead>
                        <td>{props?.location?.state?.longitude}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Time Zone </th>
                        </thead>
                        <td>{props?.location?.state?.date_of_time}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Time Zone Hour </th>
                        </thead>
                        <td>{props?.location?.state?.date_of_time}</td>
                      </tr>
                      <tr>
                        <thead>
                          <th>Sun Sign </th>
                        </thead>
                        <td>{props?.location?.state?.date_of_time}</td>
                      </tr>
                    </Table>
                  </Col>
                  <Col lg="6" md="6" sm="6">
                    <Table striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Username</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                    <h5>Planetary Position</h5>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                    <h5>Predictions</h5>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                    <h5>Pratharashtakvarga</h5>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="5">
                <Row>
                  <Col sm="12">
                    <h5>Shodashvarga</h5>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="6">
                <Row>
                  <Col sm="12">
                    <h5>Fivefold Friendship</h5>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="7">
                <Row>
                  <Col sm="12">
                    <h5>Ashtakvarga</h5>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="8">
                <Row>
                  <Col sm="12">
                    <h5>Vimshottari Dasha</h5>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="9">
                <Row>
                  <Col sm="12">
                    <h5>Yogini Dasha</h5>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default YoginiDashaImage;
