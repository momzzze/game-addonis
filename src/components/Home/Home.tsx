import React from 'react'
import { getAuth } from 'firebase/auth'


function Home() {
    const { currentUser } = getAuth();
  return (
    <div>
        <h1 className='text-bold text-3xl'>Home</h1>
        {currentUser ? (<h2 className='text-bold text-2xl'>Welcome {currentUser?.email}</h2>):(<h2 className='text-bold text-2xl'>Welcome Guest</h2>)}
    </div>
  )
}

export default Home