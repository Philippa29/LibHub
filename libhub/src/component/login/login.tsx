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
  const router = useRouter();
  const[form]=Form.useForm();

  const { styles } = loginStyles();


  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenRegistrationModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle closing the registration modal
  const handleCloseRegistrationModal = () => {
    console.log('close');
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

        const firstLetter = credentials.userNameOrEmailAddress.trim().charAt(0).toLowerCase();
      
        // Redirect based on the first letter
        if (firstLetter === 's') {
          router.push('/dashboard'); // Redirect to dashboard if the first letter is 's'
        } else if (firstLetter === 'u') {
          router.push('/landingpage'); // Redirect to landingpage if the first letter is 'u'
        }
        
      } else {
        message.error('Wrong password or username');
      }
    } catch (error) {
      message.error('An error occurred while logging in');
    }
   
  };



  const validateUsername = (rule: any, value: string) => {
    if (!value || (value.trim().length === 9 && ['s', 'u'].includes(value.trim().charAt(0).toLowerCase()))) {
      return Promise.resolve();
    }
    return Promise.reject('Username must start with "s" or "u"');
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
              {
                validator: validateUsername,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
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

          <Register onClose={handleCloseRegistrationModal} open={isModalVisible} />

   
       
      
      </div>
    </div>
    
  );
};

export default Login;
