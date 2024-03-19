'use client'
import React, { useState } from 'react';
import { Input, Table } from 'antd';

interface MeetingRoom {
  id: number;
  bookingDate: string;
  startTime: string;
  endTime: string;
  bookedById: string;
}

const dummyMeetingRooms: MeetingRoom[] = [
  { id: 1, bookingDate: '2024-03-19', startTime: '09:00', endTime: '11:00', bookedById: '12345' },
  { id: 2, bookingDate: '2024-03-19', startTime: '12:00', endTime: '14:00', bookedById: '67890' },
  { id: 3, bookingDate: '2024-03-20', startTime: '10:00', endTime: '12:00', bookedById: '54321' },
  // Add more dummy data as needed
];

const MeetingRoomComponent: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  // Filtered meeting room data based on search input
  const filteredMeetingRooms = dummyMeetingRooms.filter(room =>
    room.bookedById.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Columns for Ant Design Table
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Booking Date', dataIndex: 'bookingDate', key: 'bookingDate' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
    { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },
    { title: 'Booked By ID', dataIndex: 'bookedById', key: 'bookedById' },
  ];

  return (
    <div>
      
      <Input.Search
        placeholder="Search meeting rooms by booked by ID"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      {/* Ant Design Table to display meeting room data */}
      <Table dataSource={filteredMeetingRooms} columns={columns} />
    </div>
  );
};

export default MeetingRoomComponent;

