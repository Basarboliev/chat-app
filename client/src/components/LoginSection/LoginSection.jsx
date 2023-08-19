import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import styles from './LoginSection.module.css';
import Description from '../Description/Description';
import { LoremIpsum } from 'react-lorem-ipsum';
import Avatar from '../Avatar/Avatar';
import SigninForm from '../SigninForm/SigninForm';

const lorem = <LoremIpsum p={2} />;


const LoginSection = ({ socket }) => {
    const navigate = useNavigate();
    const [joinData, setJoinData] = useState({
        nickname: '',
        channelId: '',
        avatar: 0
    });

    const [createData, setCreateData] = useState({
        nickname: '',
        channelId: '',
        avatar: 0
    });

    const [error, setError] = useState('');
    const [redirectAfterJoin, setRedirectAfterJoin] = useState(false);
    const [redirectAfterCreate, setRedirectAfterCreate] = useState(false);


    useEffect(() => {
        socket.on("create channel", redirect => {
            setRedirectAfterCreate(redirect);
        });


        socket.on("join error", error => {
            setError(error);
        });


        socket.on("join channel", redirect => {
            setRedirectAfterJoin(redirect);
        });
    }, []);


    if (redirectAfterJoin) {
        navigate(`channel/${joinData.channelId}`);
    } 

    if (redirectAfterCreate) {
        navigate(`channel/${createData.channelId}`);
    }

    //Event handlers
    const handleJoin = () => {
        fetch(`/api/${joinData.channelId}/${joinData.nickname}`)
            .then(res => res.json())
            .then(data => {
                if (data.exists) {
                    localStorage.setItem("nickname", joinData.nickname);
                    localStorage.setItem("avatar", joinData.avatar);
                    socket.emit("join channel", joinData.channelId, joinData.nickname);
                } else {
                    //If channel does not exists, write an error message to the user
                    setError("⚠️ The channel does not exists!");
                }
            });
    }


    //When the user fills out the channel creation form
    const handleCreate = () => {
        fetch(`/api/${createData.channelId}/${createData.nickname}`)
            .then(res => res.json())
            .then(data => {
                console.log("Channel exists ? " + data.exists);

                //If the channel does not exist, create a new one
                if (!data.exists) {
                    localStorage.setItem("nickname", createData.nickname);
                    localStorage.setItem("avatar", createData.avatar);
                    socket.emit("create channel", createData.channelId, createData.nickname);
                } else {
                    //If channel exists, write an error message to the user
                    setError("⚠️ The channel already exists. Please create a new one.");
                }
            });
    }


    //Items in the Signin form tab
    const items = [
        {
            key: '1',
            label: `join channel`.toUpperCase(),
            children: <SigninForm
                onChangeNickname={(e) => setJoinData({ ...joinData, nickname: e.target.value.trim() })}
                onChangeChannelId={(e) => setJoinData({ ...joinData, channelId: e.target.value.trim() })}
                onFinish={handleJoin}
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
                        <Avatar character={0} key={0} onAvatarClick={(e) => setJoinData({ ...joinData, avatar: 0 })} />,
                        <Avatar character={2} key={2} onAvatarClick={(e) => setJoinData({ ...joinData, avatar: 2 })} />,
                        <Avatar character={1} key={1} onAvatarClick={(e) => setJoinData({ ...joinData, avatar: 1 })} />,
                        <Avatar character={3} key={3} onAvatarClick={(e) => setJoinData({ ...joinData, avatar: 3 })} />,
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
                onChangeNickname={(e) => setCreateData({ ...createData, nickname: e.target.value.trim() })}
                onChangeChannelId={(e) => setCreateData({ ...createData, channelId: e.target.value.trim() })}
                onFinish={handleCreate}
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
                        <Avatar character={0} key={0} onAvatarClick={(e) => setCreateData({ ...joinData, avatar: 0 })} />,
                        <Avatar character={2} key={2} onAvatarClick={(e) => setCreateData({ ...joinData, avatar: 2 })} />,
                        <Avatar character={1} key={1} onAvatarClick={(e) => setCreateData({ ...joinData, avatar: 1 })} />,
                        <Avatar character={3} key={3} onAvatarClick={(e) => setCreateData({ ...joinData, avatar: 3 })} />,
                    ],
                }}
                submit={{
                    label: 'create channel'
                }}
            />
        },
    ];


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
                    centered
                />
            </div>
            <div className={styles.error}>{error}</div>
        </div>
    );
}
export default LoginSection;