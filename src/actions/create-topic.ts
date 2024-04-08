'use server';
import { z } from 'zod';
import { auth } from '@/auth';

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
    return {
        errors: {},
    };
    //  also added empty errors object in the component from where we receive server action

    //  TODO: revalidate homepage after creating a topic
}
