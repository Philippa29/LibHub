import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Flex, Image } from 'antd';
import { dashStyles } from './styles/styles';
import { useBookActions } from '../../providers/book';
import { useBookRequestActions } from '../../providers/bookrequest';
import { useUserActions } from '../../providers/users';
import { useLoanActions } from '../../providers/loan';
import WithAuth from '../../providers/auth/requireauth';
const DashboardComponent: React.FC = () => {
  const [bookRequestsCount, setBookRequestsCount] = useState<number>(0);
  const [booksCount, setBooksCount] = useState<number>(0);
  const [borrowedBooksCount, setBorrowedBooksCount] = useState<number>(0);
  const [studentsCount, setStudentsCount] = useState<number>(0);

  const { countBooks } = useBookActions();
  const { countBookRequest } = useBookRequestActions();
  const { getUserCount } = useUserActions();
  const { loanCount } = useLoanActions();

  const { styles } = dashStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookRequests = await countBookRequest();
        setBookRequestsCount(bookRequests);

        const books = await countBooks();
        setBooksCount(books);

        const students = await getUserCount();
        setStudentsCount(students);

        const borrowedBooks = await loanCount();
        setBorrowedBooksCount(borrowedBooks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.secondaryContainer}>
        <Row gutter={[16, 16]} justify="space-between">
          <Col span={11}>
            <Card title="Book Request" bordered={false} className={styles.card}>
              <Flex justify="center" align="center">
                <div><span className={styles.numbers}>{bookRequestsCount}</span></div>
                <div><Image alt="image" width="200px" src='/books.png' className={styles.image}></Image></div>
              </Flex>
            </Card>
          </Col>
          <Col span={11}>
            <Card title="Students" bordered={false} className={styles.card}>
              <Flex justify="center" align="center">
                <div><span className={styles.numbers}>{studentsCount}</span></div>
                <div><Image alt="image" width="150px" src='/users.png' className={styles.image}></Image></div>
              </Flex>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="space-between" style={{ marginTop: '20px' }}>
          <Col span={11}>
            <Card title="Borrowed" bordered={false} className={styles.card}>
              <Flex justify="center" align="center">
                <div><span className={styles.numbers}>{borrowedBooksCount}</span></div>
                <div><Image alt="image" width="200px" src='/books.png' className={styles.image}></Image></div>
              </Flex>
            </Card>
          </Col>
          <Col span={11}>
            <Card title="Books" bordered={false} className={styles.card}>
              <Flex justify="center" align="center">
                <div><span className={styles.numbers}>{booksCount}</span></div>
                <div><Image alt="image" width="200px" src='/books.png' className={styles.image}></Image></div>
              </Flex>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default WithAuth(DashboardComponent);
