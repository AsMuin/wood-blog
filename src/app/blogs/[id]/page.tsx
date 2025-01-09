import { assets } from '@/assets/assets';
import Image from 'next/image';
import Footer from '@/components/Footer';
import Link from 'next/link';
export default async function BlogPage({ params }: { params: { id: string | number } }) {
    const { id } = await params;
    const response = await fetch(`${process.env.APP_BASEURL}/api/blogs?id=${id}`);
    const { data: blogData } = await response.json();
    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex flex-1 flex-col bg-gray-200 px-5 py-5 md:px-12 lg:px-28">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <Image src={assets.logo} alt="logo" className="w-auto sm:w-[max(130px,12vw)]" />
                    </Link>
                    <button className="flex items-center gap-2 border border-black px-3 py-1 font-medium shadow-[-7px_7px_0px_rgba(0,0,0,0.8)] sm:px-6 sm:py-3">
                        开始
                        <Image src={assets.arrow} alt="get started" />
                    </button>
                </div>
                {blogData ? (
                    <>
                        <div className="mt-24 text-center">
                            <h1 className="mx-auto max-w-[700px] text-2xl font-semibold sm:text-5xl">{blogData?.title}</h1>
                            <Image
                                className="mx-auto mt-6 max-h-14 max-w-14 rounded-full border border-white"
                                width={60}
                                height={60}
                                src={blogData.author_img || assets.profile_icon}
                                alt="authorImage"
                            />
                            <p className="mx-auto mt-1 max-w-[740px] pb-2 text-lg">{blogData.author}</p>
                        </div>
                        <div className="mx-5 mb-10 max-w-[800px] md:mx-auto">
                            <Image className="mx-auto min-w-96 shadow-lg" src={blogData.image} width={400} height={720} alt="blogImage" />
                            <h1 className="my-8 text-[26px] font-semibold">介绍：</h1>
                            <p>{blogData.description}</p>
                            <h3 className="my-5 text-[18px] font-semibold">
                                步骤一： Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus harum aspernatur veniam tempore,
                                architecto in tenetur nihil sequi hic debitis explicabo fuga beatae dicta. Dolorum voluptatibus id nam quod dolorem.
                            </h3>
                            <p className="my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, perferendis, aliquam odit debitis eos culpa ex
                                exercitationem qui numquam expedita deserunt amet minus nam iste aliquid, sint rem assumenda accusantium?
                            </p>
                            <p className="my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, perferendis, aliquam odit debitis eos culpa ex
                                exercitationem qui numquam expedita deserunt amet minus nam iste aliquid, sint rem assumenda accusantium?
                            </p>
                            <h3 className="my-5 text-[18px] font-semibold">
                                步骤二： Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus harum aspernatur veniam tempore,
                                architecto in tenetur nihil sequi hic debitis explicabo fuga beatae dicta. Dolorum voluptatibus id nam quod dolorem.
                            </h3>
                            <p className="my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, perferendis, aliquam odit debitis eos culpa ex
                                exercitationem qui numquam expedita deserunt amet minus nam iste aliquid, sint rem assumenda accusantium?
                            </p>
                            <p className="my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, perferendis, aliquam odit debitis eos culpa ex
                                exercitationem qui numquam expedita deserunt amet minus nam iste aliquid, sint rem assumenda accusantium?
                            </p>
                            <h3 className="my-5 text-[18px] font-semibold">
                                步骤三： Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus harum aspernatur veniam tempore,
                                architecto in tenetur nihil sequi hic debitis explicabo fuga beatae dicta. Dolorum voluptatibus id nam quod dolorem.
                            </h3>
                            <p className="my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, perferendis, aliquam odit debitis eos culpa ex
                                exercitationem qui numquam expedita deserunt amet minus nam iste aliquid, sint rem assumenda accusantium?
                            </p>
                            <p className="my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, perferendis, aliquam odit debitis eos culpa ex
                                exercitationem qui numquam expedita deserunt amet minus nam iste aliquid, sint rem assumenda accusantium?
                            </p>
                            <h3 className="my-5 text-[18px] font-semibold">总结：</h3>
                            <p className="my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, perferendis, aliquam odit debitis eos culpa ex
                                exercitationem qui numquam expedita deserunt amet minus nam iste aliquid, sint rem assumenda accusantium?
                            </p>
                            <p className="my-3">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, perferendis, aliquam odit debitis eos culpa ex
                                exercitationem qui numquam expedita deserunt amet minus nam iste aliquid, sint rem assumenda accusantium?
                            </p>
                            <div className="my-24">
                                <p className="my-4 font-semibold text-black">分享该文章到你的社交媒体中</p>
                                <div className="flex">
                                    <Image src={assets.facebook_icon} width={50} alt="facebook" />
                                    <Image src={assets.twitter_icon} width={50} alt="twitter" />
                                    <Image src={assets.googleplus_icon} width={50} alt="googleplus" />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <h1 className="grid h-full flex-1 place-content-center text-3xl font-semibold">抱歉，没找到该文章</h1>
                )}
            </div>
            <Footer />
        </div>
    );
}
