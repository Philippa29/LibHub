import React from 'react';
import { Modal, Card, Image } from 'antd';
import { IImageContext } from '@/providers/image/context';
import { useImageState } from '@/providers/image';

interface BookDetailsModalProps {
    visible: boolean;
    onCancel: () => void;
    book: any; // Define the type for the book object if necessary
    //bookImage: IImageContext; // Define the type for the book image URL
}

const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ visible, onCancel, book}) => {
    const {image} = useImageState();
    return (
        <Modal
            title="Book Details"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            {book && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '60%' }}>
                        <Image
                            src={`data:image/jpeg;base64,${image}`}
                            alt="Book Cover"
                            width={150}
                            height={200}
                            style={{ marginRight: 20 }}
                        />
                        <div>
                            <p>Title: {book.title}</p>
                            <p>ISBN: {book.isbn}</p>
                            <p>Author: {book.author}</p>
                            <p>Publisher: {book.publisher}</p>
                            {/* Add other book details as needed */}
                        </div>
                    </Card>
                </div>
            )}
        </Modal>
    );
};

export default BookDetailsModal;
