import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='bg-purple-200 md:flex justify-between px-4 items-center h-14 '>
        <div className='logo font-bold text-wrap text-center'>
            PassOp
        </div>
        <ul>
            <li className='flex gap-4 justify-center'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="/">About</a>
                <a className='hover:font-bold' href="/">Contact Us</a>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar
