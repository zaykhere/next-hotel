import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children, title="Book best hotels for your holiday!"}) => {
  return (
    <div>
        <Head>
            <title> {title} </title>
        </Head>

        <Header />
        <ToastContainer position='top-right' />
        {children}
        <Footer />
    </div>
  )
}

export default Layout