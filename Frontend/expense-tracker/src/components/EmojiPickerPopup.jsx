import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { LuImage, LuX } from 'react-icons/lu';

const EmojiPickerPopup = ({ icon, onselect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6 relative'>
      {/* Icon Display + Button */}
      <div className='flex items-center gap-4 cursor-pointer' onClick={() => setIsOpen(true)}>
        <div className='w-12 h-12 flex items-center justify-center text-2xl bg-purple-500 rounded-full overflow-hidden'>
          {icon ? (
            <img src={icon} alt="emoji" className='w-12 h-12 object-cover' />
          ) : (
            <LuImage className='w-6 h-6 text-white' />
          )}
        </div>
        <p className='text-sm font-medium text-gray-700'>
          {icon ? 'Change Icon' : 'Pick Icon'}
        </p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className='absolute z-50 top-20 left-0 bg-white rounded-lg shadow-lg'>
          <button
            className='w-7 h-7 flex items-center justify-center text-white bg-purple-600 rounded-full absolute top-2 right-2 z-50'
            onClick={() => setIsOpen(false)}
          >
            <LuX className='w-4 h-4' />
          </button>

          <div className='p-4'>
            <EmojiPicker
              open={isOpen}
              onEmojiClick={(emojiData) => {
                onselect(emojiData?.imageUrl || "");
                setIsOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
