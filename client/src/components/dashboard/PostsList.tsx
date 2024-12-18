"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Trash } from 'lucide-react'
import { formatDate } from '@/lib/utils'
  
export default function PostsList({posts}:{posts:Array<Post> | null}) {
  console.log("Datatable : ", posts);
  
  if (!posts) {
    return <p>Loading posts...</p>;
  }

  if (posts.length > 0) {
    return <p>No posts available.</p>;
  }
  return (
    <>
    {posts && 
      <Table>
          <TableCaption>A list of your recent posts.</TableCaption>
          <TableHeader>
              <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>action</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length > 0 && posts.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.image ?? 'N/A'}</TableCell>
                <TableCell>{formatDate(item.craeted_at)}</TableCell>
                <TableCell className='text-right'>
                      <Trash color='red'/>
                </TableCell>
              </TableRow>
            ))}
              
          </TableBody>
      </Table>
    }
    </>

  )
}
