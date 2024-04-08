import React, { useState } from 'react';
import { Layout, Menu , Button} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { dashStyles } from './styles';
import Image from 'next/image';
import logo from '../../../public/logo-no-background-libhub.png';

import Link from "next/link";

const { Sider } = Layout;
const { Item: MenuItem } = Menu;

export interface LinkType {
  key: string;
  label: JSX.Element;
  icon: JSX.Element; // Specify the icon type
}

const links: LinkType[] = [
  { key: "1", label: <Link href="../dashboard">Home</Link>, icon: <UserOutlined /> },
  { key: "2", label: <Link href="../dashboard/user">User</Link>, icon: <UserOutlined /> },
  { key: "3", label: <Link href="../dashboard/books"> All Books</Link>,  icon: <FileOutlined /> },
  { key: "4", label: <Link href="../dashboard/booksrequest">Book Requests</Link>,  icon: <FileOutlined /> },
  { key: "5", label: <Link href="../dashboard/borrowed">Borrowed Books</Link>,  icon: <FileOutlined /> },
  
];

const NavBar: React.FC = () => {
  
  const {styles, cx} = dashStyles();

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    //localStorage.removeItem('user');
    window.location.href = '/login';
  }
  
  return (
    
<div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt="logo" />
      </div>
      <Sider
        style={{background:'#e4e2e6' }}
        theme="light" // Set theme to "light" for the menu
        className={styles.sidebar}
      >
        <Menu
          style={{background:'#e4e2e6' , height: "100%"}}
          mode="inline"
          defaultSelectedKeys={["1"]}
          theme="light" // Set theme to "light" for the menu
        >
          {links.map(link => (
            <MenuItem key={link.key} icon={link.icon} className={styles.menuItemHover}>
              {link.label}
            </MenuItem>
          ))}
        </Menu>
        
      </Sider>
      <div style={{ backgroundColor: "#eeee", marginTop: "auto", marginLeft: "10px" }}> {/* Adjust marginLeft as needed */}
      <Menu
          style={{background:'#e4e2e6' , height: "100%"}}
          mode="inline"
          defaultSelectedKeys={["1"]}
          theme="light" // Set theme to "light" for the menu
        >
          
          <MenuItem className={styles.menuItemHover}>
          <Link href="#" onClick={handleLogout}>Sign Out <LogoutOutlined /></Link>
          </MenuItem>
        
        </Menu>
  </div>
    </div>
  );
};
  
export default NavBar;
