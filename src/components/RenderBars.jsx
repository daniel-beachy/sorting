import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const RenderBars = ({ displayValues }) => {
  const [barWidth, setBarWidth] = useState(40);

  useEffect(() => {
    const calculateCellSize = () => {
      const screenWidth = window.innerWidth;
      const maxBarWidth = 50;
      const calculatedCellSize =
        (screenWidth * 0.65) / displayValues.barValues.length;
      const newBarSize = Math.min(maxBarWidth, calculatedCellSize);
      setBarWidth(newBarSize);
    };

    calculateCellSize();
    window.addEventListener("resize", calculateCellSize);

    return () => {
      window.removeEventListener("resize", calculateCellSize);
    };
  }, [displayValues]);

  const bars = displayValues.barValues.map((size, index) => {
    let background = "bg-light-blue";
    if (displayValues.algo === "bubble") {
      if (index > displayValues.greaterSorted) {
        background = "bg-sorting-green";
      } else if (
        displayValues.currBlue &&
        displayValues.currBlue.includes(index)
      ) {
        background = "bg-sorting-blue";
      } else if (index === displayValues.newYellow) {
        background = "bg-sorting-yellow";
      }
    } else if (displayValues.algo === "insertion") {
      if (displayValues.allGreen) {
        background = "bg-sorting-green";
      } else if (index === displayValues.currBlue) {
        background = "bg-sorting-blue";
      } else if (index <= displayValues.curr) {
        background = "bg-sorting-green";
      }
    } else if (displayValues.algo === "selection") {
      if (index < displayValues.lessSorted) {
        background = "bg-sorting-green";
      } else if (index === displayValues.currBlue) {
        background = "bg-sorting-blue";
      } else if (index === displayValues.currYellow) {
        background = "bg-sorting-yellow";
      }
    } else if (displayValues.algo === "merge") {
      if (displayValues.allGreen) {
        background = "bg-sorting-green";
      } else if (index === displayValues.currBlue) {
        background = "bg-sorting-blue";
      } else if (
        index === displayValues.currStart ||
        index === displayValues.currEnd
      ) {
        background = "bg-sorting-yellow";
      } else if (
        index === displayValues.currLeftComp ||
        index === displayValues.currRightComp
      ) {
        background = "bg-danger";
      }
    }

    return (
      <Col
        className={`${background} me-1 p-0 d-flex align-items-end justify-content-center`}
        key={index}
        style={{
          maxWidth: `${barWidth}px`,
          height: `${((size - 1) / (100 - 1)) * (95 - 8) + 8}%`,
        }}
      >
        {barWidth > 20 && (
          <p
            className="text-secondary m-0"
            style={{ fontSize: `${barWidth * 0.55}px` }}
          >
            {size}
          </p>
        )}
      </Col>
    );
  });

  return (
    <Row className="d-flex align-items-end justify-content-center m-0">
      {bars}
    </Row>
  );
};

export default RenderBars;
