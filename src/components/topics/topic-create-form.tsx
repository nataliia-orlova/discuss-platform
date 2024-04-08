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

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic, {
        errors: {},
    });
    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Button color='primary'>Create New Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={action}>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3 className='text-lg'>Create New Topic</h3>
                        <Input
                            name='name'
                            placeholder='Name'
                            label='Name'
                            labelPlacement='outside'
                            //  !! makes it a boolean
                            isInvalid={!!formState.errors.name}
                            //  ? in case name is undefined
                            errorMessage={formState.errors.name?.join(', ')}
                        />
                        <Textarea
                            name='description'
                            placeholder='Describe your topic'
                            label='Description'
                            labelPlacement='outside'
                            isInvalid={!!formState.errors.description}
                            errorMessage={formState.errors.description?.join(
                                ', '
                            )}
                        />
                        {formState.errors._form ? (
                            <div className='p-2 bg-red-200 border border-red-400 rounded'>
                                {formState.errors._form?.join(', ')}
                            </div>
                        ) : null}
                        <Button color='primary' type='submit'>
                            Submit
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
