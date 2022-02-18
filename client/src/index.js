import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk"
// import rootReducer from './reducers/index'
import ReactDOM from 'react-dom';
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {reducers} from './reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>

            <App/>

        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
