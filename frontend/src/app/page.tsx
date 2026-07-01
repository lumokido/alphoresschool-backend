'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { coursesData, Course } from '@/data/courses';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Cpu, 
  Terminal, 
  Settings, 
  BarChart3, 
  Target, 
  Laptop, 
  BookOpen, 
  Clock, 
  Award, 
  BookDown, 
  Briefcase, 
  Users, 
  PlayCircle,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

// Mapper to dynamically render course icons based on metadata
const getCourseIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cpu':
      return <Cpu className="h-6 w-6 text-blue-600" />;
    case 'Terminal':
      return <Terminal className="h-6 w-6 text-blue-600" />;
    case 'Settings':
      return <Settings className="h-6 w-6 text-blue-600" />;
    case 'BarChart3':
      return <BarChart3 className="h-6 w-6 text-blue-600" />;
    case 'Target':
      return <Target className="h-6 w-6 text-blue-600" />;
    case 'Laptop':
      return <Laptop className="h-6 w-6 text-blue-600" />;
    case 'BookOpen':
      return <BookOpen className="h-6 w-6 text-blue-600" />;
    default:
      return <BookOpen className="h-6 w-6 text-blue-600" />;
  }
};

export default function HomePage() {
  const { enrolledCourses, addToCart, enrollInCourse } = useApp();

  const jobCourses = coursesData.filter((c) => c.category === 'job');
  const entranceCourses = coursesData.filter((c) => c.category === 'entrance');

  const handleEnrollClick = (courseId: string) => {
    // For simplicity, we directly enroll them for demo purposes
    // (In reality this can add to cart or checkout)
    enrollInCourse(courseId);
    alert(`Successfully enrolled in ${coursesData.find(c => c.id === courseId)?.title}!`);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-white py-20 lg:py-24 border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge variant="primary" className="px-3 py-1 text-sm font-medium">
                ⚡ Industry Ready Training Programs
              </Badge>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                Learn Industry Ready Skills & <span className="text-blue-600">Crack Competitive Exams</span>
              </h1>
              
              <p className="text-lg text-slate-600 max-w-2xl font-light leading-relaxed">
                Industry-focused training programs designed to help students build careers in Embedded Systems, Linux Technologies, and Data Analytics, as well as excel in core computer science exams.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="#job-courses">
                  <Button size="lg" className="shadow-lg hover:shadow-blue-500/20">
                    Explore Courses
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/videos">
                  <Button variant="outline" size="lg" className="gap-2">
                    <PlayCircle className="h-5 w-5 text-blue-600" />
                    Watch Demo Videos
                  </Button>
                </Link>
              </div>

              {/* Statistics row */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 max-w-lg">
                <div>
                  <p className="text-2xl font-bold text-slate-900">10,000+</p>
                  <p className="text-xs text-slate-500 font-medium">Students Enrolled</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">95%</p>
                  <p className="text-xs text-slate-500 font-medium">Placement Success</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">4.8 ★</p>
                  <p className="text-xs text-slate-500 font-medium">Course Rating</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image (Premium custom SVG illustration) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-6 shadow-sm">
                <svg className="w-full h-full max-h-[360px]" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background grid dots */}
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#E2E8F0" />
                  </pattern>
                  <rect width="500" height="500" rx="16" fill="url(#grid)" />
                  
                  {/* Laptop Mockup */}
                  <rect x="100" y="180" width="300" height="200" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="8" />
                  <rect x="110" y="190" width="280" height="150" fill="#F8FAFC" />
                  <rect x="70" y="380" width="360" height="12" rx="6" fill="#94A3B8" />
                  <rect x="220" y="380" width="60" height="6" fill="#64748B" />

                  {/* Code editor in Laptop screen */}
                  <rect x="120" y="200" width="260" height="130" rx="6" fill="#1E293B" />
                  <circle cx="135" cy="212" r="4" fill="#EF4444" />
                  <circle cx="147" cy="212" r="4" fill="#F59E0B" />
                  <circle cx="159" cy="212" r="4" fill="#10B981" />
                  <rect x="130" y="230" width="80" height="6" rx="3" fill="#38BDF8" />
                  <rect x="130" y="242" width="140" height="6" rx="3" fill="#E2E8F0" />
                  <rect x="150" y="254" width="100" height="6" rx="3" fill="#A78BFA" />
                  <rect x="150" y="266" width="60" height="6" rx="3" fill="#F472B6" />
                  <rect x="130" y="278" width="180" height="6" rx="3" fill="#38BDF8" />
                  <rect x="130" y="290" width="90" height="6" rx="3" fill="#10B981" />
                  
                  {/* Floating Analytics Card */}
                  <g className="animate-bounce" style={{ animationDuration: '6s' }}>
                    <rect x="300" y="60" width="160" height="110" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.05))" />
                    <rect x="320" y="80" width="50" height="8" rx="4" fill="#94A3B8" />
                    <rect x="320" y="94" width="90" height="12" rx="6" fill="#2563EB" />
                    {/* Bar Chart inside floating card */}
                    <rect x="320" y="125" width="12" height="25" rx="2" fill="#93C5FD" />
                    <rect x="340" y="115" width="12" height="35" rx="2" fill="#3B82F6" />
                    <rect x="360" y="130" width="12" height="20" rx="2" fill="#93C5FD" />
                    <rect x="380" y="110" width="12" height="40" rx="2" fill="#1D4ED8" />
                    <circle cx="420" cy="100" r="16" fill="#EFF6FF" />
                    <path d="M415 100L425 100M420 95L420 105" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
                  </g>

                  {/* Floating Microchip Card */}
                  <g className="animate-bounce" style={{ animationDuration: '4s' }}>
                    <rect x="40" y="80" width="140" height="80" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.05))" />
                    <circle cx="80" cy="120" r="20" fill="#EFF6FF" />
                    {/* Chip Graphic */}
                    <rect x="70" y="110" width="20" height="20" rx="4" fill="#2563EB" />
                    <rect x="66" y="114" width="4" height="2" fill="#2563EB" />
                    <rect x="66" y="124" width="4" height="2" fill="#2563EB" />
                    <rect x="90" y="114" width="4" height="2" fill="#2563EB" />
                    <rect x="90" y="124" width="4" height="2" fill="#2563EB" />
                    <rect x="74" y="106" width="2" height="4" fill="#2563EB" />
                    <rect x="84" y="106" width="2" height="4" fill="#2563EB" />
                    <rect x="74" y="130" width="2" height="4" fill="#2563EB" />
                    <rect x="84" y="130" width="2" height="4" fill="#2563EB" />
                    <rect x="115" y="105" width="30" height="8" rx="4" fill="#94A3B8" />
                    <rect x="115" y="120" width="45" height="6" rx="3" fill="#E2E8F0" />
                  </g>

                  {/* Linux Penguin Circle */}
                  <circle cx="250" cy="100" r="36" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
                  <path d="M250 82C241 82 236 88 236 96C236 98 238 103 241 106C240 108 238 111 234 112C241 114 246 110 248 107C249 107 250 107 250 107C250 107 251 107 252 107C254 110 259 114 266 112C262 111 260 108 259 106C262 103 264 98 264 96C264 88 259 82 250 82Z" fill="#1E293B" />
                  <ellipse cx="244" cy="94" rx="3" ry="4" fill="#FFFFFF" />
                  <ellipse cx="256" cy="94" rx="3" ry="4" fill="#FFFFFF" />
                  <circle cx="244" cy="94" r="1.5" fill="#000000" />
                  <circle cx="256" cy="94" r="1.5" fill="#000000" />
                  <path d="M246 98Q250 102 254 98Z" fill="#F59E0B" />
                </svg>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURED JOB COURSES SECTION */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-16" id="job-courses">
          <div className="text-center space-y-3 mb-16">
            <Badge variant="primary" className="px-3 py-0.5 text-xs font-semibold uppercase tracking-wider">
              Career Acceleration
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Job Ready Courses
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Master hands-on systems level engineering and analytics skills that are in high demand in companies worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {jobCourses.map((course) => {
              const isEnrolled = enrolledCourses.includes(course.id);
              return (
                <Card key={course.id} className="flex flex-col h-full group hover:border-blue-200" id={`course-card-${course.id}`}>
                  <CardHeader className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                      {getCourseIcon(course.iconName)}
                    </div>
                    <div className="absolute top-6 right-6">
                      <Badge variant="info">{course.level}</Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-3 mt-2 min-h-[60px] text-xs">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{course.duration}</span>
                      <span className="text-slate-300">|</span>
                      <Award className="h-4 w-4 text-slate-400" />
                      <span>{course.hasCertificate ? 'Certificate Offered' : 'Training'}</span>
                    </div>
                    
                    <div className="border-t border-slate-100 pt-4 flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-slate-900">{course.fee}</span>
                      {course.originalFee && (
                        <span className="text-sm text-slate-400 line-through">{course.originalFee}</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="grid grid-cols-2 gap-2 border-t border-slate-50 bg-slate-50/50 rounded-b-xl">
                    <Link href={`/courses/${course.id}`} className="w-full">
                      <Button variant="outline" size="sm" className="w-full" id={`btn-syllabus-${course.id}`}>
                        Syllabus
                      </Button>
                    </Link>
                    {isEnrolled ? (
                      <Link href="/dashboard" className="w-full">
                        <Button variant="secondary" size="sm" className="w-full text-blue-600 font-semibold">
                          View
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        size="sm" 
                        className="w-full" 
                        onClick={() => handleEnrollClick(course.id)}
                        id={`btn-enroll-${course.id}`}
                      >
                        Enroll
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>

        {/* FEATURED ENTRANCE COURSES SECTION */}
        <section className="py-20 bg-white border-t border-b border-slate-200/50 scroll-mt-16" id="entrance-courses">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-3 mb-16">
              <Badge variant="warning" className="px-3 py-0.5 text-xs font-semibold uppercase tracking-wider">
                Exam Prep
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Premium Entrance Prep Courses
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Accelerate your theoretical understanding of core computer science topics to secure top rankings in exams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {entranceCourses.map((course) => {
                const isEnrolled = enrolledCourses.includes(course.id);
                return (
                  <Card key={course.id} className="flex flex-col h-full hover:border-blue-200 group" id={`course-card-${course.id}`}>
                    <CardHeader className="pb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                        {getCourseIcon(course.iconName)}
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">{course.title}</CardTitle>
                      <CardDescription className="mt-2 text-xs line-clamp-3 min-h-[50px]">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-3 pb-6">
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {course.duration}
                        </span>
                        <span className="text-slate-300">|</span>
                        <span>{course.language}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-baseline gap-2">
                        <span className="text-xl font-bold text-slate-900">{course.fee}</span>
                        {course.originalFee && (
                          <span className="text-xs text-slate-400 line-through">{course.originalFee}</span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="grid grid-cols-2 gap-2 border-t border-slate-50 bg-slate-50/50 rounded-b-xl">
                      <Link href={`/courses/${course.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full" id={`btn-syllabus-${course.id}`}>
                          Syllabus
                        </Button>
                      </Link>
                      {isEnrolled ? (
                        <Link href="/dashboard" className="w-full">
                          <Button variant="secondary" size="sm" className="w-full text-blue-600 font-semibold">
                            View
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          size="sm" 
                          className="w-full" 
                          onClick={() => handleEnrollClick(course.id)}
                          id={`btn-enroll-${course.id}`}
                        >
                          Enroll
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE ENVIBYTES SECTION */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <Badge variant="success" className="px-3 py-0.5 text-xs font-semibold uppercase tracking-wider">
              Our Value
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Why Students Choose EnviBytes
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              We focus on delivering high-quality, practical learning content that prepares students for careers and exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="flex gap-4 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">Industry Experts</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Learn directly from senior firmware engineers, hardware system architects, and university professors.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">Practical Learning</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Focus on programming actual development boards, compilation, device drivers debugging, and query analysis.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <PlayCircle className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">Recorded Sessions</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Access crystal-clear, high-definition lectures anytime, anywhere with lifetime replay privileges.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BookDown className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">Downloadable Notes</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Get structural PDF syllabus cards, cheat sheets, solve previous papers, and device tree manuals.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Award className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">Certification</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Earn verifiable, industry-recognized certificates of completion to highlight on your resume and LinkedIn.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-slate-900">Placement Guidance</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Receive resume reviews, mock interviews, portfolio creation tips, and direct referrals to top tech companies.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
