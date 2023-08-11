import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
// video background
import video from "../images-videos/bg-video.mp4";
import video_2 from "../images-videos/video-2.mp4";
import video_3 from "../images-videos/video-3.mp4";
import video_4 from "../images-videos/video-4.mp4";
import video_5 from "../images-videos/video-5.mp4";
import video_6 from "../images-videos/video-6.mp4";
import video_7 from "../images-videos/video-7.mp4";
import video_8 from "../images-videos/video-8.mp4";
//
import wind from "../images-videos/wind.png";
import wave from "../images-videos/wave.png";
//
import cloud from "../images-videos/cloud.png";
import sun from "../images-videos/sun.png";
import drizzle from "../images-videos/drizzle.png";
import mist from "../images-videos/mist.png";
import rain from "../images-videos/rain.png";
import sunCloud from "../images-videos/sun-cloud.png";
import Clock from "./Clock";
import UserIpLocation from "./IpLocation";

const Weather = () => {
  const [data, setData] = useState({
    celsius: 0,
    name: "city",
    humidity: 0,
    speed: 0,
    image: sun,
    title: "sunny",
  });
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const backgroundVideo = [
    video,
    video_2,
    video_3,
    video_4,
    video_5,
    video_6,
    video_7,
    video_8,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex + 1) % backgroundVideo.length
      );
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [backgroundVideo.length]);

  const clearInputHandle = () => {
    setInputValue("");
  };

  const inputChange = (e) => {
    setName(e.target.value);
    setInputValue(e.target.value);
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    if (name === "") {
      setError("City is empty");
    }
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
            weatherTitle = "mostly cloudy";
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
            imagePath = sunCloud;
            weatherTitle = "clear";
          }
          setData({
            ...data,
            celsius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
            title: weatherTitle,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("City not Found");
          } else {
            setError("");
          }
        });
    }
  };

  return (
    <>
      <Main>
        <Overlay></Overlay>
        <Videos src={backgroundVideo[currentVideoIndex]} autoPlay loop muted />
        <ContentWrapper>
          <h1 style={{ color: "#fff", textAlign: "center", marginTop: "10px" }}>
            Weather Update
          </h1>
          <Clock />
          <SearchBar>
            <div>
              <input
                type="text"
                placeholder="Enter City"
                value={inputValue}
                onChange={inputChange}
                onKeyPress={handleOnKeyPress}
              />
              {inputValue && (
                <Clear onClick={clearInputHandle}>
                  <i className="fi fi-br-cross-small"></i>
                </Clear>
              )}
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
          <Footer>
            <div>
              <div>MeTech</div>|<div>Weather Update &copy; 2023 copyright</div>
            </div>
          </Footer>
        </ContentWrapper>
      </Main>
      <UserIpLocation />
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
    gap: 5px;
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
      background: rgba(0, 123, 255, 0.881);
      padding: 10px;
      width: fit-content;
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
const Clear = styled.span`
  border-radius: 50%;
  padding: 5px 5px 3px 5px;
  background-color: rgba(255, 0, 0, 0.662);
  color: white;
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
  div:nth-child(1) {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    justify-content: center;
    p {
      background-color: #ffffff33;
      padding: 5px 10px;
      border-radius: 5px;
      text-transform: capitalize;
      font-weight: bold;
      color: #fff;
    }
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
      height: 50px;
      object-fit: cover;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;

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
  border: 2px solid rgba(0, 123, 255, 0.881);
  background: #fff;
  border-radius: 10px;
  width: fit-content;
  div:nth-child(1) {
    img {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
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
`;
const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 0;
  margin-top: 2%;
  /* color: #474747; */
  justify-content: center;
  @media (max-width: 768px) {
    backdrop-filter: blur(10px);
    margin-top: 10%;
  }
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
  }
`;
