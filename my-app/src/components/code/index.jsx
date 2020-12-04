import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import "ace-builds/src-noconflict/mode-css.js";
import "ace-builds/src-noconflict/mode-text.js";
import "ace-builds/src-noconflict/mode-sql.js";
import "ace-builds/src-noconflict/mode-scss.js";
import "ace-builds/src-noconflict/mode-sass.js";
import "ace-builds/src-noconflict/mode-php.js";
import "ace-builds/src-noconflict/mode-json.js";
import "ace-builds/src-noconflict/mode-java.js";
import "ace-builds/src-noconflict/mode-html.js";
import "ace-builds/src-noconflict/theme-ambiance.js";
import "ace-builds/src-noconflict/theme-gob.js";
import "brace/theme/chaos";
import "brace/theme/chrome";
import "brace/theme/clouds";
import "brace/theme/clouds_midnight";
import "brace/theme/cobalt";
import "brace/theme/crimson_editor";
import "brace/theme/dawn";
import "brace/theme/dracula";
import "brace/theme/dreamweaver";
import "brace/theme/eclipse";
import "brace/theme/github";
import "brace/theme/gruvbox";
import "brace/theme/idle_fingers";
import "brace/theme/iplastic";
import "brace/theme/katzenmilch";
import "brace/theme/tomorrow_night_blue";
import { Select, Form, Button, message } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons';
import axios from 'axios'
import qs from 'qs'
const { Option } = Select


function Code(props) {
    const [code, setCode] = useState('')
    const [config, setConfig] = useState({
        theme: 'ambiance',
        mode: 'javascript',
        fontSize: 16,
    })
    const change = (change, all) => {
        setConfig({
            theme: all[0].value,
            mode: all[1].value,
            fontSize: all[2].value,
        })
    }
    //获取笔记内容
    const get_content = () => {
        const { text_name } = props.match.params
        axios.get('http://localhost:3030/file/open', { params: { text_name } }).then(res => {
            setCode(res.data.data)
        })
    }

    useEffect(() => {
        get_content()

    }, [])

    //保存笔记
    const save_note = () => {
        const data = qs.stringify({
            text_name: props.match.params.text_name,
            data: code
        })
        axios.post('http://localhost:3030/file/put', data).then(res => {
            if (res.data.code === 200) {
                message.success('保存成功！')
            }
        })
    }
    return (
        <div className={style.code}>
            <div className={style.config}>
                <Form size='small' layout='inline' className={style.form} onFieldsChange={change} initialValues={config}>
                    <Form.Item label="theme" name='theme'>
                        <Select style={{ width: '6vw' }}>
                            <Option value="ambiance">ambiance</Option>
                            <Option value="chaos">chaos</Option>
                            <Option value="gob">gob</Option>
                            <Option value="chrome">chrome</Option>
                            <Option value="clouds">clouds</Option>
                            <Option value="clouds_midnight">clouds_midnight</Option>
                            <Option value="cobalt">cobalt</Option>
                            <Option value="crimson_editor">crimson_editor</Option>
                            <Option value="dawn">dawn</Option>
                            <Option value="dracula">dracula</Option>
                            <Option value="dreamweaver">dreamweaver</Option>
                            <Option value="eclipse">eclipse</Option>
                            <Option value="github">github</Option>
                            <Option value="gruvbox">gruvbox</Option>
                            <Option value="idle_fingers">idle_fingers</Option>
                            <Option value="iplastic">iplastic</Option>
                            <Option value="tomorrow_night_blue">tomorrow_night_blue</Option>
                            <Option value="katzenmilch">katzenmilch</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="mode" name='mode'>
                        <Select style={{ width: '6vw' }}>
                            <Option value="css">css</Option>
                            <Option value="javascript">javascript</Option>
                            <Option value="sass">sass</Option>
                            <Option value="scss">scss</Option>
                            <Option value="java">java</Option>
                            <Option value="php">php</Option>
                            <Option value="html">html</Option>
                            <Option value="text">text</Option>
                            <Option value="json">json</Option>
                            <Option value="sql">sql</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="fontSize" name='fontSize'>
                        <Select style={{ width: '6vw' }}>
                            <Option value={16}>16px</Option>
                            <Option value={18}>18px</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button icon={<EllipsisOutlined />} />
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => window.history.back(-1)} type='primary'>Back</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={() => window.open('https://tool.lu/coderunner/')} type='primary'>Run</Button>
                    </Form.Item>
                </Form>

            </div>
            <AceEditor
                value={code}
                fontSize={config.fontSize}
                mode={config.mode}
                theme={config.theme}
                showPrintMargin={false}
                showGutter
                highlightActiveLine  //突出活动线
                enableSnippets  //启用代码段
                onChange={val => setCode(val)}
                onBlur={save_note}
                editorProps={{ $blockScrolling: true }}
                style={{ width: '83vw', height: '82vh', }}
                setOptions={{
                    enableBasicAutocompletion: false,   //启用基本自动完成功能
                    enableLiveAutocompletion: true,   //启用实时自动完成功能 （比如：智能代码提示）
                    enableSnippets: false,  //启用代码段
                    showLineNumbers: true,
                    tabSize: 4
                }}
                commands={[{    //命令是键绑定数组。
                    name: 'saveFile', //键绑定的名称。
                    bindKey: { win: 'Ctrl-S', mac: 'Command-S' }, //用于命令的组合键。
                    exec: () => {
                        console.log('save')
                        // save_note()
                    }   //重新绑定命令的名称
                }]}
            />
        </div>
    )
}



export default Code