import React ,{useRef, useState}   from 'react'
import { LuUser,LuUpload,LuTrash } from 'react-icons/lu';

const Profileselector = ({image,setImage}) => {
    const inputRef = useRef(null);
    const [previewurl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(file);

          const previewurl = URL.createObjectURL(file);
          setPreviewUrl(previewurl);
        }
      };    

      const handelRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
      };        

      const onChooseFile = () => {
        inputRef.current.click();
      };    
  return (
    <div className='flex justify-center mb-6'>
        <input type="file"
        accept='image/*'
        ref={inputRef} onChange={handleImageChange}
        className='hidden' />

        {!image?(
            <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full cursor-pointer relative'>
                <LuUser className='text-4xl text-purple-600'/>
                <button 
                type='button'
                className='w-8 h-8 bg-purple-600 text-white rounded-full absolute bottom-1 right-1 flex items-center justify-center'
                onClick={onChooseFile}
                ><LuUpload/></button>
                </div>
        ):(
            <div className='relative'>
                <img src={previewurl} alt="profile" className='w-24 h-24 rounded-full object-cover' />
                <button 
                type='button'
                className='w-8 h-8 bg-red-600 text-white rounded-full absolute bottom-1 right-1 flex items-center justify-center'
                onClick={handelRemoveImage}
                ><LuTrash/></button>
            </div>
        )}
    </div>
  )
}

export default Profileselector