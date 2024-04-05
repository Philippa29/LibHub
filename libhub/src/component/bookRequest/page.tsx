import React, { useEffect, useState, useReducer } from 'react';
import { Table, Button, Modal, Input, Form, message, DatePicker } from 'antd';
import { useBookRequestState, useBookRequestActions } from '@/providers/bookrequest';
import { BookRequestState } from '@/providers/bookrequest/interface';
import { getBookByIdReducer } from '@/providers/book/reducer';
import { GetAllBookRequestReducer } from '@/providers/bookrequest/reducer';
import { getBookbyidstate } from '@/providers/book/interface';
import { useBookActions } from '@/providers/book';
import moment from 'moment';

const BookRequest: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bookRequests, setBookRequests] = useState<BookRequestState[]>([]);
  const [bookdetails, dispatchallbookdetails] = useReducer(getBookByIdReducer, [] as getBookbyidstate[]);
  const [librarianId, setLibrarianId] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<BookRequestState | null>(null);
  const [form] = Form.useForm();
  const { getAllBookRequest } = useBookRequestActions();
  const { getbookbyid } = useBookActions();

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Book Details',
      render: (text: any, record: BookRequestState) => (
        <div>
          <p>{record.title}</p>
          <p>{record.author}</p>
          <p>{record.isbn}</p>
        </div>
      ),

      key: 'bookDetails',
    },
    {
      title: 'Borrow',
      key: 'action',
      render: (text: any, record: BookRequestState) => (
        <Button type="primary" onClick={() => handleLoanButtonClick(record)}>Borrow</Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBookRequest();
        setBookRequests(response);
        
      } catch (error) {
        console.error('Error fetching book requests:', error);
      }
    };

    fetchData();
  }, [getAllBookRequest]);

  const formattedData = bookRequests?.map((request: BookRequestState, index: number) => {
    console.log("request", bookRequests);
    return {
      key: index.toString(),
      studentId: request.studentId,
      bookId: request.bookId,
      id: request.bookId,
      title: request.title, 
      author: request.author,
      isbn: request.isbn,
    };
  });
  
  

  const handleLoanButtonClick = (record: BookRequestState) => {
    setSelectedBook(record);
    setStudentId(record.studentId);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields()
      .then(values => {
        message.success('Loan request submitted successfully');
        setModalVisible(false);
        form.resetFields();
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const today = new Date();

  const disabledDate = (current : any ) => {
    // Disable dates that have already passed
    return current && current < new Date();
  };

  return (
    <div>
      <h1>Book Request</h1>
      <Table columns={columns} dataSource={formattedData} />

      {/* <Modal
  title="Loan Book"
  visible={modalVisible}
  onCancel={handleCancel}
  onOk={handleOk}
  okText="Submit"
  cancelText="Cancel"
>
  
</Modal> */}
    </div>
  );
}

export default BookRequest;
