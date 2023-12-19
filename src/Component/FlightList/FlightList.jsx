import React from 'react';
import './flightlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { FaLocationDot } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";
import FlightCard from '../FlightCard/FlightCard';
import { handleCart } from '../../Store/Slice/StateManagement/CartHandler';
const FlightList = () => {
    const dispatch=useDispatch();
    const {cartValueCount,cartData,cartAmmount} = useSelector((state) => {
        return state.carthandler;
    })
    const { flyingForm, flyingTo, deparatureDate, traveller, classType } = useSelector((state) => {
        return state.searchFlight;
    })
    const flightListData = useSelector((state) => {
        return state.searchflightlist;
    })
    console.log(flightListData)
    function formatDepartureDate(dateString) {
        const dateObject = new Date(dateString);
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };

        return dateObject.toLocaleDateString('en-US', options);
    }
    const handleSelect=(value)=>{
        dispatch(handleCart({
            cartValueCount:cartValueCount+1,
            cartData:[
                ...cartData,
                value,
            ],
            cartAmmount:cartAmmount+Number(value.price),
        }))
    }
    return (
        <>
            <div className='flight_list_container'>
                <div className='flight_list_box'>
                    <div className='header_part'>
                        <div className='loc1'>
                            <div className='location_icon'>
                                <FaLocationDot className='atrisk_css' />
                            </div>
                            <div className='location_details'>
                                <div>From Station</div>
                                <div >
                                    {flyingForm?.[`short_name`]}
                                </div>
                                <div>{formatDepartureDate(deparatureDate)}</div>
                            </div>
                        </div>
                        <div className='arrow_direc'>
                            <BsArrowRight className='atrisk_css' />
                        </div>
                        <div className='loc2'>
                            <div className='location_icon'>
                                <FaLocationDot className='atrisk_css' />
                            </div>
                            <div className='location_details'>
                                <div>To Station</div>
                                <div>
                                    {flyingTo?.[`short_name`]}
                                </div>
                                {/* <div>{formatDepartureDate(deparatureDate)}</div> */}
                            </div>
                        </div>
                    </div>
                    <hr style={{ color: 'black', marginTop: '0px' }} />
                    <div className='flight_list_body'>
                        <div className='classType'>{classType.toUpperCase()}</div>
                        {
                            flightListData.flightList.map((item) => {
                                return (<>
                                    <FlightCard data={item} currencySymbol={flightListData.currencySymbol} handleSelect={handleSelect}/>
                                    <hr style={{color:'black'}}/>
                                </>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default FlightList;