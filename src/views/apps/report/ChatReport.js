/* eslint-disable array-callback-return */
import React from "react";
import { FormattedMessage } from 'react-intl';
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

import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import { Eye, Edit, Trash2, ChevronDown } from "react-feather";
import { ContextLayout } from "../../../utility/context/Layout";
import "../../../assets/scss/pages/users.scss";
import { AgGridReact } from "ag-grid-react";
import { Route } from "react-router-dom";
import axios from "axios";

import axiosConfig from "../../../axiosConfig";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class ChatReport extends React.Component {
  state = {
    rowData: [],
    chatData: [],
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
      //   headerName: "Status",
      //   field: "Status",
      //   filter: true,
      //   width: 200,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div>
      //         <span>{params.data?.Status}</span>
      //       </div>
      //     );
      //   },
      // },

      {
        headerName: "Duration",
        field: "duration",
        filter: true,
        width: 180,
        valueGetter: (params) => {
          const totalSeconds = params.data.totalDuration;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          const formattedMinutes = String(minutes).padStart(2, '0');
          const formattedSeconds = String(seconds).padStart(2, '0');
          return `${formattedMinutes}:${formattedSeconds}`;
        },
        cellRendererFramework: (params) => {
          return (
            <div>
              {params?.data?.userdeductedAmt === 0 ? (
                <>
                  <span>Not Answered</span>
                </>
              ) : (
                <>
                  <span>{params.value} Min</span>
                </>
              )}
            </div>
          );
        },
      },
      {
        headerName: "UserName",
        field: "duration",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          const userName = params.data?.userId?.fullname || "Unavailable";
          return (
            <div>
              <span>{userName}</span>
            </div>
          );
        },
      },
      

      {
        headerName: "Date",
        field: "date",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data?.createdAt.split("T")[0]}</span>
            </div>
          );
        },
      },

      {
        headerName: "Deducted Amount",
        field: "Deducted Amount",
        filter: true,
        width: 200,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data?.userdeductedAmt}</span>
            </div>
          );
        },
      },
    ],
  };

  componentDidMount() {
    // let astroid = localStorage.getItem("astroId");
    // axiosConfig.get(`/user/astroChathistory/${astroid}`).then((response) => {
    //   // console.log("Response Data: ", response.data.data);
    //   let AllReport = response.data.data;
    //   let rowData = AllReport?.filter((value) => {
    //     if (value?.type === "Chat") {
    //       return value;
    //     }
    //   });
    //   // console.log("Filtered Row Data: ", rowData);
    //   this.setState({ rowData });
    // });
    this.ChatHistoryList();
  }
  
  ChatHistoryList = () => {
    // setInterval(() => {
      let astroid = localStorage.getItem("astroId");
      axiosConfig.get(`/user/astroChathistory/${astroid}`).then((response) => {
        console.log(response);
        let AllReport = response.data.data;
        let rowData = AllReport?.filter((value) => {
          if (value?.type === "chat") {
            return value;
          }
        });
        this.setState({ rowData });
        console.log("Filtered Row Data in Interval: ", rowData);
      });
    // }, 10000);
  };
  

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
          breadCrumbTitle={ <FormattedMessage id="Chat Report" defaultMessage="Chat Report"/>}
          breadCrumbParent={ <FormattedMessage id="Home" defaultMessage="Home"/>}
          breadCrumbActive={ <FormattedMessage id="Chat Report" defaultMessage="Chat Report"/>}
        />
        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 sm="6" className="float-left">
                  <FormattedMessage id="Chat Report" defaultMessage="Chat Report"/>
                  </h1>
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
                            <FormattedMessage id="Export as CSV" defaultMessage="Export as CSV"/>
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
                          paginationPageSize={this.state.paginationPageSize || 20}
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
export default ChatReport;
