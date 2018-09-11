import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { initSkrrtAppStore } from './redux/store'

import App from './app'

const { store, history } = initSkrrtAppStore()

ReactDOM.render(
    (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>
    ), document.getElementById('root'),
)
