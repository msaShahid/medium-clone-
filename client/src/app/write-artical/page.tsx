
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/authOptions'
import { getServerSession } from 'next-auth'
import AddArtical from '@/components/artical/AddArtical'


export default async function WriteArtical() {

  const session:CustomSession | null  = await getServerSession(authOptions)

  return (
    <div>
      <AddArtical user={session?.user!}/>

    </div>
   
   
  )
}
