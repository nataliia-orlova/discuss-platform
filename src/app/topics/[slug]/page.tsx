import PostCreateForm from '@/components/posts/post-create-form';
import PostList from '@/components/posts/post-list';
import { fetchPostByTopicSlug } from '@/db/queries/posts';
//  make sure to receive slug
interface TopicShowPageProps {
    params: {
        slug: string;
    };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
    const { slug } = params;
    return (
        <div className='grid grid-cols-4 gap-4 p-4'>
            <div className='col-span-3'>
                <h1 className='text-2xl font-bold mb-2'>{slug}</h1>
                <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
            </div>
            <div>
                <PostCreateForm slug={slug} />
            </div>
        </div>
    );
}
