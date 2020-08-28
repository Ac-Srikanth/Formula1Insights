import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './App';
import configureStore from './redux/store/configureStore'
import './index.css';
// import {startGetResults} from './redux/actions/resultAction'
import * as serviceWorker from './serviceWorker';

const store = configureStore()

// store.subscribe(()=>{
//   console.log('Subscribe', store.getState())
// })

// store.dispatch(startGetResults())

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
