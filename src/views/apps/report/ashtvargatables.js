import React, { useEffect, useState } from "react";
import "../../../assets/scss/kundalireport.scss";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const AshtvargaTables = (props) => {
  const [ashtvargaData, setAshtvargaData] = useState(null);

  let arr = [
    "sun",
    "moon",
    "mars",
    "mercury",
    "jupiter",
    "venus",
    "saturn",
    "ascendant",
    "total",
  ];

  useEffect(() => {
    if (ashtvargaData == null) setAshtvargaData(props.data);
  }, [props.data]);

  return (
    <>
      {ashtvargaData === null ? (
        <h1>Loading...</h1>
      ) : (Object.keys(ashtvargaData).length === 0 && ashtvargaData != null) ||
        !ashtvargaData ? (
        <h1 className="text-center">No Data Found</h1>
      ) : (
        <>
          <Container>
            {/* <h1>{ashtvargaData?.ashtak_varga?.planet}</h1> */}
            <Table className="ashtavarga table-bordered table-rounded">
              <thead className="thead-dark">
                <tr>
                  <th colSpan="13" className="text-center fs-5">
                    {ashtvargaData?.ashtak_varga?.planet}
                  </th>
                </tr>
                <tr>
                  <th></th>
                  {Object.keys(ashtvargaData?.ashtak_points).map((x, index) => (
                    <th className="tableheadcase w-auto" key={index}>
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {arr.map((x, index) => (
                  <>
                    <tr key={index}>
                      <td className="tableheadcase fw-semibold text-center">
                        {x}
                      </td>
                      {Object.keys(ashtvargaData?.ashtak_points).map((y) => (
                        <td className="w-auto">
                          {JSON.stringify()}{" "}
                          {ashtvargaData?.ashtak_points[y][x]}{" "}
                        </td>
                      ))}
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
            <br />
          </Container>
        </>
      )}
    </>
  );
};

export default React.memo(AshtvargaTables);
