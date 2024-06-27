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
  Breadcrumb,
  BreadcrumbItem,
  Table,
} from "reactstrap";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import axiosConfig from "../../../axiosConfig";
import swal from "sweetalert";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Eye, Edit, Trash2, ChevronDown } from "react-feather";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class Ashtakvarga extends React.Component {
  state = {
    rowData: [],
    rowList: {},
    data: {},
    // yoginiDasha: [],
    selected: "",
    // horoChart: [],
    Ashtakvarga: [],
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
      //               Ashtakvarga
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
        headerName: "Ascendant",
        field: "ascendant",
        filter: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.ascendant}</span>
            </div>
          );
        },
      },

      {
        headerName: "Jupiter",
        field: "jupiter",
        filter: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.jupiter}</span>
            </div>
          );
        },
      },

      {
        headerName: "Mars",
        field: "mars",
        filter: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.mars}</span>
            </div>
          );
        },
      },

      {
        headerName: "mercury",
        field: "mercury",
        filter: true,
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data.mercury}</span>
            </div>
          );
        },
      },
      //   {
      //     headerName: "Moon",
      //     field: "moon",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.moon}</span>
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     headerName: "saturn",
      //     field: "saturn",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.saturn}</span>
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     headerName: "sun",
      //     field: "sun",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.sun}</span>
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     headerName: "total",
      //     field: "total",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.planet_degree}</span>
      //         </div>
      //       );
      //     },
      //   },

      //   {
      //     headerName: "venus",
      //     field: "venus",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.planet_degree}</span>
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     headerName: "Sign Id",
      //     field: "signId",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.planet_degree}</span>
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     headerName: "Sign Name",
      //     field: "signName",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.signName}</span>
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     headerName: "Type",
      //     field: "Type",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.planet_degree}</span>
      //         </div>
      //       );
      //     },
      //   },
      //   {
      //     headerName: "Planet",
      //     field: "Planet",
      //     filter: true,
      //     width: 150,
      //     cellRendererFramework: (params) => {
      //       return (
      //         <div>
      //           <span>{params.data.planet_degree}</span>
      //         </div>
      //       );
      //     },
      //   },
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
        // console.log("formDetails>>", response.data.data);
        this.setState({ Ashtakvarga: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmitList = () => {
    console.log(this.state.dropdownList);
    axiosConfig
      .post(
        `/user/Ashtakvarga/${this.state.dropdownList}`,
        this.state.Ashtakvarga[0]
      )
      .then((response) => {
        console.log(response.data.data);
        // this.setState({ Ashtakvarga: response.data.data });
        this.setState({
          rowList: response.data.data.ashtak_points.aquarius,
        });
        console.log("CVCVCV", response.data.data.ashtak_points.aquarius);
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
      <div>
        {/* <Breadcrumbs
          breadCrumbTitle="  Ashtak List"
          breadCrumbParent="Home"
          breadCrumbActive="   Ashtak List"
        /> */}

        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 sm="6" className="float-left">
                    Ashtak List
                  </h1>
                </Col>
                <Col>
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
                <Col>
                  <Button
                    onClick={(e) => this.handleSubmitList(e)}
                    className="ml-1  btn btn-success "
                  >
                    Submit
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
      </div>
    );
  }
}
export default Ashtakvarga;
