import React, { useEffect, useState, useReducer } from 'react';
import { Table, Button, Modal, Input, Form , message} from 'antd'; // Import Modal component
import { useBookRequestState, useBookRequestActions } from '@/providers/bookrequest';
import { BookRequestState } from '@/providers/bookrequest/interface';
import { getBookByIdReducer  } from '@/providers/book/reducer';
import { GetAllBookRequestReducer } from '@/providers/bookrequest/reducer';
import { getBookbyidstate } from '@/providers/book/interface';
import { useBookActions } from '@/providers/book';



const BookRequest: React.FC = () => {

  const [modalVisible, setModalVisible] = useState<boolean>(false); // Declare modalVisible state
  const getBookByIdInitialState: getBookbyidstate = {
    id: '',
    author: '',
    title: '',
    isbn: '',
  };
  const [bookRequests, setBookRequests] = useState<BookRequestState[]>([]);
  const [bookrequests, dispatchallbookrequests] = useReducer(GetAllBookRequestReducer, []);
  const [bookdetails, dispatchallbookdetails] = useReducer(getBookByIdReducer, [] as getBookbyidstate[]);
  //const [modalVisible, setModalVisible] = useState<boolean>(false); // Declare modalVisible state
  const [librarianId, setLibrarianId] = useState<string>(''); // Declare librarianId state
  const [studentId, setStudentId] = useState<string>(''); // Declare studentId state
  const [selectedBook, setSelectedBook] = useState<BookRequestState | null>(null); // Declare selectedBook state
  const [form] = Form.useForm();
  const { getAllBookRequest } = useBookRequestActions();
  const { getbookbyid } = useBookActions();

  // const handleLoanButtonClick = (record: BookRequestState) => {
  //   setSelectedBook(record);
  //   setLibrarianId(''); // Clear librarian ID input
  //   setStudentId(''); // Clear student ID input
  //   setModalVisible(true);
  // };

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
      title: 'Borrow',
      key: 'action',
      render: (text: any, record: BookRequestState) => (
        <Button type="primary" onClick={() => handleLoanButtonClick(record)}>Borrow</Button> // Open modal on click
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBookRequest();
        setBookRequests(response);

        const bookDetailsPromises = response.map(async (request) => {
          const { title, isbn, author } = await getbookbyid(request.bookId);
          return { ...request, bookDetails: { title, isbn, author } };
        });
        const bookDetails = await Promise.all(bookDetailsPromises);

        bookDetails.forEach(detail => {
          dispatchallbookdetails({
            type: 'GET_BOOK_BY_ID',
            payload: {
              id: detail.bookId,
              author: detail.bookDetails.author,
              title: detail.bookDetails.title,
              isbn: detail.bookDetails.isbn
            }
          });
        });
      } catch (error) {
        console.error('Error fetching book requests:', error);
      }
    };

    fetchData();
  }, [getAllBookRequest, getbookbyid]);

  const formattedData = bookRequests?.map((request: BookRequestState, index: number) => {
    const detail = bookdetails.find((detail) => detail.id === request.bookId);

    if (detail) {
      return {
        key: index.toString(),
        studentId: request.studentId,
        bookId: request.bookId,
        id: request.bookId,
        bookDetails: `${detail.title} by ${detail.author} - ISBN: ${detail.isbn}`,
      };
    } else {
      return {
        key: index.toString(),
        studentId: request.studentId,
        bookId: request.bookId,
        id: request.bookId,
        bookDetails: 'Book details not found',
      };
    }
  });

  const handleLoanButtonClick = (record: BookRequestState) => {
    setSelectedBook(record);
    setStudentId(record.studentId); // Set student ID to the student ID of the clicked row
    setModalVisible(true);
  };
  

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields(); // Reset form fields on cancel
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        // Perform any additional logic with form values if needed
        message.success('Loan request submitted successfully');
        setModalVisible(false);
        form.resetFields(); // Reset form fields on success
      })
      .catch(errorInfo => {
        console.log('Validation failed:', errorInfo);
      });
  };



  return (
    <div>
    <h1>Book Request</h1>
    <Table columns={columns} dataSource={formattedData} />

    <Modal
      title="Loan Book"
      open={modalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Submit"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Librarian ID"
          name="librarianId"
          rules={[{ required: true, message: 'Please enter librarian ID' }, { pattern: /^\d{8}$/, message: 'Librarian ID must be 8 numbers long' }]}
        >
          <Input value={librarianId} onChange={(e) => setLibrarianId(e.target.value)} />
        </Form.Item>

        <Form.Item
        label="Student ID"
        name="studentId"
        rules={[
        {    required: true, message: 'Please enter student ID' },
        { pattern: /^\d{8}$/, message: 'Student ID must be 8 numbers long' }
          ]}
        >
  <Input onChange={(e) => setStudentId(e.target.value)} />
</Form.Item>


        {/* Additional form fields */}
      </Form>
    </Modal>
  </div>
  );
}

export default BookRequest;
