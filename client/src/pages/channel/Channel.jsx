import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoremIpsum } from 'react-lorem-ipsum';
import styles from './Channel.module.css';
import moment from 'moment';
import Message from '../../components/Message/Message';
import Messages from '../../components/Messages/Messages';
import InputEmoji from 'react-input-emoji';
import { v4 as uuidv4 } from 'uuid';

const lorem = <LoremIpsum p={65} />;

const Channel = ({ socket }) => {
    const { channelId } = useParams();
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState(0);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const messageId = uuidv4();


    const sendMessage = () => {
        console.log(message)
        socket.emit("chat message", ({
            id: messageId,
            avatar: avatar,
            sender: nickname,
            message: message,
            channelID: channelId,
            time: moment().format("hh:mm a"),
            likes: 0,
            usersLikedTheMessage: [],
        }));

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
        setAvatar(localStorage.getItem("avatar"));

        socket.emit("update users", channelId);


        socket.on("update users", (users) => {
            setUsers(users);
        })


        socket.on("chat message", (message) => {
            console.log("Chat message: " + JSON.stringify(message))
            setMessages(messages => [...messages, message]);
        });


        socket.on("update messages", (messages) => {
            console.log(JSON.stringify(messages))
            setMessages([...messages]);
        });

    }, []);


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.channel}>{channelId}</h1>
            </header>
            <div className={styles.content}>
                <div className={styles.messages}>
                    <Messages>
                        {
                            messages.map((message, index) => {
                                const listItem = {
                                    display: "flex",
                                    justifyContent: (message.sender === nickname) ? "flex-end" : "flex-start",
                                }

                                const id = message.id;
                                const heartColor = message.usersLikedTheMessage.includes(nickname) ? "red" : "lightgray";

                                return (
                                    <li key={id} style={listItem} >
                                        <Message
                                            sender={message.sender}
                                            message={message.message}
                                            time={message.time}
                                            avatar={message.avatar}
                                            numberOfLikes={message.likes}
                                            heartColor={heartColor}
                                            onClickLikeButton={() => handleLikeButtonClick(id, index, nickname)}
                                        />
                                    </li>
                                );
                            })
                        }
                    </Messages>
                </div>
                <aside className={styles.sidebar}>
                    <ul>
                        {
                            users.map((user, index) => {
                                return <li key={index}>
                                    {
                                        user
                                    }
                                </li>
                            })
                        }
                    </ul>
                </aside>
            </div>
            <div className={styles.formWrapper}>
                <InputEmoji
                    setValue={message}
                    onChange={setMessage}
                    onEnter={sendMessage}
                    cleanOnEnter

                    placeholder="Type a message"
                />
            </div>
        </div>
    );
}

export default Channel;
