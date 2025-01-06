import { assets } from '@/assets/assets';
import { createContext, useContext, useEffect, useState } from 'react';
import { DefaultValues, FieldErrors, FieldValues, RegisterOptions, useForm, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import FormError from './UI/Error';
import StatusButton from './UI/StatusButton';
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

interface FormProps<T> {
    formData?: T;
    onSubmit: (data: T, reset: (data?: T) => void) => void;
}
interface FormContext<T extends FieldValues> {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    isSubmitting: boolean;
    reset: (data: T) => void;
    watch: UseFormWatch<T>;
    setValue: UseFormSetValue<T>;
}

export interface FormConfig {
    upload: UploadFieldProps[];
    input: FieldProps[];
}

const FormContext = createContext<FormContext<any>>({
    register: () => ({}) as any,
    reset: () => {},
    isSubmitting: false,
    errors: {},
    watch: () => ({}) as any,
    setValue: () => {}
});

function useFormContext<T extends FieldValues>() {
    const context = useContext(FormContext as React.Context<FormContext<T>>);
    if (!context) {
        throw new Error('useFormContext 必须在 FormContext.Provider 内部使用');
    }
    return context;
}

function Form<T extends FieldValues>({ formData, onSubmit, children }: React.PropsWithChildren<FormProps<T>>) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
        setValue
    } = useForm<T>({
        defaultValues: formData as DefaultValues<T>
    });

    const ContextValue: FormContext<T> = {
        register,
        reset,
        watch,
        isSubmitting,
        errors,
        setValue
    };
    return (
        <FormContext.Provider value={ContextValue}>
            <form className="flex flex-col items-start gap-8 text-gray-600" onSubmit={handleSubmit(data => onSubmit(data, reset))}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export interface UploadFieldProps {
    key: string;
    label: string;
    options?: RegisterOptions;
    uploadAccept?: string;
    uploadBGImage?: string;
}

Form.UploadFieldList = function UploadFieldList({ fieldConfigList }: { fieldConfigList: UploadFieldProps[] }) {
    return (
        <div className="flex gap-8">
            {/* 文件上传区 */}
            {fieldConfigList.map(fieldItem => (
                <FormUploadItem key={fieldItem.key} fieldConfig={fieldItem} />
            ))}
        </div>
    );
};

function FormUploadItem({ fieldConfig }: { fieldConfig: UploadFieldProps }) {
    const { register, errors, watch } = useFormContext();
    const [image, setImage] = useState<StaticImageData | string>(fieldConfig.uploadBGImage || assets.upload_area);
    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = event => {
                if (event.target?.result && typeof event.target.result === 'string') {
                    const fileType = file.type;
                    if (fileType.startsWith('image/')) {
                        setImage((event.target.result as string) || assets.upload_added.src);
                    } else {
                        setImage(assets.upload_added.src);
                    }
                }
                reader.onloadend = () => {
                    reader.onload = null;
                    reader.onloadend = null;
                    console.log(file);
                };
            };
            reader.readAsDataURL(file);
        }
    }
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            //(reset执行时全部为undefined)
            console.log({ value, name });

            if (!name) {
                // 表单重置
                setImage(fieldConfig.uploadBGImage || assets.upload_area.src);
            }
        });
        return () => {
            subscription.unsubscribe();
        };
    }, [watch, fieldConfig.uploadBGImage, fieldConfig.key]);
    return (
        <label key={fieldConfig.key}>
            <p className="mb-2 text-center text-lg">{fieldConfig.label}</p>
            <input
                type="file"
                hidden
                accept={fieldConfig.uploadAccept}
                {...register(fieldConfig.key, { ...fieldConfig.options, onChange: onFileChange })}
            />
            <Image className="mx-auto max-h-24 min-w-24 max-w-48 cursor-pointer" height={96} width={96} src={image} alt="uploadImage" />
            <FormError errorMessage={errors?.[fieldConfig.key]?.message as string} />
        </label>
    );
}

export interface FieldProps {
    key: string;
    label: string;
    placeholder?: string;
    type?: string;
    options?: RegisterOptions;
    choices?: { label: string; value: string }[];
}

Form.FieldList = function FieldList({ fieldConfigList }: { fieldConfigList: FieldProps[] }) {
    const { register, errors } = useFormContext();
    return (
        <>
            {fieldConfigList.map(fieldItem => (
                <div key={fieldItem.key} className="flex flex-col gap-2.5">
                    <label>
                        <p className="">{fieldItem.label}</p>
                        {/*  输入框 */}
                        {fieldItem.type === 'select' ? (
                            <select
                                className="w-[max(10vw,250px)] rounded-sm border-2 border-gray-400 bg-transparent p-2.5 focus:outline-none"
                                {...register(fieldItem.key, fieldItem.options)}>
                                {fieldItem.choices?.map((choice: any) => (
                                    <option key={choice.value} value={choice.value}>
                                        {choice.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                className="w-[max(40vw,250px)] rounded-sm border-2 border-gray-400 bg-transparent p-2.5 focus:outline-none"
                                placeholder={fieldItem.placeholder || ''}
                                type={fieldItem.type || 'text'}
                                {...register(fieldItem.key, fieldItem.options)}
                            />
                        )}

                        <FormError errorMessage={errors?.[fieldItem.key]?.message as string} />
                    </label>
                </div>
            ))}
        </>
    );
};

interface FormSubmitButtonProps {
    defaultText?: string;
    loadingText?: string;
    error?: boolean | string;
}
Form.SubmitButton = function SubmitButton({ defaultText, children, loadingText, error }: React.PropsWithChildren<FormSubmitButtonProps>) {
    const { isSubmitting } = useFormContext();
    if (children) {
        return children;
    }
    return (
        <StatusButton
            type="submit"
            className={clsx('glass min-w-20 text-xl text-orange-200 hover:text-orange-500', {
                'bg-red-600': error,
                'bg-green-600': !error
            })}
            disabled={isSubmitting}
            loadingText={loadingText || '处理中'}
            defaultText={defaultText || '确定'}
            errorText={typeof error === 'string' ? error : '提交失败'}
            status={error ? 'error' : isSubmitting ? 'loading' : 'default'}
        />
    );
};
export default Form;
