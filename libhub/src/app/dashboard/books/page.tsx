'use client'
import React, { useState, useEffect } from 'react';
import { Input, Table, Space, Modal, Form, Button, Upload, Select } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useCategoryActions } from '@/providers/book';

interface Book {
  name: string;
  isbn: string;
  author: string;
  publisher: string;
  status: string;
  bookCondition: BookCondition;
  bookStatus: BookStatus;
}

enum BookCondition {
  Lost = 1,
  Damaged = 2,
  Good = 3,
}

enum BookStatus {
  Available = 1,
  Unavailable = 2,
}

const dummyBooks: Book[] = [
  { name: 'Book 1', isbn: '1234567890', author: 'Author 1', publisher: 'Publisher 1', status: 'Available', bookCondition: BookCondition.Good, bookStatus: BookStatus.Available },
  { name: 'Book 2', isbn: '0987654321', author: 'Author 2', publisher: 'Publisher 2', status: 'Borrowed', bookCondition: BookCondition.Damaged, bookStatus: BookStatus.Unavailable },
  { name: 'Book 3', isbn: '5678901234', author: 'Author 3', publisher: 'Publisher 3', status: 'Available', bookCondition: BookCondition.Lost, bookStatus: BookStatus.Available },
  // Add more dummy data as needed
];

const BookComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); // Add this line
  const {getCategory} = useCategoryActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        console.log('response:', response); // Log the entire response for debugging
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
  

  const handleOk = () => {
    form.submit();
  };



  const handleCategoryChange = async () => {
    try {
      const result = await getCategory();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = (values: any) => {
    const { name, isbn, author, publisher, status, bookCondition, bookStatus } = values;
    // Here you would typically submit the form data to your backend or update your state accordingly
    setIsModalVisible(false);
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
      <Table dataSource={dummyBooks} columns={columns} />
      <Modal title="Add Book" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="author" label="Author" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="publisher" label="Publisher" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="categoryID" label="Category" rules={[{ required: true }]}>
            <Select onChange={handleCategoryChange} value={selectedCategory ? selectedCategory.id : undefined}>
              {categories.map(category => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>  
          <Form.Item name="bookCondition" label="Book Condition" rules={[{ required: true }]}>
            <Select>
              <Select.Option value={BookCondition.Lost}>Lost</Select.Option>
              <Select.Option value={BookCondition.Damaged}>Damaged</Select.Option>
              <Select.Option value={BookCondition.Good}>Good</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="bookStatus" label="Book Status" rules={[{ required: true }]}>
            <Select>
              <Select.Option value={BookStatus.Available}>Available</Select.Option>
              <Select.Option value={BookStatus.Unavailable}>Unavailable</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Upload Image">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Book
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookComponent;
