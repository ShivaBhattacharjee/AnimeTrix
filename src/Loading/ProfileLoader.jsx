import React from 'react'
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
const ProfileLoader = () => {
    return (
        <>
            <section className='profile-wrapper'>
                <div className="profile-greeting">
                    <h1>Loading....</h1>
                </div>
                <div className='profile-navbar'>
                    <ul>
                        <li style={{ cursor: "pointer" }}>Profile</li>
                        <Link to="/history"><li>History</li></Link>
                        <Link to="/bookmark">
                            <li>Bookmark</li>
                        </Link>
                    </ul>
                </div>
            </section>
            <section className='profile-user-info'>
                <div className="login-container">
                    <div className="user-picture">
                        <Skeleton className='user-img' />
                    </div>
                    <form action="" autoComplete='false'>
                        <label htmlFor="text">Your Name</label>
                        <Skeleton className='login-group-input' />
                        <label htmlFor="email">Email</label>
                        <Skeleton className='login-group-input' />
                        <div className='profile-btn'>
                            <button type="submit" className='profile-save'>Update</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default ProfileLoader