import { assets } from '@/assets/assets';
import Sidebar from '@/components/AdminComponents/Sidebar';
import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex w-full flex-col border-t border-black bg-slate-100">
                    <div className="flex max-h-[60px] w-full items-center justify-between border-b border-black bg-slate-100 px-12 py-3">
                        <h3 className="font-medium">管理后台</h3>
                        <Image src={assets.profile_icon} width={40} alt="profile" />
                    </div>
                    <div className="px-10 py-5">{children}</div>
                </div>
            </div>
        </>
    );
}
