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
import axiosConfig from "../../../axiosConfig";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
import { Eye, Edit, Trash2, ChevronDown } from "react-feather";
import { FormattedMessage } from 'react-intl';

import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class CallHistory extends React.Component {
  state = {
    rowData: [],
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
        id: "dashboard",
        headerName: "ID",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        width: 70,
        filter: true,
      },

      {
        headerName: "Caller Sid",
        field: "callerid",
        filter: true,
        width: 300,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params.data?.Sid}</span>
            </div>
          );
        },
      },

      {
        headerName: "Name",
        field: "firstname",
        filter: true,
        width: 100,
        cellRendererFramework: (params) => {
          const fullName = params.data?.userid?.fullname || "NA"
          return (
            <div>
              <span>{fullName}</span>
            </div>
          );
        },
      },

      {
        headerName: "Date",
        field: "date",
        filter: true,
        width: 130,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <span>{params.data?.StartTime.split(" ")[0]}</span>
            </div>
          );
        },
      },

      {
        headerName: "Duration",
        field: "Duration",
        filter: true,
        width: 120,
        valueGetter: (params) => {
          const totalSeconds = params.data.Duration;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          const formattedMinutes = String(minutes).padStart(2, '0');
          const formattedSeconds = String(seconds).padStart(2, '0');
          return `${formattedMinutes}:${formattedSeconds}`;
        }
      },
      {
        headerName: "Credited",
        field: "Amount",
        filter: true,
        width: 115,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{Math.floor(params.data?.astroCredited)} ₹</span>
            </div>
          );
        },
      },

      {
        headerName: "Status",
        field: "Status",
        filter: true,
        width: 130,
        cellRendererFramework: (params) => {
          return (
            <div>
              <span>{params?.data?.Status === "completed" ? "completed" : "No Answered" }</span>     
            </div>
          );
        },
      },
    ],
  };
  async componentDidMount() {
    let astroId = localStorage.getItem("astroId");

    await axiosConfig
      .get(`/user/astroCallHistory/${astroId}`)
      .then((response) => {
        let rowData = response.data.data;
        console.log(rowData);
        this.setState({ rowData: rowData });
      });
  }

  async runthisfunction(id) {
    console.log(id);
    await axiosConfig.get(`/admin/delcustomer/${id}`).then(
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
          breadCrumbTitle={<FormattedMessage id="Call History" defaultMessage="Call Histroy" />}
          breadCrumbParent={<FormattedMessage id="Home" defaultMessage="Home" />}
          breadCrumbActive={<FormattedMessage id="Call History" defaultMessage="Call Histroy" />}
        />

        <Row className="app-user-list">
          <Col sm="12"></Col>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 sm="6" className="float-left">
                  <FormattedMessage id="Call History" defaultMessage="Call Histroy" />
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
                                (this.state.getPageSize - 1)}
                            -
                            {this.state.rowData.length -
                              this.state.currenPageSize *
                                this.state.getPageSize >
                            0
                              ? this.state.currenPageSize *
                                this.state.getPageSize
                              : this.state.rowData.length}
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
                           <FormattedMessage id="Export as CSV" defaultMessage=" Export as CSV" />
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
export default CallHistory;
