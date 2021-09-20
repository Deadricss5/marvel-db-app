import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import HeroDetailsReducer from './reducers/HeroDetailsReducer';
import Heroes from './reducers/Heroes';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  HeroDetails: HeroDetailsReducer,
  Heroes,
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
export default store;
