'use client';
import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';
import { useFormState } from 'react-dom';
//  importing client component with a hook that cathes form status:
import FormButton from '../common/form-button';

export default function PostCreateForm() {
    //  the errors are communicated back to the component
    //  in the component make sure to receive these issues/errors
    //  make sure they are tied to the right fields in the form
    //  connect to server action in useFormState hook + set initial state with no errors
    const [formState, action] = useFormState(actions.createPost, {
        errors: {},
    });

    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Button color='primary'>Create a Post</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3 className='text-lg'>Create a post</h3>
                        <Input
                            name='title'
                            label='Title'
                            placeholder='Title'
                            labelPlacement='outside'
                            //  !! makes it a boolean
                            isInvalid={!!formState.errors.title}
                            //  ? in case name is undefined
                            errorMessage={formState.errors.title?.join(', ')}
                        />
                        <Textarea
                            name='content'
                            label='Content'
                            placeholder='Content'
                            labelPlacement='outside'
                            //  !! makes it a boolean
                            isInvalid={!!formState.errors.content}
                            //  ? in case name is undefined
                            errorMessage={formState.errors.content?.join(', ')}
                        />
                        <FormButton>Create</FormButton>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
