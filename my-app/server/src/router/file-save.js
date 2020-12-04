const express = require('express')
const route = express.Router()
const fs = require('fs')
const qs = require('querystring')

//获取列表接口
route.get('/get_list', (req, res) => {
    fs.readFile(__dirname+'../../files/sql_file/list.json', (error, data) => {
        if(error){
            res.send(error)
        } else {
            res.send({
                code: 200,
                data: JSON.parse(data)
            })
        }
    })
})

//测试
route.get('/ceshi', (req, res) => {
    fs.readFile(__dirname+'../../files/sql_file/list.json', (error, data) => {
        let obj = JSON.parse(data)        
        console.log(obj.list)
    })
})
//新增笔记接口
route.post('/add', (req, res) => {
    let str = ''
    req.on('data', chunk => {
        str+=chunk
    })
    req.on('end', error => {
        if(error){
            res.send(error)
        } else {
            
            const obj = qs.parse(str)
            
            fs.writeFileSync(__dirname+'../../files/note_files/'+obj.text_name+'.txt', '')
            fs.readFile(__dirname+'../../files/sql_file/list.json', (error, data) => {
                let obj2 = JSON.parse(data)        
                obj2.list.push(obj)
                const json = JSON.stringify(obj2)
                fs.writeFile(__dirname+'../../files/sql_file/list.json', json, {flag: 'w'}, err => {
                    if(err){
                        res.send(err)
                    } else {
                        res.send({
                            code: 200,
                            data: 'ok'
                        })
                    }
                })
            })
            

        }
    })
})



//打开笔记接口
route.get('/open', (req, res) => {
    fs.readFile(__dirname+'../../files/note_files/'+req.query.text_name+'.txt', (error, data) => {
        res.send({
            code: 200,
            data: data.toString()
        })
    })
})

//提交笔记接口
route.post('/put', (req, res) => {
    let str = ''
    req.on('data', chunk => {
        str+=chunk
    })
    req.on('end', error => {
        if(error){
            res.send(500)
        }else {
            const obj = qs.parse(str)
            fs.writeFile(__dirname+'../../files/note_files/'+obj.text_name+'.txt', obj.data, {flag: 'w'}, err => {
                if(err){
                    res.send(500)
                }else {
                    res.send({
                        code: 200,
                        data: 'ok'
                    })
                }
            })
        }
        
    })
})


module.exports = route