'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { documentsData, DocumentItem } from '@/data/documents';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  BookDown, 
  FileCheck2, 
  History, 
  BookOpen, 
  TrendingUp 
} from 'lucide-react';

export default function DocumentsPage() {
  const { downloadedDocs, downloadDocument } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // State for preview modal
  const [activeDoc, setActiveDoc] = useState<DocumentItem | null>(null);

  const categories = ['All', 'Study Materials', 'Course Notes', 'Previous Papers', 'Reference Guides'];

  // Map category to icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Study Materials':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'Course Notes':
        return <FileCheck2 className="h-5 w-5 text-indigo-600" />;
      case 'Previous Papers':
        return <History className="h-5 w-5 text-amber-600" />;
      case 'Reference Guides':
        return <FileText className="h-5 w-5 text-emerald-600" />;
      default:
        return <FileText className="h-5 w-5 text-slate-500" />;
    }
  };

  const filteredDocs = documentsData.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc: DocumentItem) => {
    downloadDocument(doc.id);
    alert(`Downloading ${doc.fileName} (${doc.fileSize})...`);
    // Simulated anchor download
    const link = document.createElement('a');
    link.href = '#';
    link.setAttribute('download', doc.fileName);
    document.body.appendChild(link);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 mb-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-blue-600">
                <BookDown className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Resource Center</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl" id="documents-title">
                Study Notes & Previous Papers
              </h1>
              <p className="text-slate-500 max-w-2xl text-sm font-light">
                Access and download curating textbooks, laboratory specifications, question banks, and device registers.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md w-full shrink-0">
              <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search notes, textbooks, papers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm shadow-sm transition-all"
                id="doc-search-input"
              />
            </div>
          </div>

          {/* Grid Layout: Left sidebar category, Right listings */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT: Category Filters (Sticky list) */}
            <div className="lg:col-span-3 lg:sticky lg:top-24 space-y-3">
              <h3 className="text-xs font-semibold uppercase text-slate-400 tracking-wider px-3">Filter by Category</h3>
              <nav className="flex flex-row lg:flex-col overflow-x-auto gap-1 lg:gap-1.5 pb-3 lg:pb-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all shrink-0 text-left ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                        : 'bg-white border border-slate-200/50 text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                    }`}
                  >
                    {cat === 'All' ? <FileText className="h-4.5 w-4.5" /> : getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* RIGHT: Document Cards Grid */}
            <div className="lg:col-span-9">
              {filteredDocs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredDocs.map((doc) => {
                    const hasDownloaded = downloadedDocs.includes(doc.id);
                    return (
                      <Card key={doc.id} className="flex flex-col justify-between hover:border-blue-200 group" id={`doc-card-${doc.id}`}>
                        <CardHeader className="pb-4">
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 text-slate-600 group-hover:scale-105 transition-transform">
                              {getCategoryIcon(doc.category)}
                            </div>
                            <div className="flex gap-1.5 items-center">
                              <Badge variant="secondary" className="text-[10px] tracking-wide">
                                {doc.fileSize}
                              </Badge>
                              {hasDownloaded && (
                                <Badge variant="success" className="text-[10px]">
                                  Downloaded
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <CardTitle className="text-base group-hover:text-blue-600 transition-colors">
                            {doc.title}
                          </CardTitle>
                          <CardDescription className="text-xs leading-relaxed mt-2 min-h-[40px]">
                            {doc.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pb-4">
                          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                              {doc.downloadCount} downloads
                            </span>
                            <span className="max-w-[140px] truncate text-[11px] font-mono text-slate-400" title={doc.fileName}>
                              {doc.fileName}
                            </span>
                          </div>
                        </CardContent>

                        <CardFooter className="grid grid-cols-2 gap-2 border-t border-slate-50 bg-slate-50/50 rounded-b-xl">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full text-xs" 
                            onClick={() => setActiveDoc(doc)}
                            id={`btn-view-${doc.id}`}
                          >
                            <Eye className="mr-1.5 h-3.5 w-3.5" />
                            View Online
                          </Button>
                          <Button 
                            size="sm" 
                            className="w-full text-xs" 
                            onClick={() => handleDownload(doc)}
                            id={`btn-download-${doc.id}`}
                          >
                            <Download className="mr-1.5 h-3.5 w-3.5" />
                            Download PDF
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700">No Study Guides Found</h3>
                  <p className="text-slate-500 text-sm mt-1">We couldn\'t find any files matching your search filters.</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      {/* Simulated online PDF viewer modal */}
      <Modal
        isOpen={activeDoc !== null}
        onClose={() => setActiveDoc(null)}
        title={activeDoc ? `Viewing: ${activeDoc.title}` : 'PDF Viewer'}
        size="lg"
      >
        {activeDoc && (
          <div className="space-y-6">
            
            {/* Mock PDF Header bar */}
            <div className="flex items-center justify-between bg-slate-100 px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-600" />
                {activeDoc.fileName}
              </span>
              <span>Page 1 of 8</span>
            </div>

            {/* Mock Text Blocks to resemble a real study guide */}
            <div className="border border-slate-200 rounded-lg p-6 bg-white space-y-4 max-h-[50vh] overflow-y-auto shadow-inner text-sm leading-relaxed text-slate-700 font-serif">
              <h2 className="text-lg font-bold text-slate-900 font-sans border-b border-slate-200 pb-2">
                {activeDoc.title}
              </h2>
              <p className="italic text-slate-500 text-xs">
                Class Notes & Study Materials — EnviBytes LMS Platform ({activeDoc.fileSize})
              </p>
              
              <h3 className="font-bold text-slate-900 font-sans mt-4">1. Technical Context & Overview</h3>
              <p>
                This document serves as a reference manual designed for systems level engineering. Under standard architecture layouts, resource bounds must be evaluated to ensure that operations (whether kernel task execution or hardware register interfaces) behave deterministically.
              </p>
              
              <h3 className="font-bold text-slate-900 font-sans mt-4">2. Core Methodology</h3>
              <p>
                When building platforms, there are specific guidelines that developers must adhere to. Specifically:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Minimize latency by using hardware interrupt deferral mechanisms.</li>
                <li>Optimize database schemas using indexing strategies and foreign key indexes.</li>
                <li>Analyze theoretical structures (TOC, Compiler Design) to write optimized compilers.</li>
              </ul>

              <h3 className="font-bold text-slate-900 font-sans mt-4">3. Sample Code Snippet</h3>
              <pre className="bg-slate-900 text-slate-100 font-mono text-xs p-4 rounded-md overflow-x-auto my-4 leading-normal">
{`#include <linux/module.h>
#include <linux/kernel.h>

static int __init test_init(void) {
    pr_info("EnviBytes: Loading lecture resources...\\n");
    return 0;
}

static void __exit test_exit(void) {
    pr_info("EnviBytes: Unloading resources.\\n");
}

module_init(test_init);
module_exit(test_exit);`}
              </pre>

              <p className="text-xs text-slate-400 text-center pt-8 border-t border-slate-100">
                End of Preview. Register or Enroll to download the full PDF booklet.
              </p>
            </div>

            {/* Modal Bottom buttons */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <Button variant="outline" onClick={() => setActiveDoc(null)}>
                Close Preview
              </Button>
              <Button onClick={() => { handleDownload(activeDoc); setActiveDoc(null); }}>
                <Download className="mr-1.5 h-4 w-4" />
                Download PDF File
              </Button>
            </div>

          </div>
        )}
      </Modal>

      <Footer />
    </>
  );
}
