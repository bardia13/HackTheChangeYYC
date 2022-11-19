import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
	   <div className='p-8 justify-center items-center h-screen flex'>
        <form className='flex'>
            <input className='shadow-inner rounded-l p-2 flex-1' id='video-link' type='text' placeholder='https://youtube.com/?v=1234' />
            <button className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r' type='submit'>
                Play
            </button>
      </form>
    </div>
  )
}
