import React, { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  // add other fields you want to show
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setUser(data[0]); // first record only
        }
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {loading ? (
        <p>Loading user profile...</p>
      ) : user ? (
        <div className="border p-4 rounded shadow">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
              {user.website}
            </a>
          </p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile;
