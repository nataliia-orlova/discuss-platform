'use server';
import { z } from 'zod';
import { auth } from '@/auth';
import type { Topic } from '@prisma/client';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import paths from '@/paths';
import { revalidatePath } from 'next/cache';

const createTopicSchema = z.object({
    //  rules for the name input
    name: z
        .string()
        .min(3)
        .regex(/^[a-z-]+$/, {
            message: 'Must be lowercase letters or dashes without spaces ',
        }),
    //   rules for the description
    description: z.string().min(10),
});
interface CreateTopicFormState {
    errors: {
        name?: string[];
        description?: string[];
        //  for showing more general form level errors
        _form?: string[];
    };
}
export async function createTopic(
    //  declared type that we are receiving
    formState: CreateTopicFormState,
    formData: FormData
    //  declared what type we want to return from a function
): Promise<CreateTopicFormState> {
    //  access data entered in the form
    //  in the form we have name prop for giving us access
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description'),
    });
    //  made sure in both cases we return correct type
    if (!result.success) {
        return { errors: result.error.flatten().fieldErrors };
    }

    //  check user session
    const session = await auth();
    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to to this.'],
            },
        };
    }
    //  to call redirect we need topic id
    let topic: Topic;
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description,
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
                    _form: ['Something went wrong'],
                },
            };
        }
    }
    revalidatePath('/');
    //  redirect must be outside try-catch because it works as direct
    redirect(paths.topicShow(topic.slug));

    //  also added empty errors object in the component from where we receive server action

    //  TODO: revalidate homepage after creating a topic - place before redirect
}
