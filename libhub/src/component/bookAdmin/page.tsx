'use client'
import React, { useState, useEffect, useReducer, Suspense } from 'react';
import { Input, Table, Space, Modal, Form, Button, Upload, Select, Card, Image } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined , EyeOutlined, FileSyncOutlined } from '@ant-design/icons';
import { useCategoryActions, useBookActions } from '@/providers/book';
import { message } from 'antd';
import { Book } from '@/providers/book/interface';
import { useRouter } from 'next/navigation';
import { useBookRequestState, useBookRequestActions } from '@/providers/bookrequest';
import { BookRequestState } from '@/providers/bookrequest/interface';
import { getallbooksreducer } from '@/providers/book/reducer';
import { GetAllBookRequestReducer } from '@/providers/bookrequest/reducer';
import RequireAuth from '@/providers/auth/requireauth';
import { updateBook } from '@/providers/book/action';




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



const BookComponent: React.FC = () => {
  const route = useRouter();
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allbooks , setallbooks ] = useState<Book[]>([]); // Add this line
  const [searchValue, setSearchValue] = useState('');
  const [selectedBookImage, setSelectedBookImage] = useState<string | null>(null);
  
  const {getCategory} = useCategoryActions();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBookForEdit, setSelectedBookForEdit] = useState<Book | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for Add modal

  const {addBook, getBooks, deleteBook, getImage, updateBook} = useBookActions();

  
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteBookstate, setDeleteBookstate] = useState<Book | null>(null);
  const isEditable = true; 
  const showDeleteModal = (book: Book) => {
    setDeleteBookstate(book);
    setIsDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };
  
  const [book, setBook] = useState<Book>({
    bookId: '',
    title: '',
    imageId: '',
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
        const response = await getBooks();
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
    console.log('selectedBookForEdit in show:', selectedBookForEdit);
    //form.setFieldsValue({ categoryID: undefined }); // Reset category field value in the form
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
      addBook(formData);

     
    setIsModalVisible(false);
  };

  const onFinishUpdate = async (values: any) => {

    console.log('values:', values);

    //console.log('values:', values);

    const formData = new FormData();
    const formDataImage = new FormData();
    console.log(formData, "FORM_DATA_UPDATE_VALES")
    formData.append('bookId', selectedBookForEdit?.bookId);
    formData.append('imageId', selectedBookForEdit?.imageId);
    // Check if 'image' field is defined and has a file property before appending it to formData
    if (values?.image && values?.image.file && values?.image.file.originFileObj) {
      console.log("here if an image is uploaded"); 
      formDataImage.append('file', values?.image.file.originFileObj);
      formDataImage.append('id', selectedBookForEdit?.imageId);
      
    }
    
    formData.append('title', values?.title);
    console.log("formdata", formData.get('title'));
    formData.append('author', values?.author);
    formData.append('publisher', values?.publisher);
    formData.append('categoryID', selectedBookForEdit?.categoryID);
    formData.append('isbn', values?.isbn);
    formData.append('bookStatus', values?.bookStatus.toString());
    formData.append('bookCondition', values?.bookCondition.toString());
  console.log('formdata ent:', formData.values());
  // console.log('formData content:');
  // for (const pair of formData.entries()) {
  //     console.log(pair[0] + ', ' + pair[1]);
  // }
    updateBook(formData, formDataImage);
    

   
    //addBook(formData);

   
  setIsModalVisible(false);
};

const handleView = async (book: Book) => {
  setSelectedBook(book);
  setIsViewModalVisible(true);
  
  try {
      const base64Image = await getImage(book.imageId);
      setSelectedBookImage(base64Image);
  } catch (error) {
      console.error('Error fetching image:', error);
      // Handle error if necessary
  }
};

const ViewModal = (
  <Modal
    title="Book Details"
    open={isViewModalVisible}
    onCancel={() => setIsViewModalVisible(false)}
    footer={null}
  >
    {selectedBook && (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card style={{ width: '60%' }}>
          <Image
            src={selectedBookImage } // Use the selectedBookImage if available, otherwise use a default image
            alt="Book Cover"
            width={150}
            height={200}
            style={{ marginRight: 20 }}
          />
          <div>
            <p>Title: {selectedBook.title}</p>
            <p>ISBN: {selectedBook.isbn}</p>
            <p>Author: {selectedBook.author}</p>
            <p>Publisher: {selectedBook.publisher}</p>
           
          </div>
        </Card>
      </div>
    )}
  </Modal>
);



  const handleEdit = (book: Book) => {
    console.log('book:', book);
    setSelectedBookForEdit(book);
    console.log('selectedBookForEdit:', selectedBookForEdit);
    setIsEditModalVisible(true);
  };

  const renderViewButton = (book: Book) => (
    <Button type="primary" icon={<EyeOutlined />} onClick={() => handleView(book)}>
      View
    </Button>
  );

  const handleDelete = async (book: Book | null) => {
    console.log('book in delete:', book);
    console.log('book in delete:', book.bookId);

    const response = await deleteBook(book?.bookId);
    //route.push('/books'); 
    setIsDeleteModalVisible(false);
    window.location.reload();
  console.log('response:', response);
   
    
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
          {status === BookStatus.Available ? <CheckCircleOutlined style={{ color: 'green' }} /> : null}
          {status === BookStatus.Unavailable ? <CloseCircleOutlined style={{ color: 'red' }} /> : null}
          {status === BookStatus.Requested ? <FileSyncOutlined  style={{ color: 'blue' }} /> : null}
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
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Book) => (
        <Space size="middle">
          {renderViewButton(record)}
          {/* Add other actions/buttons as needed */}
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
  

  

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>

      <Input.Search
        placeholder="Search books"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{ marginBottom: '16px' , marginTop : '16px'}}
      />
      <Table dataSource={allbooks} columns={columns} /> 
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Book
      </Button>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginLeft: '10px' }}>
  Add Category
</Button>
      <Modal 
      title="Add Book" 
      open={isModalVisible} // Use "visible" instead of "open"
      onCancel={() => {
      handleCancel();
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
        <Form.Item name="isbn" label="ISBN" rules={[ { required: true, message: 'Please input the ISBN!' },
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
        <Select.Option value={BookStatus.Requested}>Requested</Select.Option>
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
    onFinish={onFinishUpdate}
    initialValues={selectedBookForEdit ? { ...selectedBookForEdit } : undefined}
    onValuesChange={(changedValues, allValues) => {
      setSelectedBookForEdit(prevState => ({
        ...prevState,
        ...changedValues
      }));
    }}
    key={selectedBookForEdit?.bookId}
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
      <Select>
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
{ViewModal}
<Modal
  title="Delete Book"
  open={isDeleteModalVisible}
  onCancel={hideDeleteModal}
  // onOk={() => handleDelete(deleteBook)}
  
  footer={[
    <Button key="cancel" onClick={hideDeleteModal}>
      Cancel
    </Button>,
    <Button key="delete" type="primary" htmlType='submit' danger onClick={() => handleDelete(deleteBookstate)}>
      Delete
    </Button>,
  ]}
>
  <p>Are you sure you want to delete this book?</p>
</Modal>
  
    </div>
    </Suspense>
  );
};

export default BookComponent;