'use client'
import React, { useState , useContext , useEffect } from 'react';
import { Input, Table } from 'antd';
import { useUserState, useUserActions } from '../../../providers/users';
import { UserState } from '../../../providers/users/interface';
import { userComponentStyles } from './style';

const UserComponent: React.FC = () => {
  // State for search input value
  const [searchValue, setSearchValue] = useState('');
  const users = useUserState();
  const { getUser } = useUserActions();
  const [userData, setUserData] = useState<UserState[]>([]);

  useEffect(() => {
    //console.log('Fetching users');
    const fetchData = async () => {
      try {
        console.log('Fetching users')
        const response = await getUser();
        console.log('response:', response);
        setUserData(response);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = userData.filter(user =>
    user.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Columns for Ant Design Table
  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentID',
      key: 'StudentID',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'emailAddress',
      key: 'email',
    },
  ];

  const { styles } = userComponentStyles();

  return (
    <div className={styles.container}>
      <Input.Search
        placeholder="Search users"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.tableContainer}>
        <Table dataSource={filteredUsers} columns={columns} className={styles.table} />
      </div>
    </div>
  );
};

export default UserComponent;
