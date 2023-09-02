import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Channel.module.css';
import Message from '../../components/Message/Message';
import Messages from '../../components/Messages/Messages';
import Header from '../../components/Header/Header';
import InputEmoji from 'react-input-emoji';
// RCE CSS
import 'react-chat-elements/dist/main.css';
import { ChatItem } from 'react-chat-elements';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Collapse } from 'antd';
import { v4 as uuidv4 } from 'uuid';



const Channel = ({ socket }) => {
    const { channelId } = useParams();
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState({});
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [systemMessages, setSystemMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const messageId = uuidv4();


    const sendMessage = () => {
        console.log(message)

        if (message.trim() !== "") {
            socket.emit("chat message", ({
                id: messageId,
                avatar: avatar,
                sender: nickname,
                message: message,
                channelID: channelId,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                likes: 0,
                usersLikedTheMessage: [],
            }));
        }
    }


    const getFilteredMessage = (id) => {
        const filteredArray = messages.filter(message => message.id === id);
        const filteredMessage = filteredArray[0];

        return filteredMessage;
    }


    const likeMessage = (message, user) => {
        message.likes += 1;
        message.usersLikedTheMessage.push(user);

        return message;
    }


    const dislikeMessage = (message, user) => {
        message.likes -= 1;
        const userIndex = message.usersLikedTheMessage.indexOf(user);

        message.usersLikedTheMessage = [
            ...message.usersLikedTheMessage.slice(0, userIndex),
            ...message.usersLikedTheMessage.slice(userIndex + 1)
        ];

        return message;
    }


    const handleLikeButtonClick = (id, index, user) => {
        let filteredMessage = getFilteredMessage(id);

        if (!filteredMessage.usersLikedTheMessage.includes(user)) {
            filteredMessage = likeMessage(filteredMessage, user);
        } else {
            filteredMessage = dislikeMessage(filteredMessage, user);
        }

        const copyOfMessages = [...messages];
        const firstPartOfMessages = copyOfMessages.slice(0, index);
        const secondPartOfMessages = copyOfMessages.slice(index + 1);

        const newMessages = [...firstPartOfMessages, filteredMessage, ...secondPartOfMessages];
        socket.emit("update messages", [...newMessages]);
    }


    useEffect(() => {
        setNickname(localStorage.getItem("nickname"));
        const avatarString = localStorage.getItem("avatar");

        //Parse the string avatar to a valid JS object
        const avatarObject = JSON.parse(avatarString);
        setAvatar({...avatarObject});

        socket.emit("update users", channelId);

        socket.on("update users", (users) => {
            setUsers(users);
        });


        socket.on("chat message", (message) => {
            console.log("Chat message: " + JSON.stringify(message))
            setMessages(messages => [...messages, message]);
        });


        socket.on("update messages", (messages) => {
            console.log(JSON.stringify(messages))
            setMessages([...messages]);
        });


        socket.on("update system messages", (message) => {
            setSystemMessages(systemMessages => [...systemMessages, message]);
        });

    }, []);


    return (
        <div className={styles.container}>
            <Header title={channelId} onlineUsers={users} notifications={systemMessages}/>
            <div className={styles.content}>
                <Sidebar>
                    <Collapse
                        style={{ width: "100%" }}
                        items={
                            [
                                {
                                    key: '1',
                                    label: <div className={styles.label}> <span className={styles.dot} /> {`Online users:   ${users.length}`}</div>,
                                    children: <ul className={styles.list}>
                                        {
                                            users.map((user, index) => (
                                                <li key={index}>
                                                    <div className={styles.onlineUserContainer}>
                                                        <span className={styles.dot} />
                                                        <span className={styles.nickname}>{user}</span>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>,
                                },
                                {
                                    key: '2',
                                    label: <div className={styles.label}> Notifications </div>,
                                    children: <ul className={styles.list}>
                                        {
                                            systemMessages.map((sysMessage, index) => (
                                                <li key={index}>
                                                    <ChatItem
                                                        avatar={sysMessage.avatar}
                                                        alt={sysMessage.alt}
                                                        title={sysMessage.title}
                                                        subtitle={sysMessage.subtitle}
                                                        date={sysMessage.date}
                                                    />
                                                </li>
                                            ))
                                        }
                                    </ul>,
                                },
                            ]
                        }
                        defaultActiveKey={['2']}
                    />
                </Sidebar>
                <div className={styles.messages}>
                    <Messages>
                        {
                            messages.map((message, index) => {
                                const id = message.id;
                                const heartColor = message.usersLikedTheMessage.includes(nickname) ? "red" : "whitesmoke";
                                const position = (message.sender === nickname) ? "right" : "left";

                                return (
                                    <Message
                                        key={id}
                                        sender={message.sender}
                                        message={message.message}
                                        time={message.time}
                                        avatar={message.avatar}
                                        numberOfLikes={message.likes}
                                        heartColor={heartColor}
                                        onClickLikeButton={() => handleLikeButtonClick(id, index, nickname)}
                                        usersLikedTheMessage={message.usersLikedTheMessage}
                                        position={position}
                                    />
                                );
                            })
                        }
                    </Messages>
                </div>

            </div>
            <div className={styles.formWrapper}>
                <InputEmoji
                    setValue={message}
                    onChange={setMessage}
                    onEnter={sendMessage}
                    cleanOnEnter
                    theme="light"
                    placeholder="Type a message"
                />
            </div>
        </div>
    );
}

export default Channel;
