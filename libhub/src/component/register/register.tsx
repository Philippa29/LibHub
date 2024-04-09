import { Form, Input, Button } from 'antd';
import { IdcardOutlined, LockOutlined, PhoneFilled, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { loginStyles} from './style/style'; // Import styles
import { useRouter } from 'next/navigation';
//import {Register} from '@/providers/register/interface';
import { useState } from 'react';
import { message } from 'antd';
import { useRegisterActions } from '@/providers/register';
import { Modal } from 'antd';


interface RegisterCredentials {
  name: string;
  surname: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  studentID: string;
}


interface RegisterProps {
  onClose?: () => void; // Define the onFinish prop
  open: boolean;
}



const Register : React.FC<RegisterProps> = ({ onClose,open }) => {
  const { registeruser } = useRegisterActions();
  const router = useRouter();
  
  const[form]=Form.useForm();
  const [registerCredentials, setRegisterCredentials] = useState<RegisterCredentials>({ name: '', surname: '', emailAddress: '', phoneNumber: '', password: '', studentID: '' });
//const [isModalVisible, setIsModalVisible] = useState(false);

const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(true);

const handleFieldsChange = () => {
  form.validateFields().then((values) => {
    const isAllFieldsValid = Object.values(values).every((field) => field !== undefined);
    setIsRegisterButtonDisabled(!isAllFieldsValid);
  });
};


  const onFinish = async () => { 
    console.log('credentials: ', registerCredentials);
    try {
      await registeruser(registerCredentials);
      message.success('Registration successful');
      router.push('/login');
    } catch (error) {
      message.error('An error occurred while registering');
    }
  };

  
  return (
    <>
    <Modal
          title="Register"
          open={open}
          onCancel={onClose}
          onOk={form.submit}
          okText='Register'
          cancelButtonProps={{danger: true}}
          okButtonProps={{type: 'primary'}}
          
        >
          <Form name="register" form={form}  onFinish={onFinish} initialValues={{ remember: true }}>
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
      len: 9,
      message: 'Student ID must be exactly 9 characters long',
    },
    {
      pattern: /^[0-9uU]+$/,
      message: 'Student ID must contain only numbers and the letter "u"',
    },
    {
      validator: (rule, value) => {
        if (value && !value.toLowerCase().includes('u')) {
          return Promise.reject('Student ID must contain the letter "u"');
        }
        return Promise.resolve();
      },
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
            </Form.Item>
          </Form>
        </Modal>
  </>
  );
};

export default Register;


 