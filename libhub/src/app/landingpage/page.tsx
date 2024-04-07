'use client'
import React, { useState } from 'react';
import TopNavBar from '@/component/topnavbar';
import { Menu, Layout as Lay, MenuProps } from 'antd';
import { dashStyles } from './styles';

import { useBookActions } from '@/providers/book';
const { Header, Content, Footer} = Lay;
import LandingPage from '@/component/landingpage/page';
const landingpage: React.FC = () =>{


    const {styles, cx} = dashStyles();



    return (
        
       <LandingPage></LandingPage>
        

    );
};

export default landingpage