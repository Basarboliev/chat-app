import { Button, ColorPicker, Form, Input, Radio, Space } from 'antd';
import styles from './SigninForm.module.css';
import NiceAvatar, { genConfig } from 'react-nice-avatar';

const SigninForm = (
    {
        formName,
        nicknameItem,
        channelItem,
        config,
        submit,
        onFinish,
        onChangeNickname,
        onChangeChannelId,
        onFaceColorChange,
        onHairColorChange,
        onShirtColorChange,
        onGenderChange,
        onBackgroundColorChange,
        onEarSizeChange,
        onEyeStyleChange,
        onNoseStyleChange,
        onMouthStyleChange,
        onShirtStyleChange,
        onGlassesStyleChange,
        onEyeBrowStyleChange,
        onHairStyleChange,
    }) => {
   
    return (
        <Form onFinish={onFinish}
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
                <Input onChange={onChangeNickname} />
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
                <Input onChange={onChangeChannelId} />
            </Form.Item>

            <Form.Item
                label="Create your avatar: "
                name="avatar"
                rules={[{
                    required: true,
                    type: 'radio',
                }]}
            >
                <div className={styles.avatarLayout}>
                    <div className={styles.avatar}>
                        <NiceAvatar style={{ width: '15rem', height: '15rem' }} {...genConfig(config)} />
                    </div>
                    <div className='avatar-config'>
                        <Form.Item label="Gender">
                            <Space direction='vertical'>
                                <Radio.Group defaultValue={config.sex}>
                                    <Radio value="man" onClick={e => onGenderChange(e)}> Man </Radio>
                                    <Radio value="woman" onClick={e => onGenderChange(e)}> Woman </Radio>
                                </Radio.Group>
                            </Space>
                        </Form.Item>
                        <Form.Item label="Face color">
                            <ColorPicker
                                showText
                                format='hex'
                                value={config.faceColor} 
                                onChange={color => onFaceColorChange(color.toHex())}
                                onChangeComplete={color => onFaceColorChange(color.toHex())}
                            />
                        </Form.Item>
                        <Form.Item label="Ear size">
                            <Radio.Group defaultValue={config.earSize}>
                                <Radio value="small" onClick={e => onEarSizeChange(e)}> Small </Radio>
                                <Radio value="big" onClick={e => onEarSizeChange(e)}> Big </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Eye style">
                            <Radio.Group defaultValue={config.eyeStyle}>
                                <Radio value="circle" onClick={e => onEyeStyleChange(e)}> Circle </Radio>
                                <Radio value="smile" onClick={e => onEyeStyleChange(e)}> Smile </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Nose style">
                            <Radio.Group defaultValue={config.noseStyle}>
                                <Radio value="short" onClick={e => onNoseStyleChange(e)}> Short </Radio>
                                <Radio value="round" onClick={e => onNoseStyleChange(e)}> Round </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Mouth style">
                            <Radio.Group defaultValue={config.mouthStyle}>
                                <Radio value="smile" onClick={e => onMouthStyleChange(e)}> Smile </Radio>
                                <Radio value="laugh" onClick={e => onMouthStyleChange(e)}> Laugh </Radio>
                                <Radio value="peace" onClick={e => onMouthStyleChange(e)}> Peace </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Shirt style">
                            <Radio.Group defaultValue={config.shirtStyle}>
                                <Radio value="polo" onClick={e => onShirtStyleChange(e)}> Polo </Radio>
                                <Radio value="hoody" onClick={e => onShirtStyleChange(e)}> Hoody </Radio>
                                <Radio value="short" onClick={e => onShirtStyleChange(e)}> Short </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Glasses style">
                            <Radio.Group defaultValue={config.glassesStyle}>
                                <Radio value="none" onClick={e => onGlassesStyleChange(e)}> None </Radio>
                                <Radio value="square" onClick={e => onGlassesStyleChange(e)}> Square </Radio>
                                <Radio value="round" onClick={e => onGlassesStyleChange(e)}> Round </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Hair style">
                            <Radio.Group defaultValue={config.hairStyle}>
                                <Radio value="normal" onClick={e => onHairStyleChange(e)}> Normal </Radio>
                                <Radio value="thick" onClick={e => onHairStyleChange(e)}> Thick </Radio>
                                <Radio value="mohawk" onClick={e => onHairStyleChange(e)}> Mohawk </Radio>
                                <Radio value="womanShort" onClick={e => onHairStyleChange(e)}> Woman short </Radio>
                                <Radio value="womanLong" onClick={e => onHairStyleChange(e)}> Woman long </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Hair color">
                            <ColorPicker 
                                disabled={ (config.sex === "man") ? true : false } 
                                showText 
                                value={config.hairColor} 
                                onChange={color => onHairColorChange(color.toHex())}
                                onChangeComplete={color => onHairColorChange(color.toHex())}
                            />
                        </Form.Item>
                        <Form.Item label="Eye brow style">
                            <Radio.Group defaultValue={config.eyeBrowStyle}>
                                <Radio value="up" onClick={e => onEyeBrowStyleChange(e)}> Up </Radio>
                                <Radio value="upWoman" onClick={e => onEyeBrowStyleChange(e)}> Up woman </Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Shirt color">
                            <ColorPicker 
                                showText 
                                value={config.shirtColor}
                                onChange={color => onShirtColorChange(color.toHex())}
                                onChangeComplete={color => onShirtColorChange(color.toHex())}
                            />
                        </Form.Item>
                        <Form.Item label="Background color">
                            <ColorPicker
                                showText
                                value={config.bgColor}
                                onChange={color => onBackgroundColorChange(color.toHex())}
                                onChangeComplete={color => onBackgroundColorChange(color.toHex())} />
                        </Form.Item>
                    </div>
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