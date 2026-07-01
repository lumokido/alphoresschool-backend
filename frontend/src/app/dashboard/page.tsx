'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { coursesData, Course } from '@/data/courses';
import { videosData, Video } from '@/data/videos';
import { documentsData, DocumentItem } from '@/data/documents';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Video as VideoIcon, 
  FileText, 
  Award, 
  User, 
  LogOut,
  ChevronRight,
  Clock,
  PlayCircle,
  Download,
  CheckCircle,
  Menu,
  X,
  Sparkles,
  BookMarked
} from 'lucide-react';

export default function StudentDashboardPage() {
  const router = useRouter();
  const { 
    user, 
    logout, 
    enrolledCourses, 
    courseProgress, 
    completedTopics, 
    certificates, 
    toggleTopicCompletion,
    downloadedDocs,
    downloadDocument 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'courses' | 'videos' | 'documents' | 'certificates' | 'profile'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  
  // Dynamic detail panels
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Profile forms
  const [profileName, setProfileName] = useState('');
  const [profileQual, setProfileQual] = useState('');
  const [profileCity, setProfileCity] = useState('');

  useEffect(() => {
    // Hydrate form states once user is loaded
    if (user) {
      setProfileName(user.name);
      setProfileQual(user.qualification || '');
      setProfileCity(user.city || '');
    }
  }, [user]);

  // Protect route
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-6 space-y-4">
          <GraduationCap className="h-12 w-12 text-blue-600 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900">Access Denied</h2>
          <p className="text-sm text-slate-500">Please sign in to view your LMS student dashboard workspace.</p>
          <Link href="/login">
            <Button className="w-full">Redirect to Login</Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Derived datasets
  const studentCourses = coursesData.filter((c) => enrolledCourses.includes(c.id));
  const studentVideos = videosData.filter((v) => enrolledCourses.includes(v.courseId));
  const studentDownloads = documentsData.filter((d) => downloadedDocs.includes(d.id));

  // Compute overall average completion progress
  const averageProgress = studentCourses.length > 0
    ? Math.round(studentCourses.reduce((acc, c) => acc + (courseProgress[c.id] || 0), 0) / studentCourses.length)
    : 0;

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Simulated Save: Profile parameters updated successfully!');
  };

  const triggerCertificatePrint = (courseTitle: string) => {
    alert(`Generating verifiable PDF credential for ${user.name} in "${courseTitle}"...`);
    // Create printable window or simulated template
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>EnviBytes Credential ID</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              body { font-family: 'Georgia', serif; background-color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .cert { border: 12px double #1e3a8a; background-color: white; padding: 60px; max-width: 800px; width: 100%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); border-radius: 8px; text-align: center; }
            </style>
          </head>
          <body>
            <div class="cert relative">
              <div class="absolute top-8 left-8 text-blue-900 font-sans font-extrabold tracking-wider text-sm flex items-center gap-1">
                ENVIBYTES ACADEMY
              </div>
              <h1 class="text-4xl font-extrabold text-blue-950 mt-12 mb-6">CERTIFICATE OF COMPLETION</h1>
              <p class="text-sm text-slate-500 italic mb-8">This document is proudly presented to</p>
              <h2 class="text-3xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 inline-block px-10 mb-8">${user.name}</h2>
              <p class="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-10">
                for successfully achieving master curriculum requirements, exercises, and exams for the course
              </p>
              <h3 class="text-2xl font-bold text-blue-800 uppercase tracking-wide mb-12">"${courseTitle}"</h3>
              <div class="flex justify-between items-center border-t border-slate-100 pt-8 mt-12 px-6">
                <div class="text-left">
                  <p class="text-xs text-slate-400 font-sans">Verification ID</p>
                  <p class="text-xs font-mono text-slate-600">EB-CRED-${Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
                <div class="text-right">
                  <p class="text-xs text-slate-400 font-sans">Signed By</p>
                  <p class="text-xs font-bold text-slate-800 font-sans italic">Academic Dean, EnviBytes</p>
                </div>
              </div>
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleDownloadDoc = (doc: DocumentItem) => {
    downloadDocument(doc.id);
    alert(`Downloading ${doc.fileName}...`);
  };

  // Sidebar Menu Configurations
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: 'courses', name: 'My Courses', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'videos', name: 'Lectures', icon: <VideoIcon className="h-5 w-5" /> },
    { id: 'documents', name: 'Study Library', icon: <FileText className="h-5 w-5" /> },
    { id: 'certificates', name: 'Credentials', icon: <Award className="h-5 w-5" /> },
    { id: 'profile', name: 'Profile Settings', icon: <User className="h-5 w-5" /> },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row" id="dashboard-wrapper">
      
      {/* MOBILE HEADER BAR */}
      <div className="md:hidden bg-slate-900 text-white flex justify-between items-center px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-blue-400" />
          <span className="font-bold">EnviBytes LMS</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-lg border border-slate-700">
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* LEFT SIDEBAR PANEL */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 flex flex-col transform transition-transform duration-200 md:relative md:transform-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Brand Banner */}
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-800 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-white font-bold tracking-wider text-base">EnviBytes</span>
          <Badge variant="primary" className="text-[9px] bg-slate-800 border-none text-blue-400 uppercase py-0.5">STUDENT</Badge>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-white truncate">{user.name}</span>
              <span className="text-[10px] text-slate-400 truncate">{user.emailOrMobile}</span>
            </div>
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSelectedCourseId(null);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10 font-semibold'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
              id={`sidebar-${item.id}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Logout at bottom */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-950/40 hover:text-red-400 transition-colors"
            id="sidebar-logout"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout Workspace</span>
          </button>
        </div>
      </aside>

      {/* RIGHT WORKSPACE AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* TOP DASHBOARD BAR */}
        <header className="hidden md:flex h-16 items-center justify-between px-8 bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
          <h2 className="font-bold text-slate-800 capitalize text-lg">
            {activeTab === 'dashboard' ? 'Overview' : activeTab.replace(/([A-Z])/g, ' $1')}
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Academic Year: 2026</span>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-xs font-semibold text-slate-700 bg-slate-100 rounded px-2.5 py-1">
              🏫 {user.qualification || 'Student'}
            </span>
          </div>
        </header>

        {/* TAB CONTENTS CONTAINER */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto">

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Welcome Alert */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user.name}! 👋</h1>
                  <p className="text-slate-500 text-sm font-light">Here is a quick snapshot of your active course modules, progress levels, and study records.</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link href="/videos">
                    <Button variant="outline" size="sm">Browse Library</Button>
                  </Link>
                  <button onClick={() => setActiveTab('courses')} className="bg-blue-600 text-white rounded-lg px-4 py-2 text-xs font-medium hover:bg-blue-700 transition-colors shadow shadow-blue-500/10">
                    Resume Studies
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">My Courses</p>
                      <h4 className="text-3xl font-bold text-slate-900">{studentCourses.length}</h4>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <BookOpen className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Avg Progress</p>
                      <h4 className="text-3xl font-bold text-slate-900">{averageProgress}%</h4>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Study Notes</p>
                      <h4 className="text-3xl font-bold text-slate-900">{studentDownloads.length}</h4>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <FileText className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Credentials</p>
                      <h4 className="text-3xl font-bold text-slate-900">{certificates.length}</h4>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Award className="h-6 w-6" />
                    </div>
                  </CardContent>
                </Card>

              </div>

              {/* Course Progress Section */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800">Your Current Progression</h3>
                {studentCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {studentCourses.map((course) => {
                      const pct = courseProgress[course.id] || 0;
                      return (
                        <Card key={course.id} className="hover:shadow-sm">
                          <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                            <div>
                              <CardTitle className="text-base font-bold">{course.title}</CardTitle>
                              <CardDescription className="text-[11px] mt-0.5">{course.duration} Program</CardDescription>
                            </div>
                            <Badge variant={pct === 100 ? 'success' : 'primary'} className="text-[10px]">
                              {pct === 100 ? 'Complete' : `${pct}% Done`}
                            </Badge>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Custom progress slider */}
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                            </div>
                            
                            <div className="flex justify-between items-center text-xs pt-1">
                              <span className="text-slate-500">
                                {completedTopics[course.id]?.length || 0} of {course.syllabus.reduce((acc, m) => acc + m.topics.length, 0)} modules completed
                              </span>
                              <button 
                                onClick={() => { setSelectedCourseId(course.id); setActiveTab('courses'); }}
                                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5"
                              >
                                View curriculum <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-4">
                    <BookMarked className="h-10 w-10 text-slate-300 mx-auto" />
                    <h4 className="font-semibold text-slate-700">No Enrolled Courses</h4>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto">Explore our premium catalog to purchase and begin learning skills.</p>
                    <Link href="/">
                      <Button size="sm">Explore Classes</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Lower split grids */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Recent Lectures */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800">Quick Lecture Streaming</h3>
                  <Card className="divide-y divide-slate-100">
                    {studentVideos.length > 0 ? (
                      studentVideos.slice(0, 3).map((video) => (
                        <div key={video.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <div 
                              className="h-10 w-10 shrink-0 bg-slate-900 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                              onClick={() => setActiveVideoUrl(video.videoUrl)}
                            >
                              <PlayCircle className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-slate-800 truncate">{video.title}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 truncate">{video.courseTitle}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">{video.duration}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500">No active video schedules. Buy a course to populate lectures.</div>
                    )}
                  </Card>
                </div>

                {/* Downloaded Notes */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800">Downloaded Notes</h3>
                  <Card className="divide-y divide-slate-100">
                    {studentDownloads.length > 0 ? (
                      studentDownloads.slice(0, 3).map((doc) => (
                        <div key={doc.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-slate-800 truncate">{doc.title}</p>
                              <p className="text-[10px] text-slate-400 mt-0.5 truncate">{doc.fileName}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDownloadDoc(doc)}
                            className="p-1 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors shrink-0"
                            title="Re-download file"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No downloads recorded. Visit the{' '}
                        <button onClick={() => setActiveTab('documents')} className="text-blue-600 hover:underline font-semibold">
                          Study Library
                        </button>{' '}
                        to download PDFs.
                      </div>
                    )}
                  </Card>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MY COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              
              {/* Course Detail Overlay Panel */}
              {selectedCourseId ? (
                <div className="space-y-6">
                  
                  {/* Panel Header */}
                  <button 
                    onClick={() => setSelectedCourseId(null)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    ← Back to My Course list
                  </button>

                  {(() => {
                    const selCourse = studentCourses.find(c => c.id === selectedCourseId);
                    if (!selCourse) return null;
                    const countCompleted = completedTopics[selCourse.id]?.length || 0;
                    const totalTopics = selCourse.syllabus.reduce((acc, m) => acc + m.topics.length, 0);
                    
                    return (
                      <Card className="p-6 space-y-6">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-lg font-bold text-slate-900">{selCourse.title} Curriculum</h3>
                            <p className="text-slate-500 text-xs mt-1">Check topics as you finish study files or lectures to trace your score progress.</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={countCompleted === totalTopics ? 'success' : 'primary'}>
                              {countCompleted === totalTopics ? 'Graduated' : `${courseProgress[selCourse.id] || 0}% Complete`}
                            </Badge>
                          </div>
                        </div>

                        {/* Topics checklist */}
                        <div className="space-y-6 divide-y divide-slate-100">
                          {selCourse.syllabus.map((mod, idx) => (
                            <div key={idx} className="pt-4 first:pt-0 space-y-3">
                              <h4 className="text-sm font-bold text-slate-800">{mod.moduleTitle}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {mod.topics.map((topic, topicIdx) => {
                                  const checked = (completedTopics[selCourse.id] || []).includes(topic);
                                  return (
                                    <label 
                                      key={topicIdx} 
                                      className={`flex items-center gap-3 p-3 rounded-lg border text-xs cursor-pointer select-none transition-all ${
                                        checked 
                                          ? 'border-emerald-200 bg-emerald-50/20 text-slate-800' 
                                          : 'border-slate-200 hover:bg-slate-50'
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleTopicCompletion(selCourse.id, topic, totalTopics)}
                                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/10 h-4.5 w-4.5"
                                      />
                                      <span className={checked ? 'line-through text-slate-400 font-medium' : 'font-medium'}>
                                        {topic}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    );
                  })()}

                </div>
              ) : (
                
                // MAIN COURSES GRID LIST
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800">Your Enrolled Training Curriculums</h3>
                  {studentCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {studentCourses.map((course) => {
                        const pct = courseProgress[course.id] || 0;
                        return (
                          <Card key={course.id} className="hover:border-blue-200 group">
                            <CardHeader className="pb-3">
                              <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                              <p className="text-xs text-slate-400 mt-1">{course.level} Level Program</p>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex justify-between text-xs text-slate-500 font-medium">
                                <span>Completion</span>
                                <span>{pct}%</span>
                              </div>
                              <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-blue-600 h-full rounded-full transition-all duration-300" style={{ width: `${pct}%` }} />
                              </div>
                              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                                <span className="text-[10px] text-slate-400 font-mono">Duration: {course.duration}</span>
                                <Button 
                                  size="sm" 
                                  onClick={() => setSelectedCourseId(course.id)}
                                  id={`btn-resume-${course.id}`}
                                >
                                  Open Modules
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                      <p className="text-slate-500 text-sm">No courses recorded. Enroll on the Home catalog first.</p>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 3: VIDEOS LECTURES */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-800">Available Class Lecture Streams</h3>
              {studentVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {studentVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:border-blue-200">
                      <div 
                        className="relative aspect-video bg-slate-900 flex items-center justify-center cursor-pointer group"
                        onClick={() => setActiveVideoUrl(video.videoUrl)}
                      >
                        <PlayCircle className="h-10 w-10 text-white/90 group-hover:scale-110 group-hover:text-blue-500 transition-transform duration-200 z-10" />
                        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />
                        <div className="absolute top-3 left-3 z-10">
                          <Badge variant="primary" className="text-[9px] font-semibold bg-slate-950/80 border-none text-blue-400 py-0 px-2 uppercase">
                            {video.subCategory}
                          </Badge>
                        </div>
                        <span className="absolute bottom-3 right-3 z-10 text-[9px] font-mono bg-slate-950/80 px-2 py-0.5 rounded text-slate-300">
                          {video.duration}
                        </span>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="text-xs font-bold line-clamp-2">{video.title}</CardTitle>
                        <CardDescription className="text-[10px] mt-1">Course: {video.courseTitle}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-sm text-slate-500">
                  No video lectures unlocked. Join courses to fetch streaming cards.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: STUDY LIBRARY DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-800">Your Technical Study Materials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentsData.map((doc) => {
                  const wasDownloaded = downloadedDocs.includes(doc.id);
                  return (
                    <Card key={doc.id} className="flex justify-between items-center p-5 gap-4 hover:border-blue-200">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="h-10 w-10 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-semibold text-slate-800 truncate" id={`doc-title-${doc.id}`}>{doc.title}</span>
                            {wasDownloaded && <Badge variant="success" className="text-[9px] py-0 px-1.5 shrink-0">Saved</Badge>}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 truncate">{doc.description}</p>
                          <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{doc.fileSize} • {doc.fileName}</span>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant={wasDownloaded ? 'secondary' : 'primary'}
                        onClick={() => handleDownloadDoc(doc)}
                        className="shrink-0"
                        id={`btn-dash-download-${doc.id}`}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: CERTIFICATES CREDENTIALS */}
          {activeTab === 'certificates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <h3 className="text-base font-bold text-slate-800">Earned Credentials</h3>
                <span className="text-xs text-slate-400 font-medium">Verify credentials on blockchain</span>
              </div>
              
              {certificates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {certificates.map((courseId) => {
                    const matched = coursesData.find((c) => c.id === courseId);
                    if (!matched) return null;
                    return (
                      <Card key={courseId} className="border-amber-100 overflow-hidden relative group">
                        {/* Dynamic background badge decorator */}
                        <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
                          <Award className="h-32 w-32 text-amber-500" />
                        </div>
                        
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2 mb-2 text-amber-600">
                            <Award className="h-5 w-5" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Verifiable Credential</span>
                          </div>
                          <CardTitle className="text-base font-bold">{matched.title}</CardTitle>
                          <CardDescription className="text-[10px]">Successfully completed all curriculum modules.</CardDescription>
                        </CardHeader>

                        <CardContent className="pb-4 space-y-4">
                          <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100">
                            <span className="font-mono text-slate-400">ID: EB-CRED-{Math.floor(100000 + Math.random() * 900000)}</span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs gap-1 border-amber-200 text-amber-700 hover:bg-amber-50"
                              onClick={() => triggerCertificatePrint(matched.title)}
                              id={`btn-print-${courseId}`}
                            >
                              <Download className="h-3.5 w-3.5" /> Print PDF
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-10 text-center space-y-4">
                  <Award className="h-12 w-12 text-slate-300 mx-auto" />
                  <h4 className="font-semibold text-slate-700">No Credentials Yet</h4>
                  <p className="text-slate-500 text-xs max-w-xs mx-auto">
                    Complete 100% of any enrolled course curriculum topic-checklist to automatically issue your certificate!
                  </p>
                  <button onClick={() => setActiveTab('courses')} className="text-xs font-semibold text-blue-600 hover:underline">
                    Check Syllabus Progression →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: PROFILE SETTINGS */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold">Profile Details</CardTitle>
                  <CardDescription className="text-xs">Update your academic parameters or regional metrics.</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Name</label>
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Email / Mobile</label>
                        <input
                          type="text"
                          disabled
                          value={user.emailOrMobile}
                          className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">Highest Qualification</label>
                        <input
                          type="text"
                          value={profileQual}
                          onChange={(e) => setProfileQual(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700">City</label>
                        <input
                          type="text"
                          value={profileCity}
                          onChange={(e) => setProfileCity(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <Button type="submit" size="sm" className="font-semibold px-6 pt-2">
                      Save Changes
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </div>
          )}

        </div>

      </main>

      {/* Video Modal Player inside Dashboard */}
      <Modal
        isOpen={activeVideoUrl !== null}
        onClose={() => setActiveVideoUrl(null)}
        title="Streaming Lecture Preview"
        size="xl"
      >
        {activeVideoUrl && (
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
            {activeVideoUrl.includes('youtube.com/embed') ? (
              <iframe
                src={activeVideoUrl}
                title="Streaming Lecture Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-6 text-center space-y-4">
                <PlayCircle className="h-16 w-16 text-blue-600 animate-pulse" />
                <div>
                  <h4 className="font-bold text-white text-lg">Streaming Simulated Video Feed</h4>
                  <p className="text-sm text-slate-500 mt-1">Connecting to EnviBytes Content Delivery Network (CDN)...</p>
                </div>
                <Button size="sm" onClick={() => alert('Simulated video playing...')}>
                  Start Playback
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
}
