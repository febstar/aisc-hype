import { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      await register(email, password);
    } else {
      await login(email, password);
    }
    navigate('/admin');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{isRegistering ? 'Register Admin' : 'Admin Login'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        <button type="submit" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">
          {isRegistering ? 'Register' : 'Login'}
        </button>
        <p className="text-sm text-gray-400 cursor-pointer underline" onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Already have an account? Login' : 'New admin? Register here'}
        </p>
      </form>
    </div>
  );
}
