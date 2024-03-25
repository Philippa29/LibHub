'use client'
import React, { useState, useEffect, use } from 'react';
import { Input, Table, Space, Modal, Form, Button, Upload, Select } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useCategoryActions, useBookActions } from '@/providers/book';
import { message } from 'antd';
import { Book } from '@/providers/book/interface';




enum BookCondition {
  Lost = 1,
  Damaged = 2,
  Good = 3,
}

enum BookStatus {
  Available = 1,
  Unavailable = 2,
}

// const dummyBooks: Book[] = [
//   { name: 'Book 1', isbn: '1234567890', author: 'Author 1', publisher: 'Publisher 1', status: 'Available', bookCondition: BookCondition.Good, bookStatus: BookStatus.Available },
//   { name: 'Book 2', isbn: '0987654321', author: 'Author 2', publisher: 'Publisher 2', status: 'Borrowed', bookCondition: BookCondition.Damaged, bookStatus: BookStatus.Unavailable },
//   { name: 'Book 3', isbn: '5678901234', author: 'Author 3', publisher: 'Publisher 3', status: 'Available', bookCondition: BookCondition.Lost, bookStatus: BookStatus.Available },
//   // Add more dummy data as needed
// ];

const BookComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); // Add this line
  const {getCategory} = useCategoryActions();
 
  const {addBook} = useBookActions();
  const [formData, setFormData] = useState<Book>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const [book, setBook] = useState<Book>({
    title: '',
    isbn: '',
    author: '',
    publisher: '',
    categoryID: '',
    bookStatus: 0,
    bookCondition: 0,
    file: undefined,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        //console.log('response:', response); // Log the entire response for debugging
        if (response && Array.isArray(response)) {
          
          setCategories(response.map((category: { id: string; name: string }) => ({ id: category.id, name: category.name })));
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Handle error state or display an error message to the user
      }
    };
  
    fetchCategories();
  }, [getCategory]);
  
  
  
  interface Category {
    id: string;
    name: string;
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    form.setFieldsValue({ categoryID: undefined }); // Reset category field value in the form
  };
  
  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({ categoryID: undefined }); // Reset category field value in the form
  };
  






  const onFinish = async () => {

      console.log('book:', book);

      try {
        const response = await addBook(book);
        console.log('response for addbook:', response); // Log the entire response for debugging
        
          message.success('Book added successfully');
          setIsModalVisible(false);
  
      } catch (error) {
        // if (error.response && error.response.status === 500) {
        //   message.error('Internal Server Error: Please try again later');
        // } else {
        //   message.error('An error occurred while adding book');
        // }
      }
    setIsModalVisible(false);
  };

  const getBase64 = async  (file: File | Blob) => {
    console.log("here in base 64")
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log('reader:', reader); 
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status', 
      render: (status: string) => (
        <Space size="middle">
          {status === 'Available' ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
          <span>{status}</span>
        </Space>
      ),
    },
    { 
      title: 'Book Condition', 
      dataIndex: 'bookCondition', 
      key: 'bookCondition', 
      render: (condition: BookCondition) => (
        <Space size="middle">
          {condition === BookCondition.Lost ? <CloseCircleOutlined style={{ color: 'red' }} /> : null}
          {condition === BookCondition.Damaged ? <UploadOutlined style={{ color: 'orange' }} /> : null}
          {condition === BookCondition.Good ? <CheckCircleOutlined style={{ color: 'green' }} /> : null}
          <span>{BookCondition[condition]}</span>
        </Space>
      ),
    },
    { 
      title: 'Book Status', 
      dataIndex: 'bookStatus', 
      key: 'bookStatus', 
      render: (status: BookStatus) => (
        <Space size="middle">
          {status === BookStatus.Available ? <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />}
          <span>{BookStatus[status]}</span>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add
      </Button>
      <Input.Search
        placeholder="Search books"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      {/* //<Table dataSource={dummyBooks} columns={columns} /> */}
      <Modal 
      title="Add Book" 
      open={isModalVisible} 
      onOk={form.submit} 
      onCancel={handleCancel}
      okText= 'Add Book'
      cancelButtonProps={{danger: true}}
      okButtonProps={{type: 'primary'}}
      >
        <Form
          form={form}
          onFinish={onFinish}
        >
         <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input onChange={(e) => setBook({ ...book, title: e.target.value })} />
        </Form.Item>
        <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
             <Input onChange={(e) => setBook({ ...book, isbn: e.target.value })} />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input onChange={(e) => setBook({ ...book, author: e.target.value })} />
        </Form.Item>
        <Form.Item name="publisher" label="Publisher" rules={[{ required: true }]}>
          <Input onChange={(e) => setBook({ ...book, publisher: e.target.value })} />
        </Form.Item>
        <Form.Item name="categoryID" label="Category" rules={[{ required: true }]}>
          <Select onChange={(value) => setBook({ ...book, categoryID: value })} value={book.categoryID}>
                      {categories.map(category => (
          <Select.Option key={category.id} value={category.id}>
                        { category.name}
          </Select.Option>
                  ))}
          </Select>
      </Form.Item>
      <Form.Item name="bookCondition" label="Book Condition" rules={[{ required: true }]}>
          <Select onChange={(value) => setBook({ ...book, bookCondition: value })} value={book.bookCondition}>
            <Select.Option value={BookCondition.Lost}>Lost</Select.Option>
            <Select.Option value={BookCondition.Damaged}>Damaged</Select.Option>
            <Select.Option value={BookCondition.Good}>Good</Select.Option>
          </Select>
      </Form.Item>
      <Form.Item name="bookStatus" label="Book Status" rules={[{ required: true }]}>
        <Select onChange={(value) => setBook({ ...book, bookStatus: value })} value={book.bookStatus}>
        <Select.Option value={BookStatus.Available}>Available</Select.Option>
        <Select.Option value={BookStatus.Unavailable}>Unavailable</Select.Option>
        </Select>
    </Form.Item>
        <Form.Item name="image" label="Upload Image">
        <Upload
  fileList={
    book.file
      ? [
          {
            uid: '-1',
            name: book.file.name, // Provide the file name as a string
            status: 'done', // Assuming the file is already uploaded
            url: `data:image/png;base64,${book.file.base64String}`, // Assuming the base64 string is stored in 'base64String'
          },
        ]
      : []
  }
  
  onChange={async (info) => {
    console.log('info:', info);
    if (info.file.status === 'uploading') {
      const file = info.file.originFileObj as File; // Get the uploaded file
      try {
        console.log('here in file file:', file);
        const base64String = await getBase64(file);
        console.log(base64String)
         console.log('name', file.name) 
         console.log('type', file.type)// Convert the file to base64
         setBook(prevBook => ({
          ...prevBook,
          file: { base64String, name: file.name, type: file.type },
        }));
         // Update the book state with the base64 string
      } catch (error) {
        console.error('Error converting file to base64:', error);
      }
    }
    else if (info.file.status === 'removed') {
      setBook(prevBook => ({
        ...prevBook,
        file: undefined, // Clear the file from the state
      }));
    }
  }}
  showUploadList={true}
>
  <Button icon={<UploadOutlined />}>Click to Upload</Button>
</Upload>




      </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookComponent;
