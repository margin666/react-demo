import React, { useState, useEffect,  } from 'react'
import { Button, Table, Space, Modal, Form, Input } from 'antd'
import style from './style.module.scss'
import axios from 'axios'
import qs from 'qs'

function Note(props) {
    //获取数据列表
    const [dataSource, setDataSource] = useState([])
    const get_list = () => {
        axios.get('http://localhost:3030/file/get_list').then(res => {
            if(res.data.code === 200){
                let arr = res.data.data.list.map((item, index) => {
                    return Object.assign({}, item, {key: index+1})
                })
                setDataSource(arr)
            }
        })
    }
    useEffect(() => {
        get_list()
    }, [])
    

    //表格配置
    const columns = [
        {
            title: '序号', render: (text, record, index) => {
                return index + 1
            }, align: 'center', width: 'calc(8vw)'
        },
        { title: '标题', dataIndex: 'title', align: 'center', width: 'calc(20vw)' },
        { title: '作者', dataIndex: 'author', align: 'center', width: 'calc(7vw)' },
        { title: '时间', dataIndex: 'date', align: 'center', width: 'calc(10vw)' },
        { title: '文件大小', dataIndex: 'size', align: 'center', width: 'calc(8vw)' },
        {
            title: '操作', render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => open(text)}>查看</Button>
                    <Button type="primary" danger>删除</Button>
                </Space>
            ), align: 'center',
        },
    ]
    //模态框显示/隐藏
    const [visible, setVisible] = useState(false)
    const open = (e) => {
        //打开文件
        props.history.push('/Code/'+e.text_name)
    }
    //提交添加笔记的内容
    const add_note = (e) => {
        const date = new Date()
        const data = qs.stringify({
            title: e.title,
            date: date.getFullYear() +'-'+((date.getMonth())+1)+'-'+date.getDate(),
            author: 'margin',
            size: '15kb',
            text_name: (new Date()).valueOf()
        })
        axios.post('http://localhost:3030/file/add', data).then(res => {
            if(res.data.code === 200){
                get_list()
            }
        })
    }
    const handleOk = (e) => {
        add_note(e)
        setVisible(false)
        
        
    }

    const handleCancel = () => {
        setVisible(false)
    }
    //添加笔记
    const handleAdd = () => {
        setVisible(true)
        // setNotename('')
    }
    
    
    return (
        <div className={style.Note}>
            <Modal
                title="添加笔记"
                visible={visible}
                onCancel={handleCancel}
                okButtonProps={{htmlType: 'submit', form: 'form'}}
            >
                <Form layout="horizontal" id='form' onFinish={handleOk}>
                    <Form.Item label="名称" name='title'>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <div className={style.btns}>
                <Button onClick={handleAdd} type="primary" >
                    Add a Note
                </Button>

            </div>

            <Table pagination={{ pageSize: 12 }} scroll={{ y: 'calc(70vh)' }} bordered dataSource={dataSource} columns={columns}></Table>
        </div>
    )
}


export default Note