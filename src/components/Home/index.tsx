import React from 'react';
import { Link } from 'react-router-dom';
import paths from '../../paths';

const Home: React.FC = () => (
  <main>
    <section>hello</section>
    <div>
      <Link to={paths.home}>Home</Link>
      <Link to={paths.signin}>About</Link>
    </div>
  </main>
);

export default Home;
