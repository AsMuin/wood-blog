interface ErrorProps {
    errorMessage?: string;
}
function Error({ errorMessage }: ErrorProps) {
    return (
        <p
            className={`whitespace-pre-wrap transition-all duration-300 ${errorMessage ? 'visible scale-100 text-red-500' : 'invisible scale-50 opacity-0'}`}>
            {errorMessage || ' '}
        </p>
    );
}

export default Error;
