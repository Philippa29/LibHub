import React, { useEffect, useState } from 'react';
import { useBookActions } from '@/providers/book';
import { Card, Row, Col, Image, Spin, Typography, Button, Modal, Input } from 'antd';
import { landingstyles } from './styles';
import { useBookRequestActions } from '@/providers/bookrequest';

const { Title } = Typography;
const { Search } = Input;

const LandingPage: React.FC = () => {
    const { getAvailableBooks, getAllImages } = useBookActions();
    const { addBookRequest } = useBookRequestActions();
    const [books, setBooks] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [isbnInputValue, setIsbnInputValue] = useState<string>('');
    const [isbnWarning, setIsbnWarning] = useState<string | null>(null);
    const { styles } = landingstyles();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const booksData = await getAvailableBooks();
                const imagesData = await getAllImages();
                setBooks(booksData);
                setImages(imagesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRequestButtonClick = (bookId: string) => {
        setModalVisible(true);
        const book = books.find(book => book.id === bookId);
        setSelectedBook(book);
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

        if (value.trim() === '') { // Check if input value is empty or whitespace
            setIsbnWarning(null); // Clear warning if input is empty
        } else {
            const isValid = /^\d{13}$/.test(value);
            if (!isValid) {
                setIsbnWarning('ISBN should be 13 digits!');
            } else {
                setIsbnWarning(null);
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
                    />
                    {isbnWarning && <span style={{ color: 'red', fontSize: '12px' }}>{isbnWarning}</span>}
                </div>
                <Search placeholder="Search Title" size="small" style={{ marginRight: '10px', flex: '1' }} />
                <Search placeholder="Search Author" size="small" style={{ flex: '1' }} />
            </div>
            <div style={{ minHeight: '100vh', position: 'relative' }}>
                {loading && (
                    <Spin size="large" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                )}
                <Row gutter={[16, 16]}>
                    {books.map((book) => (
                        <Col key={book.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <div className={styles.card}>
                                <Card className={styles.container}>
                                    <Card.Meta className={styles.titles} title={book.title} description={book.author} />
                                    {images.length > 0 && <Image className={styles.card} alt={"image"} src={`data:image/jpeg;base64,${images.find(image => image.id === book.imageId)?.base64}`} />}
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button onClick={() => handleRequestButtonClick(book.id)}>Request</Button>
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

export default LandingPage;
