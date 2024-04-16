'use server';
import { z } from 'zod';
import { auth } from '@/auth';
import type { Post } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

//  validation rules for create post inputs with zod
//  use name values of the inputs and define the fules for each fiels
const createPostSchema = z.object({
    title: z.string().min(3),

    content: z.string().min(10),
});

//  create an interface describing what data we are returning
//  from a server action createPost:

interface CreatePostFormState {
    errors: {
        //  means - it wil say the issues around title in a string
        title?: string[];
        content?: string[];
        //  for showing more general form level errors
        _form?: string[];
    };
}

//  use interface as a prop to describe the value of the first argument
//  the second argument will be form data
//  the return value of this function is smth of the type CreatePostFormState - use Promise
export async function createPost(
    slug: string,
    formState: CreatePostFormState,
    formData: FormData
): Promise<CreatePostFormState> {
    //  access data entered in the form
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    });
    //  made sure in both cases we return correct type
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }
    //  check if user is signed in
    //  go back to component to make sure the error prints on UI
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to to this.'],
            },
        };
    }
    //  get topic/slug id
    const topic = await db.topic.findFirst({
        where: { slug },
    });

    if (!topic) {
        return {
            errors: {
                _form: ['This topic is not found'],
            },
        };
    }
    //  creating the post
    let post: Post;
    try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id,
                topicId: topic.id,
            },
        });
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message],
                },
            };
        } else {
            return {
                errors: {
                    _form: ['Failed to create post'],
                },
            };
        }
    }
    //  revalidate topic show page and redirect
    revalidatePath(paths.topicShow(slug));
    redirect(paths.postShow(slug, post.id));
}
