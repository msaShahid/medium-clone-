"use client"
import React ,{useState, useRef} from 'react';
import AddArticalNav from './AddArticalNav';
import { Input } from '../ui/input';
import { Image } from 'lucide-react';
import ImagePreview from '../common/ImagePreview';
import Tiptap from './Tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOptions';
import axios from 'axios';
import { POST_URL } from '@/lib/ApiEndPoint';
import { toast } from 'react-toastify';
import {useRouter} from 'next/navigation'


export default function AddArtical({user}:{user:CustomUser}) {

  const router = useRouter()
  const imgRef = useRef<HTMLInputElement | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>()
  const [title, setTitle] = useState<string>("")
  const [shortDesc, setShortDesc] = useState<string>("")
  const [loading, setloading] = useState(false)

  // Tiptap Editor
  const editor = useEditor({
    extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: 'Write something …',

          }),
    ],
    content: 'Write...',
  })

  const removeImage = () => {
    setImage(null);
    setImageUrl(undefined);
  }

  const handleImageClick = () => {
    imgRef.current?.click();
  }
  const handleImage = (event:React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log('the file is present : ', file);
    if(file){
      setImage(file)
      const imageUrl = URL.createObjectURL(file)
      setImageUrl(imageUrl)
    }
  }

  // Handle Post submit
  const handleSubmit = () => {
   // alert('hello')
    setloading(true)
    const formData = new FormData()
    const html = editor?.getHTML();
    formData.append('title', title);
    formData.append('short_description', shortDesc);
    formData.append('content',html ?? "" );
    if(image){
      formData.append('image', image)
    }

    // send request
    axios.post(POST_URL, formData, {
          headers:{
            Authorization: `Bearer ${user.token}`,
            Accept: 'Application/json'
          }
    }).then((res) => {
          setloading(false)
          toast.success("Post created successfully!", {theme:"colored"})
          router.push("/dashboard")
    }).catch((err) => {
          setloading(false)
          toast.error("Error at time of post", {theme:"colored"})
    })

  }

  return (
    <div>
        <AddArticalNav title={title} callback={handleSubmit} loading={loading}/>
        <div className="container mx-auto p-6">

            {imageUrl && <ImagePreview url={imageUrl} callback={removeImage}/>}

            <div className="mt-4 flex items-center">
                <Input
                type='file'
                className='hidden'
                ref={imgRef}
                accept='image/png,image/jpeg,image/svg,image/jpg,image/gif'
                onChange={handleImage}
                />
                <Image
                size={30}
                className='cursor-pointer rounded-full border border-gray-300 hover:border-blue-500 transition duration-200 ease-in-out'
                onClick={handleImageClick}
                />
            </div>
            
            <div className="mt-4">
                <Input
                className='outline-none h-10 text-xl font-bold border-no w-2/4'
                placeholder="Enter your title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            
            <div className="mt-4">
                <Input
                className='outline-none h-10 text-xl font-bold border-no w-2/4'
                placeholder="Enter your short description"
                value={shortDesc}
                onChange={(event) => setShortDesc(event.target.value)}
                />
            </div>
            <div className="mt-4 w-2/4">
                <Tiptap editor={editor}/>
            </div>

        </div>
    </div>
  )
}
