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
    return {
        errors: {},
    };
    //  now the errors are communicated back to the component
    //  in the component make sure to receive these issues/errors
    //  make sure they are tied to the right fields in the form

    //  TODO: revalidate topic show page
}
