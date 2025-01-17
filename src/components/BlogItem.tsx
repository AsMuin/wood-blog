import { assets } from '@/assets/assets';
import { BlogItemProps } from './BlogList';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogItem(props: BlogItemProps) {
    const { _id, title, description, image, category } = props;
    return (
        <div className="max-w-[330px] border border-black bg-white duration-500 hover:shadow-[-7px_7px_0px_rgba(0,0,0,0.8)] sm:max-w-[300px]">
            <Link href={`/blogs/${_id}`}>
                <Image className="h-[300px] w-[300px] border-b border-black" src={image} width={300} height={300} alt="blogImage" />
            </Link>

            <p className="ml-5 mt-5 inline-block bg-black px-1 text-sm text-white">{category}</p>
            <div className="p-5">
                <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-900">{title}</h5>
                <p className="mb-3 text-sm tracking-tight text-gray-700">{description}</p>
                <Link href={`/blogs/${_id}`}>
                    <div className="inline-flex items-center py-2 text-center font-semibold">
                        查看更多
                        <Image className="ml-2" src={assets.arrow} width={12} alt="read more" />
                    </div>
                </Link>
            </div>
        </div>
    );
}
