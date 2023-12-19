import React, { useState } from 'react'
import { BsArrowRight } from "react-icons/bs";
import FlightMenuCard from '../FlightMenuCard/FlightMenuCard';

const FlightCard = ({ data, currencySymbol,handleSelect }) => {
    // console.log(data)
    const [openCord, setOpenCord] = useState(false);
    const [selectId, setSelectId] = useState('');
    const { flightitineraries } = data;
    const [flightInfo] = flightitineraries;
    // console.log(flightInfo)
    // console.log("H");
    const handleOpenCord = (id) => {
        setSelectId(id);
        setOpenCord(!openCord)
    }
    
    return (
        <>
            <div className='flight_list_details' key={data.flight_id}>
                <div className="flight_list_header">
                    <div className='airplane_logo'>
                        <img src={flightInfo.airline_logo} />
                        <small onClick={() => handleOpenCord(data.flight_id)}>{(openCord && selectId === data.flight_id) ? `Hide Details` : `Show Details`}</small>
                    </div>
                    <div className='airplane_details'>
                        <div className='arrival_time'>
                            <div>{flightInfo.departure_time}</div>
                            <div>{flightInfo.departure_code}</div>
                        </div>
                        <div className='total_onwards'>
                            {/* <div className='arrow_direc'> */}
                            <BsArrowRight className='atrisk_css' style={{ fontSize: '54px' }} />
                            {/* </div> */}
                            <div className='timing_details'>
                                <div>{flightInfo.duration_text}</div>
                                <div>.</div>
                                <div>{flightInfo.stoppage_text}</div>
                            </div>
                        </div>
                        <div className='arrival_time'>
                            <div>{flightInfo.arrival_time}</div>
                            <div>{flightInfo.arrival_code}</div>
                        </div>
                    </div>
                    <div className='airplane_checkout'>
                        <div>
                            {currencySymbol}{data.price}
                        </div>
                        <div>
                            <button className='btn' onClick={()=>handleSelect(data)}>Select</button>
                        </div>
                    </div>
                </div>
                {openCord && selectId === data.flight_id && <>
                    <div className='show_more_result' style={{ width: '100%' }}>
                        {
                            flightInfo.segments.map((item, idx) => {
                               return <FlightMenuCard flightInfo={item} index={idx}/>
                            })
                        }
                    </div>
                </>}
            </div>
        </>
    )
}
export default FlightCard;