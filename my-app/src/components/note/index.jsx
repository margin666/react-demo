import React, { useState } from 'react'
import { Button, Table, Space, Modal, Form, Input } from 'antd'
import style from './style.module.scss'

function Note(props) {

    const dataSource = [
        { key: 1, title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { key: 2, title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { key: 3, title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { key: 4, title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { key: 5, title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { key: 6, title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { key: 7, title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { key: 8, title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
    ]
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
        console.log(e)
        // console.log(props)
        props.history.push('/Code')
    }
    const handleOk = () => {
        setVisible(false)
        
    }
    const handleCancel = () => {
        setVisible(false)
    }
    //添加笔记
    const handleAdd = () => {
        setVisible(true)
        setNotename('')
    }
    //笔记名称
    const [notename, setNotename] = useState('')
    
    return (
        <div className={style.Note}>
            <Modal
                title="添加笔记"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form layout="horizontal">
                    <Form.Item label="名称">
                        <Input value={notename} onChange={e => setNotename(e.value)} />
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