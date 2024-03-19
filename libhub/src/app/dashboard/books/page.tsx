'use client'
import React, { useState } from 'react';
import { Input, Table, Space, Modal, Form, Button, Upload, Select } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

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
  const [searchValue, setSearchValue] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values: any) => {
    const { name, isbn, author, publisher, status, bookCondition, bookStatus } = values;
    dummyBooks.push({ name, isbn, author, publisher, status, bookCondition, bookStatus });
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
      <Modal title="Add Book" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
