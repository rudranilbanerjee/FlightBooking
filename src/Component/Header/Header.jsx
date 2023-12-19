import React from 'react';
import './header.css'
import { FaLuggageCart } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { cartDataReset } from '../../Store/Slice/StateManagement/CartHandler';
import { searchFlightDataReset } from '../../Store/Slice/StateManagement/SearchFlightAirport';
import { flightListDataReset } from '../../Store/Slice/StateManagement/SearchFlightListData';
import { userDataResetState } from '../../Store/Slice/StateManagement/UserSlice';
import { useNavigate } from 'react-router-dom';
const Header=({setIsAuthenticated})=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {cartValueCount} = useSelector((state) => {
        return state.carthandler;
    })
    const handleLogOut=()=>{
        //for logout
        localStorage.clear();
        dispatch(cartDataReset())
        dispatch(searchFlightDataReset())
        dispatch(flightListDataReset())
        dispatch(userDataResetState());
        setIsAuthenticated(false);
        navigate('/')
    }
    return(
        <>
        <div className='header'>
            <div className='cart_button'><FaLuggageCart/><span>{cartValueCount}</span></div>
            <div className='log_out' onClick={handleLogOut}><IoMdLogOut/></div>
        </div>
        </>
    )
}
export default Header;