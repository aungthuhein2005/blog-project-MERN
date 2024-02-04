import React from 'react'
import { Outlet, Routes, Route } from 'react-router-dom';
import Sidebar from '../Components/Account/Sidebar';
import Subscribe from '../Components/Account/Subscribe';
import Favourite from '../Components/Account/Favourite';
import Profile from '../Components/Account/Profile';
import Edit from '../Components/Account/Edit';
import FavoruiteEdit from '../Components/Account/FavoruiteEdit';
import ProfileEdit from '../Components/Account/ProfileEdit';
import PasswordVerify from '../Components/Account/PasswordVerify';
import OTPVerify from '../Components/Account/OTPVerify';
import NewPassword from '../Components/Account/NewPassword';
import Posts from '../Components/Account/Posts';
import { AccountProvider } from '../Context/AccountContext';

function Account() {

    return (
        <AccountProvider>
            <div className='flex'>
            <aside className='h-screen w-64 fixed top-0 left-0'>
                <Sidebar />
            </aside>
            <main className='pt-4 w-100 ml-64 '>
                <Routes path='/account/' >
                    <Route index element={<Profile />} />
                    <Route path='favourite' element={<Favourite />} />
                    <Route path='subscribe' element={<Subscribe />} />
                    <Route path='edit' element={<Edit />}>
                        <Route index element={<ProfileEdit />} />
                        {/* <Route path='favourite' element={<FavoruiteEdit />} /> */}
                        <Route path='password-verify' element={<PasswordVerify />} />
                        <Route path='password-edit' element={<NewPassword />} />
                        <Route path='otp-verify' element={<OTPVerify />} />
                    </Route>
                    <Route path='posts' element={<Posts/>}/>
                </Routes>
            </main>
        </div>
        </AccountProvider>
    )

}

export default Account

