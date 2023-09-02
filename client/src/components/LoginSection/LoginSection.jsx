import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';
import styles from './LoginSection.module.css';
import Description from '../Description/Description';
import { LoremIpsum } from 'react-lorem-ipsum';
import SigninForm from '../SigninForm/SigninForm';

const lorem = <LoremIpsum p={2} />;
const tips = (
    <div className={styles.tips}>
        <h1 className={styles.title}>Join a channel</h1>
        <p className={styles.body}>
            🔥  If you want to join a specific channel, 
            then the channel must exist on the server (it must be created in the CREATE CHANNEL section).
            Type your unique nickname and then the channel name... 
        </p> <br/> <br/>
        <h1 className={styles.title}>Create a channel</h1>
        <p className={styles.body}>
            🔥  Create your own channel by typing your unique nickname followed by the channel name. 
        </p>
    </div>
);

const LoginSection = ({ socket }) => {
    const navigate = useNavigate();
    const [joinData, setJoinData] = useState({
        nickname: '',
        channelId: '',
    });

    const [createData, setCreateData] = useState({
        nickname: '',
        channelId: '',
    });

    const [error, setError] = useState('');
    const [redirectAfterJoin, setRedirectAfterJoin] = useState(false);
    const [redirectAfterCreate, setRedirectAfterCreate] = useState(false);
    const [avatarConfig, setAvatarConfig] = useState({
        sex: "man",
        faceColor: "#F9C9B6",
        earSize: "small",
        eyeStyle: "smile",
        noseStyle: "short",
        mouthStyle: "peace",
        shirtStyle: "short",
        glassesStyle: "none",
        hairColor: "#000",
        hairStyle: "thick",
        hatStyle: "none",
        hatColor: "#F48150",
        eyeBrowStyle: "up",
        shirtColor: "#77311D",
        bgColor: "#D2EFF3"
    });

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
                    const avatar = JSON.stringify(avatarConfig);
                    localStorage.setItem("avatar", avatar);
                    console.log("Avatar config: " + JSON.stringify(avatarConfig));
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
                    const avatar = JSON.stringify(avatarConfig);
                    localStorage.setItem("avatar", avatar);
                    socket.emit("create channel", createData.channelId, createData.nickname);
                } else {
                    //If channel exists, write an error message to the user
                    setError("⚠️ The channel already exists. Please create a new one.");
                }
            });
    }


    const handleFaceColorChange = (color) => {
        const hexColor = `#${color}`;

        setAvatarConfig({
            ...avatarConfig,
            faceColor: hexColor,
        });
    }


    const handleHairColorChange = (color) => {
        const hexColor = `#${color}`;

        console.log("Hair color: " + hexColor);
        setAvatarConfig({
            ...avatarConfig,
            hairColor: hexColor,
        });
    }


    const handleShirtColorChange = (color) => {
        const hexColor = `#${color}`;

        console.log("Hair color: " + hexColor);
        setAvatarConfig({
            ...avatarConfig,
            shirtColor: hexColor,
        });
    }


    const handleBackgroundColorChange = (color) => {
        const hexColor = `#${color}`;

        console.log("Hair color: " + hexColor);
        setAvatarConfig({
            ...avatarConfig,
            bgColor: hexColor,
        });
    }


    const handleGenderChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            sex: e.target.value
        });
    }


    const handleEarSizeChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            earSize: e.target.value
        });
    }


    const handleEyeStyleChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            eyeStyle: e.target.value
        });
    }


    const handleNoseStyleChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            noseStyle: e.target.value
        });
    }


    const handleMouthStyleChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            mouthStyle: e.target.value
        });
    }


    const handleShirtStyleChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            shirtStyle: e.target.value
        });
    }


    const handleGlassesStyleChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            glassesStyle: e.target.value
        });
    }


    const handleEyeBrowStyleChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            eyeBrowStyle: e.target.value
        });
    }


    const handleHairStyleChange = (e) => {
        setAvatarConfig({
            ...avatarConfig,
            hairStyle: e.target.value
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
                config={avatarConfig}
                onFaceColorChange={handleFaceColorChange}
                onHairColorChange={handleHairColorChange}
                onShirtColorChange={handleShirtColorChange}
                onBackgroundColorChange={handleBackgroundColorChange}
                onGenderChange={handleGenderChange}
                onEarSizeChange={handleEarSizeChange}
                onEyeStyleChange={handleEyeStyleChange}
                onNoseStyleChange={handleNoseStyleChange}
                onMouthStyleChange={handleMouthStyleChange}
                onShirtStyleChange={handleShirtStyleChange}
                onGlassesStyleChange={handleGlassesStyleChange}
                onEyeBrowStyleChange={handleEyeBrowStyleChange}
                onHairStyleChange={handleHairStyleChange}
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
                config={avatarConfig}
                onFaceColorChange={handleFaceColorChange}
                onHairColorChange={handleHairColorChange}
                onShirtColorChange={handleShirtColorChange}
                onBackgroundColorChange={handleBackgroundColorChange}
                onGenderChange={handleGenderChange}
                onEarSizeChange={handleEarSizeChange}
                onEyeStyleChange={handleEyeStyleChange}
                onNoseStyleChange={handleNoseStyleChange}
                onMouthStyleChange={handleMouthStyleChange}
                onShirtStyleChange={handleShirtStyleChange}
                onGlassesStyleChange={handleGlassesStyleChange}
                onEyeBrowStyleChange={handleEyeBrowStyleChange}
                onHairStyleChange={handleHairStyleChange}
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
                    <Description title="Tips" bodyContent={tips} />
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