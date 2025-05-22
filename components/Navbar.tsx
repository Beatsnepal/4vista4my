'use client';
import React, { useEffect, useState } from 'react';
import { Music, Menu, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

interface NavbarProps {
  onUploadClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onUploadClick }) => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music size={28} className="text-white" />
            <span className="font-bold text-xl tracking-tight">Beats 4 Nepal</span>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link href="#beats" className="hover:text-blue-200 transition-colors">Beats</Link>
            <Link href="/albums" className="hover:text-blue-200 transition-colors">Albums</Link>
            <Link href="/my-profile" className="hover:text-blue-200 transition-colors">My Profile</Link>
            {user ? (
              <>
                <button
                  onClick={onUploadClick}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Upload Beat
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4 animate-fadeIn">
            <Link href="/" className="block hover:text-blue-200 transition-colors">Home</Link>
            <Link href="#beats" className="block hover:text-blue-200 transition-colors">Beats</Link>
            <Link href="/albums" className="block hover:text-blue-200 transition-colors">Albums</Link>
            <Link href="/my-profile" className="block hover:text-blue-200 transition-colors">My Profile</Link>
            {user ? (
              <>
                <button
                  onClick={onUploadClick}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Upload Beat
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="block w-full bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block w-full bg-white text-blue-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
