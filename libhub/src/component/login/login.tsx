import { Form, Input, Button } from 'antd';
import { IdcardOutlined, LockOutlined, PhoneFilled, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState } from 'react';
import logo from '../../../public/logo-no-background-libhub.png';
import { loginStyles } from './style/style'; // Import styles
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@/providers/auth';
import { message , Modal} from 'antd';
import { useRegisterActions } from '@/providers/register';
import Register from '../register/register'; // Import the Register component
import Link from 'next/link';
interface Credentials {
  userNameOrEmailAddress: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  surname: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  studentID: string;
}

const Login = () => {
  let authToken : string| null;
  const { login } = useAuthActions();
  const [credentials, setCredentials] = useState<Credentials>({ userNameOrEmailAddress: '', password: '' });
  const [registerCredentials, setRegisterCredentials] = useState<RegisterCredentials>({ name: '', surname: '', emailAddress: '', phoneNumber: '', password: '', studentID: '' });
  const router = useRouter();
  const { registeruser } = useRegisterActions();
  const { styles } = loginStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenRegistrationModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle closing the registration modal
  const handleCloseRegistrationModal = () => {
    setIsModalVisible(false);
  };

  const onFinish = async () => {
    console.log('credentials: ', credentials);
    try {
      
      await login(credentials);
      authToken = localStorage.getItem('authToken');
      console.log('authToken', authToken);
      if (authToken) {
        message.success('Login successful');
        
      } else {
        message.error('Wrong password or username');
      }
    } catch (error) {
      message.error('An error occurred while logging in');
    }
    router.push('/dashboard'); 
  };

  const onFinishRegister = async () => {
    console.log('credentials: ', credentials);
    try {
      await registeruser(registerCredentials);
      message.success('Registration successful');
      router.push('/login');
    } catch (error) {
      message.error('An error occurred while registering');
    }
  };


  const handleRegister = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.body}>
      <div className={styles.image}>
        <Image src={logo} alt="logo" />
      </div>
      <div className={styles.outerbox}>
        <div className={styles.signin}>
          <h1 className={styles.h1}>Sign in</h1>
        </div>
        <Form
          name="normal_login"
          className={styles.loginForm}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish} // Handle form submission
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => setCredentials({ ...credentials, userNameOrEmailAddress: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>Sign in</Button>
          </Form.Item>
        
          
          </Form>
          <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleOpenRegistrationModal}>
          Register
        </span>
        <Modal
          title="Register"
          open={isModalVisible}
          onCancel={handleCloseRegistrationModal}
          footer={null}
        >
          <Form name="register" onFinish={onFinishRegister} initialValues={{ remember: true }}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Name"
                onChange={(e) =>
                  setRegisterCredentials({ ...registerCredentials, name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="surname"
              rules={[{ required: true, message: 'Please input your surname!' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Surname"
                onChange={(e) =>
                  setRegisterCredentials({ ...registerCredentials, surname: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="studentID"
              rules={[
                { required: true, message: 'Please input your student ID!' },
                {
                  len: 8,
                  message: 'Student ID must be exactly 8 characters long',
                },
                {
                  pattern: /^[0-9]+$/,
                  message: 'Student ID must contain only numbers',
                },
              ]}
            >
              <Input
                prefix={<IdcardOutlined />}
                placeholder="Student ID"
                onChange={(e) =>
                  setRegisterCredentials({ ...registerCredentials, studentID: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Phone Number"
                onChange={(e) =>
                  setRegisterCredentials({ ...registerCredentials, phoneNumber: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please input a valid email address!' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                onChange={(e) =>
                  setRegisterCredentials({ ...registerCredentials, emailAddress: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters long' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                onChange={(e) =>
                  setRegisterCredentials({ ...registerCredentials, password: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                Register
              </Button>
              <Button htmlType="button" onClick={handleCloseRegistrationModal}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      
      </div>
    </div>
    
  );
};

export default Login;
