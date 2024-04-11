import React, { useState, useEffect } from 'react';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Layout, Image, Button, Modal, List } from 'antd'; // Import Modal component
import type { MenuProps } from 'antd/lib/menu';
import { navstyles } from './styles'; // Importing styles
import { useRouter } from 'next/navigation';
import { useUserActions } from '@/providers/users';
import { Book } from '../../providers/book/interface';
import { LoanState } from '../../providers/loan/interface';
import { useBookRequestState } from '@/providers/bookrequest';
import { useLoanState } from '@/providers/loan';
import moment from 'moment';
import { BookRequest } from '@/providers/bookrequest/interface';

const { Header } = Layout;

const TopNavBar: React.FC = () => {
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem('authtoken');
    window.location.href = '/login';
  };

  const [current, setCurrent] = useState('home');
  const { styles } = navstyles();
  const { push } = useRouter();
  const { getUsersBookRequests, getUsersLoan } = useUserActions();

  // State to control visibility of user details modal and store book requests and loans
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userLoans, setUserLoans] = useState<LoanState[]>([]);
  const [userBookRequests, setUserBookRequests] = useState<Book[]>([]);
  const {bookRequests } = useBookRequestState();
  const {loans} = useLoanState(); 
  
  // Function to open modal and fetch book requests and loans
  const openModal = async () => {
    setIsModalVisible(true);
    
      const request = await getUsersBookRequests();
      const userLoans = await getUsersLoan();
      setUserLoans(userLoans);
      setUserBookRequests(request);
      console.log('Requests:', bookRequests);
      console.log('Loans:', loans);
   
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const items: MenuProps['items'] = [
    {
      label: 'Home',
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: 'Profile',
      key: 'profile',
      icon: <UserOutlined />,
      onClick: openModal, // Open modal when "Profile" is clicked
    },
    {
      label: 'Signout',
      key: 'signout',
      onClick: handleLogout,
      icon: <LogoutOutlined />,
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    console.log('Clicked:', e.key);
  };

  return (
    <Header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src="/logo-no-background-libhub.png" alt="Logo" className={styles.logo} />
      </div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className={styles.menu} />
      
      <Modal
        title="User Details"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
      <div>
  <h3>Book Requests</h3>
  <List
    dataSource={userBookRequests}
    renderItem={(item) => (
      <List.Item>
        <div>
          <div>{`Title: ${item.title}`}</div>
          <div>{`ISBN: ${item.isbn}`}</div>
        </div>
      </List.Item>
    )}
  />
</div>
<div>
  <h3>Loans</h3>
  {loans[0]?.title}
  <List
    dataSource={userLoans}
    renderItem={(item) => (
      <List.Item>
        <div>
          <div>{`Title: ${item.title}`}</div>
          <div>{`ISBN: ${item.isbn}`}</div>
          <div>{`Return Date: ${moment(item.returnDate).format('MMMM Do YYYY, h:mm:ss a')}`}</div>
        </div>
      </List.Item>
    )}
  />
</div>

      </Modal>
    </Header>
  );
};

export default TopNavBar;
