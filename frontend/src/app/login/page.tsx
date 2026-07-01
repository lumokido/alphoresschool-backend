'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { GraduationCap, Phone, Mail, Lock, ShieldCheck, HelpCircle } from 'lucide-react';

export default function LoginPage() {
  const { login } = useApp();
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'email'>('mobile');
  const [role, setRole] = useState<'student' | 'admin'>('student');

  // Form states
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // OTP triggers
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleSendOtp = () => {
    if (!mobile || mobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpSent(true);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    alert('Mock SMS OTP sent successfully: Enter "1234" to verify.');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (loginMethod === 'mobile') {
      if (!mobile) {
        alert('Please enter your mobile number.');
        return;
      }
      if (!otpSent) {
        alert('Please request an OTP first.');
        return;
      }
      if (otp !== '1234' && otp !== '123456') {
        alert('Invalid OTP. Use the code "1234" for this prototype.');
        return;
      }
      login(mobile, role);
    } else {
      if (!email || !password) {
        alert('Please fill out all fields.');
        return;
      }
      if (email.includes('admin') || role === 'admin') {
        login(email, 'admin');
      } else {
        login(email, 'student');
      }
    }
  };

  const handleQuickLogin = (selectedRole: 'student' | 'admin') => {
    const mockEmail = selectedRole === 'admin' ? 'admin@envibytes.com' : 'rahul.kumar@gmail.com';
    login(mockEmail, selectedRole);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow flex items-center justify-center bg-slate-50 py-16 px-4">
        <div className="w-full max-w-md">
          
          {/* Logo Heading */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/10 mb-3">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 text-sm mt-1">Log in to access your course files and lectures</p>
          </div>

          {/* Quick Sandbox login helper for testing */}
          <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs space-y-2">
            <p className="font-semibold text-blue-800 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Developer Sandbox Access:
            </p>
            <p className="text-blue-700">Quickly toggle profiles to test different views:</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button 
                onClick={() => handleQuickLogin('student')}
                className="bg-white border border-blue-200 text-blue-600 rounded py-1.5 px-2 font-medium hover:bg-blue-100/50 transition-colors"
                id="btn-quick-student"
              >
                Rahul (Student)
              </button>
              <button 
                onClick={() => handleQuickLogin('admin')}
                className="bg-blue-600 text-white rounded py-1.5 px-2 font-medium hover:bg-blue-700 transition-colors"
                id="btn-quick-admin"
              >
                Admin Panel
              </button>
            </div>
          </div>

          <Card className="shadow-md">
            
            {/* Tabs Toggle Header */}
            <div className="grid grid-cols-2 border-b border-slate-100 bg-slate-50/50 rounded-t-xl overflow-hidden">
              <button
                onClick={() => setLoginMethod('mobile')}
                className={`py-3.5 text-center text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  loginMethod === 'mobile'
                    ? 'border-blue-600 bg-white text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
                id="tab-mobile-login"
              >
                <Phone className="h-4 w-4" />
                Mobile + OTP
              </button>
              <button
                onClick={() => setLoginMethod('email')}
                className={`py-3.5 text-center text-xs font-semibold border-b-2 transition-all flex items-center justify-center gap-1.5 ${
                  loginMethod === 'email'
                    ? 'border-blue-600 bg-white text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
                id="tab-email-login"
              >
                <Mail className="h-4 w-4" />
                Email + Password
              </button>
            </div>

            <CardContent className="p-6">
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                {/* ROLE TOGGLE */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Login as</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        role === 'student'
                          ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      id="login-role-student"
                    >
                      Student Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                        role === 'admin'
                          ? 'border-blue-600 bg-blue-50/50 text-blue-600'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      id="login-role-admin"
                    >
                      Admin System
                    </button>
                  </div>
                </div>

                {/* METHOD 1: Mobile login */}
                {loginMethod === 'mobile' ? (
                  <div className="space-y-3.5">
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Mobile Number</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-xs text-slate-400 font-semibold">+91</span>
                        <input
                          type="tel"
                          placeholder="98765 43210"
                          maxLength={10}
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full pl-12 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          id="login-mobile-input"
                        />
                      </div>
                    </div>

                    {otpSent && (
                      <div className="space-y-1.5 animate-scale-up">
                        <div className="flex justify-between items-center">
                          <label className="text-xs font-semibold text-slate-700">One-Time Password (OTP)</label>
                          <span className="text-[10px] text-slate-400">Code is 1234</span>
                        </div>
                        <input
                          type="text"
                          placeholder="Enter 4-digit code"
                          maxLength={4}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                          className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 text-center font-mono letter-spacing-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          id="login-otp-input"
                        />
                      </div>
                    )}

                    <div className="pt-1">
                      {otpSent ? (
                        <div className="flex justify-between items-center text-xs">
                          <button
                            type="button"
                            disabled={timer > 0}
                            onClick={handleSendOtp}
                            className="text-blue-600 hover:text-blue-700 font-semibold disabled:text-slate-400"
                          >
                            Resend Code
                          </button>
                          {timer > 0 && <span className="text-slate-400">Resend in {timer}s</span>}
                        </div>
                      ) : (
                        <Button type="button" variant="outline" fullWidth onClick={handleSendOtp} id="btn-request-otp">
                          Request OTP via SMS
                        </Button>
                      )}
                    </div>

                  </div>
                ) : (
                  
                  // METHOD 2: Email login
                  <div className="space-y-3.5">
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700">Email Address</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        id="login-email-input"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-slate-700">Password</label>
                        <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
                          <HelpCircle className="h-3 w-3" />
                          Forgot?
                        </a>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                          id="login-password-input"
                        />
                      </div>
                    </div>

                  </div>
                )}

                {/* Remember Me Toggle */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/10 h-4 w-4"
                      id="login-remember-checkbox"
                    />
                    Keep me signed in
                  </label>
                </div>

                {/* Submit button */}
                <Button type="submit" fullWidth className="py-2.5 font-bold mt-2" id="login-submit-btn">
                  Log In to Account
                </Button>

              </form>
            </CardContent>

          </Card>

          <p className="text-center text-xs text-slate-500 mt-6">
            Don\'t have an account?{' '}
            <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
              Register Here
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
}
