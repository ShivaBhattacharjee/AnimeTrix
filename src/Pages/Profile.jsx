import React from 'react'
import '../css/Profile.css'
const Profile = () => {
    const user = "Shiva"
    return (
        <section className='login'>
            <div className="login-container">
                <div className="user-picture">
                    <img src="https://i.pinimg.com/originals/b8/bf/ac/b8bfac2f45bdc9bfd3ac5d08be6e7de8.jpg" alt="user-image" className='user-img' />
                    <input type="file" className='edit-profile' accept='image/png, image/jpeg, image/jpg' />
                </div>
                <h1>Hello {user} </h1>
                <form action="">
                    <input type="text" value={user} className='login-group-input' />
                    <input type="email" value="user@gmail.com" className='login-group-input' />
                    <div className='login-btn' style={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <button className='login-sign-in' style={{
                            marginTop: "30px",
                        }}>Update</button>
                        <button className='login-sign-in' style={{
                            marginTop: "10px"
                        }}>Logout</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Profile