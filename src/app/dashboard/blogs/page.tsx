'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { supabase } from '@/lib/supabase'
interface Blogs {
  id:string,
  title:string,
  content:string,
  date:Date,
  category:string,
  author:string,
}
const Blogs = () => {
  const [blogs,setBlogs]=useState <Blogs []>([])
  useEffect(()=>{
    const fetchData = async () =>{
      const {data,error}= await supabase
      .from('blogs')
      .select('*')

      if (error){
        console.error("Error Fetching the blogs")
      }
      else {
        // console.log("Fetched",data)
        setBlogs(data)
      }
    }
    fetchData()
  },[])
  return (
      <div>
        <Table>
  <TableCaption className='text-xl font-semibold'>A list of all Blogs.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Title</TableHead>
      <TableHead>Author</TableHead>
      <TableHead>Content</TableHead>
      <TableHead>Category</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  
  <TableBody>
    {blogs.map((blog)=>(
    <TableRow key={blog.id}>
      <TableCell>{blog.title}</TableCell>
      <TableCell>{blog.author}</TableCell>
      <TableCell className="whitespace-normal break-words max-w-xs">{blog.content}</TableCell>
      <TableCell>{blog.category}</TableCell>
      <TableCell className='flex gap-2'>
        <button className='bg-[#04AA6D] hover:bg-[#067f52] hover:duration-300 px-4 py-1 rounded-sm font-semibold cursor-pointer'>Edit</button>
        <button className='bg-[#f44336] hover:bg-[#ba3228] hover:duration-300 px-3 py-1 rounded-sm font-semibold cursor-pointer'>Delete</button>
      </TableCell>
    </TableRow>
     ))}
  </TableBody>
 
</Table>
      </div>
  )
}

export default Blogs
