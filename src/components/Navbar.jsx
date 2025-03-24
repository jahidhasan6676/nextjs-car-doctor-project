"use client";
import Image from "next/image";
import logo from "../../public/assets/logo.svg"
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";


const Navbar = () => {
    const { data: session, status } = useSession();
    const navMenu = () => {
        return (
            <>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/about"}>About</Link></li>
                <li><Link href={"/service"}>Service</Link></li>
                <li><Link href={"/blog"}>Blog</Link></li>
                <li><Link href={"/contact"}>Contact</Link></li>

            </>
        )
    }
    return (
        <div className=" bg-base-100 border-b border-gray-300">
            <div className="w-11/12 mx-auto navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {navMenu()}
                        </ul>
                    </div>
                    <a className=" text-xl">
                        <Image src={logo} width={80} height={60} alt="logo image" />
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navMenu()}
                    </ul>
                </div>
                <div className="navbar-end">
                    <ul className="flex items-center gap-5 mr-5">
                        {status == "authenticated" ?
                            (<>
                                <li onClick={()=> signOut()} className="cursor-pointer">Logout</li>
                            </>) :
                            (<>
                                <li><Link href={"/login"}>Login</Link></li>
                                <li><Link href={"/register"}>Register</Link></li>
                            </>)}

                    </ul>

                    <a className="btn btn-outline">Appointment</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;