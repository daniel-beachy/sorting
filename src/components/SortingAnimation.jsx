import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import RenderBars from "./RenderBars";

const AnimateSelectionSort = ({ steps, waitTime = 50 }) => {
  const [currentPosition, setCurrentPosition] = useState(steps[0]);
  useEffect(() => {
    setCurrentPosition(steps[0]);
    let index = 1;
    const intervalId = setInterval(() => {
      if (index < steps.length) {
        setCurrentPosition(steps[index]);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, waitTime);

    return () => clearInterval(intervalId);
  }, [steps, waitTime]);

  return (
    <Row className="p-3 bg-secondary flex-grow-1">
      <RenderBars displayValues={currentPosition} />
    </Row>
  );
};

export default AnimateSelectionSort;
