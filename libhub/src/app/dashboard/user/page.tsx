'use client'; 
import React, { useState } from 'react';
import { Input, Table } from 'antd';

// Dummy user data
const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

const UserComponent: React.FC = () => {
  // State for search input value
  const [searchValue, setSearchValue] = useState('');

  // Filtered user data based on search input
  const filteredUsers = dummyUsers.filter(user =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Columns for Ant Design Table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <div>
      
      {/* Ant Design Search component */}
      <Input.Search
        placeholder="Search users"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      {/* Ant Design Table to display user data */}
      <Table dataSource={filteredUsers} columns={columns} />
    </div>
  );
};

export default UserComponent;

