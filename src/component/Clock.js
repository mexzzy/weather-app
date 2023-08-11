import React, { useState } from "react";
import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";

export default function Clock() {
  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    let time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };
  setInterval(updateTime, 1000);
  return (
    <>
      <TimeContainer>
        <ClockIcon>
          <AiFillClockCircle />
        </ClockIcon>
        <Time>{currentTime}</Time>
      </TimeContainer>
    </>
  );
}
const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ClockIcon = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #242424;
  font-size: 30px;
  width: 50px;
  z-index: 2;
  height: 50px;
  border-radius: 50%;
`;
const Time = styled.h2`
  font-family: "Digital" sans-serif;
  background-color: rgba(0, 123, 255, 0.418);
  color: #fff;
  margin: 5px 0;
  padding: 0.2em;
  border-radius: 10px;
  padding-left: 25px;
  text-align: center;
  width: fit-content;
  margin-left: -20px;
`;
