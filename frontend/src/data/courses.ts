export interface Course {
  id: string;
  category: 'job' | 'entrance';
  title: string;
  iconName: string; // Used to dynamically map Lucide Icons
  description: string;
  duration: string;
  fee: string;
  originalFee?: string;
  syllabus: { moduleTitle: string; topics: string[] }[];
  outcomes: string[];
  level: string;
  language: string;
  hasCertificate: boolean;
}

export const coursesData: Course[] = [
  // --- JOB COURSES ---
  {
    id: 'embedded-systems',
    category: 'job',
    title: 'Embedded Systems',
    iconName: 'Cpu', // Maps to Cpu / Microchip
    description: 'Comprehensive industry-focused training on 8/32-bit Microcontrollers, RTOS, and Embedded C programming.',
    duration: '6 Months',
    fee: '₹34,999',
    originalFee: '₹49,999',
    level: 'Beginner to Advanced',
    language: 'English (with Hindi support)',
    hasCertificate: true,
    outcomes: [
      'Master Embedded C programming and hardware interface protocols (I2C, SPI, UART).',
      'Architect and build real-time systems using FreeRTOS.',
      'Program ARM Cortex-M microcontrollers from scratch.',
      'Design, debug, and troubleshoot complex embedded hardware circuits.'
    ],
    syllabus: [
      {
        moduleTitle: 'Module 1: Embedded C & Microcontroller Basics',
        topics: ['C Programming Fundamentals for Microcontrollers', 'Registers & Memory Map', 'GPIO, Timers, and Interrupts']
      },
      {
        moduleTitle: 'Module 2: Communication Protocols',
        topics: ['UART Serial Interface', 'SPI Bus Architecture', 'I2C Bus Communication & Sensors']
      },
      {
        moduleTitle: 'Module 3: Real-Time Operating Systems (RTOS)',
        topics: ['RTOS Concepts & Task Management', 'Semaphores, Mutexes & Queues', 'Interrupt Handling in RTOS']
      },
      {
        moduleTitle: 'Module 4: Capstone Hardware Project',
        topics: ['Schematic Design Review', 'Firmware Development & Debugging', 'Power Management & Testing']
      }
    ]
  },
  {
    id: 'linux-kernel',
    category: 'job',
    title: 'Linux Kernel',
    iconName: 'Terminal', // Penguin representation
    description: 'Deep dive into Linux Kernel Internals, memory management, process scheduling, and synchronization mechanisms.',
    duration: '4 Months',
    fee: '₹39,999',
    originalFee: '₹54,999',
    level: 'Advanced',
    language: 'English',
    hasCertificate: true,
    outcomes: [
      'Understand the architecture of the Linux Operating System kernel.',
      'Master kernel compilation, configuration, and custom module loading.',
      'Analyze memory management subsystems (Virtual Memory, Paging, Slab Allocator).',
      'Implement process scheduling and concurrency controls (Spinlocks, Mutexes).'
    ],
    syllabus: [
      {
        moduleTitle: 'Module 1: Kernel Architecture Introduction',
        topics: ['Monolithic vs Microkernel Design', 'Kernel Source Tree & Compilation', 'Kernel Modules Development']
      },
      {
        moduleTitle: 'Module 2: Process & Thread Management',
        topics: ['Task Struct & Process Lifecycle', 'The Linux Scheduler (CFS)', 'Kernel Thread Creation']
      },
      {
        moduleTitle: 'Module 3: Memory Subsystem',
        topics: ['Virtual Memory Management', 'Page Allocation & Zone Allocator', 'Slab, Slub & Sbob Allocators']
      },
      {
        moduleTitle: 'Module 4: Concurrency & Synchronization',
        topics: ['Race Conditions in Kernel Space', 'Spinlocks & Semaphores', 'RCU (Read-Copy-Update) basics']
      }
    ]
  },
  {
    id: 'linux-device-drivers',
    category: 'job',
    title: 'Linux Device Drivers',
    iconName: 'Settings', // Gear/Circuit
    description: 'Hands-on training in writing Character, Block, and Network device drivers for modern Linux systems.',
    duration: '4 Months',
    fee: '₹37,999',
    originalFee: '₹51,999',
    level: 'Intermediate to Advanced',
    language: 'English',
    hasCertificate: true,
    outcomes: [
      'Write, load, and debug custom Linux Character Device Drivers.',
      'Integrate physical hardware devices with the Linux Kernel Device Tree.',
      'Implement Interrupt Handlers and Bottom Half processing (Workqueues, Tasklets).',
      'Master Sysfs, Procfs, and IOCTL interfaces for user-kernel communication.'
    ],
    syllabus: [
      {
        moduleTitle: 'Module 1: Character Drivers',
        topics: ['Major & Minor Numbers', 'File Operations struct (read, write, open, release)', 'User-Kernel Data Transfer (copy_to_user, copy_from_user)']
      },
      {
        moduleTitle: 'Module 2: Hardware Interfacing & Device Tree',
        topics: ['Platform Device Drivers', 'Understanding Device Tree Nodes', 'Memory Mapping IO (ioremap)']
      },
      {
        moduleTitle: 'Module 3: Interrupts & Deferral Mechanisms',
        topics: ['Registering ISRs (request_irq)', 'Top-half vs Bottom-half Handling', 'Tasklets, Workqueues, and Threaded IRQs']
      },
      {
        moduleTitle: 'Module 4: User Space Interfacing',
        topics: ['Creating IOCTL interfaces', 'Implementing Sysfs & Procfs attributes', 'Debugging Drivers with printk & GDB']
      }
    ]
  },
  {
    id: 'data-analytics',
    category: 'job',
    title: 'Data Analytics',
    iconName: 'BarChart3',
    description: 'Master Python, SQL, Tableau, and Machine Learning essentials to solve real-world industry data problems.',
    duration: '5 Months',
    fee: '₹29,999',
    originalFee: '₹42,999',
    level: 'Beginner to Intermediate',
    language: 'English',
    hasCertificate: true,
    outcomes: [
      'Perform exploratory data analysis using Python libraries (Pandas, NumPy, Seaborn).',
      'Construct complex SQL queries to clean and retrieve relational database info.',
      'Build dynamic, professional dashboards in Tableau or PowerBI.',
      'Apply regression, classification, and clustering machine learning algorithms.'
    ],
    syllabus: [
      {
        moduleTitle: 'Module 1: Python for Data Analysis',
        topics: ['Python Programming Basics', 'Data Wrangling with Pandas & NumPy', 'Data Visualization with Matplotlib & Seaborn']
      },
      {
        moduleTitle: 'Module 2: Databases & SQL Querying',
        topics: ['Relational Database Concepts', 'Joins, Aggregations & Subqueries', 'Database Optimization & Indexing']
      },
      {
        moduleTitle: 'Module 3: Data Visualization & BI',
        topics: ['Connecting Data Sources in Tableau', 'Creating Charts, Maps & Sheets', 'Designing Interactive SaaS Dashboards']
      },
      {
        moduleTitle: 'Module 4: Statistical Modeling & ML',
        topics: ['Descriptive & Inferential Statistics', 'Supervised Learning: Linear/Logistic Regression', 'Unsupervised Learning: K-Means Clustering']
      }
    ]
  },

  // --- ENTRANCE COURSES ---
  {
    id: 'gate',
    category: 'entrance',
    title: 'GATE (Computer Science & IT)',
    iconName: 'Target',
    description: 'Comprehensive preparation program for GATE CS/IT, targeting top IISc/IITs and PSU recruitments.',
    duration: '12 Months',
    fee: '₹19,999',
    originalFee: '₹29,999',
    level: 'Beginner to Intermediate',
    language: 'Bilingual (Hindi + English)',
    hasCertificate: false,
    outcomes: [
      'Build solid conceptual understanding of Core CS subjects (OS, DBMS, TOC, Compiler Design, CN).',
      'Solve previous 25+ years GATE questions with short tricks and time-management tips.',
      'Access 50+ subject-wise and 15+ full-length simulated mock tests.',
      'Excel in General Aptitude and Engineering Mathematics modules.'
    ],
    syllabus: [
      {
        moduleTitle: 'Module 1: Mathematics & Aptitude',
        topics: ['Discrete Mathematics & Linear Algebra', 'Probability & Calculus', 'Quantitative & Verbal Aptitude']
      },
      {
        moduleTitle: 'Module 2: Systems Core',
        topics: ['Digital Logic & Computer Architecture (COA)', 'Operating Systems (Scheduling, Memory, Concurrency)', 'Computer Networks (OSI layers, Routing, TCP/UDP)']
      },
      {
        moduleTitle: 'Module 3: Theoretical Computer Science',
        topics: ['Theory of Computation (Automata, Grammars, Decidability)', 'Compiler Design (Parsing, Code Generation)', 'Data Structures & Algorithms']
      },
      {
        moduleTitle: 'Module 4: Databases & Software Engineering',
        topics: ['Relational Model & Normalization', 'SQL & Transaction Controls', 'File Organization & Indexing']
      }
    ]
  },
  {
    id: 'csit',
    category: 'entrance',
    title: 'CSIT Entrance Exam',
    iconName: 'Laptop',
    description: 'Targeted course for securing top ranks in university-level Computer Science & IT entrance tests.',
    duration: '8 Months',
    fee: '₹14,999',
    originalFee: '₹22,999',
    level: 'Beginner',
    language: 'English',
    hasCertificate: false,
    outcomes: [
      'Understand foundational Computer Science, Mathematics, Physics, and English syllabi.',
      'Practice with thousands of chapter-wise Multiple Choice Questions (MCQs).',
      'Master rapid calculation strategies and elimination techniques.',
      'Analyze exam trends with detailed solution breakdowns of past exams.'
    ],
    syllabus: [
      {
        moduleTitle: 'Module 1: Entrance Mathematics',
        topics: ['Algebra, Trigonometry & Matrices', 'Co-ordinate Geometry & Vectors', 'Differential & Integral Calculus']
      },
      {
        moduleTitle: 'Module 2: Physics Foundation',
        topics: ['Mechanics & Heat', 'Optics & Acoustics', 'Electricity, Magnetism & Modern Physics']
      },
      {
        moduleTitle: 'Module 3: Computer Fundamentals',
        topics: ['Computer History & Architecture', 'Basic Programming Concepts in C', 'Number Systems & Boolean Logic']
      },
      {
        moduleTitle: 'Module 4: English Language Skills',
        topics: ['Grammar & Sentence Correction', 'Vocabulary & Synonyms/Antonyms', 'Reading Comprehension & Logic']
      }
    ]
  },
  {
    id: 'ads',
    category: 'entrance',
    title: 'ADS (Algorithms & Data Structures)',
    iconName: 'BookOpen',
    description: 'Master advanced algorithmic design, data structures, and problem-solving techniques for competitive coding and exams.',
    duration: '3 Months',
    fee: '₹9,999',
    originalFee: '₹14,999',
    level: 'Intermediate',
    language: 'English',
    hasCertificate: true,
    outcomes: [
      'Master asymptotic notations (Big O, Omega, Theta) and recursion formulas.',
      'Implement Advanced Data Structures: Segment Trees, Tries, Disjoint Set Union (DSU).',
      'Solve algorithmic problems using Dynamic Programming, Greedy, and Graph Algorithms.',
      'Write optimized, memory-efficient code under rigid time-complexity constraints.'
    ],
    syllabus: [
      {
        moduleTitle: 'Module 1: Analysis & Basic Data Structures',
        topics: ['Asymptotic Analysis & Recurrences', 'Arrays, Linked Lists, Stacks & Queues', 'Trees (BSTs, Heaps, AVL Trees)']
      },
      {
        moduleTitle: 'Module 2: Advanced Sorting & Searching',
        topics: ['Divide and Conquer (Merge, Quick, Heap Sort)', 'Binary Search Variations', 'Hashing Techniques & Collision Resolution']
      },
      {
        moduleTitle: 'Module 3: Graph Algorithms',
        topics: ['BFS & DFS Traversals', 'Shortest Paths (Dijkstra, Bellman-Ford, Floyd-Warshall)', 'Minimum Spanning Trees (Kruskal, Prim)']
      },
      {
        moduleTitle: 'Module 4: Dynamic Programming & Greedy',
        topics: ['Knapsack Problems & LCS', 'Matrix Chain Multiplication', 'Greedy Choice Property & Huffman Codes']
      }
    ]
  }
];
