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
import WithAuth from '../../providers/auth/requireauth';

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
  const [searchValue, setSearchValue] = useState<string>(''); 
  
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

  const filteredData = formattedData?.filter((request: BookRequestState) =>
    request.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    request.author.toLowerCase().includes(searchValue.toLowerCase()) ||
    request.isbn.toLowerCase().includes(searchValue.toLowerCase())
  );
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
          const response = await createLoan(loanState);
           // Make sure to pass the correct property name
          message.error('Loan request submitted unsuccessfully');
        } catch (errorInfo) {
          console.log('Error creating loan:', errorInfo);
        }
      })
      .catch((errorInfo) => {
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
      <Table columns={columns} dataSource={filteredData} />

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

export default WithAuth(BookRequest);
