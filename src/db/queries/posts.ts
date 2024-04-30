import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number };
};

export function fetchPostByTopicSlug(slug: string): Promise<PostWithData[]> {
    //  find posts where slug is the same that we pass as an argument
    return db.post.findMany({
        where: { topic: { slug } },
        include: {
            topic: { select: { slug: true } },
            user: { select: { name: true } },
            _count: { select: { comments: true } },
        },
    });
}
