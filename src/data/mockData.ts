
import { Question, Tag } from '../types';

export const mockTags: Tag[] = [
  { id: '1', name: 'React', description: 'JavaScript library for building user interfaces', questionsCount: 1234, color: '#61DAFB' },
  { id: '2', name: 'JavaScript', description: 'Programming language for web development', questionsCount: 2567, color: '#F7DF1E' },
  { id: '3', name: 'TypeScript', description: 'Typed superset of JavaScript', questionsCount: 987, color: '#3178C6' },
  { id: '4', name: 'Node.js', description: 'JavaScript runtime for server-side development', questionsCount: 1456, color: '#339933' },
  { id: '5', name: 'Python', description: 'High-level programming language', questionsCount: 1789, color: '#3776AB' },
  { id: '6', name: 'CSS', description: 'Stylesheet language for web design', questionsCount: 2123, color: '#1572B6' },
];

export const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'How to implement useEffect cleanup function properly?',
    description: 'I\'m having trouble understanding when and how to use the cleanup function in useEffect. Can someone explain with examples?',
    tags: ['React', 'JavaScript', 'useEffect'],
    author: {
      id: '2',
      username: 'reactdev',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=reactdev',
      reputation: 2341
    },
    votes: 15,
    answers: [
      {
        id: '1',
        content: 'The cleanup function in useEffect is crucial for preventing memory leaks. Here\'s how you use it:\n\n```javascript\nuseEffect(() => {\n  const timer = setInterval(() => {\n    console.log("Timer running");\n  }, 1000);\n\n  // Cleanup function\n  return () => {\n    clearInterval(timer);\n  };\n}, []);\n```\n\nThe cleanup function runs when:\n1. The component unmounts\n2. Before the effect runs again (if dependencies change)',
        author: {
          id: '3',
          username: 'jsexpert',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jsexpert',
          reputation: 5432
        },
        votes: 23,
        isAccepted: true,
        comments: [
          {
            id: '1',
            content: 'Great explanation! This helped me understand the concept better.',
            author: {
              id: '4',
              username: 'learner',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=learner'
            },
            votes: 3,
            createdAt: new Date('2024-01-15T10:30:00Z')
          }
        ],
        createdAt: new Date('2024-01-15T09:00:00Z'),
        updatedAt: new Date('2024-01-15T09:00:00Z')
      }
    ],
    views: 1234,
    createdAt: new Date('2024-01-15T08:00:00Z'),
    updatedAt: new Date('2024-01-15T09:00:00Z')
  },
  {
    id: '2',
    title: 'Best practices for TypeScript with React components?',
    description: 'What are the recommended patterns for typing React components, props, and hooks in TypeScript?',
    tags: ['TypeScript', 'React', 'Best Practices'],
    author: {
      id: '5',
      username: 'tsnovice',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tsnovice',
      reputation: 156
    },
    votes: 8,
    answers: [],
    views: 567,
    createdAt: new Date('2024-01-14T15:30:00Z'),
    updatedAt: new Date('2024-01-14T15:30:00Z')
  },
  {
    id: '3',
    title: 'How to optimize React app performance?',
    description: 'My React application is becoming slow with large datasets. What are the best techniques to optimize performance?',
    tags: ['React', 'Performance', 'Optimization'],
    author: {
      id: '6',
      username: 'perfseeker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=perfseeker',
      reputation: 892
    },
    votes: 12,
    answers: [
      {
        id: '2',
        content: 'Here are some key performance optimization techniques:\n\n1. **React.memo()** - Prevent unnecessary re-renders\n2. **useMemo()** - Memoize expensive calculations\n3. **useCallback()** - Memoize function references\n4. **Code splitting** - Use React.lazy() and Suspense\n5. **Virtual scrolling** - For large lists\n\nExample with React.memo:\n```javascript\nconst ExpensiveComponent = React.memo(({ data }) => {\n  return <div>{/* Complex rendering logic */}</div>;\n});\n```',
        author: {
          id: '7',
          username: 'perfguru',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=perfguru',
          reputation: 8901
        },
        votes: 18,
        isAccepted: false,
        comments: [],
        createdAt: new Date('2024-01-14T16:45:00Z'),
        updatedAt: new Date('2024-01-14T16:45:00Z')
      }
    ],
    views: 891,
    createdAt: new Date('2024-01-14T14:00:00Z'),
    updatedAt: new Date('2024-01-14T16:45:00Z')
  }
];
