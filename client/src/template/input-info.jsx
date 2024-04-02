import React, { useState, useEffect } from 'react';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const apiUrl = "/info_check";
        const response = await fetch(apiUrl, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data.info);
          console.log(data);
        } else {
          throw new Error("Error checking user info.");
        }
      } catch (error) {
        console.error(error);
        setUserInfo(false);
      }
    };

    fetchUserInfo();
  }, []);

  return userInfo;
};

export default useUserInfo;