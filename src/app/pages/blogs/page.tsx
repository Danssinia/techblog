'use client'
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  date: string;
  image: string;
  readTime: string;
}

interface BlogsPageProps {
  className?: string;
}

const BlogsPage: React.FC<BlogsPageProps> = ({ className = '' }) => {
  //state to handle the fetched data
  const [blogs,setBlogs]=useState<BlogPost[]>([])
  //Code to handle the blog fecthing
  useEffect(()=>{
    const fetchData = async () =>{
      const {data,error} = await supabase
      .from('blogs')
      .select()
      if(error){
        console.error("Error Fetching Data",error)
      } 
      else{
        setBlogs(data)
      }
    }
    fetchData()
  },[])

  // Sample data for UI demonstration - replace with your actual data fetching logic
  // const sampleBlogs: BlogPost[] = [
  //   {
  //     id: '1',
  //     title: 'Getting Started with React TypeScript',
  //     content: 'Learn how to set up a React project with TypeScript and build type-safe applications. This comprehensive guide covers everything from basic setup to advanced patterns...',
  //     category: 'Web Development',
  //     author: 'John Doe',
  //     date: '2025-08-20',
  //     image: 'https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=React+TypeScript',
  //     readTime: '5 min read'
  //   },
  //   {
  //     id: '2',
  //     title: 'Machine Learning Fundamentals',
  //     content: 'Dive into the world of machine learning with this beginner-friendly introduction. We\'ll explore key concepts, algorithms, and practical applications...',
  //     category: 'AI & Machine Learning',
  //     author: 'Jane Smith',
  //     date: '2025-08-19',
  //     image: 'https://via.placeholder.com/400x200/8B5CF6/FFFFFF?text=Machine+Learning',
  //     readTime: '8 min read'
  //   },
  //   {
  //     id: '3',
  //     title: 'DevOps Best Practices for 2025',
  //     content: 'Discover the latest DevOps trends and best practices that will help your team deliver software faster and more reliably. From CI/CD to monitoring...',
  //     category: 'DevOps',
  //     author: 'Mike Johnson',
  //     date: '2025-08-18',
  //     image: 'https://via.placeholder.com/400x200/10B981/FFFFFF?text=DevOps+2025',
  //     readTime: '6 min read'
  //   }
  // ];

  const categories: string[] = [
    'All Categories',
    'Programming',
    'Web Development',
    'Mobile Development',
    'AI & Machine Learning',
    'Data Science',
    'DevOps',
    'Cybersecurity',
    'Cloud Computing'
  ];

  const getCategoryColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
      'Programming': 'bg-blue-100 text-blue-800',
      'Web Development': 'bg-green-100 text-green-800',
      'Mobile Development': 'bg-purple-100 text-purple-800',
      'AI & Machine Learning': 'bg-pink-100 text-pink-800',
      'Data Science': 'bg-yellow-100 text-yellow-800',
      'DevOps': 'bg-indigo-100 text-indigo-800',
      'Cybersecurity': 'bg-red-100 text-red-800',
      'Cloud Computing': 'bg-cyan-100 text-cyan-800'
    };
    return colorMap[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const truncateContent = (content: string, maxLength: number = 150): string => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className} text-black`}>
  
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Latest Blog Posts
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Discover insights, tutorials, and the latest trends in technology
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700 mr-2 self-center">Filter by:</span>
              {categories.map((category: string) => (
                <button
                  key={category}
                  className="px-4 py-2 text-sm font-medium rounded-full border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog: BlogPost) => (
            <article key={blog.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              {/* Blog Image */}
              <div className="relative overflow-hidden">
                <img
                  src='https://picsum.photos/seed/picsum/200/300'
                  alt={blog.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span>{formatDate(blog.date)}</span>
                  <span className="mx-2">•</span>
                  <span>{blog.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>By {blog.author}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {truncateContent(blog.content)}
                </p>

                <div className="flex items-center justify-between">
                  <Link href={`blogs/${blog.id}`}>
                  <button className="text-blue-600 cursor-pointer font-medium hover:text-blue-700 transition-colors">
                    Read More →
                  </button>
                  </Link>
                  
                  <div className="flex items-center space-x-3">
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-blue-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-yellow-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Load More Posts
          </button>
        </div>

        {/* Empty State (show when no blogs) */}
        {/* Uncomment this section when you want to show empty state
        <div className="text-center py-16">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No blog posts found</h3>
          <p className="text-gray-500 mb-6">There are no blog posts matching your criteria.</p>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            Clear all filters
          </button>
        </div>
        */}
      </div>
    </div>
  );
};

export default BlogsPage;