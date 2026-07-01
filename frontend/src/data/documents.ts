export interface DocumentItem {
  id: string;
  category: 'Study Materials' | 'Course Notes' | 'Previous Papers' | 'Reference Guides';
  title: string;
  description: string;
  fileSize: string;
  downloadCount: string;
  fileName: string;
}

export const documentsData: DocumentItem[] = [
  // --- STUDY MATERIALS ---
  {
    id: 'doc-study-1',
    category: 'Study Materials',
    title: 'Embedded Systems Interface Guide',
    description: 'Detailed wiring diagrams and timing diagrams for SPI, I2C, and UART serial communication.',
    fileSize: '4.2 MB',
    downloadCount: '1.2K',
    fileName: 'Embedded_Systems_Interface_Guide.pdf'
  },
  {
    id: 'doc-study-2',
    category: 'Study Materials',
    title: 'GATE CS Theory of Computation Notes',
    description: 'Comprehensive guide covering Finite Automata, Context-Free Grammars, Turing Machines, and Decidability.',
    fileSize: '6.8 MB',
    downloadCount: '3.4K',
    fileName: 'GATE_CS_Theory_of_Computation.pdf'
  },

  // --- COURSE NOTES ---
  {
    id: 'doc-notes-1',
    category: 'Course Notes',
    title: 'Linux Kernel Memory Subsystem Cheat Sheet',
    description: 'A pocket reference guide outlining how the Slab, Slub, and Sbob memory allocators function in the Linux kernel.',
    fileSize: '1.8 MB',
    downloadCount: '920',
    fileName: 'Linux_Kernel_Memory_Cheat_Sheet.pdf'
  },
  {
    id: 'doc-notes-2',
    category: 'Course Notes',
    title: 'Data Analytics: SQL Query Reference Card',
    description: 'Standard ANSI SQL syntax cheat sheet for window functions, aggregations, CTEs, and table joins.',
    fileSize: '1.1 MB',
    downloadCount: '2.5K',
    fileName: 'SQL_Query_Reference_Card.pdf'
  },
  {
    id: 'doc-notes-3',
    category: 'Course Notes',
    title: 'Algorithms: Dynamic Programming Masterclass',
    description: 'Core concepts of memoization and tabulation with solutions for the top 10 classical DP problems.',
    fileSize: '3.5 MB',
    downloadCount: '1.8K',
    fileName: 'Dynamic_Programming_Masterclass.pdf'
  },

  // --- PREVIOUS PAPERS ---
  {
    id: 'doc-paper-1',
    category: 'Previous Papers',
    title: 'GATE CS Previous Year Paper (2025)',
    description: 'Fully solved GATE Computer Science and Information Technology question paper with detailed explanations.',
    fileSize: '5.2 MB',
    downloadCount: '4.8K',
    fileName: 'GATE_CS_2025_Solved_Paper.pdf'
  },
  {
    id: 'doc-paper-2',
    category: 'Previous Papers',
    title: 'GATE CS Previous Year Paper (2024)',
    description: 'Solved GATE Computer Science question paper with subject-wise difficulty grading.',
    fileSize: '4.9 MB',
    downloadCount: '3.9K',
    fileName: 'GATE_CS_2024_Solved_Paper.pdf'
  },
  {
    id: 'doc-paper-3',
    category: 'Previous Papers',
    title: 'CSIT Entrance Model Question Paper Set A',
    description: 'Practice paper covering Mathematics, Physics, and English with an answer key and solving guidelines.',
    fileSize: '2.4 MB',
    downloadCount: '1.5K',
    fileName: 'CSIT_Model_Paper_Set_A.pdf'
  },

  // --- REFERENCE GUIDES ---
  {
    id: 'doc-ref-1',
    category: 'Reference Guides',
    title: 'Linux Device Tree Specifications V2.1',
    description: 'Official standard reference document outlining bindings, hardware definitions, and kernel node structures.',
    fileSize: '8.4 MB',
    downloadCount: '620',
    fileName: 'Linux_Device_Tree_Specs_v2.1.pdf'
  },
  {
    id: 'doc-ref-2',
    category: 'Reference Guides',
    title: 'Python Pandas API Cheat Sheet',
    description: 'Quick reference for Series, DataFrame, merging, grouping, reshaping, and time series functions.',
    fileSize: '2.0 MB',
    downloadCount: '2.1K',
    fileName: 'Pandas_API_Cheat_Sheet.pdf'
  }
];
