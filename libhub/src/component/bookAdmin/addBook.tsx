import React, { useState } from 'react'; // Import useState from React
import { Modal, Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useBookState } from '@/providers/book';

// Define interfaces for props if necessary
interface AddBookModalProps {
    visible: boolean;
    onCancel: () => void;
    onFinish: (values: any) => void; 
    form: any; 
    categories: any[]; 
  }

enum BookCondition {
  Lost = 1,
  Damaged = 2,
  Good = 3,
}

enum BookStatus {
  Available = 1,
  Unavailable = 2,
  Requested = 3,
}

const AddBookModal: React.FC<AddBookModalProps> = ({ visible, onCancel, onFinish, form, categories }) => {
 // Define state for book
 const {book } = useBookState(); 
    
  return (
    <Modal
      title="Add Book"
      visible={ visible}
      onCancel={() => {
        console.log('Cancel clicked', visible);
        onCancel();
        form.resetFields();
      }}
      okText="Add Book"
      onOk={() => form.submit()}
    >
      <Form
        form={form}
        onFinish={(values) => onFinish(values)}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input  />
        </Form.Item>
        <Form.Item name="isbn" label="ISBN" rules={[{ required: true, message: 'Please input the ISBN!' },
        {
          validator: (_, value) => {
            if (!/^\d{13}$/.test(value)) {
              return Promise.reject('ISBN must be exactly 13 digits long!');
            }
            return Promise.resolve();
          },
        },
        ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="publisher" label="Publisher" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="categoryID" label="Category" rules={[{ required: true }]}>
          <Select >
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
          <Select >
            <Select.Option value={BookStatus.Available}>Available</Select.Option>
            <Select.Option value={BookStatus.Unavailable}>Unavailable</Select.Option>
            <Select.Option value={BookStatus.Requested}>Requested</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="image" label="Upload Image">
          <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddBookModal;
