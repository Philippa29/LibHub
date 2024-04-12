'use client'
import React, { useState, useEffect, useReducer, Suspense } from 'react';
import { Input, Table, Space, Modal, Form, Button, Upload, Select, Card, Image } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined , EyeOutlined, FileSyncOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { useBookActions, useBookState } from '@/providers/book';
import { useCategoryActions, useCategoryState } from '@/providers/category';
import { message } from 'antd';
import { Book } from '@/providers/book/interface';
import { bookComponentStyles } from './styles/style';
import WithAuth from '../../providers/auth/requireauth';
import { useImageActions, useImageState } from '@/providers/image';
import AddBookModal from './addBook';
import  EditBookModal from './editBook';
import DeleteBookModal from './deleteBook';
import BookDetailsModal from './viewBook';



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
  
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const { books } = useBookState(); // Destructure the allbooks state
  const {category, categories} = useCategoryState();
  const [searchValue, setSearchValue] = useState('');
  const [selectedBookImage, setSelectedBookImage] = useState<string | null>(null);
  const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
  const {getImage} = useImageActions();
  const {image} = useImageState();
  const {getCategory, addCategory} = useCategoryActions();
  
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedBookForEdit, setSelectedBookForEdit] = useState<Book | null>(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for Add modal

  const {addBook, getBooks, deleteBook, updateBook} = useBookActions();
 
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [deleteBookstate, setDeleteBookstate] = useState<Book | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Number of rows per page

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
    getCategory();
    console.log('categories:', categories); 
    //show me the interface...hello of what? of ook 
    
  }, []);

  useEffect(() => {
    setFilteredBooks(books.map(book => ({
      ...book,
      file: {
        base64String: book.file as string,
        name: '',
        type: ''
      }
    }))); // Initially, display all books
  }, [books]);

  useEffect(() => {
     getBooks();
    
  }, []);

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  //   form.resetFields();
  //   setSelectedBookForEdit(null) // Reset category field value in the form
  //   console.log('selectedBookForEdit in cancel:', selectedBookForEdit);
  // };
  
  const showModal = () => {

    setIsModalVisible(true);
    console.log('selectedBookForEdit in show:', selectedBookForEdit);
    //form.setFieldsValue({ categoryID: undefined }); // Reset category field value in the form
  };

  const showAddCategoryModal = () => {
    setIsAddCategoryModalVisible(true);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value); // Update the search query state

    // Filter the books based on the search query
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(value.toLowerCase()) ||
      book.isbn.toLowerCase().includes(value.toLowerCase()) ||
      book.author.toLowerCase().includes(value.toLowerCase()) ||
      book.publisher.toLowerCase().includes(value.toLowerCase())
    ).map(book => ({
      ...book,
      file: {
        base64String: book.file as string,
        name: '',
        type: ''
      }
    }));
    setFilteredBooks(filtered); // Update the filtered books state
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
    //window.location.reload();
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
  setIsViewModalVisible(false); 
    updateBook(formData, formDataImage);
  
  
};

const handleView = async (book: Book) => {
  setSelectedBook(book);
  setIsViewModalVisible(true);
  
  try {
      const base64Image = await getImage(book.imageId);
     // setSelectedBookImage(base64Image);
  } catch (error) {
      console.error('Error fetching image:', error);
      // Handle error if necessary
  }
};

const handleAddCategory = async (values: any) => {
  
  console.log('Adding category:', values.name);
  const response = await addCategory(values.name.toString()); 
  console.log('response:', response);
  setIsAddCategoryModalVisible(false);
  form.resetFields();
};

const ViewModal = (
<BookDetailsModal
                visible={isViewModalVisible}
                onCancel={() => setIsViewModalVisible(false)}
                //onOk={() => setIsViewModalVisible(false)}
                book={selectedBook}
                //bookImage={image}
            />


);



  const handleEdit = (book: Book) => {
    console.log('book:', book);
    setSelectedBookForEdit(book);
    console.log('selectedBookForEdit:', selectedBookForEdit);
    setIsEditModalVisible(true);
    //getBooks();
    
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
   // window.location.reload();
  //console.log('response:', response);
   
    
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
          <Button onClick={() => handleEdit(record)} icon={<EditOutlined />}></Button>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Book) => (
        <Space size="middle">
          {renderViewButton(record)}
          {/* Assuming renderViewButton renders a button with appropriate icon */}
        </Space>
      ),
    },
    { 
      title: 'Delete',
      key: 'delete',
      render: (text: any, record: Book) => (
        <Space size="middle">
          <Button danger onClick={() => showDeleteModal(record)} icon={<DeleteOutlined />}></Button>
        </Space>
      ),
    },
  ];

  const handleCancelAddCategory = () => {
    setIsAddCategoryModalVisible(false);
    form.resetFields();
  };
  const totalPages = Math.ceil(filteredBooks.length / pageSize);

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const generatePageData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredBooks.slice(startIndex, endIndex);
  };
  

 

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div>

    <Input.Search placeholder="Search books" value={searchValue} onChange={(e) => handleSearch(e.target.value)} style={{ marginBottom: '16px', marginTop: '16px' }}/>
      
    <Table
          dataSource={generatePageData()}
          columns={columns}
          pagination={{
            current: currentPage,
            total: filteredBooks.length,
            pageSize: pageSize,
            onChange: handlePageChange,
            showSizeChanger: false,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
        />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal} style={{ marginRight: '10px' }}>
        Add Book
      </Button>
      <Button type="primary" icon={<PlusOutlined />} onClick={showAddCategoryModal}>
        Add Category
      </Button>
      </div>


        <Modal
          title="Add Category"
          visible={isAddCategoryModalVisible}
          onCancel={handleCancelAddCategory}
          footer={[
            <Button key="cancel" onClick={handleCancelAddCategory}>
              Cancel
            </Button>,
            <Button key="add" type="primary" onClick={form.submit}>
              Add Category
            </Button>,
          ]}
        >
          <Form form={form} onFinish={handleAddCategory}>
            <Form.Item
              name="name"
              label="Category Name"
              rules={[{ required: true, message: 'Please enter the category name' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        
        <AddBookModal 
      visible={isModalVisible}
      onCancel={() => {  setIsModalVisible(false)}}
      onFinish={onFinish}
      form={form}
      categories={categories}
    />

<EditBookModal
  visible={isEditModalVisible}
  onCancel={() => setIsEditModalVisible(false)}
  onFinishupdate={onFinishUpdate} 
  onOk={() => setIsEditModalVisible(false)}
  form={form}
  selectedBookForEdit={selectedBookForEdit}
/>
{ViewModal}
<DeleteBookModal
                visible={isDeleteModalVisible}
                onCancel={() => setIsDeleteModalVisible(false)}
                onDelete={() => handleDelete(deleteBookstate)}
            />
  
    </div>
    </Suspense>
  );
};

export default WithAuth(BookComponent);