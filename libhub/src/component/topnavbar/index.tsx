import React, { useState, useEffect } from 'react';
import { HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Menu, Layout, Image, Button, Modal, List } from 'antd'; // Import Modal component
import type { MenuProps } from 'antd/lib/menu';
import { navstyles } from './styles'; // Importing styles
import { useRouter } from 'next/navigation';
import { useUserActions } from '@/providers/users';
import { Book } from '../../providers/book/interface';
import { LoanState } from '../../providers/loan/interface';

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
  const [bookRequests, setBookRequests] = useState<Book[]>([]);
  const [loans, setLoans] = useState<LoanState[]>([]);

  // Function to open modal and fetch book requests and loans
  const openModal = async () => {
    setIsModalVisible(true);
    try {
      const requests = await getUsersBookRequests();
      const userLoans = await getUsersLoan();
      console.log('Requests:', requests);
      console.log('Loans:', userLoans);
      setBookRequests(requests);
      setLoans(userLoans);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
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
            dataSource={bookRequests}
            renderItem={(item) => (
              <List.Item>{`Title: ${item.title}, ISBN: ${item.isbn}`}</List.Item>
            )}
          />
        </div>
        <div>
          <h3>Loans</h3>
          <List
            dataSource={loans}
            renderItem={(item) => (
              <List.Item>{`Title: ${item.title}, ISBN: ${item.isbn}, Return Date: ${item.returnDate}`}</List.Item>
            )}
          />
        </div>
      </Modal>
    </Header>
  );
};

export default TopNavBar;
