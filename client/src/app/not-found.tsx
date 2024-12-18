"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
        <Image src="/404.svg" alt='not found' width={500} height={500} />
        <Link href='/'>
            <Button>Back to home</Button>
        </Link>
    </div>
  )
}
