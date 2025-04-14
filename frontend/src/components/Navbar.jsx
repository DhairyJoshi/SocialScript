import { Home, Info, Image } from 'lucide-react';
import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Social Script</Link>
        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-2 hover:text-indigo-200">
            <Home size={20} />
            Home
          </Link>
          <Link to="/about" className="flex items-center gap-2 hover:text-indigo-200">
            <Info size={20} />
            About
          </Link>
          <Link to="/generator" className="flex items-center gap-2 hover:text-indigo-200">
            <Image size={20} />
            Generator
          </Link>
        </div>
      </div>
    </nav>
  );
}