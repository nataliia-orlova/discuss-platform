import {
    Input,
    Button,
    Textarea,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from '@nextui-org/react';
import * as actions from '@/actions';

export default function TopicCreateForm() {
    return (
        <Popover placement='left'>
            <PopoverTrigger>
                <Button color='primary'>Create New Topic</Button>
            </PopoverTrigger>
            <PopoverContent>
                <form action={actions.createTopic}>
                    <div className='flex flex-col gap-4 p-4 w-80'>
                        <h3 className='text-lg'>Create New Topic</h3>
                        <Input
                            placeholder='Name'
                            label='Name'
                            labelPlacement='outside'
                        />
                        <Textarea
                            placeholder='Describe your topic'
                            label='Description'
                            labelPlacement='outside'
                        />
                        <Button color='primary' type='submit'>
                            Submit
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    );
}
