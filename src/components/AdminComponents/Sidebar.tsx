import { assets } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
export default function Sidebar() {
    const navbarList = [
        {
            icon: assets.add_icon,
            title: '添加博客',
            path: '/admin/addBlog'
        },
        {
            icon: assets.blog_icon,
            title: '管理博客',
            path: '/admin/blogList'
        },
        {
            icon: assets.email_icon,
            title: '管理订阅',
            path: '/admin/subscription'
        }
    ];
    return (
        <div className="flex min-h-screen flex-col border border-black bg-slate-100">
            <div className="h-[60px] border-b border-black px-2 py-3 sm:pl-14">
                <Image className="h-full" src={assets.logo} alt="logo" />
            </div>
            <div className="relative w-28 py-12 pr-2 sm:w-80">
                <div className="ml-auto flex w-[50%] flex-col gap-10 sm:w-[80%]">
                    {navbarList.map((item, index) => {
                        return (
                            <Link
                                href={item.path}
                                key={index}
                                className="mb-2 flex items-center gap-3 border border-black bg-white px-3 py-2 font-medium shadow-[-5px_5px_0px_rgba(0,0,0,0.8)]">
                                <Image src={item.icon} width={28} alt="add" />
                                <p>{item.title}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
