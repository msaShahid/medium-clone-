import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

export default function ImagePreview({url,callback}:{url:string, callback:() => void} ) {
  return (
    <div >
        <div className="relative">
            <Image className='w-full object-contain rounded-2xl'
                    src={url} alt="Preview"  width={100} height={100}/>

            <div className="absolute top-0 right-2">
                <Button size="sm" className='mt-2' onClick={callback}>
                    <X/>
                </Button>
            </div>

        </div>
        
    </div>
  )
}
