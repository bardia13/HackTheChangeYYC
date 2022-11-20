import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRouter} from 'next/router'
import {useState} from "react"

export default function Home() {
    const router = useRouter()

    const submitContact = async (event) => {
        event.preventDefault();
        const link = event.target[0].value;
        router.push("/video")
    };

    return (
        <div className='p-8 justify-center items-center h-screen flex'>
            <form className='flex' onSubmit={submitContact}>
                <input className='shadow-inner rounded-l p-2 flex-1' id='video-link' type='text'
                       placeholder='https://youtube.com/?v=1234' name="link"/>
                <button className='bg-blue-600 hover:bg-blue-700 duration-300 text-white shadow p-2 rounded-r'
                        type='submit'>
                    Play
                </button>
            </form>
        </div>
    )
}
