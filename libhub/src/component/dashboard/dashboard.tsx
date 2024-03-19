// // App.tsx
 
// 'use client'; 
// import React, { useState } from 'react';
// import { Layout, Menu, MenuProps } from 'antd';
// import {
//   FileOutlined,
//   TeamOutlined,
//   UserOutlined,
//   LogoutOutlined,
// } from '@ant-design/icons';
// import { dashStyles } from './styles/styles'; // Import the styles
// import Image from 'next/image';
// import logo from '../../../public/logo-no-background-libhub.png';
// import User from './user';
// import MeetingRoom from '../../app/dashboard/meetingroom/page';
// import Books from '../../app/dashboard/books/page';

// const { Header, Content, Footer, Sider } = Layout;

// type MenuItem = Required<MenuProps>['items'][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   onClick?: () => void,
//   children?: MenuItem[],
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     onClick,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [

//   getItem('User', '1', <UserOutlined />),
//   getItem('Meeting Room', '2', <TeamOutlined />, undefined),
//   getItem('Books', '3', <FileOutlined />),
//   getItem('Sign Out', '4', <LogoutOutlined />, undefined)
// ];

// const Dashboard: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedMenuItem, setSelectedMenuItem] = useState<string>('1'); // Initialize the selected menu item
//   const {styles} = dashStyles(); // Use the styles

//   const handleMenuClick = ({ key }: { key: string }) => {
//     setSelectedMenuItem(key);
//   };

//     return (
    
// <Layout className={styles.container}>
//         <div className={styles.logoContainer}>
//           <Image className={styles.logo} src={logo} alt="logo" />
//         </div>
  
//         <Layout className={styles.layout}>
//           <Sider theme='dark' collapsible collapsed={collapsed} onCollapse={setCollapsed} className={styles.sidebar}>
//             <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
//           </Sider>
//           <Layout>
//             <Header className={styles.header}>
//               <h1 className={styles.h1}>Dashboard</h1>
//             </Header>
//             <Content className={styles.content}>
//               {selectedMenuItem === '1' && <User />} {/* Render UserComponent if User menu is selected */}
//               {selectedMenuItem === '2' && <MeetingRoom />} {/* Render MeetingRoomComponent if Meeting Room menu is selected */}
//               {selectedMenuItem === '3' && <Books />} {/* Render BooksComponent if Books menu is selected */}
//             </Content>
//             <Footer className={styles.footer}>
//               LibHub ©{new Date().getFullYear()} Created by Philippa (Zizipho) Dufana
//             </Footer>
//           </Layout>
//         </Layout>
//       </Layout>
//     );
//   };


// export default Dashboard;