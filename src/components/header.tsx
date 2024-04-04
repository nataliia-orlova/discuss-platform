import Link from 'next/link';
import {
    Navbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
    Input,
} from '@nextui-org/react';
import HeaderAuth from './header-auth';

export default function Header() {
    return (
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link href='/' className='font-bold'>
                    Discuss Platform
                </Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    );
}
