import React from 'react'
import style from './Right.module.scss'
import {Switch, Route, Redirect} from 'react-router-dom'
import Note from '../../components/note'

function Right() {
    return (
        <div className={style.Right}>
            <Switch>
                <Route path='/note' component={Note}></Route>
                <Redirect from='/' to='/note' exact></Redirect>
            </Switch>
        </div>
    )
}


export default Right