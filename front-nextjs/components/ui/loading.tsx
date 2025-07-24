import React from 'react'

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70">
    <div className="relative opacity-100">
      <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-emerald-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-transparent border-r-transparent border-b-blue-300 border-l-transparent rounded-full animate-spin animate-reverse"></div>
    </div>
  </div>
  )
}

export default Loading
