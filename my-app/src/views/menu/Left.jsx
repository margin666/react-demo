import React from 'react'
import style from './Left.module.scss'
import { Menu } from 'antd';
import { AppstoreOutlined, FormOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'

const { SubMenu } = Menu;

function Left(props) {
    //导航菜单点击事件
    const handleClick = e => {
        props.history.push(e.key)
    }


    return (
        <div className={style.Left}>
            <Menu
                style={{'height': '92vh'}}
                onClick={handleClick}>
                <Menu.Item icon={<FormOutlined />} key="/note">笔记</Menu.Item>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default withRouter(Left)
