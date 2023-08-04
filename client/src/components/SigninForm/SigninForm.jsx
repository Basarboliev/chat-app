import { Tabs, Button, Checkbox, Form, Input, Badge, message } from 'antd';
import styles from './SigninForm.module.css';

const SigninForm = ({formName, nicknameItem, channelItem, avatars, submit}) => {
    return (
        <Form
            name={formName}
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 8,
            }}
            autoComplete="off"
        >
            <Form.Item
                label={nicknameItem.label}
                name={nicknameItem.name}
                rules={[
                    {
                        required: true,
                        message: nicknameItem.message,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label={channelItem.label}
                name={channelItem.name}
                rules={[
                    {
                        required: true,
                        message: channelItem.message,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Choose you avatar: "
                name="avatar"
                rules={[{
                    required: true,
                    message: avatars.message,
                    type: 'radio',
                }]}
            >
                <div className={styles.avatars}>
                    {
                        avatars.collection.map(avatar => avatar)
                    }
                </div>
            </Form.Item>

            <div className={styles.submitContainer}>
                <Button type="primary" htmlType="submit" block={false} className={styles.submit}>
                    {submit.label.toUpperCase()}
                </Button>
            </div>
        </Form>
    )
}

export default SigninForm;