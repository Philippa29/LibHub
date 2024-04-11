import { useState, useEffect } from 'react';
import { Table, Button, message , Input} from 'antd';
import { useLoanActions, useLoanState } from '@/providers/loan';
import { LoanState } from '@/providers/loan/interface';
import { format } from 'date-fns';
import WithAuth from '../../providers/auth/requireauth';

const BorrowedBooksPage: React.FC = () => {
  const {loans} = useLoanState();
   
  const { getAllLoans, isReturned } = useLoanActions();
  const [searchValue, setSearchValue] = useState<string>('');
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
    getAllLoans();
  }, []); 

  const handleSearch = (value: string) => {
    setSearchValue(value); // Update the search query state
  };

  const filteredData = loans; 

  const data: LoanState[] = loans?.map((loan, index) => {
    return {
      id: loan.id, // You can generate the id dynamically based on index or use another unique identifier
      bookRequest: '', // Add the bookRequest property here if it's relevant
      book: '', // Add the book property here if it's relevant
      isReturned: loan.isReturned, // Add the isReturned property here if it's relevant
      isOverdue: loan.isOverdue, // Add the isOverdue property here if it's relevant
      actualReturnDate: new Date(), // Add the actualReturnDate property here if it's relevant
      key: index,
      student: loan.student,
      librarian: loan.librarian,
      author: loan.author,
      title: loan.title,
      isbn: loan.isbn,
      loanDate: loan.loanDate,
      returnDate: loan.returnDate,
      image: loan.image,
    };
  });

  return (
    <div>
      
      <Input.Search placeholder="Search borrowed books" value={searchValue} onChange={(e) => handleSearch(e.target.value)} style={{ marginBottom: '16px', marginTop: '16px' }} />
      <Table dataSource={filteredData} columns={columns} />
    </div>
  );
};

export default WithAuth(BorrowedBooksPage);
