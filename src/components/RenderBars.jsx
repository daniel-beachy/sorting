import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const RenderBars = ({ sizes }) => {
  const [barWidth, setBarWidth] = useState(40);

  useEffect(() => {
    const calculateCellSize = () => {
      const screenWidth = window.innerWidth;
      const maxBarWidth = 50;
      const calculatedCellSize = (screenWidth * 0.65) / sizes.length;
      const newBarSize = Math.min(maxBarWidth, calculatedCellSize);
      console.log(newBarSize);
      setBarWidth(newBarSize);
    };

    calculateCellSize();
    window.addEventListener("resize", calculateCellSize);

    return () => {
      window.removeEventListener("resize", calculateCellSize);
    };
  }, [sizes]);

  const bars = sizes.map((size, index) => (
    <Col
      className="bg-light-blue me-1 p-0 d-flex align-items-end justify-content-center"
      key={index}
      style={{
        maxWidth: `${barWidth}px`,
        height: `${((size - 1) / (100 - 1)) * (95 - 8) + 8}%`,
      }}
    >
      {barWidth > 20 && (
        <p
          className="text-primary m-0"
          style={{ fontSize: `${barWidth * 0.55}px` }}
        >
          {size}
        </p>
      )}
    </Col>
  ));

  return (
    <Row className="d-flex align-items-end justify-content-center">{bars}</Row>
  );
};

export default RenderBars;
