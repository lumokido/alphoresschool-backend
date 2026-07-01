'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  GraduationCap, 
  Smartphone, 
  Mail, 
  User, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  ArrowLeft 
} from 'lucide-react';

export default function RegisterPage() {
  const { registerUser } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [contactVal, setContactVal] = useState('');
  const [otpVal, setOtpVal] = useState('');
  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('');
  const [city, setCity] = useState('');
  const [interestedCourse, setInterestedCourse] = useState('Embedded Systems');

  // Helper States
  const [timer, setTimer] = useState(0);

  const startOtpTimer = () => {
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
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactVal) {
      alert('Please enter your Mobile number or Email address.');
      return;
    }
    
    // Check basic length/regex
    const isEmail = contactVal.includes('@');
    const isMobile = /^[0-9]{10}$/.test(contactVal);
    
    if (!isEmail && !isMobile) {
      alert('Please enter a valid 10-digit mobile number or valid email address.');
      return;
    }

    startOtpTimer();
    alert(`Mock OTP sent to: ${contactVal}. Use code "1234" to confirm.`);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpVal !== '1234' && otpVal !== '123456') {
      alert('Invalid OTP. Please enter code "1234" for this prototype.');
      return;
    }
    setStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !qualification || !city || !interestedCourse) {
      alert('Please fill out all student details.');
      return;
    }

    // Call context to register user and redirect
    registerUser({
      name,
      emailOrMobile: contactVal,
      qualification,
      city,
      interestedCourse
    });

    setStep(4);
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
            <h1 className="text-2xl font-bold text-slate-900">Create your Account</h1>
            <p className="text-slate-500 text-sm mt-1">Enroll in courses and download class notes</p>
          </div>

          {/* Stepper Wizard Progress bar */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className={`h-1.5 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`h-1.5 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`h-1.5 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`h-1.5 rounded-full ${step >= 4 ? 'bg-blue-600' : 'bg-slate-200'}`} />
          </div>

          <Card className="shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {step === 1 && 'Step 1: Contact Details'}
                  {step === 2 && 'Step 2: OTP Verification'}
                  {step === 3 && 'Step 3: Student Details'}
                  {step === 4 && 'Step 4: Success!'}
                </CardTitle>
                <Badge variant="primary" className="text-[10px]">
                  Step {step} of 4
                </Badge>
              </div>
              <CardDescription className="text-xs">
                {step === 1 && 'Enter your mobile number or email to receive a verification pin.'}
                {step === 2 && 'We have sent a verification code. Enter it below to confirm.'}
                {step === 3 && 'Help us customize your workspace by providing your academic focus.'}
                {step === 4 && 'Registration has been successfully completed.'}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6 pt-0">
              
              {/* STEP 1: CONTACT */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Mobile or Email</label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Email address or 10-digit mobile"
                        value={contactVal}
                        onChange={(e) => setContactVal(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        id="reg-contact-input"
                      />
                    </div>
                  </div>
                  <Button type="submit" fullWidth className="py-2.5 font-bold mt-2" id="reg-step1-btn">
                    Get Verification Code
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </form>
              )}

              {/* STEP 2: VERIFICATION */}
              {step === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-700">One-Time Password (OTP)</label>
                      <span className="text-[10px] text-slate-400">Sandbox Code: 1234</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Enter 4-digit code"
                      maxLength={4}
                      value={otpVal}
                      onChange={(e) => setOtpVal(e.target.value.replace(/[^0-9]/g, ''))}
                      className="w-full px-4 py-2 text-sm rounded-lg border border-slate-200 text-center font-mono letter-spacing-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      id="reg-otp-input"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs pb-1">
                    <button
                      type="button"
                      disabled={timer > 0}
                      onClick={() => { startOtpTimer(); alert('OTP resent: Code is "1234"'); }}
                      className="text-blue-600 hover:text-blue-700 font-semibold disabled:text-slate-400"
                    >
                      Resend Code
                    </button>
                    {timer > 0 && <span className="text-slate-400">Resend in {timer}s</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="font-bold" id="reg-step2-btn">
                      Verify OTP
                    </Button>
                  </div>
                </form>
              )}

              {/* STEP 3: STUDENT DETAILS */}
              {step === 3 && (
                <form onSubmit={handleStep3Submit} className="space-y-4">
                  
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        id="reg-name-input"
                      />
                    </div>
                  </div>

                  {/* Qualification */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Qualification</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="B.Tech ECE / BCA / MCA"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        id="reg-qual-input"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">City</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Bangalore / Hyderabad / Noida"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        id="reg-city-input"
                      />
                    </div>
                  </div>

                  {/* Interested Course */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Interested Course</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
                      <select
                        value={interestedCourse}
                        onChange={(e) => setInterestedCourse(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        id="reg-course-select"
                      >
                        <option value="Embedded Systems">Embedded Systems (Job)</option>
                        <option value="Linux Kernel">Linux Kernel (Job)</option>
                        <option value="Linux Device Drivers">Linux Device Drivers (Job)</option>
                        <option value="Data Analytics">Data Analytics (Job)</option>
                        <option value="GATE">GATE CS & IT (Prep)</option>
                        <option value="CSIT">CSIT Entrance (Prep)</option>
                        <option value="ADS">Algorithms & DS (Prep)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="mr-1.5 h-4 w-4" />
                      Back
                    </Button>
                    <Button type="submit" className="font-bold" id="reg-step3-btn">
                      Finish Registration
                    </Button>
                  </div>
                </form>
              )}

              {/* STEP 4: SUCCESS */}
              {step === 4 && (
                <div className="text-center py-6 space-y-4 animate-scale-up">
                  <div className="flex justify-center">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500 drop-shadow-md" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Success! Welcome aboard</h3>
                    <p className="text-slate-500 text-xs mt-1.5 max-w-xs mx-auto leading-relaxed">
                      Your EnviBytes student account is active. You have been enrolled in your course of interest!
                    </p>
                  </div>
                  <Link href="/dashboard" className="block pt-2">
                    <Button fullWidth className="font-bold py-2.5">
                      Go to Student Dashboard
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}

            </CardContent>
          </Card>

          <p className="text-center text-xs text-slate-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Log In
            </Link>
          </p>

        </div>
      </main>

      <Footer />
    </>
  );
}
