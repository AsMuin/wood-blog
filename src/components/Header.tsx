'use client';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useState } from 'react';
import { showMessage } from './MessageManager';
export default function Header() {
    const [email, setEmail] = useState('');
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch('/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    showMessage({
                        type: 'success',
                        message: '订阅成功'
                    });
                    setEmail('');
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => {
                console.error(error);
                showMessage({
                    type: 'error',
                    message: error instanceof Error ? error.message : '订阅失败'
                });
            });
    }
    return (
        <div className="px-5 py-5 md:px-12 lg:px-28">
            <div className="flex items-center justify-between">
                <Image className="w-[130px] sm:w-auto" src={assets.logo} alt="logo" />
                <button className="flex items-center gap-2 rounded-sm border border-solid border-black px-3 py-1 font-medium shadow-[-7px_7px_0px_rgba(0,0,0,0.8)] sm:px-6 sm:py-3">
                    开始
                    <Image src={assets.arrow} alt="arrow" />
                </button>
            </div>
            <div className="my-8 text-center">
                <h1 className="text-3xl font-medium sm:text-5xl">最新博客</h1>
                <p className="mx-auto mt-10 max-w-[740px] text-xs sm:text-base">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus deserunt temporibus perspiciatis dignissimos eos commodi
                    alias dolor ipsam cum. Esse ullam beatae consequuntur temporibus aut quam voluptatem voluptates quod minima.
                </p>
                <form
                    className="mx-auto mt-10 flex max-w-[500px] scale-75 justify-between border border-black shadow-[-14px_14px_0px_rgba(0,0,0,0.8)] sm:scale-100"
                    onSubmit={onSubmit}>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full pl-4 outline-none"
                        type="email"
                        placeholder="请输入你的邮箱"
                    />
                    <button className="border-l border-black px-4 py-4 active:bg-slate-600 active:text-white sm:px-8">订阅</button>
                </form>
            </div>
        </div>
    );
}
