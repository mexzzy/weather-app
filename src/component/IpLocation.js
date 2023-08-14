import React, { useState, useEffect } from "react";
import axios from "axios";

const UserIpLocation = () => {
  useEffect(() => {
    const fetchIpData = async () => {
      try {
        const response = await axios.get("https://ipinfo.io/json", {
          headers: {
            Authorization: "Bearer bed0bd29141b6e",
          },
        });
        // console.log("Fetched IP Data:", response.data);
      } catch (error) {
        // console.error("Error fetching IP data:", error);
      }
    };

    fetchIpData();
  }, []);

  return (
    <>
      <div>{/* jet */}</div>
    </>
  );
};

export default UserIpLocation;
