import { HashRouter as Router } from 'react-router-dom'
// import { Button } from 'antd'
import style from './app.module.scss'
import Left from './views/menu/Left'
import Right from './views/menu/Right'
function App() {
  return (
    <Router>
      <div className={style.App}>
        <div className={style.head}>
            <div className={style.title}>Note</div>
        </div>
        <Left />
        <Right />
      </div>
    </Router>

  );
}

export default App;
