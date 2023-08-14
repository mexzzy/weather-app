import React, { useState, useEffect } from "react";
import axios from "axios";
import Styled from "styled-components";
import cloud from "../images-videos/cloud.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";


export default function LocalDisplay() {
  const [ipData, setIpData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [userWeatherData, setUserWeatherData] = useState({});
  const countryNames = ["England", "Finland", "Russia", "America", "Tokyo", "Nigeria", "Sweden", "United Kingdom", "Los Angeles", "New York", "Phoenix", "San Antonio", "Lagos", "Denver", "Washington"];

  useEffect(() => {
    const fetchIpData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://ipinfo.io/json", {
          headers: {
            Authorization: "Bearer bed0bd29141b6e",
          },
        });
        setIpData(response.data);
        setIsLoading(false);
        // console.log("Fetched IP Data:", response.data);
        // toast.success('Good');
      } catch (error) {
        setIsLoading(false);
        toast.warning("Can't Find your Location");
      }
    };

    fetchIpData();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const promises = countryNames.map(async (name) => {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=1daa860efb20e46fb24295ab23b4822c&units=metric`
          );
          return { name, data: response.data };
        });

        const weatherInfo = await Promise.all(promises);

        const newData = {};
        weatherInfo.forEach(({ name, data }) => {
          newData[name] = data;
        });

        setWeatherData(newData);
        // toast.info('Weather Set');
      } catch (error) {
        toast.error('unable to feetch data, due to no internet access')
      }
    };

    fetchWeatherData();
  }, []);

  useEffect(() => {
    const userLocationWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${ipData.city}&appid=1daa860efb20e46fb24295ab23b4822c&units=metric`
        );
        setUserWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    userLocationWeather();
  }, [ipData]);


  return (
    <div>
      <LocalWrapper>
        <YourLocalContainer>
          <Title>your local</Title>
          <MainContainer>
            <RightBox>
              <CityCountry>
                {isLoading ? (
                  <>
                    <ClipLoader
                      size={10}
                      color="white"
                      aria-label="Loading Spinner"
                    />
                  </>
                ) : (
                  <>
                    {ipData ? (
                      <>
                        <div>
                          {ipData.city}
                        </div>
                        <div></div>
                        <div>
                          {ipData.country}
                        </div>
                      </>
                    ) : (
                      <>
                        Location Not Found
                      </>
                    )}
                  </>
                )}
              </CityCountry>
              <TimeZone>
                {isLoading ? (
                  <>
                    <ClipLoader
                      size={10}
                      color="white"
                      aria-label="Loading Spinner"
                    />
                  </>
                ) : (
                  <>
                    {ipData ? (
                      <>
                        {ipData.timezone}
                      </>
                    ) : (
                      <>
                        not found
                      </>
                    )}
                  </>
                )}
              </TimeZone>
            </RightBox>
            <Rule></Rule>
            <LeftBox>
              <img src={cloud} alt="weather-icon" />
              {isLoading ? (
                <>
                  <ClipLoader
                    size={10}
                    color="white"
                    aria-label="Loading Spinner"
                  />
                </>
              ) : (
                <>
                  {userWeatherData.main ? (
                    <>
                      <div>
                        {Math.round(userWeatherData.main.temp)}°c</div>
                    </>
                  ) : (
                    <>
                      <div>0°c</div>
                    </>
                  )}
                </>
              )}

            </LeftBox>
          </MainContainer>
        </YourLocalContainer>
        <ScrollContainer>
          <>
            {isLoading ? (
              <>
                <ClipLoader
                  size={40}
                  color="white"
                  aria-label="Loading Spinner"
                />
                <p style={{ color: 'white' }}>Loading weather information...</p>
              </>
            ) : (
              <>
                {Object.keys(weatherData).length === countryNames.length ? (
                  countryNames.map((name) => (
                    <YourLocalContainerList key={name}>
                      <span>{name}</span>
                      <div>
                        <img src={cloud} alt="weather-icon" />
                        <span>
                          {Math.round(weatherData[name].main.temp)}°C</span>
                      </div>
                    </YourLocalContainerList>
                  ))
                ) : (
                  <>
                    <p style={{ color: 'white' }}>No Data...</p>
                  </>

                )}
              </>
            )}
          </>
        </ScrollContainer>
      </LocalWrapper>
    </div>
  );
}

const LocalWrapper = Styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    padding: 10px 5px 10px 0;
    @media (max-width: 768px){
        background: #1e192d;
    }
    `;

const Title = Styled.div`
    border-radius: 10px 0;
    background: rgba(18, 12, 57, 0.704);
    padding: 10px;
    width: fit-content;
    text-transform: capitalize;
`;
const YourLocalContainer = Styled.div`
    backdrop-filter: blur(10px);
    background: #00000040;
    border-radius: 10px ;
    height: auto;
    color: #fff;
    width: 80%;

    @media (max-width: 768px){
        border: 1px solid rgba(18, 12, 57, 0.704);
    }
`;

const MainContainer = Styled.div`
    padding: 10px;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-around;
`;

const RightBox = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 20px;
`;
const CityCountry = Styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    div:nth-child(1){
        text-transform: capitalize;
    }
    div:nth-child(2){
        width: 5px;
        height: 5px;
        border-radius: 10px;
        background: rgba(18, 12, 57, 0.704);
    }
    div:nth-child(3){
    text-transform: uppercase;
    font-weight: 600;
    }
`;
const TimeZone = Styled.div`
    text-transform: capitalize;
    font-weight: 700;
`;

const Rule = Styled.div`
    border-radius: 5px;
    width: 2px;
    height: 40px;
    background: #ffffff5c;
`;
const LeftBox = Styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    img{
        width: 50px;
        object-fit: cover;
    }
    div{
        font-weight: 600;
        font-size: 20px;
    }
`;

const ScrollContainer = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    height: 300px;
    overflow-y: scroll;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
    scrollbar-width: none; 
    -ms-overflow-style: none; 

    &::-webkit-scrollbar {
      display: none;
    }
`;
const YourLocalContainerList = Styled.div`
    backdrop-filter: blur(10px);
    background: #00000040;
    border-radius: 10px ;
    height: auto;
    color: #fff;
    width: 76%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span{
        text-transform: capitalize;
    }

    div{
        display: flex;
        align-items: center;

        img{
            width:30px;
            object-fit: cover;
        }
        span{
            font-size: 600;
        }
    }

    @media (max-width: 768px){
        border: 1px solid rgba(18, 12, 57, 0.704);
    }
`;
