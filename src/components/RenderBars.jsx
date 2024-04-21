import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

const RenderBars = ({ sizes }) => {
  const [barWidth, setBarWidth] = useState(40);

  useEffect(() => {
    const calculateCellSize = () => {
      const screenWidth = window.innerWidth;
      const maxBarWidth = 50;
      const calculatedCellSize = (screenWidth * 0.8) / sizes.length;
      const newBarSize = Math.min(maxBarWidth, calculatedCellSize);
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
      className="bg-light-blue me-1"
      key={index}
      style={{
        maxWidth: `${barWidth}px`,
        height: `${size * 0.9}%`,
      }}
    />
  ));

  return (
    <Row className="d-flex align-items-end justify-content-center">{bars}</Row>
  );
};

export default RenderBars;
