'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { GraduationCap, Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useApp();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Job Courses', href: '/#job-courses' },
    { name: 'Entrance Courses', href: '/#entrance-courses' },
    { name: 'Videos', href: '/videos' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Documents', href: '/documents' },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) {
      return false; // Let anchors be handled naturally
    }
    return pathname === href;
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group" id="nav-logo">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white transition-all group-hover:scale-105 shadow-sm shadow-blue-500/20">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Envi<span className="text-blue-600">Bytes</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                isActive(link.href) ? 'text-blue-600 font-semibold' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                href={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                id="nav-dashboard-btn"
              >
                <LayoutDashboard className="h-4 w-4 text-blue-600" />
                <span>Dashboard</span>
              </Link>
              <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-800 leading-tight max-w-[80px] truncate">{user.name}</span>
                  <span className="text-[10px] text-slate-500 capitalize leading-none">{user.role}</span>
                </div>
                <button
                  onClick={logout}
                  className="rounded-lg p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all ml-1"
                  title="Logout"
                  id="nav-logout-btn"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                id="nav-login-btn"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-all hover:shadow-blue-500/10 active:scale-[0.98]"
                id="nav-register-btn"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 md:hidden transition-colors"
          aria-label="Toggle menu"
          id="nav-mobile-toggle"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md absolute top-16 left-0 w-full shadow-lg transition-all duration-200">
          <div className="space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="border-t border-slate-100 pt-4 mt-4 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.emailOrMobile}</p>
                    </div>
                  </div>
                  <Link
                    href={user.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={handleLinkClick}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="h-4 w-4 text-blue-600" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLinkClick();
                      logout();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center rounded-lg border border-slate-200 px-4 py-2.5 text-center text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
