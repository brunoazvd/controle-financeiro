// client/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../store/slices/userSlice';
import { RoutePaths } from '../static/RoutePaths';

export const Welcome = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (userData) {
      navigate(RoutePaths.HOME);
    }
  }, [userData, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault();
    isLoginMode ?  dispatch(loginUser({ username, password })) : dispatch(registerUser({ username, password }));
  };

  const toggleMode = () => {
    setIsLoginMode(prev => !prev);
    setUsername('');
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
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full bg-slate-100 p-2 rounded-md mb-4"
              placeholder="Username"
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