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
    <div className="text-white bg-black">
      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl font-extrabold">
          Welcome to AISC
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          AI-enhanced basketball vision. Powered by machine learning. Built for players, coaches, and analysts. Explore the future of sports.
        </motion.p>
      </section>

      {/* Project Vision Section */}
      <section className="px-6 py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img src="https://img.freepik.com/premium-photo/basketball-player-practicing-posing-basketball-sports-athlete-concept-sports-arena-background-basketball-player-full-rear-view-standing-with-basketball-ai-generated_538213-2564.jpg" alt="AI Basketball Vision" className="rounded-lg shadow-lg" />
          <div>
            <h2 className="text-4xl font-bold mb-4">What is AISC?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              The Artificial Intelligence Shot Coach (AISC) is an advanced AI system built to revolutionize basketball shooting development. By leveraging pose estimation models and biomechanical simulations, AISC analyzes the intricate details of every jump shot in real time.
              <br /><br />
              It does this by extracting data points like elbow angle, shoulder position, wrist flexion, hip posture, and knee alignment. Using this, it reconstructs a player’s form frame-by-frame and compares it to successful shots or ideal shooting techniques. This data is then used to provide actionable feedback, simulate ideal forms, and guide players on how to improve consistency and accuracy.
              <br /><br />
              This project is the result of months of development, combining video frame extraction, MediaPipe pose tracking, CSV generation, dynamic labeling, and early-stage AI modeling. It currently includes automatic release detection, per-frame labeling of made/missed shots, and integration with Matplotlib for visual diagnostics.
            </p>
          </div>
        </div>
      </section>

      {/* For Players Section */}
      <section className="px-6 py-20 bg-black">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">How AISC Empowers Players</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Basketball players are often told to keep practicing, but practice without feedback can lead to reinforcement of poor mechanics. AISC provides an intelligent assistant that breaks down each shot and gives specific corrections, similar to having a professional coach in your pocket.
              <br /><br />
              With easy-to-understand charts and movement diagnostics, players can adjust posture, release timing, and jump mechanics. Over time, AISC tracks progress and highlights form improvements, helping players build muscle memory through data-driven feedback.
            </p>
          </div>
          <img src="https://static01.nyt.com/athletic/uploads/wp/2023/12/26100143/USATSI_22174242-1024x700.jpg" alt="Player Shooting Ball" className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* For Coaches Section */}
      <section className="px-6 py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiT61Bg8haEHAo9mlJBwsZTOynG-4qAmZjaw&s" alt="Coach Guiding Player" className="rounded-lg shadow-lg" />
          <div>
            <h2 className="text-3xl font-bold mb-4">What Coaches Gain</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Coaches often spend countless hours watching tape. AISC streamlines this by automatically analyzing game footage and highlighting key frame segments. It assists coaches by tagging shots, identifying technical flaws, and providing side-by-side comparisons to ideal form templates.
              <br /><br />
              This reduces guesswork and helps trainers focus on strategy, leadership, and deeper player development. Coaches can also use the system to build training modules based on common issues identified across players.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="px-6 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Recent Updates</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 6).map(post => (
              <Link key={post.id} to={`/blog/${post.id}`} className="block border border-gray-800 rounded overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-4 bg-gray-900">
                  <h3 className="text-xl font-bold text-white">{post.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{post.content.slice(0, 70)}...</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6">
          Got questions, ideas, or want to collaborate on the future of AI in sports? Reach out via email and let’s talk.
        </p>
        <a href="mailto:febechukwuonyeyili@gmail.com" className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition">
          Send Email
        </a>
      </section>
    </div>
  );
}


