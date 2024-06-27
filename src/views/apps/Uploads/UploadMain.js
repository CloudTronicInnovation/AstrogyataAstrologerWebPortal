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
import { history } from "../../../history";
import axiosConfig from "../../../axiosConfig";
import axios from "axios";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Eye, Edit, Trash2, ChevronDown } from "react-feather";
//import classnames from "classnames";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class UploadMain extends React.Component {
  state = {
    rowData: [],
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    gallary: [],
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
        // checkboxSelection: true,
        // headerCheckboxSelectionFilteredOnly: true,
        // headerCheckboxSelection: true,
      },

      {
        headerName: "Image/Video",
        field: "file",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          // console.log(params.data);
          return (
            <div>
              {/* <span>{params.data.firstname}</span> */}
              <span>
                {params.data.file?.includes("mp4") ? <>Video</> : <>Image</>}
                {/* params?.data?.image?.length? "Image" : "Video" */}
              </span>
            </div>
          );
        },
      },

      {
        headerName: "View",
        field: "image",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div class="">
                {params?.data.file?.includes("mp4") ? (
                  <>
                    <div style={{ width: "100%" }} className="videogallry">
                      <video
                        style={{
                          width: "100%",
                          background: "none",
                          borderRadius: "8px",
                        }}
                        className="videosource"
                        width="50px"
                        height="60px"
                        controls
                      >
                        <source src={params?.data.file} type="video/mp4" />
                      </video>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ width: "100px" }} className="imagesize">
                      <img
                        style={{
                          borderRadius: "8px",
                          width: "90px",
                          height: "38px",
                          background: "none",
                        }}
                        className="imagegallry"
                        // width={320}
                        // height={250}
                        src={params?.data.file}
                        alt="gallryimg"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "Mobile No.",
      //   field: "mobile",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.userid?.mobile</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Gender",
      //   field: "gender",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.gender</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "DOB",
      //   field: "dob",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.dob</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Time",
      //   field: "date_of_time",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.date_of_time</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Birth Place",
      //   field: "birthPlace",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.birthPlace</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Birth Place",
      //   field: "birthPlace",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.birthPlace</span>
      //       </div>
      //     );
      //   },
      // },

      // {
      //   headerName: "Marital Status",
      //   field: "marital_status",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.marital_status</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Occupation",
      //   field: "occupation",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.occupation</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Topic Of concern ",
      //   field: "topic_of_cnsrn",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.topic_of_cnsrn</span>
      //       </div>
      //     );
      //   },
      // },
      // {
      //   headerName: "Your Topic Of concern ",
      //   field: "entertopic_of_cnsrn",
      //   filter: true,
      //   width: 120,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>params.data.entertopic_of_cnsrn</span>
      //       </div>
      //     );
      //   },
      // },

      //   {
      //     headerName: "Status",
      //     field: "approvedstatus",
      //     filter: true,
      //     width: 100,
      //     cellRendererFramework: (params) => {
      //       return params.value === "true" ? (
      //         <div className="badge badge-pill badge-success">
      //           {params.data.approvedstatus}
      //         </div>
      //       ) : params.value === "false" ? (
      //         <div className="badge badge-pill badge-warning">
      //           {params.data.approvedstatus}
      //         </div>
      //       ) : null;
      //     },
      //   },

      //   {
      //     headerName: "Status",
      //     field: "status",
      //     filter: true,
      //     width: 100,
      //     cellRendererFramework: (params) => {
      //       return params.value === "Online" ? (
      //         <div className="badge badge-pill badge-success">
      //           {params.data.status}
      //         </div>
      //       ) : params.value === "Offline" ? (
      //         <div className="badge badge-pill badge-warning">
      //           {params.data.status}
      //         </div>
      //       ) : null;
      //     },
      //   },
      {
        headerName: "Action",
        field: "sortorder",
        width: 100,
        cellRendererFramework: (params) => {
          return (
            <div className="actions cursor-pointer">
              {/* <Route
                render={({ history }) => (
                  <Eye
                    className="mr-50"
                    size="25px"
                    color="green"
                    onClick={() =>
                      history.push(
                        `/app/userride/viewUserRide/${params.data._id}`
                      )
                    }
                  />
                )}
              /> */}
              {/* <Route
                render={({ history }) => (
                  <Edit
                    className="mr-50"
                    size="25px"
                    color="blue"
                    onClick={() =>
                      history.push(
                        `/app/astrology/editAstrologer/${params.data._id}`
                      )
                    }
                  />
                )}
              /> */}
              <Trash2
                className="mr-50"
                size="25px"
                color="red"
                onClick={() => {
                  let selectedData = this.gridApi.getSelectedRows();
                  this.runthisfunction(params.data._id);
                  this.gridApi.updateRowData({ remove: selectedData });
                }}
              />
            </div>
          );
        },
      },
    ],
  };
  runthisfunction = (id) => {
    console.log(id);
    axiosConfig
      .get(`/user/delGalleryvideo/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  async componentDidMount() {
    let astroId = localStorage.getItem("astroId");

    axiosConfig
      .get(`/admin/get_astroGallery/${astroId}`)
      .then((res) => {
        console.log("images", res.data.data);
        this.setState({ rowData: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
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
          breadCrumbTitle="Upload Gallary"
          breadCrumbParent="Home"
          breadCrumbActive="Gallary"
        />

        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 sm="6" className="float-left">
                    Your Uploads
                  </h1>
                </Col>
                <Col>
                  <Route
                    render={({ history }) => (
                      <Button
                        className=" btn btn-success float-right"
                        onClick={
                          () => history.push("/uploadgallary")
                          // history.push("/app/astrology/addAstrologer")
                        }
                      >
                        Add Your gallary
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
                      {/* <div className="d-flex flex-wrap justify-content-between mb-1">
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
                      </div> */}
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
export default UploadMain;
