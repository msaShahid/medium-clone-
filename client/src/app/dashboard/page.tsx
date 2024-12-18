import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import AppNav from '@/components/common/AppNav'
import { fetchUserPosts } from '@/lib/ApiService'
import PostsList from '@/components/dashboard/PostsList'

export default async function Dashboard() {

    const session:CustomSession | null  = await getServerSession(authOptions)
    const posts: Array<Post> | null = await fetchUserPosts(session!.user!)
   // console.log("Post List : ",posts);

  return (
    <div>
        <AppNav session={session}/>
        <div className="container mt-5">
          <PostsList posts={posts}/>
        </div>
        
    </div>
  )
}
