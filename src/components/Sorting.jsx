import React, { useState, useEffect } from "react";
import snail from "./img/snail.png";
import rabbit from "./img/rabbit.png";
import rocket from "./img/rocket.png";
import bubbleSort from "./algorithms/bubbleSort";
import insertionSort from "./algorithms/insertionSort";
import selectionSort from "./algorithms/selectionSort";
import SortingAnimation from "./SortingAnimation";
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
  const [sortingSteps, setSortingSteps] = useState();
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("Select algorithm");
  const [animationSpeed, setAnimationSpeed] = useState("normal");
  const [currentlyAnimating, setCurrentlyAnimating] = useState(false);

  const handleAlgoChange = (sortingAlgo) => {
    setSelectedAlgorithm(sortingAlgo);
  };

  const updateAnimationBool = (isAnimating) => {
    setCurrentlyAnimating(isAnimating);
  };

  const handleRangeChange = (event) => {
    setSliderValue(event.target.value);
  };

  useEffect(() => {
    setSortingSteps([{ algo: "none", barValues: randomizeBars(sliderValue) }]);
  }, [sliderValue]);

  const generateNewArray = () => {
    setSortingSteps([{ algo: "none", barValues: randomizeBars(sliderValue) }]);
  };

  const randomizeBars = (numValues) => {
    const newBars = [];
    const min = 1;
    const max = 100;
    while (newBars.length < (numValues > 2 ? numValues : 2) * 2) {
      const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
      newBars.push(randomValue);
    }
    return newBars;
  };

  const handleSort = () => {
    const baseArray = currentlyAnimating ? 0 : sortingSteps.length - 1;
    if (selectedAlgorithm === "Bubble Sort") {
      setSortingSteps(bubbleSort(sortingSteps[baseArray].barValues));
    } else if (selectedAlgorithm === "Insertion Sort") {
      setSortingSteps(insertionSort(sortingSteps[baseArray].barValues));
    } else if (selectedAlgorithm === "Selection Sort") {
      setSortingSteps(selectionSort(sortingSteps[baseArray].barValues));
    }
  };

  const getSpeedFactor = (arrLength) => {
    const minLength = 4;
    const maxLength = 200;
    const minFactor = 1;
    const maxFactor = 5;

    const factor =
      minFactor +
      ((arrLength - minLength) * (maxFactor - minFactor)) /
        (maxLength - minLength);

    return Math.min(Math.max(factor, minFactor), maxFactor);
  };

  const getWaitTime = () => {
    const factor = getSpeedFactor(sortingSteps[0].barValues.length);
    switch (animationSpeed) {
      case "slow":
        return 200 / factor;
      case "normal":
        return 75 / factor;
      case "fast":
        return 10 / factor;
      default:
        return 75 / factor;
    }
  };

  return (
    <Container fluid className="d-flex flex-column vh-100">
      <Row className="justify-content-center bg-dark">
        <Col sm="auto" className="pt-2 px-2 d-flex align-items-center">
          <Form>
            <Form.Range onChange={handleRangeChange} />
          </Form>
        </Col>
        <Col sm="auto" className="p-2">
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
              <Dropdown.Item eventKey="Bubble Sort">Bubble Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Insertion Sort">
                Insertion Sort
              </Dropdown.Item>
              <Dropdown.Item eventKey="Selection Sort">
                Selection Sort
              </Dropdown.Item>
              {/* <Dropdown.Item eventKey="Merge Sort">Merge Sort</Dropdown.Item>
              <Dropdown.Item eventKey="Quick Sort">Quick Sort</Dropdown.Item> */}
            </DropdownButton>
            <Button
              onClick={handleSort}
              disabled={selectedAlgorithm === "Select algorithm"}
            >
              Sort!
            </Button>
          </ButtonGroup>
        </Col>
        <Col xs={12} sm="auto" className="p-2 justify-content-center d-flex">
          <ButtonGroup>
            {["slow", "normal", "fast"].map((speed) => (
              <Button
                key={speed}
                variant={animationSpeed === speed ? "light-blue" : "primary"}
                onClick={() => setAnimationSpeed(speed)}
                style={{ maxHeight: "38px" }}
              >
                {speed === "slow" && (
                  <img src={snail} style={{ maxHeight: "25px" }} alt={speed} />
                )}
                {speed === "normal" && (
                  <img src={rabbit} style={{ maxHeight: "25px" }} alt={speed} />
                )}
                {speed === "fast" && (
                  <img src={rocket} style={{ maxHeight: "25px" }} alt={speed} />
                )}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
      {sortingSteps && sortingSteps.length > 0 && (
        <SortingAnimation
          steps={sortingSteps}
          waitTime={getWaitTime()}
          onAnimationChange={updateAnimationBool}
        />
      )}
    </Container>
  );
};

export default Sorting;
