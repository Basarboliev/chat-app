import React from 'react';
import { Tabs, Button, Checkbox, Form, Input, Badge, message } from 'antd';
import styles from './LoginPanel.module.css';
import Description from '../Description/Description';
import { LoremIpsum } from 'react-lorem-ipsum';
import Avatar from '../Avatar/Avatar';
import Footer from '../Footer/Footer';
import SigninForm from '../SigninForm/SigninForm';

const onChange = (key) => {
    console.log(key);
};

const lorem = <LoremIpsum p={2} />;

//Items in the Signin form tab
const items = [
    {
        key: '1',
        label: `join channel`.toUpperCase(),
        children: <SigninForm
        formName='join'
        nicknameItem={{
            label: 'Nickname',
            name: 'nickname_join_channel',
            message: 'Please enter your nickname!',
        }}
        channelItem={{
            label: 'Channel ID',
            name: 'channel_join',
            message: 'Please enter channel ID!',
        }}
        avatars={{

            message: 'Please select your avatar!',
            collection: [
                <Avatar character={0} key={0}/>,
                <Avatar character={2} key={2}/>,
                <Avatar character={1} key={1}/>,
                <Avatar character={3} key={3}/>,
            ],
        }}
        submit={{
            label: 'join channel'
        }}
    />
    },
    {
        key: '2',
        label: `Create Channel`.toUpperCase(),
        children: <SigninForm
            formName='create'
            nicknameItem={{
                label: 'Nickname',
                name: 'nickname_create_channel',
                message: 'Please enter your nickname!',
            }}
            channelItem={{
                label: 'Channel ID',
                name: 'channel_create',
                message: 'Please enter channel ID!',
            }}
            avatars={{

                message: 'Please select your avatar!',
                collection: [
                    <Avatar character={0} key={0}/>,
                    <Avatar character={2} key={2}/>,
                    <Avatar character={1} key={1}/>,
                    <Avatar character={3} key={3}/>,
                ],
            }}
            submit={{
                label: 'create channel'
            }}
        />
    },
];


const LoginPanel = () => {
    return (
        <div className={styles.container}>
            <div className={styles.loginDescription}>
                <img className={styles.img} src='./join.jpg' />

                <div className={styles.description}>
                    <Description title="Tips" bodyContent={lorem} />
                </div>
            </div>
            <div className={styles.tabs}>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                    centered
                />
            </div>
            <Footer />
        </div>
    );
}
export default LoginPanel;