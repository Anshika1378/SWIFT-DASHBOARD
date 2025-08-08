import React from 'react';

interface UserProfile {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  initials: string;
}

const user: UserProfile = {
  userId: '12345687',
  name: 'Ervin Howell',
  email: 'ervinhowell@gmail.com',
  phone: '96068 12345',
  address: 'voluptate iusto quis nobis reprehenderit…',
  initials: 'EH',
};

const ProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <div className="bg-[#1C1F4A] text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">SWIFT</h1>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center">
            <span className="text-sm font-medium">{user.initials}</span>
          </div>
          <span className="text-sm">{user.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Welcome, {user.name}</h2>

        <div className="flex items-start space-x-6">
          {/* Avatar and email */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold text-gray-700">
              {user.initials}
            </div>
            <p className="mt-2 text-sm text-gray-600">{user.email}</p>
          </div>

          {/* Profile details */}
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div>
              <label className="text-xs text-gray-500">User ID</label>
              <p className="text-sm font-medium">{user.userId}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500">Name</label>
              <p className="text-sm font-medium">{user.name}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500">Email ID</label>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500">Address</label>
              <p className="text-sm font-medium">{user.address}</p>
            </div>
            <div>
              <label className="text-xs text-gray-500">Phone</label>
              <p className="text-sm font-medium">{user.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
