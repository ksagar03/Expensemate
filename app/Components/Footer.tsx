import React from 'react'


const Footer = () => {
  return (
    <footer className="sm:px-16 py-5 px-8 mt-20 flex justify-center items-center flex-wrap border-t-2 border-black">
    <p className="text-base font-semibold">
      {new Date().getFullYear()} &copy; All Rights
    </p>
  </footer>
  )
}

export default Footer
