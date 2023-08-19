import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LoremIpsum } from 'react-lorem-ipsum';
import styles from './Channel.module.css';
import moment from 'moment';
import Message from '../../components/Message/Message';
import Messages from '../../components/Messages/Messages';
import MessageForm from '../../components/MessageForm/MessageForm';

const lorem = <LoremIpsum p={65} />;

const Channel = ({ socket }) => {
    const { channelId } = useParams();
    const [nickname, setNickname] = useState("");
    const [avatar, setAvatar] = useState(0);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);


    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("chat message", ({
            avatar: avatar,
            sender: nickname,
            message: message,
            channelID: channelId,
            time: moment().format("hh:mm a"),
        }));
        setMessage('');
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
                                return (
                                    <li key={index}>
                                       <Message sender={message.sender} message={message.message} time={message.time} avatar={message.avatar}/>
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
                <MessageForm
                    placeholder='Write your message...'
                    inputValue={message}
                    onInputChange={e => setMessage(e.target.value)}
                    onSubmit={e => sendMessage(e)}
                />
            </div>
        </div>
    );
}

export default Channel;