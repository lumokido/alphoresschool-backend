'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface UserProfile {
  name: string;
  emailOrMobile: string;
  role: 'student' | 'admin';
  qualification?: string;
  city?: string;
  interestedCourse?: string;
}

interface AppContextType {
  user: UserProfile | null;
  enrolledCourses: string[]; // List of courseIds
  cart: string[];
  courseProgress: Record<string, number>; // courseId -> completion percentage (0-100)
  completedTopics: Record<string, string[]>; // courseId -> array of completed topics
  downloadedDocs: string[]; // List of documentIds
  certificates: string[]; // List of courseIds with earned certificates
  login: (emailOrMobile: string, role: 'student' | 'admin') => void;
  logout: () => void;
  registerUser: (details: { name: string; emailOrMobile: string; qualification: string; city: string; interestedCourse: string }) => void;
  enrollInCourse: (courseId: string) => void;
  toggleTopicCompletion: (courseId: string, topic: string, totalTopicsCount: number) => void;
  downloadDocument: (docId: string) => void;
  removeFromCart: (courseId: string) => void;
  addToCart: (courseId: string) => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  
  // Set default initial states
  const [user, setUser] = useState<UserProfile | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
  const [completedTopics, setCompletedTopics] = useState<Record<string, string[]>>({});
  const [downloadedDocs, setDownloadedDocs] = useState<string[]>([]);
  const [certificates, setCertificates] = useState<string[]>([]);

  // Load state from localStorage if available (hydration safety)
  useEffect(() => {
    const savedUser = localStorage.getItem('envibytes_user');
    const savedCourses = localStorage.getItem('envibytes_enrolled');
    const savedProgress = localStorage.getItem('envibytes_progress');
    const savedTopics = localStorage.getItem('envibytes_topics');
    const savedDownloads = localStorage.getItem('envibytes_downloads');
    const savedCertificates = localStorage.getItem('envibytes_certificates');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // For demo purposes, let's login a default student if none exists,
      // so the student dashboard doesn't look empty when first navigated to.
      // But we will also support logging out and logging back in.
      const defaultUser: UserProfile = {
        name: 'Rahul Kumar',
        emailOrMobile: 'rahul.kumar@gmail.com',
        role: 'student',
        qualification: 'B.Tech CSE',
        city: 'Bangalore',
        interestedCourse: 'Embedded Systems'
      };
      setUser(defaultUser);
      localStorage.setItem('envibytes_user', JSON.stringify(defaultUser));
    }

    if (savedCourses) {
      setEnrolledCourses(JSON.parse(savedCourses));
    } else {
      const defaultEnrollments = ['embedded-systems', 'gate'];
      setEnrolledCourses(defaultEnrollments);
      localStorage.setItem('envibytes_enrolled', JSON.stringify(defaultEnrollments));
    }

    if (savedProgress) {
      setCourseProgress(JSON.parse(savedProgress));
    } else {
      const defaultProgress = { 'embedded-systems': 40, 'gate': 15 };
      setCourseProgress(defaultProgress);
      localStorage.setItem('envibytes_progress', JSON.stringify(defaultProgress));
    }

    if (savedTopics) {
      setCompletedTopics(JSON.parse(savedTopics));
    } else {
      const defaultTopics = {
        'embedded-systems': [
          'C Programming Fundamentals for Microcontrollers',
          'Registers & Memory Map',
          'GPIO, Timers, and Interrupts',
          'UART Serial Interface'
        ],
        'gate': [
          'Discrete Mathematics & Linear Algebra',
          'Probability & Calculus'
        ]
      };
      setCompletedTopics(defaultTopics);
      localStorage.setItem('envibytes_topics', JSON.stringify(defaultTopics));
    }

    if (savedDownloads) setDownloadedDocs(JSON.parse(savedDownloads));
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    } else {
      // Earned a certificate in ADS (mock)
      const defaultCerts = ['ads'];
      setCertificates(defaultCerts);
      localStorage.setItem('envibytes_certificates', JSON.stringify(defaultCerts));
      // Make sure ADS is also enrolled
      setEnrolledCourses(prev => {
        if (!prev.includes('ads')) {
          const update = [...prev, 'ads'];
          localStorage.setItem('envibytes_enrolled', JSON.stringify(update));
          return update;
        }
        return prev;
      });
      setCourseProgress(prev => {
        const update = { ...prev, 'ads': 100 };
        localStorage.setItem('envibytes_progress', JSON.stringify(update));
        return update;
      });
    }
  }, []);

  const login = (emailOrMobile: string, role: 'student' | 'admin') => {
    const defaultName = role === 'admin' ? 'Admin Coordinator' : 'Rahul Kumar';
    const profile: UserProfile = {
      name: defaultName,
      emailOrMobile,
      role,
      qualification: role === 'student' ? 'B.Tech ECE' : undefined,
      city: role === 'student' ? 'Hyderabad' : undefined,
      interestedCourse: role === 'student' ? 'Linux Kernel' : undefined
    };
    setUser(profile);
    localStorage.setItem('envibytes_user', JSON.stringify(profile));

    if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('envibytes_user');
    router.push('/login');
  };

  const registerUser = (details: { name: string; emailOrMobile: string; qualification: string; city: string; interestedCourse: string }) => {
    const profile: UserProfile = {
      ...details,
      role: 'student'
    };
    setUser(profile);
    localStorage.setItem('envibytes_user', JSON.stringify(profile));
    
    // Automatically enroll in their interested course
    const interestedId = details.interestedCourse.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newEnrollments = [interestedId];
    setEnrolledCourses(newEnrollments);
    localStorage.setItem('envibytes_enrolled', JSON.stringify(newEnrollments));

    const newProgress = { [interestedId]: 0 };
    setCourseProgress(newProgress);
    localStorage.setItem('envibytes_progress', JSON.stringify(newProgress));

    setCompletedTopics({ [interestedId]: [] });
    localStorage.setItem('envibytes_topics', JSON.stringify({ [interestedId]: [] }));

    router.push('/dashboard');
  };

  const enrollInCourse = (courseId: string) => {
    if (!enrolledCourses.includes(courseId)) {
      const updated = [...enrolledCourses, courseId];
      setEnrolledCourses(updated);
      localStorage.setItem('envibytes_enrolled', JSON.stringify(updated));

      const updatedProgress = { ...courseProgress, [courseId]: 0 };
      setCourseProgress(updatedProgress);
      localStorage.setItem('envibytes_progress', JSON.stringify(updatedProgress));

      const updatedTopics = { ...completedTopics, [courseId]: [] };
      setCompletedTopics(updatedTopics);
      localStorage.setItem('envibytes_topics', JSON.stringify(updatedTopics));
    }
  };

  const toggleTopicCompletion = (courseId: string, topic: string, totalTopicsCount: number) => {
    const currentCompleted = completedTopics[courseId] || [];
    let updatedTopics: string[];

    if (currentCompleted.includes(topic)) {
      updatedTopics = currentCompleted.filter(t => t !== topic);
    } else {
      updatedTopics = [...currentCompleted, topic];
    }

    const updatedCompleted = { ...completedTopics, [courseId]: updatedTopics };
    setCompletedTopics(updatedCompleted);
    localStorage.setItem('envibytes_topics', JSON.stringify(updatedCompleted));

    // Calculate new progress percentage
    const progressPercent = Math.round((updatedTopics.length / totalTopicsCount) * 100);
    const updatedProgress = { ...courseProgress, [courseId]: progressPercent };
    setCourseProgress(updatedProgress);
    localStorage.setItem('envibytes_progress', JSON.stringify(updatedProgress));

    // If 100% complete, award certificate
    if (progressPercent === 100) {
      if (!certificates.includes(courseId)) {
        const updatedCerts = [...certificates, courseId];
        setCertificates(updatedCerts);
        localStorage.setItem('envibytes_certificates', JSON.stringify(updatedCerts));
      }
    } else {
      if (certificates.includes(courseId)) {
        const updatedCerts = certificates.filter(id => id !== courseId);
        setCertificates(updatedCerts);
        localStorage.setItem('envibytes_certificates', JSON.stringify(updatedCerts));
      }
    }
  };

  const downloadDocument = (docId: string) => {
    if (!downloadedDocs.includes(docId)) {
      const updated = [...downloadedDocs, docId];
      setDownloadedDocs(updated);
      localStorage.setItem('envibytes_downloads', JSON.stringify(updated));
    }
  };

  const addToCart = (courseId: string) => {
    if (!cart.includes(courseId) && !enrolledCourses.includes(courseId)) {
      setCart([...cart, courseId]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCart(cart.filter(id => id !== courseId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{
      user,
      enrolledCourses,
      cart,
      courseProgress,
      completedTopics,
      downloadedDocs,
      certificates,
      login,
      logout,
      registerUser,
      enrollInCourse,
      toggleTopicCompletion,
      downloadDocument,
      removeFromCart,
      addToCart,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
