'use client';
import Form, { FieldProps, UploadFieldProps } from '@/components/AdminComponents/Form';
import { IBlog } from '@/lib/models/BlogModel';

export default function AddBlogPage() {
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
            key: 'category',
            label: '分类',
            placeholder: '请选择分类',
            options: {
                required: '分类不能为空'
            },
            type: 'select',
            choices: [
                { label: 'Startup', value: 'Startup' },
                { label: '科技', value: 'technology' },
                { label: '生活', value: 'life' }
            ]
        }
    ];
    function onSubmit(data: IBlog, reset: any) {
        console.log(data);
        reset();
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.UploadFieldList fieldConfigList={formUploadConfig} />
            <Form.FieldList fieldConfigList={formInputConfig} />
            <Form.SubmitButton />
        </Form>
    );
}
