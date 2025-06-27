import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export function AdminPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const snapshot = await getDocs(collection(db, 'posts'));
    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'posts', id));
    fetchPosts();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Blog Posts</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="border-b border-gray-700 pb-2">
            <p className="text-lg font-semibold">{post.title}</p>
            <button onClick={() => handleDelete(post.id)} className="text-red-500 text-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
