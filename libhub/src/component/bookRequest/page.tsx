import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useBookRequestState, useBookRequestActions } from '@/providers/bookrequest';
import { BookRequestState } from '@/providers/bookrequest/interface';

const columns = [
  {
    title: 'Student ID',
    dataIndex: 'studentId',
    key: 'studentId',
  },
  {
    title: 'Book Details',
    dataIndex: 'bookDetails',
    key: 'bookDetails',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Button type="primary">Loan</Button>
    ),
  },
];

const BookRequest: React.FC = () => {
  const [bookRequests, setBookRequests] = useState<BookRequestState[]>([]);

  //const bookRequests = useBookRequestState();
  const { getAllBookRequest } = useBookRequestActions();

  useEffect(() => {
    const fetchBookRequest = async () => {
      try {
        await getAllBookRequest();
      } catch (error) {
        console.error('Error fetching book requests:', error);
      }
    };

    fetchBookRequest();
  }, []);

  // Transform book requests into data format expected by the table
  const formattedData = bookRequests.map((request: BookRequestState, index:number) => ({
    key: index.toString(),
    studentId: request.studentId,
    //bookDetails: `${request.title}, ${request.author}`, // Assuming title and author are available in book requests
  }));

  return (
    <div>
      <h1>Book Request</h1>
      <Table columns={columns} dataSource={formattedData} />
    </div>
  );
}

export default BookRequest;
