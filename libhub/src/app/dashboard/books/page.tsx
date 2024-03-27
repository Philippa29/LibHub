'use client'
import React, { useState, useEffect, use } from 'react';
import BookComponent from '@/component/bookAdmin/page';
import { Input, Table, Space, Modal, Form, Button, Upload, Select } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useCategoryActions, useBookActions } from '@/providers/book';
import { message } from 'antd';
import { Book } from '@/providers/book/interface';
import axios from 'axios';




enum BookCondition {
  Lost = 1,
  Damaged = 2,
  Good = 3,
}

enum BookStatus {
  Available = 1,
  Unavailable = 2,
}

// const dummyBooks: Book[] = [
//   { name: 'Book 1', isbn: '1234567890', author: 'Author 1', publisher: 'Publisher 1', status: 'Available', bookCondition: BookCondition.Good, bookStatus: BookStatus.Available },
//   { name: 'Book 2', isbn: '0987654321', author: 'Author 2', publisher: 'Publisher 2', status: 'Borrowed', bookCondition: BookCondition.Damaged, bookStatus: BookStatus.Unavailable },
//   { name: 'Book 3', isbn: '5678901234', author: 'Author 3', publisher: 'Publisher 3', status: 'Available', bookCondition: BookCondition.Lost, bookStatus: BookStatus.Available },
//   // Add more dummy data as needed
// ];

const BookDashboard: React.FC = () => {
    return(
      <BookComponent></BookComponent>
    ); 
};

export default BookComponent;
