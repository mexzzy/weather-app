import React, { useState } from "react";
import styled from "styled-components";
import { BiTime } from "react-icons/bi";

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
          <BiTime />
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
  @media (max-width: 786px) {
    scale: 0.7;
  }
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
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.8);
`;
const Time = styled.span`
  font-family: "Digital Numbers", sans-serif;
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
