import React from 'react';
import { BsArrowRight } from "react-icons/bs";

const FlightMenuCard = ({ flightInfo,index }) => {
    // console.log(flightInfo);
    // console.log('k');
    const [deparatureDate,deparatureTime]=flightInfo.departure_at.split(' ');
    const [arrivalDate,arrivalTime]=flightInfo.arrival_at.split(' ');
    // console.log(deparatureDate,deparatureTime)
    function formatDepartureDate(dateString) {
        const dateObject = new Date(dateString);
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };

        return dateObject.toLocaleDateString('en-US', options);
    }
    return (
        <>
            {index!==0 && <hr style={{color:'red',width:'100%'}}/>}
            <div className='flight_card_menu' key={flightInfo.segment_id}>
                <div className='depart_details'>
                    <span>Depart </span>
                    <span>{flightInfo.departure_iata}-{flightInfo.arrival_iata}</span>
                </div>
                <div>
                    {formatDepartureDate(deparatureDate)} ECONOMY <span>{flightInfo.segment_duration}</span>
                </div>
                <hr style={{ color: '#5c5151',marginTop:'5px' }} />
                <div className='flight_list_details' style={{ flexDirection: 'row', justifyContent: 'unset' }}>
                    <div className='airplane_logo'>
                        <img src={flightInfo.carrier_logo} />
                        <div style={{ fontWeight: 'bold' }}>{flightInfo.carrier_name}</div>
                        <div>{flightInfo.aircraft_name}</div>
                    </div>
                    <div className='airplane_details' style={{ width: '65%' }}>
                        <div className='arrival_time menu_arrival_time' style={{ width: '25%' }}>
                            <div>{formatDepartureDate(deparatureDate)}</div>
                            <div>{deparatureTime.substring(0,5)}</div>
                            <div>{flightInfo.departure_iata}</div>
                            <div>{flightInfo.departure_airport}</div>
                            <div>{flightInfo.departure_location}</div>
                        </div>
                        <div className='total_onwards' style={{ width: '30%' }}>
                            {/* <div className='arrow_direc'> */}
                            <BsArrowRight className='atrisk_css' style={{ fontSize: '54px' }} />
                            {/* </div> */}
                            
                        </div>
                        <div className='arrival_time menu_arrival_time' style={{ width: '25%' }}>
                            <div>{formatDepartureDate(arrivalDate)}</div>
                            <div>{arrivalTime.substring(0,5)}</div>
                            <div>{flightInfo.arrival_iata}</div>
                            <div>{flightInfo.arrival_airport}</div>
                            <div>{flightInfo.arrival_location}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FlightMenuCard;