'use client'
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Blog {
  id:number;
  title:string;
  content:string;
  author:string;
  category:string;
}

const BlogDetailsPage = ({params}:{params:
    Promise<{blogid:string}>}) => {
        const route = useRouter();
        const unwrapedParams=React.use(params)
        const {blogid}=unwrapedParams;
        const [blog, setBlog] = useState<Blog | null>(null);

        // code to handle the delete button
        const deleteBlog = async() =>{
            const {error,data}=await supabase
            .from('blogs')
            .delete()
            .eq('id',blogid)
            if (error){
                console.error("Error Deleting the blog",error)
            }
            else{
                console.log("Deleted Successfully")
                route.back();
            }
        }
   
   useEffect(()=>{
    const fetchData = async () =>{
        const {data,error} = await supabase
        .from('blogs')
        .select()
        .eq('id',blogid)
        .single()

        if(error){
            console.error("Error Fetching Data",error)
        }
        else {
            setBlog(data)
        }
    }
    fetchData()
   },[]) 
  // Sample blog data for UI demonstration - replace with your actual data fetching logic
  const blogData = {
    id: '1',
    title: 'Getting Started with React TypeScript: A Complete Guide',
    content: `
# Introduction

React TypeScript has become the gold standard for building scalable and maintainable web applications. In this comprehensive guide, we'll explore everything you need to know to get started with React and TypeScript.

## Why TypeScript with React?

TypeScript brings several advantages to React development:

- **Type Safety**: Catch errors at compile time rather than runtime
- **Better IDE Support**: Enhanced autocomplete and refactoring capabilities
- **Improved Code Documentation**: Types serve as living documentation
- **Enhanced Team Collaboration**: Clear interfaces and contracts

## Setting Up Your Development Environment

Before we dive into coding, let's set up our development environment properly.

### Prerequisites

Make sure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn package manager
- A code editor (VS Code recommended)

### Creating a New Project

\`\`\`bash
npx create-react-app my-app --template typescript
cd my-app
npm start
\`\`\`

This command creates a new React application with TypeScript configured out of the box.

## Basic TypeScript Concepts

Let's cover some fundamental TypeScript concepts that are essential for React development.

### Types and Interfaces

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type Status = 'loading' | 'success' | 'error';
\`\`\`

### Component Props

\`\`\`typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
};
\`\`\`

## Advanced Patterns

### Custom Hooks with TypeScript

\`\`\`typescript
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState<number>(initialValue);
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1);
  }, []);
  
  return { count, increment, decrement };
}
\`\`\`

## Best Practices

1. **Always define prop types** - This helps with debugging and code maintenance
2. **Use strict TypeScript configuration** - Enable strict mode in your tsconfig.json
3. **Leverage utility types** - Use Pick, Omit, Partial for type manipulation
4. **Keep components small and focused** - Single responsibility principle applies

## Conclusion

TypeScript with React provides a powerful combination for building robust web applications. The initial learning curve is worth the long-term benefits of type safety, better tooling, and improved developer experience.

Happy coding!
    `,
    category: 'Web Development',
    author: 'John Doe',
    date: '2025-08-20',
    image: 'https://picsum.photos/id/237/200/300',
    readTime: '12 min read',
    tags: ['React', 'TypeScript', 'Web Development', 'JavaScript', 'Frontend'],
    views: 1248,
    likes: 156,
    shares: 23
  };

  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'Programming': 'bg-blue-100 text-blue-800 border-blue-200',
      'Web Development': 'bg-green-100 text-green-800 border-green-200',
      'Mobile Development': 'bg-purple-100 text-purple-800 border-purple-200',
      'AI & Machine Learning': 'bg-pink-100 text-pink-800 border-pink-200',
      'Data Science': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'DevOps': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Cybersecurity': 'bg-red-100 text-red-800 border-red-200',
      'Cloud Computing': 'bg-cyan-100 text-cyan-800 border-cyan-200'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`min-h-screen bg-gray-50 `}>
      {/* Hero Section with Blog Image */}
      <div className="relative">
        <div className="h-96 bg-gradient-to-r from-gray-900 to-gray-600 overflow-hidden">
          <img
            src={blogData.image}
            alt={blogData.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        {/* Blog Header Info */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(blogData.category)}`}>
                {blog?.category}
              </span>
              {blogData.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {blog?.title}
            </h1>
            <div className="flex flex-wrap items-center text-white/90 text-sm md:text-base gap-4">
              <span>By {blog?.author}</span>
              <span>•</span>
              <span>{formatDate(blogData.date)}</span>
              <span>•</span>
              <span>{blogData.readTime}</span>
              <span>•</span>
              <span>{blogData.views.toLocaleString()} views</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Action Buttons Section */}
        <div className="py-8 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Engagement Stats */}
            <div className="flex items-center space-x-6">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="font-medium">{blogData.likes}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="font-medium">{blogData.shares}</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-yellow-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="font-medium">Save</span>
              </button>
            </div>

            {/* Edit and Delete Buttons */}
            <div className="flex items-center space-x-3">
              <Link href={`update/${blogid}`}><button className="flex cursor-pointer items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>Edit Post</span>
              </button>
              </Link>
              <button onClick={deleteBlog} className="flex cursor-pointer items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <span>Delete Post</span>
              </button>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <article className="py-12">
          <div className="prose prose-lg max-w-none">
            {/* Content would be rendered here - for demo purposes showing as formatted text */}
            <div className="whitespace-pre-line text-gray-800 leading-relaxed">
              {blog?.content}
            </div>
          </div>
        </article>

        {/* Author Bio Section */}
        <div className="border-t border-gray-200 pt-12 pb-8">
          <div className="flex items-start space-x-6">
            <img
            //   src="https://via.placeholder.com/80x80/6B7280/FFFFFF?text=JD"
              alt={blogData.author}
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{blog?.author}</h3>
              <p className="text-gray-600 mb-4">
                Senior Full Stack Developer with 8+ years of experience in React, TypeScript, and Node.js. 
                Passionate about writing clean code and sharing knowledge with the developer community.
              </p>
              <div className="flex space-x-4">
                <button className="text-blue-600 hover:text-blue-700 transition-colors">
                  Follow
                </button>
                <button className="text-gray-600 hover:text-gray-700 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts Section */}
        <div className="border-t border-gray-200 pt-12 pb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Posts</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                //   src={`https://via.placeholder.com/300x150/8B5CF6/FFFFFF?text=Related+Post+${i}`}
                  alt={`Related Post ${i}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <span className="text-xs font-medium text-blue-600 mb-2 block">Web Development</span>
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    Advanced React Patterns You Should Know
                  </h4>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    Explore advanced React patterns that will make your code more maintainable and scalable.
                  </p>
                  <div className="text-xs text-gray-500">
                    5 min read • Aug 15, 2025
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default BlogDetailsPage;