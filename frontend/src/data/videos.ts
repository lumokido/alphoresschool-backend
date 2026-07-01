export interface Video {
  id: string;
  courseId: string;
  courseTitle: string;
  category: 'job' | 'entrance';
  subCategory: string; // e.g. "Embedded Systems", "GATE", "Linux Kernel"
  title: string;
  duration: string;
  videoUrl: string; // Simulated link / embed
  isSample: boolean;
  views: string;
}

export const videosData: Video[] = [
  // --- JOB COURSE VIDEOS ---
  {
    id: 'vid-embed-1',
    courseId: 'embedded-systems',
    courseTitle: 'Embedded Systems',
    category: 'job',
    subCategory: 'Embedded Systems',
    title: 'Introduction to Microcontrollers and Embedded C',
    duration: '18:45',
    videoUrl: 'https://www.youtube.com/embed/H5850w6d_Z0', // Example placeholder embed
    isSample: true,
    views: '12K'
  },
  {
    id: 'vid-embed-2',
    courseId: 'embedded-systems',
    courseTitle: 'Embedded Systems',
    category: 'job',
    subCategory: 'Embedded Systems',
    title: 'Understanding SPI and I2C Protocols',
    duration: '25:12',
    videoUrl: 'https://www.youtube.com/embed/6TzEQb5W1tM',
    isSample: false,
    views: '8.4K'
  },
  {
    id: 'vid-embed-3',
    courseId: 'embedded-systems',
    courseTitle: 'Embedded Systems',
    category: 'job',
    subCategory: 'Embedded Systems',
    title: 'Introduction to RTOS Task Management & Scheduling',
    duration: '31:40',
    videoUrl: 'https://www.youtube.com/embed/F321ycoM9yU',
    isSample: true,
    views: '9.8K'
  },
  {
    id: 'vid-kernel-1',
    courseId: 'linux-kernel',
    courseTitle: 'Linux Kernel',
    category: 'job',
    subCategory: 'Linux Kernel',
    title: 'Linux Kernel Compilation from Source Code',
    duration: '22:15',
    videoUrl: 'https://www.youtube.com/embed/9t48nN27_Ww',
    isSample: true,
    views: '15K'
  },
  {
    id: 'vid-kernel-2',
    courseId: 'linux-kernel',
    courseTitle: 'Linux Kernel',
    category: 'job',
    subCategory: 'Linux Kernel',
    title: 'Understanding the Slab and Slub Memory Allocators',
    duration: '28:50',
    videoUrl: 'https://www.youtube.com/embed/example-slab',
    isSample: false,
    views: '6.1K'
  },
  {
    id: 'vid-drivers-1',
    courseId: 'linux-device-drivers',
    courseTitle: 'Linux Device Drivers',
    category: 'job',
    subCategory: 'Linux Device Drivers',
    title: 'Writing your First Character Device Driver',
    duration: '29:45',
    videoUrl: 'https://www.youtube.com/embed/M2M45sKqX-I',
    isSample: true,
    views: '19K'
  },
  {
    id: 'vid-drivers-2',
    courseId: 'linux-device-drivers',
    courseTitle: 'Linux Device Drivers',
    category: 'job',
    subCategory: 'Linux Device Drivers',
    title: 'Platform Driver Registration & Device Tree Interfacing',
    duration: '35:20',
    videoUrl: 'https://www.youtube.com/embed/example-drivers',
    isSample: false,
    views: '7.9K'
  },
  {
    id: 'vid-analytics-1',
    courseId: 'data-analytics',
    courseTitle: 'Data Analytics',
    category: 'job',
    subCategory: 'Data Analytics',
    title: 'Exploratory Data Analysis with Pandas & Seaborn',
    duration: '20:10',
    videoUrl: 'https://www.youtube.com/embed/r-uOLxNrNk8',
    isSample: true,
    views: '24K'
  },
  {
    id: 'vid-analytics-2',
    courseId: 'data-analytics',
    courseTitle: 'Data Analytics',
    category: 'job',
    subCategory: 'Data Analytics',
    title: 'Introduction to SQL Joins & Subqueries',
    duration: '15:30',
    videoUrl: 'https://www.youtube.com/embed/example-sql',
    isSample: false,
    views: '18K'
  },

  // --- ENTRANCE COURSE VIDEOS ---
  {
    id: 'vid-gate-1',
    courseId: 'gate',
    courseTitle: 'GATE (Computer Science & IT)',
    category: 'entrance',
    subCategory: 'GATE',
    title: 'GATE CS: Complete CPU Scheduling Analysis',
    duration: '42:10',
    videoUrl: 'https://www.youtube.com/embed/example-gate-sched',
    isSample: true,
    views: '35K'
  },
  {
    id: 'vid-gate-2',
    courseId: 'gate',
    courseTitle: 'GATE (Computer Science & IT)',
    category: 'entrance',
    subCategory: 'GATE',
    title: 'Asymptotic Analysis & Master Theorem Tricks',
    duration: '26:15',
    videoUrl: 'https://www.youtube.com/embed/example-gate-master',
    isSample: true,
    views: '29K'
  },
  {
    id: 'vid-gate-3',
    courseId: 'gate',
    courseTitle: 'GATE (Computer Science & IT)',
    category: 'entrance',
    subCategory: 'GATE',
    title: 'Databases: Normal Forms (1NF, 2NF, 3NF, BCNF) Made Easy',
    duration: '38:40',
    videoUrl: 'https://www.youtube.com/embed/example-gate-normal',
    isSample: false,
    views: '21K'
  },
  {
    id: 'vid-csit-1',
    courseId: 'csit',
    courseTitle: 'CSIT Entrance Exam',
    category: 'entrance',
    subCategory: 'CSIT',
    title: 'CSIT Entrance Math: Calculus & Limits Shortcuts',
    duration: '19:55',
    videoUrl: 'https://www.youtube.com/embed/example-csit-calc',
    isSample: true,
    views: '11K'
  },
  {
    id: 'vid-csit-2',
    courseId: 'csit',
    courseTitle: 'CSIT Entrance Exam',
    category: 'entrance',
    subCategory: 'CSIT',
    title: 'Foundational C Programming Questions for Entrance Exams',
    duration: '24:18',
    videoUrl: 'https://www.youtube.com/embed/example-csit-c',
    isSample: false,
    views: '8.2K'
  },
  {
    id: 'vid-ads-1',
    courseId: 'ads',
    courseTitle: 'ADS (Algorithms & Data Structures)',
    category: 'entrance',
    subCategory: 'ADS',
    title: 'Dynamic Programming: Solving the Knapsack Problem',
    duration: '30:45',
    videoUrl: 'https://www.youtube.com/embed/nLmHmRRL4yA',
    isSample: true,
    views: '16K'
  },
  {
    id: 'vid-ads-2',
    courseId: 'ads',
    courseTitle: 'ADS (Algorithms & Data Structures)',
    category: 'entrance',
    subCategory: 'ADS',
    title: 'Graph Traversals: BFS vs DFS Algorithms',
    duration: '22:30',
    videoUrl: 'https://www.youtube.com/embed/pcKY4hjDrxk',
    isSample: false,
    views: '14K'
  }
];
