export interface BlogPost {
  id: string;
  category: 'Embedded Systems' | 'Linux' | 'Data Analytics' | 'Career Guidance' | 'GATE Preparation';
  title: string;
  summary: string;
  content: string; // Detail content for popups
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
}

export const blogsData: BlogPost[] = [
  {
    id: 'blog-embedded-1',
    category: 'Embedded Systems',
    title: 'Why RTOS is Essential for Modern Embedded Systems',
    summary: 'Discover the differences between bare-metal programming and Real-Time Operating Systems (RTOS), and when to make the switch for your hardware projects.',
    content: `In the world of embedded systems, developers often start with a simple 'super-loop' architecture—often referred to as bare-metal programming. While this is highly effective for basic tasks like blinking an LED or reading a single temperature sensor, it quickly breaks down when handling complex, concurrent tasks.\n\n### Enter Real-Time Operating Systems (RTOS)\n\nAn RTOS provides a multitasking environment that guarantees events are processed within strict timing constraints. Instead of a single giant loop, you break your firmware into independent, concurrent tasks.\n\n### Key Benefits of RTOS:\n1. **Deterministic Task Scheduling**: Higher priority tasks immediately preempt lower priority ones.\n2. **Task Isolation**: Isolating functions into distinct threads makes debugging and maintenance vastly easier.\n3. **Built-in Synchronization**: Utilizing Mutexes, Semaphores, and Message Queues guarantees safe communication between hardware tasks without memory corruption.\n\n### When should you make the transition?\nIf your application requires networking (TCP/IP), file systems, USB connectivity, or handles asynchronous user inputs alongside high-precision motor controls, migrating to an RTOS like FreeRTOS or Zephyr is not just recommended—it is essential.`,
    readTime: '5 min read',
    date: 'June 18, 2026',
    author: 'Amit Sharma',
    authorRole: 'Embedded Systems Lead'
  },
  {
    id: 'blog-linux-1',
    category: 'Linux',
    title: 'Demystifying the Linux Device Tree',
    summary: 'A beginner-friendly guide to understanding how the Linux kernel discovers and configures non-discoverable hardware devices.',
    content: `Unlike PCI or USB devices, which can self-describe their capabilities to the operating system, embedded hardware components (like an I2C temperature sensor or an SPI display) cannot be automatically discovered by the processor.\n\nHistorically, the Linux kernel was cluttered with board-specific C code containing hardware details (known as "board files"). To solve this scalability issue, the ARM Linux community adopted the **Device Tree**.\n\n### What is a Device Tree?\nA Device Tree is a tree-like data structure that describes the physical hardware configuration of a board to the operating system. It is written in a text file (.dts or .dtsi) and compiled into a binary format (.dtb) before being passed to the bootloader.\n\n### Anatomy of a Device Tree Node:\n- **Compatible Property**: The most critical string. It tells the Linux kernel which device driver to bind to this hardware.\n- **Reg Property**: Specifies the physical base address and range of the device's control registers.\n- **Interrupts**: Describes which CPU interrupt pins are wired to this device.\n\nBy keeping hardware descriptions separate from the driver code, a single Linux kernel binary can run on hundreds of different boards just by switching the Device Tree file.`,
    readTime: '7 min read',
    date: 'May 29, 2026',
    author: 'Sarah Jenkins',
    authorRole: 'Linux Kernel Developer'
  },
  {
    id: 'blog-analytics-1',
    category: 'Data Analytics',
    title: 'Top 5 SQL Query Optimizations for Data Analysts',
    summary: 'Stop writing slow, resource-heavy queries. Learn how to optimize joins, filters, and window functions to speed up your reports.',
    content: `As databases grow into terabytes, an inefficient SQL query can stall an entire analytical dashboard. Optimization is no longer just for DBAs; it is a critical skill for every data analyst.\n\n### 1. Stop Using SELECT *\nRetrieving columns you do not need wastes network bandwidth and memory. Specify only the columns required for your analysis. This also enables the database engine to utilize index-only scans.\n\n### 2. Avoid Functions on Indexed Columns\nWriting \`WHERE YEAR(order_date) = 2026\` forces the database to evaluate the function for every single row (a full table scan). Instead, write: \`WHERE order_date >= '2026-01-01' AND order_date <= '2026-12-31'\` to keep the index queryable.\n\n### 3. Leverage CTEs (Common Table Expressions) Wisely\nWhile CTEs improve query readability, in some databases (like older PostgreSQL versions), they act as optimization barriers, forcing materialization. Use them to structure code, but test performance against subqueries if processing speed lags.\n\n### 4. Index Foreign Keys in JOINS\nEnsure the columns you join on (e.g., \`user_id\` or \`product_id\`) are indexed on both tables. This speeds up hash and nested-loop joins dramatically.\n\n### 5. Filter Early with WHERE, Not HAVING\n\`WHERE\` filters rows before aggregations are computed, while \`HAVING\` filters after. Reducing rows early in the pipeline saves processor cycles during grouping.`,
    readTime: '6 min read',
    date: 'April 12, 2026',
    author: 'Vikram Mehta',
    authorRole: 'Senior Data Scientist'
  },
  {
    id: 'blog-career-1',
    category: 'Career Guidance',
    title: 'Building a Portfolio that Lands Embedded Systems Jobs',
    summary: 'Resumes are fine, but working hardware gets you hired. Learn what projects to show recruiters and how to document them.',
    content: `Landing a job in embedded systems is different from pure software engineering. Recruiters want to see that you can bridge the gap between code and hardware. A PDF resume is rarely enough; you need a physical or digital portfolio.\n\n### 1. Show, Don\'t Just Tell\nInclude high-quality photos and videos of your projects in action. A short 30-second YouTube clip showing a robotic arm moving, or an oscilloscope capturing signals from your microcontroller, is worth a thousand bullet points.\n\n### 2. Document Your Schematic & PCB Design\nEmbedded engineers do not just write code; they understand hardware. Include screenshots of your schematics and PCB layouts designed in KiCad or Altium. Explain *why* you chose specific components (e.g., LDO vs. Buck regulator).\n\n### 3. Share Clean Github Repositories\nMake sure your firmware repositories are public, well-organized, and include a descriptive README. Use professional folder structures (separate \`src/\`, \`include/\`, \`tests/\`). Avoid committing build folders or IDE configuration files.\n\n### 4. Write Post-Mortems\nRecruiters love problem solvers. Write a short blog post or summary about what went wrong during your project (e.g., "How I debugged a signal noise issue on the SPI bus") and how you solved it. It shows resilience and systematic debugging skills.`,
    readTime: '8 min read',
    date: 'June 05, 2026',
    author: 'Rajesh Kulkarni',
    authorRole: 'Hardware recruiter'
  },
  {
    id: 'blog-gate-1',
    category: 'GATE Preparation',
    title: 'How to Smartly Balance GATE Prep with Final Year Projects',
    summary: 'Time management secrets for engineering students to score a top 500 GATE rank while keeping university grades high.',
    content: `One of the biggest hurdles for GATE aspirants is time management during their final year of college. Between semester exams, final year projects (FYP), and placement season, dedicated GATE preparation can easily take a back seat.\n\n### 1. Align Your Final Year Project with GATE Subjects\nInstead of picking a random project, choose something that reinforces GATE concepts. For example, build a custom operating system scheduler simulation, a database querying compiler, or an embedded system that tests hardware protocols. This turns your FYP into active GATE revision.\n\n### 2. Set Subject-Wise Milestones\nDivide your day. Allocate early mornings (when your mind is fresh) to core GATE topics (like Algorithms or Computer Networks). Reserve college hours for lectures and labs, and use evenings for solving previous year papers (PYQs).\n\n### 3. Focus on High-Weightage Topics First\nIf time is short, prioritize subjects that carry the most weight. Engineering Mathematics, General Aptitude, Operating Systems, and DBMS consistently yield high scoring margins. Automata Theory and Compiler Design have shorter syllabi and are easier to master completely.\n\n### 4. Take Weekend Mock Tests\nDo not wait to finish the entire syllabus before attempting mock tests. Take subject-wise tests on weekends. This builds exam stamina, highlights conceptual gaps, and teaches you to solve problems under time pressure.`,
    readTime: '6 min read',
    date: 'March 22, 2026',
    author: 'Dr. Ramesh Rao',
    authorRole: 'GATE Coach & Academic Dean'
  }
];
