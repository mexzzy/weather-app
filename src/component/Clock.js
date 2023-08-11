import React, { useState } from 'react';
import styled from "styled-components";


export default function Clock() {
    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time)

    const updateTime = () =>{
        let time = new Date().toLocaleTimeString();
        setCurrentTime(time);
    }
    setInterval(updateTime, 1000);
  return (
    <><Time>{currentTime}</Time></>
  )
}

const Time = styled.h2`
    background-color: rgba(0, 123, 255, 0.81);
    color: #fff;
    margin: 5px 0;
    padding: 0.2em;
    text-align: center;
`