'use client';
import Table, { TableColumn } from '@/components/AdminComponents/Table';
import { IBlog } from '@/lib/models/BlogModel';
import { useState } from 'react';
import Image from 'next/image';

export default function BlogListPage() {
    const [blogList, setBlogList] = useState<IBlog[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | boolean>();

    const columns: TableColumn<IBlog>[] = [
        {
            key: 'title',
            header: '标题'
        },
        {
            key: 'author',
            header: '作者名字'
        },
        {
            key: 'description',
            header: '描述'
        },
        {
            key: 'category',
            header: '类别'
        },
        {
            key: 'image',
            header: '封面图',
            render: value => <Image className="max-h-14 w-12" src={typeof value === 'string' ? value : ''} alt="blogImage" />
        },
        {
            key: 'date',
            header: '发布日期'
        },
        {
            key: 'action',
            header: '操作',
            render: (value, rowData) => (
                <span className="cursor-pointer text-red-500" onClick={() => {}}>
                    删除
                </span>
            )
        }
    ];
    // async function onDeleteAlbum(id: string) {
    //     try {
    //         const newSongListResponse = {
    //             ...albumListResponse!,
    //             data: {
    //                 ...albumListResponse!.data,
    //                 itemList: albumList.filter(song => song._id !== id)
    //             }
    //         };
    //         const mutateOption = {
    //             optimisticData: newSongListResponse,
    //             rollbackOnError(error: any) {
    //                 return error.name !== 'AbortError';
    //             }
    //         };
    //         await mutate(deleteAlbum({ id }), mutateOption);
    //         showMessage({
    //             type: 'success',
    //             message: '删除成功'
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    return (
        <div>
            <p>博客列表</p>
            <br />
            <Table dataSource={blogList} columns={columns} isLoading={isLoading} isError={error} />
        </div>
    );
}
