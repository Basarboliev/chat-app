import { Form, Input, Space, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import styles from './MessageForm.module.css';


const MessageForm = ({ placeholder, icon, inputValue, onInputChange, onSubmit }) => {
    return (
        <form method="post" onSubmit={onSubmit} className={styles.container}>
            <Space>
                <Space.Compact size='large' className={styles.inputWrapper}>
                    <Input placeholder={placeholder} onChange={onInputChange}value={inputValue}/>
                    <Button type="primary" htmlType='submit' style={{ height: 'inherit', width: '25%' }}>
                        <SendOutlined />
                    </Button>
                </Space.Compact>
            </Space>
        </form>
    );
}

export default MessageForm;