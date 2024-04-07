import React, { useEffect, useState, useReducer } from 'react';
import { Table, Button, Modal, Input, Form, message, DatePicker } from 'antd';
import { useBookRequestState, useBookRequestActions } from '@/providers/bookrequest';
import { BookRequestState } from '@/providers/bookrequest/interface';
import { getBookByIdReducer } from '@/providers/book/reducer';
import { GetAllBookRequestReducer } from '@/providers/bookrequest/reducer';
import { getBookbyidstate } from '@/providers/book/interface';
import { useBookActions } from '@/providers/book';
import moment from 'moment';
import { useLoanActions } from '@/providers/loan';
import { initialState as loanInitialState } from '@/providers/loan/interface';

const BookRequest: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [bookRequests, setBookRequests] = useState<BookRequestState[]>([]);
  const [bookdetails, dispatchallbookdetails] = useReducer(getBookByIdReducer, [] as getBookbyidstate[]);
  const [librarianId, setLibrarianId] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [selectedBook, setSelectedBook] = useState<BookRequestState | null>(null);
  const [form] = Form.useForm();
  const { getAllBookRequest } = useBookRequestActions();
  const { createLoan } = useLoanActions();
  const [loanState, setLoanState] = useState(loanInitialState);
  
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
  });

  const formattedData = bookRequests?.map((request: BookRequestState, index: number) => {
    //console.log("request", bookRequests);
    return {
      key: index.toString(),
      studentId: request.studentId,
      bookId: request.bookId,
      id: request.id,
      title: request.title,
      author: request.author,
      isbn: request.isbn,
    };
  });

  const handleLoanButtonClick = (record: BookRequestState) => {
    setSelectedBook(record);
    setModalVisible(true);
    setLoanState({
      ...loanInitialState,
      bookRequest: record.id,
      book: record.bookId,
    });
  };
  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        
        setModalVisible(false);
        form.resetFields();
        try {
          console.log("loanState in handleOk: ", loanState)
          const response = await createLoan(loanState); // Make sure to pass the correct property name
          message.success('Loan request submitted successfully');
        } catch (errorInfo) {
          console.log('Error creating loan:', errorInfo);
        }
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const today = new Date();

  const disabledDate = (current: any) => {
    return current && current < new Date();
  };

  return (
    <div>
      <h1>Book Request</h1>
      <Table columns={columns} dataSource={formattedData} />

      <Form form={form}>
      <Modal
        title="Loan Book"
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Submit"
        cancelText="Cancel"
      >
        <p>Are you sure you want to borrow &quot;{selectedBook?.title}&quot;?</p>
      </Modal>
      </Form>
    </div>
  );
}

export default BookRequest;
