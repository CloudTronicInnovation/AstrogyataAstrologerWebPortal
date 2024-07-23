import React, { useEffect, useState } from "react";
import "../../../assets/scss/kundalireport.scss";
import { Container, Row, Col, TabContent, TabPane, Button } from "reactstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import { panchanURL } from "../../../axiosConfig";
// import AshtvargaTables from "./ashtvargatables";
import AshtvargaTables from "./ashtvargatables";
import { FormattedMessage } from "react-intl";
import { PANCHANG_KEY } from "../../../panchangCredetials";
import moment from "moment";
import { useDispatch } from "react-redux";
import { chatAcceptStatus } from "../../../redux/actions/chat";

const UserKundaliReport = (props) => {
  const [activelink, setActiveLink] = useState("0");
  const [basicDetails, setBasicDetails] = useState([]);
  const [basicPanchang, setBasicPanchang] = useState(null);
  const [planetaryPosition, setPlanetaryPosition] = useState(null);
  const [vimshottariData, setVimshottariData] = useState(null);
  const [yoginiDashaData, setYoginiDashaData] = useState(null);

  const [lagnaSvg, setlagnaSvg] = useState("");
  const [moonSvg, setmoonSvg] = useState("");
  const [sunSvg, setsunSvg] = useState("");
  const [chalitSvg, setchalitSvg] = useState("");
  const [horaSvg, sethoraSvg] = useState("");
  const [dreshkanSvg, setdreshkanSvg] = useState("");
  const [shashtymshaSvg, setshashtymshasvg] = useState("");
  const [svgVishible, setSvgVisible] = useState({
    langnaSvg: false,
    moonSvg: false,
    sunSvg: false,
    chalitSvg: false,
    horaSvg: false,
    dreshkanSvg: false,
    shashtymshaSvg: false,
  });

  const [reqData, setReqData] = useState();

  const [sunAshvarga, setSunAshvarga] = useState(null);
  const [moonAshvarga, setMoonAshvarga] = useState(null);
  const [marsAshvarga, setMarsAshvarga] = useState(null);
  const [mercuryAshvarga, setMercuryAshvarga] = useState(null);
  const [jupiterAshvarga, setJupiterAshvarga] = useState(null);
  const [venusAshvarga, setVenusAshvarga] = useState(null);
  const [saturnAshvarga, setSaturnAshvarga] = useState(null);

  const [userData, setUserData] = useState(null);
  const [indexValue, setIndexValue] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userKundaliInfo")) fetchPanchangDetails();
    setBasicDetails(JSON.parse(localStorage.getItem("userKundaliInfo")));
    setUserData(props.location?.state?.user);
    setIndexValue(props.location.state?.indexValue);
    dispatch(chatAcceptStatus("accepted"));
  }, []);

  const fetchPanchangDetails = () => {
    const { dob, date_of_time, userLatLong } = JSON.parse(
      localStorage.getItem("userKundaliInfo")
    );
    const { day, month, year } = getDayMonthYear(dob);

    const reqPanchangData = {
      day: day,
      month: month,
      year: year,
      hour: date_of_time?.split(":")[0],
      min: date_of_time?.split(":")[1],
      // hour:2,min:4,
      // min: JSON.parse(localStorage.getItem("userKundaliInfo"))?.dateOfBirth?.split(".")[1],
      lat: userLatLong?.latitude,
      lon: userLatLong?.longitude,
      // lat: "11.66613000",
      // lon: "92.74635000",
      tzone: "5.5", // default timezone
    };

    const postRequest = (url) =>
      panchanURL.post(url, reqPanchangData, {
        headers: {
          Authorization: "Basic " + PANCHANG_KEY,
        },
      });

    const requests = [
      postRequest(`/v1/basic_panchang`),
      postRequest(`/v1/horo_chart_image/D1`),
      postRequest(`/v1/horo_chart_image/MOON`),
      postRequest(`/v1/horo_chart_image/SUN`),
      postRequest(`/v1/horo_chart_image/chalit`),
      postRequest(`/v1/horo_chart_image/D2`),
      postRequest(`/v1/horo_chart_image/D3`),
      postRequest(`/v1/horo_chart_image/D60`),
    ];

    Promise.all(requests).then(
      ([
        panchangRes,
        lagnaRes,
        moonRes,
        sunRes,
        chalitRes,
        D2Res,
        D3Res,
        D60Res,
      ]) => {
        setBasicPanchang(panchangRes.data);

        const responseMap = [
          { key: "lagnaSvg", res: lagnaRes },
          { key: "moonSvg", res: moonRes },
          { key: "sunSvg", res: sunRes },
          { key: "chalitSvg", res: chalitRes },
          { key: "horaSvg", res: D2Res },
          { key: "dreshkanSvg", res: D3Res },
          { key: "shashtymshaSvg", res: D60Res },
        ];

        let newSvgVisible = { ...svgVishible };

        responseMap.forEach(({ key, res }) => {
          if (res?.data && Object.keys(res.data).length > 0) {
            newSvgVisible[key] = true;

            switch (key) {
              case "lagnaSvg":
                setlagnaSvg(res.data.svg);
                break;
              case "moonSvg":
                setmoonSvg(res.data.svg);
                break;
              case "sunSvg":
                setsunSvg(res.data.svg);
                break;
              case "chalitSvg":
                setchalitSvg(res.data.svg);
                break;
              case "horaSvg":
                sethoraSvg(res.data.svg);
                break;
              case "dreshkanSvg":
                setdreshkanSvg(res.data.svg);
                break;
              case "shashtymshaSvg":
                setshashtymshasvg(res.data.svg);
                break;
              default:
                break;
            }
          }
        });
        setSvgVisible(newSvgVisible);
        setReqData(reqPanchangData);
      }
    );
  };

  const fetchPlanetaryPosition = () => {
    panchanURL
      .post("v1/planets", reqData, {
        headers: {
          Authorization: "Basic " + PANCHANG_KEY,
        },
      })
      .then((res) => {
        setPlanetaryPosition(res.data);
      })
      .catch((err) => {
        setPlanetaryPosition({});
        console.log(err);
      });
  };

  const fetchVimshottari = () => {
    panchanURL
      .post("/v1/current_vdasha", reqData, {
        headers: {
          Authorization: "Basic " + PANCHANG_KEY,
        },
      })
      .then((res) => {
        setVimshottariData(res.data);
      })
      .catch((err) => {
        setVimshottariData({});
        console.log(err);
      });
  };

  const fetchYoginiDasha = () => {
    panchanURL
      .post("/v1/major_yogini_dasha", reqData, {
        headers: {
          Authorization: "Basic " + PANCHANG_KEY,
        },
      })
      .then((res) => {
        setYoginiDashaData(res.data);
      })
      .catch((err) => {
        setYoginiDashaData({});
        console.log(err);
      });
  };

  const fetchAshvarga = async () => {
    const postRequest = (url) =>
      panchanURL.post(url, reqData, {
        headers: {
          Authorization: "Basic " + PANCHANG_KEY,
        },
      });

    const requests = [
      postRequest(`/v1/planet_ashtak/SUN`),
      postRequest(`/v1/planet_ashtak/MOON`),
      postRequest(`/v1/planet_ashtak/MARS`),
      postRequest(`/v1/planet_ashtak/MERCURY`),
      postRequest(`/v1/planet_ashtak/JUPITER`),
      postRequest(`/v1/planet_ashtak/VENUS`),
      postRequest(`/v1/planet_ashtak/SATURN`),
    ];

    Promise.allSettled(requests)
      .then((results) => {
        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            switch (index) {
              case 0:
                setSunAshvarga(result.value.data);
                break;
              case 1:
                setMoonAshvarga(result.value.data);
                break;
              case 2:
                setMarsAshvarga(result.value.data);
                break;
              case 3:
                setMercuryAshvarga(result.value.data);
                break;
              case 4:
                setJupiterAshvarga(result.value.data);
                break;
              case 5:
                setVenusAshvarga(result.value.data);
                break;
              case 6:
                setSaturnAshvarga(result.value.data);
                break;
              default:
                break;
            }
          } else {
            switch (index) {
              case 0:
                setSunAshvarga({});
                break;
              case 1:
                setMoonAshvarga({});
                break;
              case 2:
                setMarsAshvarga({});
                break;
              case 3:
                setMercuryAshvarga({});
                break;
              case 4:
                setJupiterAshvarga({});
                break;
              case 5:
                setVenusAshvarga({});
                break;
              case 6:
                setSaturnAshvarga({});
                break;
              default:
                break;
            }
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const kundli_report_menu = [
    { label: "Basic Details", value: 1 },
    { label: "Planetary Position", value: 2 },
    // { label: "Predictions" },
    // { label: "Prastharashtakvarga" },
    // { label: "Shodashvarga" },
    // { label: "Fivefold Friendship" },
    { label: "Ashtakvarga", value: 3 },
    { label: "Vimshottari Dasha", value: 4 },
    { label: "Yogini Dasha", value: 5 },
  ];

  function getAMPM(hour, minute) {
    let period = hour >= 12 ? "PM" : "AM";
    let adjustedHour = hour % 12;
    adjustedHour = adjustedHour ? adjustedHour : 12; // the hour '0' should be '12'
    let formattedMinute = minute < 10 ? `0${minute}` : minute; // pad single digit minutes with a leading zero
    return `${adjustedHour}:${formattedMinute} ${period}`;
  }

  function decimalToDMS(decimal) {
    const degrees = Math.floor(decimal);
    const minutesFloat = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesFloat);
    const secondsFloat = (minutesFloat - minutes) * 60;
    const seconds = Math.round(secondsFloat);
    return `${degrees}° ${minutes}' ${seconds}''`;
  }

  function getDayMonthYear(dateString) {
    let date = moment(dateString, "DD/MM/YYYY");
    const day = date.format("DD"); // returns the day of the month (1-31)
    const month = date.format("MM"); // returns the month (0-11),
    const year = date.format("YYYY"); // returns the year (four digits)
    return { day, month, year };
  }

  const handleLinkClick = (key) => {
    setActiveLink(key.toString());
    if (key === 0 && basicPanchang == null) fetchPanchangDetails();
    if (key === 1 && planetaryPosition == null) fetchPlanetaryPosition();
    if (key === 2 && sunAshvarga == null) fetchAshvarga();
    if (key === 3 && vimshottariData == null) fetchVimshottari();
    if (key === 4 && yoginiDashaData == null) fetchYoginiDasha();
  };

  const Nodatafound = () => {
    return <h1 className="text-center my-4">Data Not Found</h1>;
  };

  return (
    <>
      <Link
        to={{
          pathname: "/app/astrochat/chatastro",
          state: { ...userData, indexValue },
        }}
        className="btn btn-danger float-right btn-sm text-white"
      >
        <FormattedMessage id="Back" defaultMessage="Back" />
      </Link>

      {basicDetails == null ? (
        <Nodatafound />
      ) : (
        <>
          <div className="tabs pt-0">
            {(kundli_report_menu || []).map((item, key) => (
              <>
                <input
                  type="radio"
                  id={`radio-${key + 1}`}
                  name="tabs"
                  onClick={() => handleLinkClick(key)}
                  key={key}
                />
                <label className="tab" htmlFor={`radio-${key + 1}`}>
                  {item.label}
                </label>
              </>
            ))}
            <span className="glider"></span>
          </div>
          <TabContent activeTab={activelink}>
            <TabPane tabId="0">
              <Row>
                <Col md="6" sm="12">
                  {basicDetails == null ? (
                    <h1 className="text-center">Loading..</h1>
                  ) : (
                    <Table
                      bordered
                      className="smooth-transition table-rounded basic-detail"
                    >
                      <tbody>
                        <tr>
                          <th
                            colSpan={2}
                            className="bg-success text-white text-center"
                          >
                            <FormattedMessage
                              id="Basic Details"
                              defaultMessage="Basic Details"
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage id="Name" defaultMessage="Name" />
                          </th>
                          <td>{basicDetails?.firstname}</td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Birth Date"
                              defaultMessage="Birth Date"
                            />
                          </th>
                          <td>{basicDetails?.dob}</td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Birth Time"
                              defaultMessage="Birth Time"
                            />
                          </th>
                          <td>
                            {getAMPM(
                              basicDetails?.date_of_time?.split(":")[0],
                              basicDetails?.date_of_time?.split(":")[1]
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Place of Birth"
                              defaultMessage="Birth Place"
                            />
                          </th>
                          <td>{basicDetails && basicDetails?.birthPlace}</td>
                        </tr>
                        {/* <tr>
                    <th>Latitude</th>
                    <td>
                      {basicDetails.birthplace != null
                        ? decimalToDMS(basicDetails.birthplace.city.latitude)
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <th>Longitude</th>
                    <td>
                      {basicDetails.birthplace != null
                        ? decimalToDMS(basicDetails.birthplace.city.longitude)
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <th>Time Zone</th>
                    <td>
                      {basicDetails.birthplace != null
                        ? basicDetails.birthplace.country.timezones[0].zoneName
                        : ""}
                    </td>
                  </tr>
                  <tr>
                    <th>Time Zone Hour</th>
                    <td>
                      {basicDetails.birthplace != null
                        ? basicDetails.birthplace.country.timezones[0]
                            .gmtOffsetName
                        : ""}
                    </td>
                  </tr> */}
                      </tbody>
                    </Table>
                  )}
                </Col>
                <Col md="6" sm="12" className="smooth-transition">
                  {basicPanchang == null ? (
                    <h1 className="text-center">Loading..</h1>
                  ) : basicPanchang != null &&
                    Object.keys(basicPanchang).length === 0 ? (
                    <Nodatafound />
                  ) : (
                    <Table
                      bordered
                      className="kundlitable table-rounded panchang-detail"
                    >
                      <tbody>
                        <tr>
                          <th
                            colSpan={2}
                            className="bg-success text-white text-center"
                          >
                            <FormattedMessage
                              id="Panchang Details"
                              defaultMessage="Panchang Details"
                            />
                          </th>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage id="Day" defaultMessage="Day" />
                          </th>
                          <td>
                            {basicPanchang != null ? basicPanchang.day : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Tithi"
                              defaultMessage="Tithi"
                            />
                          </th>
                          <td>
                            {basicPanchang != null ? basicPanchang.tithi : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Nakshatra"
                              defaultMessage="Nakshatra"
                            />
                          </th>
                          <td>
                            {basicPanchang != null
                              ? basicPanchang.nakshatra
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage id="Yog" defaultMessage="Yog" />
                          </th>
                          <td>
                            {basicPanchang != null ? basicPanchang.yog : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Karana"
                              defaultMessage="Karana"
                            />
                          </th>
                          <td>
                            {basicPanchang != null ? basicPanchang.karan : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Sun Rise"
                              defaultMessage="Sun Rise"
                            />
                          </th>
                          <td>
                            {basicPanchang != null ? basicPanchang.sunrise : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Sun Set"
                              defaultMessage="Sun Set"
                            />
                          </th>
                          <td>
                            {basicPanchang != null ? basicPanchang.sunset : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Vedic Sunrise"
                              defaultMessage="Vedic Sunrise"
                            />
                          </th>
                          <td>
                            {basicPanchang != null
                              ? basicPanchang.vedic_sunrise
                              : ""}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Vedic Sunset"
                              defaultMessage="Vedic Sunset"
                            />
                          </th>

                          <td>
                            {basicPanchang != null
                              ? basicPanchang.vedic_sunset
                              : ""}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  )}
                </Col>

                <Col md="12" className="smooth-transition">
                  <p className="bg-success text-white text-center m-auto fw-bold p-2 pb-0 mb-0">
                    <FormattedMessage
                      id="Horoscope Chart"
                      defaultMessage="Horoscope Chart"
                    />
                  </p>
                  <Row className="border" style={{ margin: ".5px" }}>
                    {svgVishible?.lagnaSvg && (
                      <Col md="6" className="panchang-chart mt-2 text-center">
                        <h6 className="fw-semibold text-center">
                          {" "}
                          <FormattedMessage
                            id="Lagna Chart"
                            defaultMessage="Lagna Chart"
                          />
                        </h6>
                        {ReactHtmlParser(lagnaSvg)}
                      </Col>
                    )}

                    {svgVishible?.moonSvg && (
                      <Col md="6" className="panchang-chart mt-2 text-center">
                        <h6 className="fw-semibold text-center">
                          {" "}
                          <FormattedMessage
                            id="Moon Chart"
                            defaultMessage="Moon Chart"
                          />
                        </h6>
                        {ReactHtmlParser(moonSvg)}
                      </Col>
                    )}
                    {/* SUN CHART  */}
                    {svgVishible?.sunSvg && (
                      <Col md="6" className="panchang-chart mt-2 text-center">
                        <h6 className="fw-semibold text-center">
                          <FormattedMessage
                            id="Sun Chart"
                            defaultMessage="Sun Chart"
                          />
                        </h6>
                        {ReactHtmlParser(sunSvg)}
                      </Col>
                    )}
                    {/* CHALIT CHART  */}
                    {/* {svgVishible?.chalitSvg && (
                              <Col
                              md="6"
                              className="panchang-chart mt-2 text-center"
                              >
                                <h6 className="fw-semibold text-center">
                                  Chalit Chart
                                </h6>
                                {ReactHtmlParser(chalitSvg)}
                              </Col>
                              )} */}

                    {/* HORA CHART  */}
                    {svgVishible?.horaSvg && (
                      <Col md="6" className="panchang-chart mt-2 text-center">
                        <h6 className="fw-semibold text-center">
                          <FormattedMessage
                            id="Hora(Wealth / Income Chart)"
                            defaultMessage="Hora(Wealth / Income Chart)"
                          />
                        </h6>
                        {ReactHtmlParser(horaSvg)}
                      </Col>
                    )}
                    {/* DRESHKAN CHART  */}
                    {svgVishible?.dreshkanSvg && (
                      <Col md="6" className="panchang-chart mt-2 text-center">
                        <h6 className="fw-semibold text-center">
                          <FormattedMessage
                            id="Drekkana(Relationship with siblings)"
                            defaultMessage="Drekkana(Relationship with siblings)"
                          />
                        </h6>
                        {ReactHtmlParser(dreshkanSvg)}
                      </Col>
                    )}
                    {/* SHASHTYMSHA CHART  */}
                    {svgVishible?.shashtymshaSvg && (
                      <Col md="6" className="panchang-chart mt-2 text-center">
                        <h6 className="fw-semibold text-center">
                          <FormattedMessage
                            id="Shastiamsa(Summary of charts)"
                            defaultMessage="Shastiamsa(Summary of charts)"
                          />
                        </h6>
                        {ReactHtmlParser(shashtymshaSvg)}
                      </Col>
                    )}
                    {!svgVishible?.moonSvg && (
                      <Col md="6" className="text-center my-4">
                        No Data Found
                      </Col>
                    )}
                    {!svgVishible?.lagnaSvg && (
                      <Col md="6" className="text-center my-4">
                        No Data Found
                      </Col>
                    )}
                  </Row>
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="1">
              <Row>
                <Col sm="12" className="kundlitable smooth-transition">
                  {planetaryPosition == null ? (
                    <h1 className="text-center">Loading..</h1>
                  ) : planetaryPosition != null &&
                    Object.keys(planetaryPosition).length === 0 ? (
                    <Nodatafound />
                  ) : (
                    <Table className="planet-position table-bordered table-rounded">
                      <thead className="thead-dark">
                        <tr>
                          <th>
                            <FormattedMessage
                              id="Planet"
                              defaultMessage="Planet"
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="Rashi"
                              defaultMessage="Rashi"
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="Longitude"
                              defaultMessage="Longitude"
                            />
                          </th>
                          <th>
                            <FormattedMessage
                              id="Nakshatra"
                              defaultMessage="Nakshatra"
                            />
                          </th>
                          <th>
                            <FormattedMessage id="Pada" defaultMessage="Pada" />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {planetaryPosition != null &&
                          planetaryPosition.map((planet, key) => (
                            <tr key={key}>
                              <td>{planet.name}</td>
                              <td>{planet.sign}</td>
                              <td>{decimalToDMS(planet.fullDegree)}</td>
                              <td>{planet.nakshatra}</td>
                              <td>{planet.nakshatra_pad}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="2">
              <>
                <Row>
                  <Col sm="12" className="kundlitable smooth-transition">
                    <AshtvargaTables data={sunAshvarga} />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="kundlitable smooth-transition">
                    <AshtvargaTables data={moonAshvarga} />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="kundlitable smooth-transition">
                    <AshtvargaTables data={marsAshvarga} />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="kundlitable smooth-transition">
                    <AshtvargaTables data={mercuryAshvarga} />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="kundlitable smooth-transition">
                    <AshtvargaTables data={jupiterAshvarga} />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="kundlitable smooth-transition">
                    <AshtvargaTables data={venusAshvarga} />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" className="kundlitable smooth-transition">
                    <AshtvargaTables data={saturnAshvarga} />
                  </Col>
                </Row>
              </>
            </TabPane>

            <TabPane tabId="3">
              {vimshottariData === null ? (
                <h1 className="text-center">Loading...</h1>
              ) : vimshottariData != null &&
                Object.keys(vimshottariData).length === 0 ? (
                <Nodatafound />
              ) : (
                <Row>
                  {Object.keys(vimshottariData).map((x, index) => (
                    <>
                      <Col md="4" sm="12" className="kundlitable" key={index}>
                        <Table className="table-bordered table-rounded text-center">
                          <thead className="thead-dark">
                            <tr>
                              <th colSpan={2} className="bg-success text-white">
                                {vimshottariData[x].planet}
                              </th>
                            </tr>
                            <tr>
                              <th className="fw-normal">
                                <FormattedMessage
                                  id="Start"
                                  defaultMessage="Start"
                                />
                              </th>
                              <th className="fw-normal">
                                <FormattedMessage
                                  id="End"
                                  defaultMessage="End"
                                />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{vimshottariData[x].start}</td>
                              <td>{vimshottariData[x].end}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </>
                  ))}
                </Row>
              )}
            </TabPane>

            <TabPane tabId="4">
              {yoginiDashaData === null ? (
                <h1 className="text-center">Loading...</h1>
              ) : yoginiDashaData != null &&
                Object.keys(yoginiDashaData).length === 0 ? (
                <Nodatafound />
              ) : (
                <Row>
                  {yoginiDashaData.map((item, key) => (
                    <>
                      <Col md="4" sm="12" className="kundlitable" key={key}>
                        <Table className="table-bordered table-rounded table-stright text-center">
                          <thead className="thead-dark">
                            <tr>
                              <th colSpan={2} className="bg-success text-white">
                                {item.dasha_name}
                              </th>
                            </tr>
                            <tr>
                              <th className="fw-normal">
                                <FormattedMessage
                                  id="Start"
                                  defaultMessage="Start"
                                />
                              </th>
                              <th className="fw-normal">
                                <FormattedMessage
                                  id="End"
                                  defaultMessage="End"
                                />
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item.start_date}</td>
                              <td>{item.end_date}</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </>
                  ))}
                </Row>
              )}
            </TabPane>
          </TabContent>
        </>
      )}
    </>
  );
};

export default React.memo(UserKundaliReport);
