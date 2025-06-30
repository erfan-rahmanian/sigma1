
import React from 'react';

const Settings = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">تنظیمات</h2>
      
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-700">تنظیمات پیش‌فرض</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">تصویر پس‌زمینه</label>
          <div className="mt-2 flex items-center">
             <div className="w-full">
                 <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary-maroon hover:text-primary-maroon-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-maroon">
                    <div className="flex justify-center items-center px-6 py-4 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                             <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                             </svg>
                            <div className="flex text-sm text-gray-600">
                                <span className="text-primary-maroon font-semibold">انتخاب تصویر پس‌زمینه</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </div>
                            <p className="text-xs text-gray-500">فایل انتخاب نشده</p>
                        </div>
                    </div>
                </label>
             </div>
          </div>
          <p className="mt-1 text-xs text-gray-500">فرمت‌های مجاز: JPG, PNG (حداکثر سایز: 2MB)</p>
        </div>
        
        <div className="flex justify-end pt-4 space-x-3 space-x-reverse">
          <button className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300">حذف تنظیمات</button>
          <button className="bg-primary-maroon text-white px-6 py-2 rounded-md hover:bg-primary-maroon-light">اعمال تغییرات</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
