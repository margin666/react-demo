import React from 'react'
import { Button, Table, Space } from 'antd'
import style from './style.module.scss'

function Note() {
    //添加笔记
    const handleAdd = () => {
        console.log(1)
    }
    const dataSource = [
        { title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
        { title: '闪电鞭', author: '马保国', date: '2020-11-27', size: '12kb' },
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
                    <Button>delete</Button>
                    <Button>delete</Button>
                    <Button>delete</Button>
                    <Button>delete</Button>
                    <Button>delete</Button>
                    <Button>delete</Button>
                </Space>
            ), align: 'center',
        },
    ]
    return (
        <div className={style.Note}>
            <Button onClick={handleAdd} type="primary" >
                Add a Note
            </Button>
            <Table dataSource={dataSource} columns={columns}></Table>
        </div>
    )
}


export default Note