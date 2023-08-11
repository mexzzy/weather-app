import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
// video background

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
    'https://vod-progressive.akamaized.net/exp=1691859234~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2945%2F12%2F314728144%2F1214767347.mp4~hmac=5121e7406498dd5e6c6171be71fa36c3bec97f23f865272e554f76772d2727ea/vimeo-prod-skyfire-std-us/01/2945/12/314728144/1214767347.mp4?download=1&filename=pexels_videos_1860175+%282160p%29.mp4',
    'https://vod-progressive.akamaized.net/exp=1691859460~acl=%2Fvimeo-transcode-storage-prod-us-central1-h264-2160p%2F01%2F3641%2F14%2F368208181%2F1523391695.mp4~hmac=7bce166e35cb669734fd48be1a7130098fbb6f40f15fa1082eb740a08c1e4fa7/vimeo-transcode-storage-prod-us-central1-h264-2160p/01/3641/14/368208181/1523391695.mp4?download=1&filename=video+%282160p%29.mp4',
    'https://vod-progressive.akamaized.net/exp=1691859551~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1132%2F8%2F205660426%2F700244882.mp4~hmac=6e71c86105fdb25630a60487dc45ed75d4479dab9e590a5b677bdc5831ecc6c0/vimeo-prod-skyfire-std-us/01/1132/8/205660426/700244882.mp4?download=1&filename=woman_waiting_for_a_taxi+%281080p%29.mp4',
    'https://vod-progressive.akamaized.net/exp=1691859601~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F1041%2F12%2F305209130%2F1170417074.mp4~hmac=73f764d8ef49a91a0ca1618544d6205a1d73813f10baf532291b17097de11530/vimeo-prod-skyfire-std-us/01/1041/12/305209130/1170417074.mp4?download=1&filename=pexels_videos_1672733+%281080p%29.mp4',
    'https://vod-progressive.akamaized.net/exp=1691860682~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2148%2F8%2F210741446%2F722728905.mp4~hmac=fe965cb1845e83c052955d4fbf977ad534c5137ef43fd4188769fd8e3ca2ad6b/vimeo-prod-skyfire-std-us/01/2148/8/210741446/722728905.mp4?download=1&filename=pexels_videos_2614+%281080p%29.mp4',
    'https://vod-progressive.akamaized.net/exp=1691860748~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2276%2F17%2F436382563%2F1902919897.mp4~hmac=03934e9345be9101527b062725bbce7aacd7282f6f7de958860ff5f905c556d6/vimeo-prod-skyfire-std-us/01/2276/17/436382563/1902919897.mp4?download=1&filename=production_id%3A4828773+%281080p%29.mp4',
    'https://vod-progressive.akamaized.net/exp=1691860825~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F2524%2F15%2F387620496%2F1634957389.mp4~hmac=863cc5a2d1acaee9181941cf81f5e5786f20f8bd4d033740329550afcba847bc/vimeo-prod-skyfire-std-us/01/2524/15/387620496/1634957389.mp4?download=1&filename=video+%281080p%29.mp4',
    'https://vod-progressive.akamaized.net/exp=1691860895~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3178%2F17%2F440893234%2F1928104199.mp4~hmac=30a7b30adb7d4a44bd50a354e49121e05ee6dd02fcbb9077111e97572ce78c34/vimeo-prod-skyfire-std-us/01/3178/17/440893234/1928104199.mp4?download=1&filename=production_id%3A4933583+%28720p%29.mp4',
    'https://vod-progressive.akamaized.net/exp=1691861071~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4386%2F15%2F396931411%2F1689144204.mp4~hmac=f481839f19375b5bb488d42fc41435bfcdb76a08aac1a852c70269dbb453c81c/vimeo-prod-skyfire-std-us/01/4386/15/396931411/1689144204.mp4?download=1&filename=production_id%3A3913495+%281080p%29.mp4',
    ''    
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
