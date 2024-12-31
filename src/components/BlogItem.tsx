import { assets } from '@/assets/assets';
import { BlogItemProps } from './BlogList';
import Image from 'next/image';

export default function BlogItem(props: BlogItemProps) {
    const { title, description, image, category } = props;
    return (
        <div className="max-w-[330px] border border-black bg-white duration-500 hover:shadow-[-7px_7px_0px_rgba(0,0,0,0.8)] sm:max-w-[300px]">
            <Image className="border-b border-black" src={image} width={400} height={400} alt="blogImage" />
            <p className="ml-5 mt-5 inline-block bg-black px-1 text-sm text-white">{category}</p>
            <div className="p-5">
                <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
                <p className="mb-3 text-sm tracking-tight text-gray-700">{description}</p>
                <div className="inline-flex items-center py-2 text-center font-semibold">
                    查看更多
                    <Image className="ml-2" src={assets.arrow} width={12} alt="read more" />
                </div>
            </div>
        </div>
    );
}
