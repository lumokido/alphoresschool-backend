'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { coursesData } from '@/data/courses';
import { videosData } from '@/data/videos';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { 
  Clock, 
  Award, 
  Globe, 
  BarChart, 
  CheckCircle2, 
  FileDown, 
  ShoppingCart, 
  PlayCircle, 
  ChevronRight, 
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CourseDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { enrolledCourses, enrollInCourse, addToCart } = useApp();
  
  // Find the course
  const course = coursesData.find((c) => c.id === id);
  
  // Sample videos for this course
  const sampleVideos = videosData.filter((v) => v.courseId === id && v.isSample);
  
  // State for showing the video modal
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  if (!course) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-slate-900">Course Not Found</h1>
            <p className="text-slate-500">The course you are looking for does not exist or has been moved.</p>
            <Link href="/">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const isEnrolled = enrolledCourses.includes(course.id);

  const handleBuyClick = () => {
    enrollInCourse(course.id);
    alert(`Thank you! You have successfully enrolled in ${course.title}. Go to your Student Dashboard to start learning!`);
  };

  const handleDownloadSyllabus = () => {
    alert(`Downloading ${course.title} Syllabus PDF...`);
    // Simulated PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', `${course.title}_Syllabus.pdf`);
    document.body.appendChild(link);
    // In a real app we'd trigger a file transfer.
  };

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: Course Details */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Header Info */}
              <div className="space-y-4">
                <Badge variant={course.category === 'job' ? 'primary' : 'warning'} className="text-xs uppercase px-2.5 py-0.5">
                  {course.category === 'job' ? '💼 Job Course' : '🎓 Entrance Exam'}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" id="course-detail-title">
                  {course.title}
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed font-light">
                  {course.description}
                </p>
              </div>

              {/* Learning Outcomes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What you will learn</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Curriculum Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900">Course Curriculum</h2>
                <div className="space-y-3">
                  {course.syllabus.map((module, idx) => {
                    const isExpanded = expandedModule === idx;
                    return (
                      <div key={idx} className="border border-slate-200 bg-white rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleModule(idx)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                        >
                          <span>{module.moduleTitle}</span>
                          {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                        </button>
                        
                        {isExpanded && (
                          <div className="px-5 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50">
                            <ul className="space-y-2.5">
                              {module.topics.map((topic, topicIdx) => (
                                <li key={topicIdx} className="flex items-center gap-2.5 text-sm text-slate-600">
                                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sample Videos */}
              {sampleVideos.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-slate-900">Sample Lectures</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleVideos.map((video) => (
                      <Card key={video.id} className="overflow-hidden hover:border-blue-200">
                        <div 
                          className="relative aspect-video bg-slate-900 flex items-center justify-center cursor-pointer group"
                          onClick={() => setActiveVideoUrl(video.videoUrl)}
                        >
                          <PlayCircle className="h-12 w-12 text-white/90 drop-shadow-md group-hover:scale-110 group-hover:text-blue-500 transition-all duration-200 z-10" />
                          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />
                          {/* Mock thumbnail overlay */}
                          <div className="absolute inset-0 flex flex-col justify-between p-3 text-white">
                            <span className="text-[10px] bg-blue-600/90 text-white self-start px-2 py-0.5 rounded-md font-semibold">
                              FREE SAMPLE
                            </span>
                            <span className="text-xs self-end bg-slate-950/80 px-2 py-0.5 rounded-md font-mono">
                              {video.duration}
                            </span>
                          </div>
                        </div>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-semibold line-clamp-1">{video.title}</CardTitle>
                          <CardDescription className="text-[11px] mt-0.5">Click to watch preview lecture</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT SIDE: Sticky Purchase Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <Card className="shadow-lg border-blue-100 overflow-hidden" id="course-sticky-card">
                
                {/* Visual Top Bar */}
                <div className="h-2 bg-blue-600" />
                
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-slate-900 flex items-baseline gap-2">
                    {course.fee}
                    {course.originalFee && (
                      <span className="text-sm font-medium text-slate-400 line-through">{course.originalFee}</span>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    🎉 Limited time discount applied!
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Course Details checklist */}
                  <div className="space-y-3.5 text-sm border-t border-b border-slate-100 py-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-slate-400" /> Duration
                      </span>
                      <span className="font-semibold text-slate-800">{course.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-slate-400" /> Skill Level
                      </span>
                      <span className="font-semibold text-slate-800">{course.level}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-slate-400" /> Instruction
                      </span>
                      <span className="font-semibold text-slate-800">{course.language}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 flex items-center gap-2">
                        <Award className="h-4 w-4 text-slate-400" /> Certification
                      </span>
                      <span className="font-semibold text-slate-800">{course.hasCertificate ? 'Yes (Verifiable)' : 'Study Prep'}</span>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2 pt-2">
                    {isEnrolled ? (
                      <Link href="/dashboard" className="w-full block">
                        <Button variant="secondary" fullWidth className="text-blue-600 font-bold py-2.5">
                          Already Enrolled - View Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <Button fullWidth className="py-2.5 font-bold" onClick={handleBuyClick} id="btn-buy-course">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy Course Now
                      </Button>
                    )}
                    <Button variant="outline" fullWidth className="py-2.5" onClick={handleDownloadSyllabus} id="btn-download-syllabus">
                      <FileDown className="mr-2 h-4 w-4" />
                      Download Syllabus PDF
                    </Button>
                  </div>
                </CardContent>

              </Card>
            </div>

          </div>

        </div>
      </main>

      {/* Video Modal Player */}
      <Modal
        isOpen={activeVideoUrl !== null}
        onClose={() => setActiveVideoUrl(null)}
        title="Sample Video Lecture Preview"
        size="xl"
      >
        {activeVideoUrl && (
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
            {activeVideoUrl.includes('youtube.com/embed') ? (
              <iframe
                src={activeVideoUrl}
                title="Course Lecture Preview"
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

      <Footer />
    </>
  );
}
