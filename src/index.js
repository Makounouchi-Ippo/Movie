import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import authreducer from './store/reducer/auth'
import moviereducer from './store/reducer/movieSearch'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 


const rootReducer = combineReducers({
    auth:authreducer,
    movie:moviereducer,
    // infoUser:infoUserreducer
});

const store = createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
    
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
