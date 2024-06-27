import React from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  CustomInput,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Eye, Edit, Trash2, ChevronDown } from "react-feather";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class InTakeList extends React.Component {
  state = {
    modal: false,
    rowData: [],
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      resizable: true,
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "S.No",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        width: 100,
        filter: true,
      },
      {
        headerName: "Action",
        field: "sortorder",
        width: 300,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              <Route
                render={({ history }) => (
                  <Button
                    className="mr-50"
                    color="success"
                    size="sm"
                    onClick={() => this.handleLang(params)}
                  >
                    Dosha
                  </Button>
                )}
              />
              <Route
                render={({ history }) => (
                  <Eye
                    className="mr-50"
                    size="25px"
                    color="green"
                    onClick={() =>
                      history.push(
                        `/app/conversation/horoScopeChart/${params.data._id}`
                      )
                    }
                  />
                )}
              />
            </div>
          );
        },
      },
      {
        headerName: "Type",
        field: "type",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.type}</span>
            </div>
          );
        },
      },

      {
        headerName: "Name",
        field: "firstname",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.firstname}</span>
            </div>
          );
        },
      },

      {
        headerName: "Gender",
        field: "gender",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.gender}</span>
            </div>
          );
        },
      },
      {
        headerName: "DOB",
        field: "dob",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.dob}</span>
            </div>
          );
        },
      },
      {
        headerName: "Time",
        field: "date_of_time",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.date_of_time}</span>
            </div>
          );
        },
      },
      {
        headerName: "Birth Place",
        field: "birthPlace",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.birthPlace}</span>
            </div>
          );
        },
      },

      {
        headerName: "Marital Status",
        field: "marital_status",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.marital_status}</span>
            </div>
          );
        },
      },
      {
        headerName: "Occupation",
        field: "occupation",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.occupation}</span>
            </div>
          );
        },
      },
      {
        headerName: "Topic Of concern ",
        field: "topic_of_cnsrn",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.topic_of_cnsrn}</span>
            </div>
          );
        },
      },
      {
        headerName: "Your Topic Of concern ",
        field: "entertopic_of_cnsrn",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.entertopic_of_cnsrn}</span>
            </div>
          );
        },
      },
    ],
  };

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  };
  async componentDidMount() {
    let astroId = localStorage.getItem("astroId");
    await axiosConfig
      .get(`/admin/intekListByastro/${astroId}`)
      .then((response) => {
        let rowData = response.data.data;
        this.setState({ rowData });
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  handleSubmit = () => {
    alert("submited");
    this.setState({ modal: !this.state.modal });
    // const formData = {};
    // axiosConfig
    //   .post(`/user/birth_details`, formData)
    //   .then((response) => {
    //     console.log(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  handleLang = (params) => {
    console.log(params?.data);
    axiosConfig
      .post(`/user/geo_detail`, {
        place: params.data.birthPlace,
      })
      .then(() => {
        this.setState({
          latitude: params?.data?.longitude,
          longitude: params?.data?.latitude,
        });
        this.props.history.push({
          pathname: `/app/conversation/yoginiDasha/${params.data?._id}`,
          state: params.data,
          // anotherParam: this.state.latitude,
          // anotherParam2: this.state.longitude,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(params.data);
    // const { astroid, userid, date_of_time, dob } = params.data;
    // const arr = date_of_time?.split(":");
    // const hour = parseInt(arr[0]);
    // const min = parseInt(arr[1]);
    // const date = new Date(dob);
    // const Year = date.getFullYear();
    // const month = date.getMonth();
    // const actualmonth = month + 1;
    // const Day = date.getDate();

    // const payload = {
    //   astroid: astroid,
    //   userid: userid._id,
    //   hour: hour,
    //   min: min,
    //   day: Day,
    //   month: actualmonth,
    //   year: Year,
    //   lat: this.state.latitude,
    //   lon: this.state.longitude,
    // };
    // axiosConfig
    //   .post(`/user/birth_details`, payload)
    //   .then((response) => {
    //     console.log(response.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // axiosConfig.post(`/user/birth_details`,);
  };
  async runthisfunction(id) {
    console.log(id);
    await axiosConfig.get(`/admin/dlt_ChatIntek/${id}`).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };
  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };
  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };
  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Conversion InTake List"
          breadCrumbParent="Home"
          breadCrumbActive=" Conversion InTake List "
        />

        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 sm="6" className="float-left">
                    Conversion InTake List
                  </h1>
                </Col>
                <Col>
                  <Button color="primary" onClick={this.toggleModal}>
                    User Form
                  </Button>
                </Col>
              </Row>
              <CardBody>
                {this.state.rowData === null ? null : (
                  <div className="ag-theme-material w-100 my-2 ag-grid-table">
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div className="mb-1">
                        <UncontrolledDropdown className="p-1 ag-dropdown">
                          <DropdownToggle tag="div">
                            {this.gridApi
                              ? this.state.currenPageSize
                              : "" * this.state.getPageSize -
                                (this.state.getPageSize - 1)}{" "}
                            -{" "}
                            {this.state.rowData.length -
                              this.state.currenPageSize *
                                this.state.getPageSize >
                            0
                              ? this.state.currenPageSize *
                                this.state.getPageSize
                              : this.state.rowData.length}{" "}
                            of {this.state.rowData.length}
                            <ChevronDown className="ml-50" size={15} />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              tag="div"
                              onClick={() => this.filterSize(20)}
                            >
                              20
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => this.filterSize(50)}
                            >
                              50
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => this.filterSize(100)}
                            >
                              100
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => this.filterSize(134)}
                            >
                              134
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between mb-1">
                        <div className="table-input mr-1">
                          <Input
                            placeholder="search..."
                            onChange={(e) =>
                              this.updateSearchQuery(e.target.value)
                            }
                            value={this.state.value}
                          />
                        </div>
                        <div className="export-btn">
                          <Button.Ripple
                            color="primary"
                            onClick={() => this.gridApi.exportDataAsCsv()}
                          >
                            Export as CSV
                          </Button.Ripple>
                        </div>
                      </div>
                    </div>
                    <ContextLayout.Consumer>
                      {(context) => (
                        <AgGridReact
                          gridOptions={{}}
                          rowSelection="multiple"
                          defaultColDef={defaultColDef}
                          columnDefs={columnDefs}
                          rowData={rowData}
                          onGridReady={this.onGridReady}
                          colResizeDefault={"shift"}
                          animateRows={true}
                          floatingFilter={false}
                          pagination={true}
                          paginationPageSize={this.state.paginationPageSize}
                          pivotPanelShow="always"
                          enableRtl={context.state.direction === "rtl"}
                        />
                      )}
                    </ContextLayout.Consumer>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <Label>Name *</Label>
              <Input type="text" placeholder="Name" />
              <Label>Place of Birth *</Label>
              <Input type="text" placeholder="Place of Birth" />
              <Label>Birth Date *</Label>
              <Input type="date" />
              <Label>Birth Time *</Label>
              <Input type="time" placeholder="Birth Time" />
              <Label>Email*</Label>
              <Input type="email" placeholder="Enter Email" />

              <Label>Select Gender</Label>
              <CustomInput
                required
                type="select"
                name="gender"
                // value={category}
                onChange={this.handleChange}
              >
                <option>....Select Gender.....</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </CustomInput>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default InTakeList;
