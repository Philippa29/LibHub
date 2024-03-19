import { Form, Input, Button } from 'antd';
import { IdcardOutlined, LockOutlined, PhoneFilled, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import logo from '../../../public/logo-no-background-libhub.png';
import { loginStyles} from './style/style'; // Import styles
import { useRouter } from 'next/navigation';

const handleLogin = () => {
  // Implement login functionality here
};
const Register = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard');
  };

  const {styles}= loginStyles();
  return (
    <div className={styles.body}>
      <div className={styles.image}>
      <Image src={logo} alt="logo" />
      </div>
      <div className={styles.outerbox}>
        <div className={styles.signin}>
          <h1 className={styles.h1}>Register</h1>
          {/* Other content */}
        </div>
        
        <Form
            name="normal_login"
            className={styles.loginForm}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="Name"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input
                id='Name'
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Name"
                // onChange={(e) => setCredentials({ ...credentials, userNameOrEmailAddress: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              name="Surname"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input
                id='Surname'
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Surname"
                // onChange={(e) => setCredentials({ ...credentials, userNameOrEmailAddress: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              name="Phone"
              rules={[
                {
                  required: true,
                  message: 'Please input your Name!',
                },
              ]}
            >
              <Input
                id='Phone'
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Phone Number"
                // onChange={(e) => setCredentials({ ...credentials, userNameOrEmailAddress: e.target.value })}
              />
            </Form.Item>
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
                id='email'
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                // onChange={(e) => setCredentials({ ...credentials, userNameOrEmailAddress: e.target.value })}
              />
            </Form.Item>

            <Form.Item
              name="Student Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your Student Number!',
                },
              ]}
            >
              <Input
                prefix={<IdcardOutlined className="site-form-item-icon" />}
                type="Student Number"
                placeholder="Student Number"
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
                // onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </Form.Item>
            <Form.Item></Form.Item>
            
          <Button onClick = {handleClick}className={styles.loginFormButton}>Register</Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;