'use client'
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface CreateFormPageProps {
  className?: string;
}
interface Blog {
    id:number;
    title:string;
    category:string;
    content:string;
    author:string;
}

const UpdateBlog = ({params}:{params:
    Promise<{updateid:string}>
}) => {
    const route=useRouter()
  const[blog,setBlog]=useState<Blog | null>(null)
  const unwrappedParams = React.use(params)
  const {updateid}=unwrappedParams;
  //code to fetch the blog
  useEffect(()=>{
    const fetchData=async ()=>{
        const {data,error}=await supabase
        .from('blogs')
        .select()
        .eq('id',updateid)
        .single()

        if (error){
            console.error("Error Fetching the blog",error)
        }
        else {
            setFormData(data)
            // formData.title=data.title
            // formData.author=data.author
            // formData.category=data.category
            // formData.content=data.content 
        }
    }
    fetchData()
  },[])
  
  const [formData,setFormData]=useState({
    title:'',
    category:'',
    author:'',
    content:''
  })

  //code to handle the form change 
  const handleChange = (e:ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
    const {name,value}= e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  //code to handle the submit event
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const payload = {
      title:formData.title,
      category:formData.category,
      author:formData.author,
      content:formData.content
    }

    //console.log("From Payload",payload)
    try {
      const {data,error} = await supabase
    .from('blogs')
    .update(payload)
    .eq('id',updateid)

    if(error){
      throw new Error(error.message)
    }
    else{
      console.log("Blog Updated Success fully",data)
      route.back()
    }
    } catch (error) {
      // Handle the error
      console.error('Submission error:', error);
    }
    
  }
  const categories: string[] = [
    'Programming',
    'Web Development',
    'Mobile Development',
    'AI & Machine Learning',
    'Data Science',
    'DevOps',
    'Cybersecurity',
    'Cloud Computing',
    'Technology News',
    'Tutorials'
  ];

  return (
    <div className={`min-h-screen bg-gray-200 `}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create New Blog Post
          </h1>
          <p className="text-lg text-gray-600">
            Share your knowledge with the tech community
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white  rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6 text-black">
            {/* Title Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your blog post title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                required
               
              >
                <option value="" disabled>
                  Select a category...
                </option>
                {categories.map((category: string) => (
                  <option key={category} className=' bg-gray-200' value={category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Author Field */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                required
              />
            </div>

            {/* Content Field */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={12}
                placeholder="Write your blog post content here... You can use markdown formatting."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-vertical"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Tip: You can use Markdown syntax for formatting your content
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Update Post
              </button>
              <button
                type="button"
                className="flex-1 cursor-pointer bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="button"
                className="sm:flex-none cursor-pointer bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Preview
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Writing Tips
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Use a clear and descriptive title that captures the main topic
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Choose the most relevant category for better discoverability
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Structure your content with headings and bullet points for readability
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Include code examples and practical insights when applicable
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;