import React, { useEffect, useState, useReducer } from 'react';
import { Table, Button, Modal, Input, Form, message, DatePicker } from 'antd';
import { useBookRequestState, useBookRequestActions } from '@/providers/bookrequest';
import { BookRequestState } from '@/providers/bookrequest/interface';

import { getBookbyidstate } from '@/providers/book/interface';
import { useBookActions } from '@/providers/book';
import moment from 'moment';
import { useLoanActions, useLoanState } from '@/providers/loan';
import { LoanState, initialState as loanInitialState } from '@/providers/loan/interface';
import WithAuth from '../../providers/auth/requireauth';
import { initialState } from '@/providers/loan/interface';
import { updateBookRequestAction } from '@/providers/bookrequest/action';
import { BookRequestReducer } from '@/providers/bookrequest/reducer';
import { initialBookRequestState } from '@/providers/bookrequest/context';
const BookRequest: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {bookRequests} = useBookRequestState(); // Remove array destructuring
  const loan = useLoanState();
  const [selectedBook, setSelectedBook] = useState<BookRequestState | null>(null);
  const [form] = Form.useForm();
  const { getAllBookRequest } = useBookRequestActions();
  const { createLoan } = useLoanActions();
  const [loanState, setLoanState] = useState(loanInitialState);
  const [searchValue, setSearchValue] = useState<string>(''); 
  const [state,dispatch] = useReducer(BookRequestReducer, initialBookRequestState ); 
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
    getAllBookRequest();
    console.log("bookRequests in useEffect: ", bookRequests)
  }, []);

  const formattedData = Array.isArray(bookRequests) ? bookRequests.map((request: BookRequestState, index: number) => {
    console.log("request in formattedData: ", bookRequests)
    return {
        key: index.toString(),
        studentId: request.studentId,
        bookId: request.bookId,
        id: request.id,
        title: request.title,
        author: request.author,
        isbn: request.isbn,
        image: request.image,
    };
}) : [];

const handleLoanButtonClick = (record: BookRequestState) => {
  // Check if the book has already been borrowed
  const isBookBorrowed = loan.loans.some(loan => loan.book ===  record.bookId);

  // If the book has already been borrowed, return early
  if (isBookBorrowed) {
    message.warning('This book has already been borrowed.');
    return;
  }

  setSelectedBook(record);
  setModalVisible(true);
  // No need to create a loan state here, it's better to do it only when the user confirms the loan
};


  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      if (selectedBook) {
        const newLoanState = {
          ...initialState, 
          book: selectedBook.bookId,
          bookRequest: selectedBook.id,
        };
        try {
          await createLoan(newLoanState);
          setModalVisible(false);
          form.resetFields();
          message.success('Loan request submitted successfully');
        } catch (error) {
          console.log('Error creating loan:', error);
          message.error('Loan request submitted unsuccessfully');
        }
      }
    }).catch((errorInfo) => {
      console.log('Validation failed:', errorInfo);
    });
  };
  

  const handleSearch = (value: string) => {
    setSearchValue(value); // Update the search query state
  };

  const today = new Date();

  const disabledDate = (current: any) => {
    return current && current < new Date();
  };

  return (
    <div>
      
      <Input.Search placeholder="Search book requests" value={searchValue} onChange={(e) => handleSearch(e.target.value)} style={{ marginBottom: '16px', marginTop: '16px' }}/>
      <Table columns={columns} dataSource={formattedData} />

      <Form form={form}>
      <Modal
      title="Loan Book"
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={() => handleOk()} // Remove unnecessary arrow function
      okText="Submit"
      cancelText="Cancel"
>
  <p>Are you sure you want to borrow &quot;{selectedBook?.title}&quot;?</p>
</Modal>

      </Form>
    </div>
  );
}

export default WithAuth(BookRequest);
