"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function AddArticalNav({
  title, 
  callback,
  loading
}:{
  title:string, 
  callback:() => void,
  loading: boolean
}
) {
  return (
    <div className='p-2 border-b'>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
              <Image src="/logo.png" alt='logo' width={40} height={40}/>
            
          </Link>
          <p> Write Artical</p>
        </div>
        <Button disabled={title.length < 5 || loading} onClick={callback}>
          {loading ? "Procssing...": "Save"}
        </Button>
      </div>
    </div>
  )
}
