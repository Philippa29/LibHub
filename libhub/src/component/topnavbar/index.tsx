import React, { useState } from 'react';
import { HomeOutlined, UserOutlined, BookOutlined , LogoutOutlined } from '@ant-design/icons';
import { Menu, Layout, Image } from 'antd';
import type { MenuProps } from 'antd/lib/menu';
import { navstyles } from './styles'; // Importing styles

const { Header } = Layout;

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
  },
  {
    label: 'Signout',
    key: 'Signout',
    icon: <LogoutOutlined  />,
  },
];

const TopNavBar: React.FC = () => {

  const [current, setCurrent] = useState('home');
  
  const { styles, cx } = navstyles();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    // You can add logic here to handle navigation based on the clicked key
    console.log('Clicked:', e.key);
  };

  return (
    <Header className={styles.header}>
      <div className={styles.logoContainer}>
      <Image src="/logo-no-background-libhub.png" alt="Logo" className={styles.logo} />
      </div> 
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className={styles.menu} />
      
    </Header>
  );
};

export default TopNavBar;
