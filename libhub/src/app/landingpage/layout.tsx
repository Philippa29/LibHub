'use client'
import React from 'react';
import TopNavBar from '@/component/topnavbar';
import { dashStyles } from './styles';
import { Layout as AntLayout } from 'antd';
const { Header, Content } = AntLayout;

export default function Layout({ children }: { children: React.ReactNode }) {
    const { styles, cx } = dashStyles(); // Assuming dashStyles returns the styles object and cx function
    return (
        <AntLayout>
            <TopNavBar />
            <AntLayout>
                {/* <Header className={cx(styles.header)}>
                    
                </Header> */}
                <Content>
                    {children}
                </Content>
            </AntLayout>
        </AntLayout>
    );
};
