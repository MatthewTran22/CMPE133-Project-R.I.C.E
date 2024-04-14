import React, { useState, useEffect } from "react";
import useSessionChecker from './SessionCheck';


const InactivityLogout = ({ children }) => {
  const [logoutCalled, setLogoutCalled] = useState(false);

  const handleLogout = async () => {
    await fetch("/logout", { method: "POST" });
    window.location.reload();

  };

  useEffect(() => {
    const logoutAfterTime = setTimeout(() => {
      handleLogout();
    }, 30 * 60 * 1000); // Logout after 30 minutes

    return () => {
      clearTimeout(logoutAfterTime);
    };
  }, []);

  if (logoutCalled) {
    return null;
  }

  return <>{children}</>;
};

export default InactivityLogout;