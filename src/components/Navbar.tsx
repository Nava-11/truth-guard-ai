
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShieldCheck, Settings, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8',
        isScrolled ? 'glass shadow-subtle' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ShieldCheck className="h-8 w-8 text-truth-blue-500" />
          <span className="font-semibold text-xl">TruthGuard</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-truth-blue-500',
                isActive(link.path)
                  ? 'text-truth-blue-500'
                  : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/settings"
            className="glass-button rounded-full p-2 hover:text-truth-blue-500"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden glass-button rounded-full p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-subtle animate-fade-in">
          <div className="py-4 px-6 space-y-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'block text-sm font-medium transition-colors',
                  isActive(link.path)
                    ? 'text-truth-blue-500'
                    : 'text-foreground/80 hover:text-truth-blue-500'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/settings"
              className="flex items-center space-x-2 text-sm font-medium text-foreground/80 hover:text-truth-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
