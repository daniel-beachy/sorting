import React, { useState, useEffect } from "react";
import RenderBars from "./RenderBars";
import {
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";

const Sorting = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const [barValues, setBarValues] = useState([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("Select algorithm");

  const handleAlgoChange = (sortingAlgo) => {
    setSelectedAlgorithm(sortingAlgo);
  };

  const handleRangeChange = (event) => {
    setSliderValue(event.target.value);
  };

  const generateNewArray = () => {
    setBarValues(randomizeBars(sliderValue));
  };

  const randomizeBars = (numValues) => {
    const newBars = [];
    const min = 1;
    const max = 100;
    while (newBars.length < (numValues > 4 ? numValues : 4)) {
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      newBars.push(randomValue);
    }
    return newBars;
  };

  useEffect(() => {
    setBarValues(randomizeBars(sliderValue));
  }, [sliderValue]);

  return (
    <Container fluid className="d-flex flex-column vh-100">
      <Row className="justify-content-center bg-dark">
        <Col xs="auto" className="pt-2 px-2 d-flex align-items-center">
          <Form>
            <Form.Range onChange={handleRangeChange} />
          </Form>
        </Col>
        <Col xs="auto" className="p-2 me-4">
          <Button variant="secondary" onClick={generateNewArray}>
            New Array
          </Button>
        </Col>
        <Col sm="auto" className="p-2">
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              title={selectedAlgorithm}
              id="bg-nested-dropdown"
              onSelect={handleAlgoChange}
              style={{ minWidth: "170px" }}
              variant="secondary"
            >
              <Dropdown.Item eventKey="Insertion Sort">
                Insertion Sort
              </Dropdown.Item>
              <Dropdown.Item eventKey="Selection Sort">
                Selection Sort
              </Dropdown.Item>
              <Dropdown.Item eventKey="Merge Sort">Merge Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Quick Sort">Quick Sort</Dropdown.Item>
            </DropdownButton>
            <Button disabled={selectedAlgorithm === "Select algorithm"}>
              Sort!
            </Button>
          </ButtonGroup>
        </Col>
        <Col xs="auto" className="p-2">
          <Button variant="danger" onClick={() => {}}>
            Clear
          </Button>
        </Col>
      </Row>
      <Row className="p-3 bg-secondary flex-grow-1">
        <RenderBars sizes={barValues} />
      </Row>
    </Container>
  );
};

export default Sorting;
