'use client';

import React, { useState } from 'react';
import { blogsData, BlogPost } from '@/data/blogs';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Search, 
  Cpu, 
  Terminal, 
  LineChart, 
  Briefcase, 
  GraduationCap,
  Clock
} from 'lucide-react';

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);

  const categories = ['All', 'Embedded Systems', 'Linux', 'Data Analytics', 'Career Guidance', 'GATE Preparation'];

  // Map category to style variants
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Embedded Systems':
        return 'from-blue-600 to-sky-500';
      case 'Linux':
        return 'from-slate-800 to-slate-600';
      case 'Data Analytics':
        return 'from-violet-600 to-indigo-500';
      case 'Career Guidance':
        return 'from-pink-600 to-rose-500';
      case 'GATE Preparation':
        return 'from-amber-600 to-yellow-500';
      default:
        return 'from-blue-600 to-blue-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Embedded Systems':
        return <Cpu className="h-4 w-4" />;
      case 'Linux':
        return <Terminal className="h-4 w-4" />;
      case 'Data Analytics':
        return <LineChart className="h-4 w-4" />;
      case 'Career Guidance':
        return <Briefcase className="h-4 w-4" />;
      case 'GATE Preparation':
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const filteredBlogs = blogsData.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600">
                <BookOpen className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">LMS Blog</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" id="blogs-title">
                Technical Articles & Career Insights
              </h1>
              <p className="text-slate-500 max-w-2xl text-sm font-light">
                Tutorials on RTOS, Linux Device Drivers, SQL optimizations, and guidance on cracking competitive exams.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md w-full shrink-0">
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm shadow-sm transition-all"
                id="blog-search-input"
              />
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-200/50">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {cat !== 'All' && getCategoryIcon(cat)}
                <span>{cat}</span>
              </button>
            ))}
          </div>

          {/* Blogs Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Card key={blog.id} className="flex flex-col justify-between overflow-hidden group hover:border-blue-200" id={`blog-card-${blog.id}`}>
                  
                  {/* Styled Header Cover Graphic */}
                  <div className={`h-32 bg-gradient-to-br ${getCategoryColor(blog.category)} p-6 flex flex-col justify-between text-white relative`}>
                    <div className="absolute inset-0 bg-slate-950/10" />
                    <div className="relative z-10 flex justify-between items-center">
                      <span className="flex items-center gap-1 bg-white/25 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider">
                        {getCategoryIcon(blog.category)}
                        <span className="ml-1">{blog.category}</span>
                      </span>
                      <span className="text-[10px] font-mono text-white/90">
                        {blog.readTime}
                      </span>
                    </div>
                    <div className="relative z-10 flex items-center gap-1.5 text-xs text-white/90 font-medium">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{blog.date}</span>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg line-clamp-2 min-h-[50px] group-hover:text-blue-600 transition-colors leading-snug">
                      {blog.title}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-3 leading-relaxed mt-2 min-h-[50px]">
                      {blog.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4 pt-0">
                    {/* Author block */}
                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-semibold text-xs border border-slate-200">
                        {blog.author.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-800 leading-none">{blog.author}</span>
                        <span className="text-[10px] text-slate-400 mt-0.5 leading-none">{blog.authorRole}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-slate-50/50 border-t border-slate-50 rounded-b-xl">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs font-semibold"
                      onClick={() => setActiveBlog(blog)}
                      id={`btn-read-${blog.id}`}
                    >
                      Read Article
                    </Button>
                  </CardFooter>

                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700">No Articles Found</h3>
              <p className="text-slate-500 text-sm mt-1">We couldn\'t find any articles matching your search query.</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
                Reset Filters
              </Button>
            </div>
          )}

        </div>
      </main>

      {/* Read Blog Article Modal */}
      <Modal
        isOpen={activeBlog !== null}
        onClose={() => setActiveBlog(null)}
        title={activeBlog ? activeBlog.category : 'LMS Article'}
        size="xl"
      >
        {activeBlog && (
          <article className="space-y-6">
            
            {/* Header elements */}
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-slate-900 leading-snug">{activeBlog.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {activeBlog.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {activeBlog.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {activeBlog.author} ({activeBlog.authorRole})
                </span>
              </div>
            </div>

            {/* Article Content */}
            <div className="border-t border-b border-slate-100 py-6 text-slate-700 text-sm leading-relaxed space-y-4 max-h-[55vh] overflow-y-auto pr-2">
              {activeBlog.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={index} className="text-base font-bold text-slate-900 pt-2">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  );
                }
                if (paragraph.includes('1. **')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={index} className="list-disc pl-5 space-y-2">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          {item.replace(/^\d+\.\s+\*\*/, '').replace(/\*\*/g, '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={index}>
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-400">© EnviBytes LMS Publication</span>
              <Button size="sm" onClick={() => setActiveBlog(null)}>
                Close Article
              </Button>
            </div>

          </article>
        )}
      </Modal>

      <Footer />
    </>
  );
}
