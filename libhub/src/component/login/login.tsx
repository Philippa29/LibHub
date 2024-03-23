import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useState } from 'react';
import logo from '../../../public/logo-no-background-libhub.png';
import { loginStyles } from './style/style'; // Import styles
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@/providers/auth';
import { message } from 'antd';

interface Credentials {
  userNameOrEmailAddress: string;
  password: string;
}

const Login = () => {
  let authToken : string| null;
  const { login } = useAuthActions();
  const [credentials, setCredentials] = useState<Credentials>({ userNameOrEmailAddress: '', password: '' });
  const router = useRouter();
  const { styles } = loginStyles();

  const handleClick = () => {
    router.push('/register');
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
          <Form.Item></Form.Item>
          <Button onClick={handleClick} className={styles.loginFormButton}>Register</Button>
          <Button type="primary" htmlType="submit" className={styles.loginFormButton}>Sign in</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
