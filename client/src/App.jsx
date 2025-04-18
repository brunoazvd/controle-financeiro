import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './general/Router.jsx';
import { Loading } from './components/Loading.jsx';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { verifyToken } from './store/slices/authSlice';

const TokenVerifier = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return null;
}

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <TokenVerifier/>
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
