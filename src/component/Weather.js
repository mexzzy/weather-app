import { useState } from "react";
// axios
import axios from "axios";
// styled component
import styled from "styled-components";
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
// react icons
import { BiSearch } from "react-icons/bi";
import { X } from "react-feather";
// loader animation
import ClipLoader from "react-spinners/ClipLoader";
import LocalDisplay from "./LocalDisplay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isLoading, setIsLoading] = useState(false);

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
      toast.warning("City is empty");
    }
    if (name !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1daa860efb20e46fb24295ab23b4822c&units=metric`;
      setIsLoading(true);
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
            imagePath = cloud;
            weatherTitle = "mostly cloudy";
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
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response === 404) {
            toast.error("City not found");
            setIsLoading(false);
            setTimeout(() => {
              setError("");
            }, 5000);
          } else if (err.message === "Network Error") {
            setIsLoading(false);
            toast.info("Your device is not connected to the internet");
          } else if (err.response.status === 404) {
            setError("");
            setIsLoading(false);
            toast.error("City not found");
          }
        });
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="main">
        <ContentWrapper>
          <Nav>
            <AppName>Weather Update</AppName>
            <Clock />
          </Nav>
          {/*  */}
          <FlexContainer>
            <WeatherSearchEngineContainer>
              <SearchBar>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Country, State, City"
                    value={inputValue}
                    onChange={inputChange}
                    onKeyPress={handleOnKeyPress}
                  />
                  {inputValue && (
                    <Clear onClick={clearInputHandle}>
                      <X size="18" />
                    </Clear>
                  )}
                  <div onClick={handleClick}>
                    {isLoading ? (
                      <LoadingContainer>
                        <ClipLoader
                          size={10}
                          color="white"
                          aria-label="Loading Spinner"
                        />
                        <span>Loading...</span>
                      </LoadingContainer>
                    ) : (
                      <>
                        <BiSearch />
                        <span>Search</span>
                      </>
                    )}
                  </div>
                </div>
              </SearchBar>
              <Error>{error}</Error>
              {isLoading ? (
                <CenterLoading>
                  <ClipLoader
                    size={150}
                    color="white"
                    aria-label="Loading Spinner"
                  />
                </CenterLoading>
              ) : (
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
              )}
              <HumidityAndWind>
                <Humidity>
                  <div>
                    <img src={wave} alt="weather" />
                  </div>
                  <div>
                    {isLoading ? (
                      <ClipLoader
                        size={10}
                        color="black"
                        aria-label="Loading Spinner"
                      />
                    ) : (
                      <span>{Math.round(data.humidity)}%</span>
                    )}
                    <span>humidity</span>
                  </div>
                </Humidity>
                <Wind>
                  <div>
                    <img src={wind} alt="weather" />
                  </div>
                  <div>
                    {isLoading ? (
                      <ClipLoader
                        size={10}
                        color="black"
                        aria-label="Loading Spinner"
                      />
                    ) : (
                      <span>{Math.round(data.speed)}km/h</span>
                    )}
                    <span>wind</span>
                  </div>
                </Wind>
              </HumidityAndWind>
            </WeatherSearchEngineContainer>
            <PrimaryLocalDisplayContainer>
              <LocalDisplay />
            </PrimaryLocalDisplayContainer>
          </FlexContainer>
          {/*  */}
        </ContentWrapper>
      </div>
    </>
  );
};

export default Weather;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  padding: 1% 0;
  width: 100%;
`;
const AppName = styled.div`
  font-family: "Righteous", cursive;
  color: white;
  text-align: center;
  font-size: 30px;

  @media (max-width: 786px) {
    font-size: 20px;
    padding-left: 12px;
  }
`;
const ContentWrapper = styled.div`
  width: 100%;
  
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    margin-top: 10%;
  }

  div {
    display: flex;
    box-shadow: 1px 4px 10px 5px rgba(0, 0, 0, 0.3);
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
      background: rgba(18, 12, 57, 0.998);
      padding: 10px;
      width: fit-content;
      border-radius: 10px;
      display: flex;
      cursor: pointer;
      align-items: center;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;

      justify-content: center;
    }
  }
`;
const Clear = styled.span`
  border-radius: 50%;
  padding: 5px 5px 3px 5px;
  background-color: rgba(255, 0, 0, 0.662);
  color: white;
`;

const LoadingContainer = styled.span`
  display: flex;
  align-items: center;
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
  border: 2px solid rgba(18, 12, 57);
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
  border: 2px solid rgba(18, 12, 57);
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
const CenterLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5% 0;
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 2%;
  overflow: hidden;

  @media (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
  }
`;
const WeatherSearchEngineContainer = styled.div`
  width: 60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const PrimaryLocalDisplayContainer = styled.div`
  width: 40%;
  margin: 10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
