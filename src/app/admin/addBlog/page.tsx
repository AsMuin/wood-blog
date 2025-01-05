'use client';
import Form, { FieldProps, UploadFieldProps } from '@/components/AdminComponents/Form';
import { IBlog } from '@/lib/models/BlogModel';
import { useState } from 'react';

export default function AddBlogPage() {
    const [isError, setIsError] = useState(false);
    const formUploadConfig: UploadFieldProps[] = [
        {
            key: 'image',
            label: '图片',
            uploadAccept: 'image/*',
            options: {
                required: '图片不能为空'
            }
        }
    ];
    const formInputConfig: FieldProps[] = [
        {
            key: 'title',
            label: '标题',
            placeholder: '请输入标题',
            options: {
                required: '标题不能为空'
            },
            type: 'text'
        },
        {
            key: 'description',
            label: '描述内容',
            placeholder: '请输入描述内容',
            options: {
                required: '描述内容不能为空'
            },
            type: 'text'
        },
        {
            key: 'author',
            label: '作者',
            placeholder: '请输入作者',
            options: {
                required: '作者不能为空'
            },
            type: 'text'
        },
        {
            key: 'category',
            label: '分类',
            placeholder: '请选择分类',
            options: {
                required: '分类不能为空'
            },
            type: 'select',
            choices: [
                { label: 'Startup', value: 'Startup' },
                { label: '科技', value: 'Technology' },
                { label: '生活', value: 'Lifestyle' }
            ]
        }
    ];
    async function onSubmit(data: IBlog, reset: () => void) {
        try {
            setIsError(false);
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('category', data.category);
            formData.append('author', data.author);
            formData.append('image', (data.image as FileList)[0]);
            const res = await fetch('/api/blog', {
                method: 'POST',
                body: formData
            });
            const response = await res.json();
            if (response.success) {
                alert('添加成功');
            } else {
                throw new Error(response.message);
            }
            reset();
        } catch (error) {
            setIsError(true);
            console.error(error);
        }
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.UploadFieldList fieldConfigList={formUploadConfig} />
            <Form.FieldList fieldConfigList={formInputConfig} />
            <Form.SubmitButton isError={isError} />
        </Form>
    );
}
