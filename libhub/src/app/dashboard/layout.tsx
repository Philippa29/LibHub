'use client'; 
import React, { useState } from 'react';
import { Menu, Layout as Lay, MenuProps } from 'antd';
// import Menu from 'antd/lib/menu/menu';
import { dashStyles } from './styles';

import NavBar from '../../component/sidenavbar';
const { Header, Content, Footer} = Lay;

export default function Layout({children} : {children: React.ReactNode}) {
  const {styles, cx} = dashStyles();
  return (
    <div>
      <Lay>
        
        <NavBar />
        <Lay>
          <Header className={cx(styles.header)}>
            
          </Header>
          <Content>
            {children}
          </Content>

        </Lay>
      </Lay>
    </div>
  );
}
