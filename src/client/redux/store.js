import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import reduxThunk from 'redux-thunk'
import skrrtAppRootReducer from './stores/skrrtApp'


export const initSkrrtAppStore = () => {
    const history = createBrowserHistory()
    const store = createStore(
        connectRouter(history)(skrrtAppRootReducer), // new root reducer with router state
        {}, // i.e window.INITIAL_STATE
        compose(applyMiddleware(
            routerMiddleware(history),
            reduxThunk
        )),
    )
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const hotLoadedReducer = require('./reducers').default
            store.replaceReducer(connectRouter(history)(hotLoadedReducer))
        })
    }
    return { store, history }
}
