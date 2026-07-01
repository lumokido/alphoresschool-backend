'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { videosData, Video } from '@/data/videos';
import { coursesData } from '@/data/courses';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { PlayCircle, Clock, ShoppingCart, Film, Sparkles, Eye, Search, Filter } from 'lucide-react';

export default function VideosPage() {
  const { enrolledCourses, enrollInCourse } = useApp();
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);

  // Group videos into categories
  const jobCategories = ['Embedded Systems', 'Linux Kernel', 'Linux Device Drivers', 'Data Analytics'];
  const entranceCategories = ['GATE', 'CSIT', 'ADS'];

  // Filter video list based on selection and search query
  const filteredVideos = videosData.filter((video) => {
    const matchesSubCategory = selectedSubCategory === 'All' || video.subCategory === selectedSubCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          video.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubCategory && matchesSearch;
  });

  const handleBuyCourse = (courseId: string, courseTitle: string) => {
    if (enrolledCourses.includes(courseId)) {
      alert(`You are already enrolled in ${courseTitle}!`);
    } else {
      enrollInCourse(courseId);
      alert(`Successfully enrolled in ${courseTitle}! Check your dashboard to begin.`);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-900 text-slate-100 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800 mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-400">
                <Film className="h-5 w-5" />
                <span className="text-sm font-semibold tracking-wider uppercase">Video Library</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl" id="videos-header-title">
                Netflix for Engineering
              </h1>
              <p className="text-slate-400 max-w-2xl text-sm font-light">
                Browse our premium high-definition simulated video lecture shelf, play free sample clips, or enroll to unlock whole schedules.
              </p>
            </div>
            
            {/* Search Input */}
            <div className="relative max-w-md w-full shrink-0">
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search lectures, topics, courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-sm transition-all"
                id="video-search-input"
              />
            </div>
          </div>

          {/* Categories Pill Navigation */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-800/50">
            <button
              onClick={() => setSelectedSubCategory('All')}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                selectedSubCategory === 'All'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              All Courses
            </button>
            <div className="h-8 w-px bg-slate-800 self-center mx-2 hidden sm:block" />
            
            {/* Job categories group */}
            {jobCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSubCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedSubCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                💼 {cat}
              </button>
            ))}
            
            <div className="h-8 w-px bg-slate-800 self-center mx-2 hidden sm:block" />

            {/* Entrance categories group */}
            {entranceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSubCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedSubCategory === cat
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                🎓 {cat}
              </button>
            ))}
          </div>

          {/* Conditional Layout: Netflix Rows vs Filtered Grid */}
          {selectedSubCategory === 'All' && searchQuery === '' ? (
            
            // NETFLIX-STYLE CATEGORIZED ROWS
            <div className="space-y-12">
              
              {/* Row 1: Embedded & Device Drivers */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-400" /> Embedded Systems & Linux Drivers
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {videosData
                    .filter((v) => v.subCategory === 'Embedded Systems' || v.subCategory === 'Linux Device Drivers')
                    .slice(0, 4)
                    .map((video) => (
                      <VideoGridCard key={video.id} video={video} onPlay={setActiveVideoUrl} onBuy={handleBuyCourse} enrolled={enrolledCourses.includes(video.courseId)} />
                    ))}
                </div>
              </div>

              {/* Row 2: Linux Kernel & Data Analytics */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-400" /> Linux Kernel & Data Science
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {videosData
                    .filter((v) => v.subCategory === 'Linux Kernel' || v.subCategory === 'Data Analytics')
                    .slice(0, 4)
                    .map((video) => (
                      <VideoGridCard key={video.id} video={video} onPlay={setActiveVideoUrl} onBuy={handleBuyCourse} enrolled={enrolledCourses.includes(video.courseId)} />
                    ))}
                </div>
              </div>

              {/* Row 3: Competitive Exam Prep */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-400" /> GATE, CSIT & Algorithms Prep
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {videosData
                    .filter((v) => v.category === 'entrance')
                    .slice(0, 4)
                    .map((video) => (
                      <VideoGridCard key={video.id} video={video} onPlay={setActiveVideoUrl} onBuy={handleBuyCourse} enrolled={enrolledCourses.includes(video.courseId)} />
                    ))}
                </div>
              </div>

            </div>
          ) : (
            
            // FILTERED GRID VIEW
            <div>
              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredVideos.map((video) => (
                    <VideoGridCard key={video.id} video={video} onPlay={setActiveVideoUrl} onBuy={handleBuyCourse} enrolled={enrolledCourses.includes(video.courseId)} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-slate-950/40 rounded-xl border border-slate-800">
                  <Film className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-300">No Lectures Found</h3>
                  <p className="text-slate-500 text-sm mt-1">Try resetting filters or adjusting search queries.</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSelectedSubCategory('All'); setSearchQuery(''); }}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Video Modal Player */}
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

      <Footer />
    </>
  );
}

// Sub-component for individual grid cards to keep code tidy
interface VideoCardProps {
  video: Video;
  onPlay: (url: string) => void;
  onBuy: (courseId: string, courseTitle: string) => void;
  enrolled: boolean;
}

const VideoGridCard: React.FC<VideoCardProps> = ({ video, onPlay, onBuy, enrolled }) => {
  return (
    <div className="group rounded-xl border border-slate-800 bg-slate-950 overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col h-full shadow-lg">
      
      {/* Video Thumbnail Screen */}
      <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        {/* Colorful Gradient Overlay for premium look */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-0 opacity-80" />
        <div className={`absolute inset-0 z-0 bg-gradient-to-br ${
          video.category === 'job' ? 'from-blue-900/40 to-slate-900/60' : 'from-amber-900/40 to-slate-900/60'
        } group-hover:scale-105 transition-transform duration-500`} />
        
        {/* Play Button Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 cursor-pointer" onClick={() => onPlay(video.videoUrl)}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white group-hover:scale-110 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
            <PlayCircle className="h-6 w-6" />
          </div>
        </div>

        {/* Labels & Tags */}
        <div className="absolute top-3 left-3 z-10 flex gap-1">
          {video.isSample && (
            <Badge variant="success" className="px-2 py-0 bg-emerald-600/90 text-white border-none font-semibold text-[9px]">
              FREE SAMPLE
            </Badge>
          )}
          <Badge variant="secondary" className="px-2 py-0 bg-slate-900/80 text-slate-300 border-none text-[9px] uppercase">
            {video.subCategory}
          </Badge>
        </div>

        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-slate-300">
          <Clock className="h-3 w-3 text-slate-400" />
          {video.duration}
        </div>
      </div>

      {/* Details Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] text-blue-400 font-semibold tracking-wider uppercase block">{video.courseTitle}</span>
          <h4 className="text-sm font-bold text-white leading-snug line-clamp-2 min-h-[40px] group-hover:text-blue-400 transition-colors">
            {video.title}
          </h4>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-900">
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {video.views} Views
          </span>
          <span className="text-slate-600">|</span>
          <span>CDN Stream</span>
        </div>
      </div>

      {/* Button Tray */}
      <div className="grid grid-cols-2 border-t border-slate-900 bg-slate-900/20">
        <button
          onClick={() => onPlay(video.videoUrl)}
          className="py-2.5 text-center text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors border-r border-slate-900"
          id={`btn-watch-${video.id}`}
        >
          Watch Sample
        </button>
        {enrolled ? (
          <Link href="/dashboard" className="py-2.5 text-center text-xs font-semibold text-blue-400 hover:bg-slate-900 transition-colors">
            Go to Class
          </Link>
        ) : (
          <button
            onClick={() => onBuy(video.courseId, video.courseTitle)}
            className="py-2.5 text-center text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors flex items-center justify-center gap-1"
            id={`btn-buy-${video.id}`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Unlock Course
          </button>
        )}
      </div>

    </div>
  );
};
