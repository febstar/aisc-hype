// Main app logic to be filled later
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { PostPage } from './pages/PostPage';
import { UploadPage } from './pages/UploadPage';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';
import { AuthProvider, useAuth } from './firebase/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white border-b border-gray-800">
      <h1 className="text-2xl font-bold tracking-tight">🤖 AISC</h1>
      <ul className="flex space-x-4 text-sm">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        {currentUser ? (
          <>
            <li><Link to="/upload">Upload</Link></li>
            <li><Link to="/admin">Admin</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<PostPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
