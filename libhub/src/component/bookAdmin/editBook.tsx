import React, { useState } from 'react';
import { Modal, Form, Input, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
//import onFinishupdate  from './page'

// Define interfaces for props if necessary
interface EditBookModalProps {
    visible: boolean;
    onCancel: () => void;
    onFinishupdate: (values: any) => void;
    onOk: () => void;
    form: any;
    selectedBookForEdit: any; // Assuming selectedBookForEdit is of type any, update it accordingly
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

const EditBookModal: React.FC<EditBookModalProps> = ({
    visible,
    onCancel,
    onFinishupdate,
    form,
    onOk,
    selectedBookForEdit,
  }) => {
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const handleOk = () => {
    onOk();
    form.submit();
    // Add any additional logic you want to execute when the OK button is clicked
  };

  return (
    <Modal
    title="Edit Book"
    visible={visible} // Include the visible prop here
    onCancel={onCancel}
    okText="Save Changes"
    onOk={handleOk}
  >
      <Form
        form={form}
        onFinish={(values) => onFinishupdate(values)}
        initialValues={selectedBookForEdit ? { ...selectedBookForEdit } : undefined}
      >
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
          <Input disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="author" label="Author" rules={[{ required: true }]}>
          <Input disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="publisher" label="Publisher" rules={[{ required: true }]}>
          <Input disabled={!isEditable} />
        </Form.Item>
        <Form.Item name="bookCondition" label="Book Condition" rules={[{ required: true }]}>
          <Select disabled={!isEditable}>
            <Select.Option value={BookCondition.Lost}>Lost</Select.Option>
            <Select.Option value={BookCondition.Damaged}>Damaged</Select.Option>
            <Select.Option value={BookCondition.Good}>Good</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="bookStatus" label="Book Status" rules={[{ required: true }]}>
          <Select disabled>
            <Select.Option value={BookStatus.Available}>Available</Select.Option>
            <Select.Option value={BookStatus.Unavailable}>Unavailable</Select.Option>
            <Select.Option value={BookStatus.Requested}>Requested</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="image" label="Upload Image">
          <Upload showUploadList={true} beforeUpload={() => {}}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditBookModal;
