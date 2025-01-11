import BlogList from '@/components/BlogList';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MessageManager from '@/components/MessageManager';

export default async function Home() {
    return (
        <div>
            <Header />
            <BlogList />
            <Footer />
            <MessageManager />
        </div>
    );
}
