import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';

export function PostPage() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setPost({ id: docSnap.id, ...docSnap.data() });
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Delete this post?')) {
      await deleteDoc(doc(db, 'posts', id));
      navigate('/');
    }
  };

  if (!post) return <p className="text-center mt-10">Loading post...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-white">
      <img src={post.image} alt={post.title} className="w-full rounded-lg mb-4" />
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-400 mb-6">By {post.author}</p>
      <p>{post.content}</p>
      {currentUser?.email === post.author && (
        <div className="flex space-x-4 mt-6">
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700">Delete Post</button>
          <Link to={`/edit/${post.id}`} className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600">Edit Post</Link>
        </div>
      )}
    </div>
  );
}
