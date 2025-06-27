import { useState, useEffect } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { db } from '../firebase/firebase';
import { collection, addDoc, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

export function UploadPage() {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const docSnap = await getDoc(doc(db, 'posts', id));
        if (docSnap.exists()) {
          const post = docSnap.data();
          setTitle(post.title);
          setImage(post.image);
          setContent(post.content);
        }
      }
    };
    fetchPost();
  }, [id]);

  if (!currentUser) {
    return <p className="text-center mt-10 text-red-400">You must be logged in as admin to post a blog.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateDoc(doc(db, 'posts', id), { title, image, content });
      alert('Post updated!');
    } else {
      await addDoc(collection(db, 'posts'), {
        title,
        image,
        content,
        author: currentUser.email,
        createdAt: serverTimestamp()
      });
      alert('Post created!');
    }
    navigate('/blog');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold">{id ? 'Edit Blog Post' : 'Upload Blog Post'}</h2>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 bg-gray-900 border border-gray-600 rounded" />
      <input type="text" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="w-full p-2 bg-gray-900 border border-gray-600 rounded" />
      <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 h-32 bg-gray-900 border border-gray-600 rounded" />
      <button type="submit" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">{id ? 'Update' : 'Upload'}</button>
    </form>
  );
}