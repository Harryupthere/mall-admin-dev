import React from 'react'
import { NavDropdown } from 'react-bootstrap';
import { images } from '../../../../utils/customFn';
import './profileandsetting.scss'
import { DownIcon } from '../../../../icons/icons';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from "../../../../redux/slice/authSlice";

const ProfileAndSetting = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {username}=useSelector((state) => state.auth)


    const handleLogout=async(e)=>{
        e.preventDefault();

              dispatch(logout());
      navigate(`${process.env.REACT_APP_BASE_URL}login`);
    }

    return (
        <div className='profile-setting-wrapped'>
            <div className='profile-section'>
                <div className='profile-img'>
                    <img src={images['avatar.png']} alt='profile' />
                </div>
                <div className='details'>   
                    <NavDropdown
                        title={
                            <div className='name'>
                                <span>{username}</span>
                                <DownIcon />
                            </div>
                        }>
                        <NavDropdown.Item onClick={(e)=>handleLogout(e)}>Logout</NavDropdown.Item>
                        {/* <NavDropdown.Item href="/">Item2</NavDropdown.Item>
                        <NavDropdown.Item href="/">Item3</NavDropdown.Item> */}
                    </NavDropdown>
                    {/* <div className='designation'>
                        <h3>Admin</h3>
                    </div> */}
                </div>
            </div>
            {/* <div className='setting'>
                <Link to=""><img src={Icons['setting.svg']} alt='setting' /></Link>
            </div> */}
        </div>
    )   
}

export default ProfileAndSetting
