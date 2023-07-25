import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import video from "../images-videos/bg-video.mp4";
import wind from "../images-videos/wind.png";
import wave from "../images-videos/wave.png";
//
import sun from "../images-videos/sun.png";
import cloud from "../images-videos/cloud.png";
import drizzle from "../images-videos/drizzle.png";
import mist from "../images-videos/mist.png";
import rain from "../images-videos/rain.png";
import sunCloud from "../images-videos/sun-cloud.png";

const Weather = () => {
  const [data, setData] = useState({
    celsius: 0,
    name: "city",
    humidity: 0,
    speed: 0,
    image: sunCloud,
    title: clear,
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => {
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=3215f5c33ff488b9bb2cd36919c58aaf&&units=metric`;
      axios
      .get(apiUrl)
      .then((res) => {
        let imagePath = "";
        let weatherTitle = "";
        if (res.data.weather[0].main === "Cloud") {
          imagePath = cloud;
          weatherTitle = "Cloudy";
        } else if (res.data.weather[0].main === "Clear") {
          imagePath = sunCloud;
          weatherTitle = "Clear";
        } else if (res.data.weather[0].main === "Rain") {
          imagePath = rain;
          weatherTitle = "Rainy";
        } else if (res.data.weather[0].main === "Drizzle") {
          imagePath = drizzle;
          weatherTitle = "Drizzle";
        } else if (res.data.weather[0].main === "Mist") {
          imagePath = mist;
          weatherTitle = "Mist";
        } else {
          imagePath = sun;
          weatherTitle = "Sunny";
        }
        console.log(res.data)
        setData({
            ...data,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
            title: weatherTitle,
          });
          setError("")
        })
        .catch((err) => {
          if(err.response.status === 404){
            setError("City not Found")
          }else{
            setError("")
          }
          console.log(err)
        });
    }
  };
  return (
    <>
      <Main>
        <Overlay></Overlay>
        <Videos src={video} autoPlay loop muted />
        <ContentWrapper>
          <h1 style={{ color: "#fff", textAlign: "center", marginTop: "10px" }}>
            Weather Update
          </h1>
          <SearchBar>
            <div>
              <input
                type="text"
                placeholder="Enter City"
                onChange={(e) => setName(e.target.value)}
              />
              <div onClick={handleClick}>
                <i className="fi fi-rr-search"></i>
                <span>Search</span>
              </div>
            </div>
          </SearchBar>
          <Error>{error}</Error>
          <MainTempDisplay>
            <div>
            <p>{data.title}</p>
              <Images src={data.image} alt="weather" />
            </div>
            <div>
              <h2>{Math.round(data.celsius)}°c</h2>
            </div>
            <div>{data.name}</div>
          </MainTempDisplay>
          <HumidityAndWind>
            <Humidity>
              <div>
                <img src={wave} alt="weather" />
              </div>
              <div>
                <span>{Math.round(data.humidity)}%</span>
                <span>humidity</span>
              </div>
            </Humidity>
            <Wind>
              <div>
                <img src={wind} alt="weather" />
              </div>
              <div>
                <span>{Math.round(data.speed)}km/h</span>
                <span>wind</span>
              </div>
            </Wind>
          </HumidityAndWind>
        </ContentWrapper>
      </Main>
    </>
  );
};

export default Weather;

const Main = styled.div`
  width: 100%;
  height: 100vh;
`;
const Videos = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ContentWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2%;
  @media (max-width: 768px) {
    margin-top: 10%;
  }

  div {
    display: flex;
    align-items: center;
    padding: 5px;
    background: #fff;
    border-radius: 10px;
    width: auto;
    gap: 10px;
    @media (max-width: 768px) {
      width: 80%;
    }

    input {
      outline: none;
      border: 0;
      width: 300px;
      flex: 2;
      padding: 2px 2px 2px 5px;

      @media (max-width: 768px) {
        width: 100%;
      }
    }
    div {
      background: red;
      padding: 10px;
      flex: 1;
      border-radius: 10px;
      display: flex;
      cursor: pointer;
      align-items: center;
      color: #fff;

      justify-content: center;
      i {
        color: #fff;
      }
    }
  }
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const MainTempDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  margin: 2% 0;
  @media (max-width: 768px) {
    margin: 10% 0;
  }
  div:nth-child(2) {
    color: #fff;
    font-size: 40px;
    font-weight: bold;
  }
  div:nth-child(3) {
    color: #fff;
    font-size: 20px;
    text-transform: capitalize;
  }
`;
const Images = styled.img`
  width: 150px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;
const HumidityAndWind = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;
const Humidity = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  width: fit-content;
  border: 2px solid red;
  div:nth-child(1) {
    img {
      width: 50px;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
    /* color: white; */

    span:nth-child(1) {
      font-weight: bold;
      font-size: 20px;
    }
    span:nth-child(2) {
      text-transform: capitalize;
    }
  }
`;
const Wind = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 2px solid red;
  background: #fff;
  border-radius: 10px;
  width: fit-content;
  div:nth-child(1) {
    img {
      width: 50px;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
    /* color: white; */

    span:nth-child(1) {
      font-weight: bold;
      font-size: 20px;
    }
    span:nth-child(2) {
      text-transform: capitalize;
    }
  }
`;
const Error = styled.div`
  padding: 10px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`