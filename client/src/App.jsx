import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './general/Router.jsx';
import { Loading } from './components/Loading.jsx';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { verifyToken } from './store/slices/authSlice';
import { fetchCategories } from './store/slices/categorySlice';


const AppSetup = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchCategories());
    }
  }, [dispatch, user]);

  return null;
}

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <AppSetup/>
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
