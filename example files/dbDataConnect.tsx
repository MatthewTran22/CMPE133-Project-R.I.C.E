import React, { useState, useEffect } from 'react';

interface UserData {
  user_id: number;
  password: string;
  email: string;
}

const App: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    fetch("/test")
      .then(res => res.json())
      .then((data: UserData[]) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((user) => (
            <li key={user.user_id}>
              <strong>User ID:</strong> {user.user_id}, <strong>Password:</strong> {user.password}, <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
