import React from 'react'
import styles from './Header.module.css';
import Link from 'next/link';

export default function Header(){

    return (

        <header className = {styles.header}>
        <nav className = {styles.nav}>

        <Link href="/">Home</Link>
        <Link href="/produtos">Products</Link>
        <Link href="/tecnologias">Technology</Link>


         </nav>
        </header>
    )
}