import React, { useEffect, useState } from 'react';
import { useBookActions, useBookState } from '@/providers/book';
import { Card, Row, Col, Image, Spin, Typography, Button, Modal, Input } from 'antd';
import { landingstyles } from './styles';
import { useBookRequestActions } from '@/providers/bookrequest';
import { useBookRequestState } from '@/providers/bookrequest';
import { useImageActions } from '@/providers/image';
import WithAuth from '../../providers/auth/requireauth';
import { Book } from '@/providers/book/interface';
import { message } from 'antd';
import { get } from 'http';
import { relative } from 'path';
const { Title } = Typography;
const { Search } = Input;

const LandingPage: React.FC = () => {
    const { getAvailableBooks, search } = useBookActions();
    const { book,books}= useBookState(); 
    const { getAllImages } = useImageActions();
    const { addBookRequest } = useBookRequestActions();
    //const [books, setBooks] = useState<Book[]>([]);
    const {bookRequest, bookRequests} = useBookRequestState(); 
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [isbnInputValue, setIsbnInputValue] = useState<string>('');
    const [isbnWarning, setIsbnWarning] = useState<string | null>(null);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const { styles } = landingstyles();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            await getAvailableBooks();
            const imagesData = await getAllImages();
           
            setImages(imagesData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleRequestButtonClick = async (bookId: string) => {
        // Check if the book has already been requested
        const isBookRequested = bookRequests.some(request => request.bookId === bookId);
    
        // If the book has already been requested, show a warning message and return
        if (isBookRequested) {
            message.warning('This book has already been requested.');
            return;
        }
    
        // Find the correct book from the books array based on the bookId
        const book = books.find(book => book.bookId === bookId);
        setSelectedBook(book);
        setModalVisible(true);
    };
    

    const handleConfirmRequest = async () => {
        console.log("selected book in handleConfirmRequest: ", selectedBook);
        if (selectedBook) {
            const newbookRequest = {
                id: selectedBook.id,
                bookId: selectedBook.bookId,
                studentId: selectedBook.studentId,
                title: selectedBook.title,
                author: selectedBook.author,
                isbn: selectedBook.isbn,
            };
            await addBookRequest(newbookRequest);
            setModalVisible(false);
            setSelectedBook(null);
            getAvailableBooks();
        }
    };

    const handleSearch = async (value: string) => {
        if (value.trim() !== '') {
            try {
                setLoading(true);
                const searchResults = await search(value);
                setSearchResults(searchResults);
                setLoading(false);
            } catch (error) {
                console.error('Error searching by title:', error);
                setLoading(false);
            }
        }
    };

    return (
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                <div style={{margin: 'auto', width: '50%'}}>
                <Search placeholder="Search..." size="small" style={{ width: '100%'}} onSearch={handleSearch}  />
</div>
                 {loading && (
                    <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                )}
                <div style={{ minHeight: '80vh', position: 'relative', padding: '10px 50px' }}>
               
                <Row gutter={[16, 16]} justify="center" align="middle" style={{ minHeight: '100vh', padding: '10px 50px' }}>
  {(searchResults?.length > 0 ? searchResults : books)?.map(book => (
    <Col key={book.bookId} xs={24} sm={12} md={8} lg={6} xl={4}>
      <div className={styles.cardContainer}>
        <Card
          className={styles.container}
          cover={<Image alt={"image"} height={350} src={`data:image/jpeg;base64,${images.find(image => image.id === book.imageId)?.base64}`} />}
        >
          <Card.Meta
            description={(
              <div style={{ marginTop: '-30px'}}>
                 
              </div>
            )}
          />
          <div className={styles.buttonContainer}>
           <Button style={{ backgroundColor: "#dc5cd4", color: "#fff" }} onClick={() => handleRequestButtonClick(book.bookId)}>Request</Button>
          </div>
        </Card>
      </div>
    </Col>
  ))}
</Row>


                <Modal
                title="Confirm Book Request"
                visible={modalVisible}
                onOk={() => handleConfirmRequest()} // Wrap handleConfirmRequest with an arrow function and pass selectedBook as an argument
                onCancel={() => setModalVisible(false)}
                    >
    <p>Are you sure you want to request this book?</p>
</Modal>
            </div>
            </div>
            
        
    );
};

export default WithAuth(LandingPage);
