'use client';
import { blog_data } from '@/assets/assets';
import BlogItem from './BlogItem';
import { StaticImageData } from 'next/image';
import { useState } from 'react';
export interface BlogItemProps {
    id: number | string;
    title: string;
    description: string;
    image: StaticImageData;
    date: number;
    category: string;
    author: string;
    author_img: StaticImageData;
}
export default function BlogList() {
    const [menu, setMenu] = useState('all');
    const menuList = [
        {
            key: 'all',
            label: '所有'
        },
        {
            key: 'Technology',
            label: '科技'
        },
        {
            key: 'Startup',
            label: 'StartUp'
        },
        {
            key: 'Lifestyle',
            label: '生活'
        }
    ];
    return (
        <div>
            <div className="my-10 flex justify-center gap-6">
                {menuList.map(item => (
                    <label
                        onClick={() => setMenu(item.key)}
                        key={item.key}
                        className={`cursor-pointer rounded-sm px-4 py-1 duration-300 hover:bg-black hover:text-white ${menu === item.key ? 'bg-black text-white' : 'text-black'}`}>
                        {item.label}
                        <input readOnly checked={menu === item.key} type="radio" hidden name="menu" />
                    </label>
                ))}
            </div>
            <div className="mg-16 flex flex-wrap justify-around gap-1 gap-y-10 xl:mx-24">
                {blog_data
                    .filter(blog => blog.category === menu || menu === 'all')
                    .map(blog => (
                        <BlogItem key={blog.id} {...blog} />
                    ))}
            </div>
        </div>
    );
}
