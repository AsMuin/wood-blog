'use client';
import Table, { TableColumn } from '@/components/AdminComponents/Table';
import { IBlog } from '@/lib/models/BlogModel';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { showMessage } from '@/components/MessageManager';

export default function BlogListPage() {
    const [blogList, setBlogList] = useState<IBlog[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | boolean>();

    async function deleteBlog(id: string) {
        try {
            const res = await fetch(`${window.location.origin}/api/blogs`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            const response = await res.json();
            if (response.success) {
                fetchBlog();
            }
        } catch (error) {
            console.error(error);
            showMessage({
                type: 'error',
                message: error instanceof Error ? error.message : '删除失败'
            });
        }
    }

    async function fetchBlog(signal?: AbortSignal) {
        try {
            setIsLoading(true);
            const res = await fetch(`${window.location.origin}/api/blogs`, { signal });
            const response = await res.json();
            setIsLoading(false);
            if (response.success) {
                const blogList: IBlog[] = response.data.itemList;
                if (blogList && blogList.length > 0) {
                    setBlogList(blogList);
                }
            } else {
                return Promise.reject('数据请求出错');
            }
        } catch (error) {
            setIsLoading(false);
            setError(error instanceof Error ? error.message : '数据请求出错');
        }
    }
    useEffect(() => {
        const abortController = new AbortController();
        fetchBlog(abortController.signal);
        return () => {
            if (!abortController.signal.aborted) {
                abortController.abort();
            }
        };
    }, []);
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
            render: value => <Image className="max-h-14 w-12" width={48} height={56} src={typeof value === 'string' ? value : ''} alt="blogImage" />
        },
        {
            key: 'date',
            header: '发布日期',
            render: value => new Date(value as Date).toLocaleDateString()
        },
        {
            key: 'action',
            header: '操作',
            render: (value, rowData) => (
                <span className="cursor-pointer text-red-500" onClick={() => deleteBlog(rowData._id)}>
                    删除
                </span>
            )
        }
    ];
    return (
        <div>
            <p>博客列表</p>
            <br />
            <Table dataSource={blogList} columns={columns} isLoading={isLoading} isError={error} />
        </div>
    );
}
