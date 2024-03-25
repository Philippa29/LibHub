import { Form, Input, Button } from 'antd';
import { IdcardOutlined, LockOutlined, PhoneFilled, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import logo from '../../../public/logo-no-background-libhub.png';
import { loginStyles} from './style/style'; // Import styles
import { useRouter } from 'next/navigation';
import {Register} from '@/providers/register/interface';
import { useState } from 'react';
import { message } from 'antd';
import { useRegisterActions } from '@/providers/register';
import { Modal } from 'antd';

const handleLogin = () => {
  // Implement login functionality here
};
interface RegisterProps {
  onClose: () => void; // Define the onFinish prop
}
const Register : React.FC<RegisterProps> = ({ onClose }) => {
  const { registeruser } = useRegisterActions();
  const router = useRouter();
  const [credentials, setCredentials] = useState<Register>({ name: '', surname: '', emailAddress: '', phoneNumber: '', password: '', studentID: '' });
  

  const onFinish = async () => { 
    console.log('credentials: ', credentials);
    try {
      await registeruser(credentials);
      message.success('Registration successful');
      router.push('/login');
    } catch (error) {
      message.error('An error occurred while registering');
    }
  };

  const {styles}= loginStyles();
  return (
    <>
    <Button type="primary">Register</Button>
    <Modal title="Register" footer={null}>
      <Form name="register" onFinish={onFinish} initialValues={{ remember: true }}>
        <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Name" onChange={(e) => setCredentials({ ...credentials, name: e.target.value })} />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Email" onChange={(e) => setCredentials({ ...credentials, emailAddress: e.target.value })} />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
        </Form.Item>
        <Form.Item name="studentID" rules={[{ required: true, message: 'Please input your student ID!' }]}>
          <Input prefix={<IdcardOutlined />} placeholder="Student ID" onChange={(e) => setCredentials({ ...credentials, studentID: e.target.value })} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Register
          </Button>
          <Button htmlType="button">Cancel</Button>
        </Form.Item>
      </Form>
    </Modal>
  </>
  );
};

export default Register;


    // <div className={styles.body}>
    //   <div className={styles.image}>
    //   <Image src={logo} alt="logo" />
    //   </div>
    //   <div className={styles.outerbox}>
    //     <div className={styles.signin}>
    //       <h1 className={styles.h1}>Register</h1>
    //       {/* Other content */}
    //     </div>
        
    //     <Form
    //         name="normal_login"
    //         className={styles.loginForm}
    //         initialValues={{
    //           remember: true,
    //         }}
    //         onFinish={onFinish} // Handle form submission
    //       >
    //         <Form.Item
    //           name="Name"
    //           rules={[
    //             {
    //               required: true,
    //               message: 'Please input your Name!',
    //             },
    //           ]}
    //         >
    //           <Input
    //             id='Name'
    //             prefix={<UserOutlined className="site-form-item-icon" />}
    //             placeholder="Name"
    //             onChange={(e) => setCredentials({ ...credentials, name: e.target.value})}
    //           />
    //         </Form.Item>
    //         <Form.Item
    //           name="Surname"
    //           rules={[
    //             {
    //               required: true,
    //               message: 'Please input your Name!',
    //             },
    //           ]}
    //         >
    //           <Input
    //             id='Surname'
    //             prefix={<UserOutlined className="site-form-item-icon" />}
    //             placeholder="Surname"
    //             onChange={(e) => setCredentials({ ...credentials, surname: e.target.value})}
    //           />
    //         </Form.Item>
    //         <Form.Item
    //           name="Phone"
    //           rules={[
    //             {
    //               required: true,
    //               message: 'Please input your Name!',
    //             },
    //           ]}
    //         >
    //           <Input
    //             id='Phone'
    //             prefix={<PhoneOutlined className="site-form-item-icon" />}
    //             placeholder="Phone Number"
    //             onChange={(e) => setCredentials({ ...credentials, phoneNumber: e.target.value })}
    //           />
    //         </Form.Item>
    //         <Form.Item
    //           name="username"
    //           rules={[
    //             {
    //               required: true,
    //               message: 'Please input your Username!',
    //             },
    //           ]}
    //         >
    //           <Input
    //             id='email'
    //             prefix={<UserOutlined className="site-form-item-icon" />}
    //             placeholder="Email"
    //             onChange={(e) => setCredentials({ ...credentials, emailAddress: e.target.value})}
    //           />
    //         </Form.Item>

    //         <Form.Item
    //           name="Student Number"
    //           rules={[
    //             {
    //               required: true,
    //               message: 'Please input your Student Number!',
    //             },
    //           ]}
    //         >
    //           <Input
    //             prefix={<IdcardOutlined className="site-form-item-icon" />}
    //             type="Student Number"
    //             placeholder="Student Number"
    //             onChange={(e) => setCredentials({ ...credentials, studentID: e.target.value })}
    //           />
    //         </Form.Item>
    //         <Form.Item
    //           name="password"
    //           rules={[
    //             {
    //               required: true,
    //               message: 'Please input your Password!',
    //             },
    //           ]}
    //         >
    //           <Input
    //             prefix={<LockOutlined className="site-form-item-icon" />}
    //             type="password"
    //             placeholder="Password"
    //             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
    //           />
    //         </Form.Item>
    //         <Form.Item>
    //           <Button type="primary" htmlType="submit" className={styles.loginFormButton}>Register</Button>
    //         </Form.Item>
            
          
    //     </Form>
    //   </div>
    // </div>