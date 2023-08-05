import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RapidClientOnly$, { result } from '../abstractions/client_only';
import { Button } from '@rapid-web/ui';
import axios from 'axios';

function Home() {
  useEffect(() => {
    console.log('hello world!')
    document.addEventListener('click', () => console.log('clicked!'));
    const test = async () => {
        console.log((await result).data);
    }
    test();
  }, []);
  return (
    <div>
      <Button variant='outline'>Hello world!</Button>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ x: -500, opacity: 0 }}
          transition={{ duration: 0.25 }}
          exit={{ x: -600 }}
        >
          <Link to='/test'>Test ROUTE</Link>
        </motion.div>
      </h1>
      {[1,2,3].map((item) =>
        <h1>This super cool {item}</h1>
      )}
    </div>
  )
}

export default Home;
