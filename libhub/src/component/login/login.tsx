import { Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Image from 'next/image';
import logo from '../../../public/logo-no-background-libhub.png';
import { loginStyles} from './style/style'; // Import styles
import { useRouter } from 'next/navigation';

const handleLogin = () => {
  // Implement login functionality here
};
const Login = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/register');
  };

  const {styles}= loginStyles();
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
            onFinish={handleLogin}
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
                id='email'
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
                // onChange={(e) => setCredentials({ ...credentials, userNameOrEmailAddress: e.target.value })}
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
            <Button  onClick={handleClick} className={styles.loginFormButton}>Register</Button>
          <Button className={styles.loginFormButton}>Sign in</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
