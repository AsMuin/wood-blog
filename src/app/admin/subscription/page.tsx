'use client';
import Table, { TableColumn } from '@/components/AdminComponents/Table';
import { useEffect, useState } from 'react';
import { showMessage } from '@/components/MessageManager';
import { IEmail } from '@/lib/models/EmailModel';

export default function BlogListPage() {
    const [emailList, setEmailList] = useState<IEmail[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | boolean>();

    async function deleteEmail(id: string) {
        try {
            const res = await fetch(`${window.location.origin}/api/email`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            const response = await res.json();
            if (response.success) {
                fetchEmail();
            }
        } catch (error) {
            console.error(error);
            showMessage({
                type: 'error',
                message: error instanceof Error ? error.message : '删除失败'
            });
        }
    }

    async function fetchEmail(signal?: AbortSignal) {
        try {
            setIsLoading(true);
            const res = await fetch(`${window.location.origin}/api/email`, { signal });
            const response = await res.json();
            setIsLoading(false);
            if (response.success) {
                const emailList: IEmail[] = response.data.itemList;
                if (emailList && emailList.length > 0) {
                    setEmailList(emailList);
                }
            } else {
                return Promise.reject('数据请求出错');
            }
        } catch (error) {
            setIsLoading(false);
            if (error instanceof Error && error.name === 'AbortError') {
                return;
            } else {
                setError(error instanceof Error ? error.message : '数据请求出错');
            }
        }
    }
    useEffect(() => {
        const abortController = new AbortController();
        fetchEmail(abortController.signal);
        return () => {
            if (!abortController.signal.aborted) {
                abortController.abort();
            }
        };
    }, []);
    const columns: TableColumn<IEmail>[] = [
        {
            key: 'email',
            header: '邮箱'
        },
        {
            key: 'date',
            header: '订阅时间',
            render: value => new Date(value).toLocaleString()
        },

        {
            key: 'action',
            header: '操作',
            render: (value, rowData) => (
                <span className="cursor-pointer text-red-500" onClick={() => deleteEmail(rowData._id)}>
                    删除
                </span>
            )
        }
    ];
    return (
        <div>
            <p>订阅列表</p>
            <br />
            <Table dataSource={emailList} columns={columns} isLoading={isLoading} isError={error} />
        </div>
    );
}
