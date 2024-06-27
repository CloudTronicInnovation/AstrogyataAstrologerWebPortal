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
} from "reactstrap";
import NewCode from "./newCode";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import axiosConfig from "../../../axiosConfig";
import swal from "sweetalert";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Eye, Edit, Trash2, ChevronDown } from "react-feather";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
const style = {
  table: {
    width: "100%",
    display: "table",
    borderSpacing: 0,
    borderCollapse: "separate",
  },
};
class Dosha extends React.Component {
  list = [
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
  state = {
    rowData: [],
    data: {},
    selected: "",
    horoChart: [],
    ashtakvarga: [],
    ashtalData: [],
    dropdownList: "",
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
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
      // {
      //   headerName: "Action",
      //   field: "sortorder",
      //   width: 300,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="actions cursor-pointer">
      //         <Route
      //           render={({ history }) => (
      //             <Button
      //               className="mr-50"
      //               color="success"
      //               size="sm"
      //               onClick={() =>
      //                 history.push(
      //                   `/app/conversation/yoginiDasha/${params.data?._id}`
      //                 )
      //               }
      //             >
      //               Dosha
      //             </Button>
      //           )}
      //         />
      //         <Route
      //           render={({ history }) => (
      //             <Eye
      //               className="mr-50"
      //               size="25px"
      //               color="green"
      //               onClick={() =>
      //                 history.push(
      //                   `/app/conversation/horoScopeChart/${params.data._id}`
      //                 )
      //               }
      //             />
      //           )}
      //         />

      //         <Route
      //           render={({ history }) => (
      //             <Button
      //               className="mr-50"
      //               color="success"
      //               size="sm"
      //               onClick={() =>
      //                 history.push(
      //                   `/app/conversation/birthchart/${params.data?._id}`
      //                 )
      //               }
      //             >
      //               BirthChart
      //             </Button>
      //           )}
      //         />
      //         {/* <Route
      //           render={({ history }) => (
      //             <Edit
      //               className="mr-50"
      //               size="25px"
      //               color="blue"
      //               onClick={() =>
      //                 history.push(
      //                   `/app/astrology/editAstrologer/${params.data._id}`
      //                 )
      //               }
      //             />
      //           )}
      //         /> */}
      //         {/* <Trash2
      //           className="mr-50"
      //           size="25px"
      //           color="red"
      //           onClick={() => {
      //             let selectedData = this.gridApi.getSelectedRows();
      //             this.runthisfunction(params.data._id);
      //             this.gridApi.updateRowData({ remove: selectedData });
      //           }}
      //         /> */}
      //       </div>
      //     );
      //   },
      // },
      {
        headerName: "Sign",
        field: "type",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.sign}</span>
            </div>
          );
        },
      },

      {
        headerName: "Sign Name",
        field: "sign_name",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.sign_name}</span>
            </div>
          );
        },
      },

      {
        headerName: "Planet",
        field: "planet",
        filter: true,
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.planet}</span>
            </div>
          );
        },
      },
      {
        headerName: "Planet Small",
        field: "planet_small",
        filter: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.planet_small}</span>
            </div>
          );
        },
      },
      {
        headerName: "Planet Degree",
        field: "planet_degree",
        filter: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.planet_degree}</span>
            </div>
          );
        },
      },
    ],
  };

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
        this.setState({ yoginiDasha: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleSubmit = () => {
    axiosConfig
      .post(
        `/user/horo_chart/${this.state.selected}`,
        this.state.yoginiDasha[0]
      )
      .then((response) => {
        console.log(response.data.data);
        this.setState({ rowData: response.data.data });
      })
      .catch((error) => {
        console.log("Error BirthDetails", error);
        swal("Error!", "You clicked the button!", "error");
      });
  };

  // async componentDidMount() {
  //   let astroId = localStorage.getItem("astroId");
  //   await axiosConfig
  //     .get(`/admin/intekListByastro/${astroId}`)
  //     .then((response) => {
  //       let rowData = response.data.data;
  //       this.setState({ rowData });
  //     });
  // }

  // async runthisfunction(id) {
  //   console.log(id);
  //   await axiosConfig.get(`/admin/dlt_ChatIntek/${id}`).then(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
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
      <>
        <div>
          {/* <Breadcrumbs
            breadCrumbTitle="  Horoscope List"
            breadCrumbParent="Home"
            breadCrumbActive="   Horoscope List"
          /> */}

          <Row className="app-user-list">
            <Col sm="12"></Col>
            <Col sm="12">
              <Card>
                <Row className="m-2">
                  <Col lg="3" md="3" sm="6" className="my-1">
                    <h4 sm="6" className="float-left">
                      Horoscope List
                    </h4>
                  </Col>
                  <Col lg="3" md="3" sm="6" className="my-1">
                    <select
                      name="selected"
                      onChange={(e) => this.handleChange(e)}
                    >
                      {this.list.map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </Col>

                  <Col lg="3" md="3" sm="6">
                    <Button
                      onClick={this.handleSubmit}
                      size="sm"
                      className="ml-1  btn btn-success "
                    >
                      Submit
                    </Button>
                  </Col>
                  <Col lg="3" md="3" sm="6">
                    <Route
                      render={({ history }) => (
                        <Button
                          className=" btn btn-danger float-right"
                          size="sm"
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
          <NewCode />
        </div>
      </>
    );
  }
}
export default Dosha;
