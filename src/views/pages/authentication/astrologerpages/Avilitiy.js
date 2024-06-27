import React, { useState } from "react";
import { Col, Row } from "reactstrap";

function Avilitiy() {
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  return (
    <div className="App">
      {/* <h3><a href="https://cluemediator.com">Clue Mediator</a></h3> */}
      console.log("check",inputList)
      {inputList.map((x, i) => {
        return (
          <div className="box">
            <Row>
              <Col md="6">
                <div className="form-group mtb-10">
                  <input
                    name="firstName"
                    placeholder="Enter Day"
                    value={x.firstName}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="form-group mtb-10">
                  <input
                    className="ml10"
                    name="lastName"
                    placeholder="Enter Time"
                    value={x.lastName}
                    onChange={(e) => handleInputChange(e, i)}
                  />
                </div>
              </Col>
            </Row>
            <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
    </div>
  );
}

export default Avilitiy;
