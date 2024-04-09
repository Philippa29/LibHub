import React, { useEffect, useState } from 'react';
import { useBookActions } from '@/providers/book';
import { Card, Row, Col, Image, Spin, Typography, Button, Modal, Input } from 'antd';
import { landingstyles } from './styles';
import { useBookRequestActions } from '@/providers/bookrequest';
import WithAuth from '../../providers/auth/requireauth';
const { Title } = Typography;
const { Search } = Input;

const LandingPage: React.FC = () => {
    const { getAvailableBooks, getAllImages, searchIsbn, searchAuthor, searchTitle } = useBookActions();
    const { addBookRequest } = useBookRequestActions();
    const [books, setBooks] = useState<any[]>([]);
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
            const booksData = await getAvailableBooks();
            const imagesData = await getAllImages();
            setBooks(booksData);
            setImages(imagesData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleRequestButtonClick = (bookId: string) => {
        // Find the correct book from the books or searchResults array based on the bookId
        const book = (searchResults.length > 0 ? searchResults : books).find(book => book.id === bookId);
        setSelectedBook(book);
        setModalVisible(true);
    };
    

    const handleConfirmRequest = async () => {
        if (selectedBook) {
            const bookRequest = {
                id: selectedBook.id,
                bookId: selectedBook.bookId,
                studentId: selectedBook.studentId,
                title: selectedBook.title,
                author: selectedBook.author,
                isbn: selectedBook.isbn,
            };
            await addBookRequest(bookRequest);
            setModalVisible(false);
            setSelectedBook(null);
        }
    };

    const handleIsbnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setIsbnInputValue(value);

        if (value.trim() === '') {
            setIsbnWarning(null);
        } else {
            const isValid = /^\d{13}$/.test(value);
            if (!isValid) {
                setIsbnWarning('ISBN should be 13 digits!');
            } else {
                setIsbnWarning(null);
            }
        }
    };

    const handleSearchISBN = async () => {
        if (isbnInputValue.trim() !== '') {
            try {
                setLoading(true);
                const searchResults = await searchIsbn(isbnInputValue);
                setSearchResults(searchResults);
                setLoading(false);
            } catch (error) {
                console.error('Error searching by ISBN:', error);
                setLoading(false);
            }
        }
    };

    const handleSearchAuthor = async (value: string) => {
        if (value.trim() !== '') {
            try {
                setLoading(true);
                const searchResults = await searchAuthor(value);
                setSearchResults(searchResults);
                setLoading(false);
            } catch (error) {
                console.error('Error searching by author:', error);
                setLoading(false);
            }
        }
    };

    const handleSearchTitle = async (value: string) => {
        if (value.trim() !== '') {
            try {
                setLoading(true);
                const searchResults = await searchTitle(value);
                setSearchResults(searchResults);
                setLoading(false);
            } catch (error) {
                console.error('Error searching by title:', error);
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: '1', marginRight: '10px' }}>
                    <Search 
                        placeholder="Search ISBN" 
                        size="small" 
                        maxLength={13} 
                        value={isbnInputValue}
                        onChange={handleIsbnInputChange}
                        onSearch={handleSearchISBN}
                    />
                    {isbnWarning && <span style={{ color: 'red', fontSize: '12px' }}>{isbnWarning}</span>}
                </div>
                <Search placeholder="Search Title" size="small" style={{ marginRight: '10px', flex: '1' }} onSearch={handleSearchTitle} />
                <Search placeholder="Search Author" size="small" style={{ flex: '1' }} onSearch={handleSearchAuthor} />
            </div>
            <div style={{ minHeight: '100vh', position: 'relative', padding: '10px 50px' }}>
                {loading && (
                    <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                )}
                <Row gutter={[16, 16]} justify="center" align="middle">
                    {(searchResults?.length > 0 ? searchResults : books)?.map((book) => (
                        <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <div >
                                <Card className={styles.container}
                                    cover={<Image alt={"image"} height={350} src={`data:image/jpeg;base64,${images.find(image => image.id === book.imageId)?.base64}`} />}
                                >
                                    <Card.Meta 
                                        description={(
                                            <div>
                                                <Title level={5}>{book?.title}</Title>
                                                <p>author: {book?.author}</p>
                                                <p>isbn: {book?.isbn}</p>
                                            </div>
                                        )} 
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button style={{backgroundColor :"#dc5cd4", color:"#fff"}}onClick={() => handleRequestButtonClick(book.id)}>Request</Button>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Modal
                    title="Confirm Book Request"
                    visible={modalVisible}
                    onOk={handleConfirmRequest}
                    onCancel={() => setModalVisible(false)}
                >
                    <p>Are you sure you want to request this book?</p>
                </Modal>
            </div>
        </div>
    );
};

export default WithAuth(LandingPage);
