import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { compose } from 'redux';
import { rootEpic } from '../epics';
import { rootReducer } from '../reducer';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {

    const store = createStore(rootReducer,
        composeEnhancers(
            applyMiddleware(epicMiddleware)
        )
      );
  
    epicMiddleware.run(rootEpic);
  
    return store;
}



