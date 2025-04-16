import {Suspense} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './general/Router.jsx';
import {Loading} from './components/Loading.jsx';
import { Provider } from 'react-redux';
import { store } from './store';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense
        fallback={
          <Loading name="suspense"/>
        }
      >
        <Router/>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
