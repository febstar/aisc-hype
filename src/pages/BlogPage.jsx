import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);

  return (
    <div className="p-4 grid gap-6 md:grid-cols-2">
      {posts.map(post => (
        <Link key={post.id} to={`/blog/${post.id}`} className="block border border-gray-700 rounded overflow-hidden hover:scale-105 transition">
          <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-bold">{post.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
