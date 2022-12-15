import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Select, Input, Button, DatePicker } from 'antd';
import styles from './Schedule.module.css';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

const SchedulePage = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [summary, setSummary] = useState('');
    const [date, setDate] = useState(new Date());

    const [form] = Form.useForm();

    const prefixSelector = (
        <Form.Item name='prefix' noStyle>
            <Select
                initialvalue='52'
                style={{
                    width: 70,
                }}
            >
                <Option value='52'>+52</Option>
            </Select>
        </Form.Item>
    );

    const handleSubmit = () => {
        console.log('success');
    };

    return (
        <section className={styles.section}>
            <h3>Please enter your contact data</h3>
            <Form
                className={styles.form}
                {...formItemLayout}
                form={form}
                onFinish={handleSubmit}
            >
                <Form.Item
                    name='firstName'
                    label='first name'
                    rules={[
                        {
                            type: 'text',
                        },
                        {
                            required: true,
                            message: 'Please input your first name!',
                        },
                    ]}
                >
                    <Input
                        placeholder='enter your first name'
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name='lastName'
                    label='last name'
                    rules={[
                        {
                            type: 'text',
                        },
                        {
                            required: true,
                            message: 'Please input your last name!',
                        },
                    ]}
                >
                    <Input
                        placeholder='enter your last name'
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name='email'
                    label='E-mail'
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        placeholder='enter your email'
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name='phone'
                    label='Phone Number'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                        placeholder='enter your phone number'
                        value={phoneNumber}
                        onChange={({ target }) =>
                            setPhoneNumber('52' + target.value)
                        }
                    />
                </Form.Item>
                <Form.Item
                    name='gender'
                    label='Gender'
                    rules={[
                        {
                            required: true,
                            message: 'Please select gender!',
                        },
                    ]}
                >
                    <Select
                        placeholder='select your gender'
                        onChange={(e) => setGender(e)}
                    >
                        <Option value='male'>Male</Option>
                        <Option value='female'>Female</Option>
                        <Option value='other'>Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name='describe-problem'
                    label='Describe your problem'
                    rules={[
                        { type: 'text' },
                        {
                            required: true,
                            message:
                                'Please a enter a brief description of your problem!',
                        },
                    ]}
                >
                    <Input.TextArea
                        allowClear
                        showCount
                        value={summary}
                        onChange={({ target }) => setSummary(target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name='date-time-picker'
                    label='choose a date'
                    {...config}
                >
                    <DatePicker
                        showTime
                        format='YYYY-MM-DD HH:mm:ss'
                        value={date}
                        onChange={(date) => setDate(new Date(date))}
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type='primary' htmlType='submit'>
                        Schedule your consultation
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
};

export default SchedulePage;
