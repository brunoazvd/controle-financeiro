// client/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../store/slices/authSlice';
import { RoutePaths } from '../static/RoutePaths';

export const Welcome = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      navigate(RoutePaths.HOME);
    }
  }, [user, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault();
    isLoginMode ?  dispatch(loginUser({ email, password })) : dispatch(registerUser({ email, password }));
  };

  const toggleMode = () => {
    setIsLoginMode(prev => !prev);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex w-full flex-col bg-slate-300 max-w-md rounded-md p-4 mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isLoginMode ? "Login" : "Cadastro"}
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full bg-slate-100 p-2 rounded-md mb-4"
              placeholder="E-mail"
              disabled={loading}
              required
            />
          </div>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full bg-slate-100 p-2 rounded-md mb-4"
            placeholder="Senha"
            disabled={loading}
            required
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full cursor-pointer bg-amber-200 hover:bg-amber-300 p-2 rounded-md mb-4">
            {loading ? 
              (isLoginMode ? "Entrando..." : "Cadastrando") : 
              (isLoginMode ? "Login" : "Cadastrar")
            }
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <div className="text-center">
          <button 
            onClick={toggleMode}
            className="hover:underline"
            type="button">
              {isLoginMode ? "Não tem uma conta? Cadastre-se agora." : "Já tem uma conta? Faça Login."}
          </button>
        </div>
      </div>
    </div>
  );
};