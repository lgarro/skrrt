import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import skrrtAppRootReducer from './stores/skrrtApp'


export const initSkrrtAppStore = () => {
    // const initialState = {}

    // const mergedState = {
    //     ...initialState,
    // }
    const history = createBrowserHistory()
    const store = createStore(
        connectRouter(history)(skrrtAppRootReducer), // new root reducer with router state
        // mergedState,
        composeWithDevTools(applyMiddleware(
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
