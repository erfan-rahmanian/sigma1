import React, { useState } from 'react';
import { ArrowRightIcon, MessageIcon } from '../components/icons';

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const Messages = () => {
    const [activeMobileView, setActiveMobileView] = useState<'list' | 'chat'>('list');
    const [selectedChat, setSelectedChat] = useState<{ id: string, name: string } | null>(null);

    const handleSelectChat = (chat: { id: string, name: string }) => {
        setSelectedChat(chat);
        setActiveMobileView('chat');
    };

    const handleBackToList = () => {
        setSelectedChat(null);
        setActiveMobileView('list');
    };

    const dummyContacts = [
        { id: '1', name: 'کاربر ناشناس' },
    ];

  return (
    <div className="bg-white rounded-lg shadow-md h-[calc(100vh-8rem)] md:h-auto md:min-h-[calc(100vh-6rem)] flex overflow-hidden">
        
        {/* Contact list Pane */}
        <div className={`${activeMobileView === 'list' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-1/3 md:border-l bg-white overflow-y-auto`}>
           <div className="p-4 border-b">
                <h2 className="text-xl font-bold text-gray-800">پیام‌ها</h2>
            </div>
          <div className="p-4 border-b flex justify-between items-center">
             <h3 className="font-bold text-gray-700">پیام های جدید</h3>
             <span className="bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold">۱</span>
          </div>
          <div className="p-2 space-y-2 flex-1">
            {dummyContacts.map(contact => (
                <div key={contact.id} onClick={() => handleSelectChat(contact)} className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <UserIcon />
                  <div className="mr-3">
                    <p className="font-semibold text-gray-800">{contact.name}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>

        {/* Chat window Pane */}
        <div className={`${activeMobileView === 'chat' ? 'flex' : 'hidden'} md:flex flex-1 flex-col`}>
          {selectedChat ? (
            <>
            <div className="p-4 border-b flex items-center bg-gray-50">
                <button onClick={handleBackToList} className="md:hidden ml-4 text-gray-600 p-1 rounded-full hover:bg-gray-200">
                    <ArrowRightIcon />
                </button>
                <div className="flex items-center">
                    <UserIcon />
                    <h3 className="font-bold text-lg text-gray-800 mr-3">{selectedChat.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mr-auto">۱۴۰۲-۰۳-۲۸</p>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-100 flex flex-col">
                {/* Other person's message (left aligned) */}
                <div className="flex justify-start">
                    <div className="bg-primary-maroon text-white p-3 rounded-lg max-w-md shadow-sm">
                        <p className="font-semibold">سلام</p>
                        <p className="text-xs text-gray-200 text-left mt-1">۱۴۰۲-۰۳-۲۸ - ۱۲:۱۴</p>
                    </div>
                </div>
                
                {/* Other person's second message (left aligned) */}
                <div className="flex justify-start">
                    <div className="bg-primary-maroon text-white p-3 rounded-lg max-w-md shadow-sm">
                        <p className="font-semibold">سلام</p>
                        <p className="text-xs text-gray-200 text-left mt-1">۱۴۰۲-۰۳-۲۸ - ۱۲:۱۳</p>
                    </div>
                </div>

                 {/* User's message (right aligned) */}
                 <div className="flex justify-end">
                    <div className="bg-white border p-3 rounded-lg max-w-md shadow-sm">
                        <p className="font-semibold text-gray-800">...</p>
                        <p className="text-xs text-gray-500 text-left mt-1">۱۴۰۲-۰۳-۲۸ - ۱۲:۱۲</p>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t">
                <div className="flex items-center">
                <input 
                    type="text" 
                    placeholder="پیام خود را بنویسید..." 
                    className="flex-1 p-3 border rounded-r-md bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-maroon"
                />
                <button className="bg-primary-maroon text-white px-4 py-3 rounded-l-md hover:bg-primary-maroon-light flex items-center gap-2">
                    <span className="hidden sm:inline">ارسال</span>
                    <SendIcon />
                </button>
                </div>
            </div>
            </>
          ) : (
            <div className="hidden md:flex flex-col items-center justify-center h-full text-gray-500 bg-gray-50">
                <MessageIcon className="w-12 h-12 text-gray-400" />
                <p className="mt-2">یک گفتگو را برای شروع انتخاب کنید</p>
            </div>
          )}
        </div>

    </div>
  );
};

export default Messages;