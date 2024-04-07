import { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { useLoanActions } from '@/providers/loan';
import { LoanState } from '@/providers/loan/interface';
import { format } from 'date-fns';

const BorrowedBooksPage: React.FC = () => {
  const [loans, setLoans] = useState<LoanState[]>([]);
  const { getAllLoans, isReturned } = useLoanActions();
  const handleReturn = async (id: string) => {
    console.log('Returning book with ID:', id);

    
      const response = await isReturned(id);

     
    
    
    // Check if isReturned is correctly implemented and called
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'student',
      key: 'studentId',
    },
    {
      title: 'Librarian ID',
      dataIndex: 'librarian',
      key: 'librarianId',
    },
    {
      title: 'Book Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Book ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'Loan Date',
      dataIndex: 'loanDate',
      key: 'loanDate',
      render: (loanDate: Date) => format(new Date(loanDate), 'yyyy-MM-dd HH:mm:ss'),
    },
    {
      title: 'Return Date',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (returnDate: Date) => format(new Date(returnDate), 'yyyy-MM-dd HH:mm:ss'),
    },
    {
      title: 'Overdue',
      dataIndex: 'isOverdue',
      key: 'isOverdue',
      render: (isOverdue: boolean) => (
        <span>{isOverdue ? 'Yes' : 'No'}</span>
      ),
    },
    {
      title: 'Return Book',
      key: 'ReturnBook',
      render: (text: any, record: LoanState) => (
        <Button
          type="primary"
          onClick={() => handleReturn(record.id)}
          disabled={record.isReturned}
        >
          Return
        </Button>
      ),
    },
  ];

  
  //const {loanState , loansDispatch} = useState<LoanState []>([]);
  
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const loans = await getAllLoans(); // Check if getAllLoans is correctly implemented and called
        console.log('All loans:', loans);
        setLoans(loans);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, [getAllLoans]); 

  const data: LoanState[] = loans?.map((loan, index) => {
    return {
      id: loan.id, // You can generate the id dynamically based on index or use another unique identifier
      bookRequest: '', // Add the bookRequest property here if it's relevant
      book: '', // Add the book property here if it's relevant
      isReturned: false, // Add the isReturned property here if it's relevant
      isOverdue: false, // Add the isOverdue property here if it's relevant
      actualReturnDate: new Date(), // Add the actualReturnDate property here if it's relevant
      key: index,
      student: loan.student,
      librarian: loan.librarian,
      author: loan.author,
      title: loan.title,
      isbn: loan.isbn,
      loanDate: loan.loanDate,
      returnDate: loan.returnDate,
    };
  });

  return (
    <div>
      <h1>Borrowed Books</h1>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default BorrowedBooksPage;
