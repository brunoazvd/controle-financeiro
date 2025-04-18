import { Suspense, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './general/Router.jsx';
import { Loading } from './components/Loading.jsx';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { verifyToken } from './store/slices/userSlice.js';
import { fetchCategories } from './store/slices/categorySlice';


const AppSetup = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  console.log(userData)

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      dispatch(fetchCategories());
    }
  }, [dispatch, userData]);

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
