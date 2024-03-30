'use client'
import React, { useState, useEffect, use } from 'react';
import { Input, Table, Space, Modal, Form, Button, Upload, Select } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useCategoryActions, useBookActions } from '@/providers/book';
import { message } from 'antd';
import { Book } from '@/providers/book/interface';
import axios from 'axios';




enum BookCondition {
  Lost = 1,
  Damaged = 2,
  Good = 3,
}

enum BookStatus {
  Available = 1,
  Unavailable = 2,
}



const BookComponent: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allbooks , setallbooks ] = useState<Book[]>([]); // Add this line
  const [searchValue, setSearchValue] = useState('');
  
  const {getCategory} = useCategoryActions();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBookForEdit, setSelectedBookForEdit] = useState<Book | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for Add modal

  const {addBook, getBook} = useBookActions();
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteBook, setDeleteBook] = useState<Book | null>(null);
  
  const showDeleteModal = (book: Book) => {
    setDeleteBook(book);
    setIsDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };
  
  const [book, setBook] = useState<Book>({
    id: '',
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
    }
  
    fetchCategories();

    
    
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBook();
        console.log('response:', response);
        // Log the entire response for debugging
        if (response && Array.isArray(response)) {
          setallbooks(response);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
  
    fetchBooks();
  }, []);
  
  
  
  interface Category {
    id: string;
    name: string;
  }

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedBookForEdit(null) // Reset category field value in the form
    console.log('selectedBookForEdit in cancel:', selectedBookForEdit);
  };
  
  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue({ categoryID: undefined }); // Reset category field value in the form
  };
  


  const handleBeforeUpload = (file: File, fileList: File[]) => { // Explicitly type the parameters
    if (fileList.length > 1) {
      message.error('You can only upload one image.');
      return false; // Prevent uploading
    }
    return true; // Allow uploading
  };
  



  const onFinish = async (values: any) => {

      console.log('values:', values);

      const formData = new FormData();
      //book.categoryID = "1E27D26D-8EF9-411D-94E9-08DC4A40801A";
      formData.append('title', values?.title);
      formData.append('author', values?.author);
      formData.append('publisher', values?.publisher);
      formData.append('categoryID', values?.categoryID);
      formData.append('isbn', values?.isbn);
      formData.append('bookStatus', values?.bookStatus.toString());
      formData.append('bookCondition', values?.bookCondition.toString());
      formData.append('file', values?.image.file.originFileObj );

      console.log('formdata:', formData);


     
    setIsModalVisible(false);
  };

  const handleEdit = (book: Book) => {
    console.log('book:', book);
    setSelectedBookForEdit(book);
    console.log('selectedBookForEdit:', selectedBookForEdit);
    setIsEditModalVisible(true);
  };

  const handleDelete = async (book: Book | null) => {
    console.log('book in delete:', book);
  } 



  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'ISBN', dataIndex: 'isbn', key: 'isbn' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Publisher', dataIndex: 'publisher', key: 'publisher' },
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
    { 
      title: 'Edit',
      key: 'actions',
      render: (text: any, record: Book) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
        </Space>
      ),
    },
    { 
      title: 'Delete',
      key: 'delete',
      render: (text: any, record: Book) => (
        <Space size="middle">
          <Button danger onClick={() => showDeleteModal(record)}>Delete</Button>
        </Space>
      ),
    },
  ];
  

  // onClick={() => showModal(record)}

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
      <Table dataSource={allbooks} columns={columns} /> 
      <Modal 
      title="Add Book" 
      open={isAddModalVisible} // Use "visible" instead of "open"
      onCancel={() => {
      setIsAddModalVisible(false);
      form.resetFields();
      }}
      okText="Add Book"
      onOk={form.submit}
      >
        <Form
          form={form}
          onFinish={onFinish}
        >
         <Form.Item name="title" label="Title" rules={[{ required: true }]}>
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
          showUploadList={true}
          beforeUpload={handleBeforeUpload}
          maxCount={1} // Limit the number of files to 1
        >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
   </Upload>
</Form.Item>
        </Form>
      </Modal>
      <Modal 
  title="Edit Book" 
  open={isEditModalVisible} // Use "visible" instead of "open"
  onCancel={() => {
    setIsEditModalVisible(false);
    form.resetFields();
    setSelectedBookForEdit(null);
  }}
  okText="Save Changes"
  onOk={form.submit}
>
  <Form
    form={form}
    onFinish={onFinish}
    initialValues={selectedBookForEdit ? { ...selectedBookForEdit } : undefined}
    onValuesChange={(changedValues, allValues) => {
      setSelectedBookForEdit(prevState => ({
        ...prevState,
        ...changedValues
      }));
    }}
    key={selectedBookForEdit?.id}
  >
    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
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
  <Select>
    {categories.map(category => (
     <Select.Option key={category.id} value={category.id}>
     { category.name}
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
      <Upload
        showUploadList={true}
        beforeUpload={handleBeforeUpload}
        maxCount={1} // Limit the number of files to 1
      >
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </Form.Item>
   
  </Form>
</Modal>
<Modal
  title="Delete Book"
  open={isDeleteModalVisible}
  onCancel={hideDeleteModal}
  onOk={() => handleDelete(deleteBook)}
  
  footer={[
    <Button key="cancel" onClick={hideDeleteModal}>
      Cancel
    </Button>,
    <Button key="delete" type="primary" danger onClick={() => handleDelete(deleteBook)}>
      Delete
    </Button>,
  ]}
>
  <p>Are you sure you want to delete this book?</p>
</Modal>
  
    </div>
  );
};

export default BookComponent;