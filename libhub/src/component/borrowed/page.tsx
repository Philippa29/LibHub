import { useState } from 'react';
import { Table, Button } from 'antd';
//import 'antd/dist/antd.css'; // Import Ant Design styles

interface Book {
  key: number;
  id: number;
  title: string;
  author: string;
  borrowed: boolean;
}

const BorrowedBooksPage: React.FC = () => {
  // Mock data for borrowed books
  const [books, setBooks] = useState<Book[]>([
    { key: 1, id: 1, title: 'Book 1', author: 'Author 1', borrowed: true },
    { key: 2, id: 2, title: 'Book 2', author: 'Author 2', borrowed: true },
    { key: 3, id: 3, title: 'Book 3', author: 'Author 3', borrowed: false },
    // Add more books as needed
  ]);

  const handleReturn = (id: number) => {
    // Update the borrowed status of the book with the given id
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, borrowed: false } : book
      )
    );
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: Book) => (
        <Button
          type="primary"
          onClick={() => handleReturn(record.id)}
          disabled={!record.borrowed}
        >
          Return
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Borrowed Books</h1>
      <Table dataSource={books} columns={columns} />
    </div>
  );
};

export default BorrowedBooksPage;
