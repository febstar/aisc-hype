import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, 'posts'));
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);

  return (
    <div className="text-white">
      <section className="text-center p-10 bg-black">
        <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl font-extrabold tracking-tight">
          Welcome to AISC
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-gray-400">
          AI-enhanced basketball vision. Powered by machine learning. Crafted by Febz.
        </motion.p>
      </section>

      <section className="p-8 bg-gray-950">
        <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="block border border-gray-700 rounded overflow-hidden hover:scale-105 transition">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{post.content.slice(0, 60)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
