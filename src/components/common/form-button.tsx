'use client';
import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface FormButtonProps {
    children: React.ReactNode;
}

export default function FormButton({ children }: FormButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button type='submit' isLoading={pending}>
            {children}
        </Button>
    );
}

//  useFormStatus must be in a child component of the form - it looks into its closest parent
//  so we create a new btn component and export it in the form
