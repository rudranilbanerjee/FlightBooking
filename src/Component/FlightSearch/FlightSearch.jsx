import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchFlightAirportApiSlice, searchFlightAirportApiDataReset } from '../../Store/Slice/ApiSlice/SearchFlightAirport';
import { handleChangeFieldForSearchFlight, handleTraveller } from '../../Store/Slice/StateManagement/SearchFlightAirport';
import { Typeahead } from 'react-bootstrap-typeahead';
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { LuArrowRightLeft } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import flightSearchSchema from '../../Validator/flightSearchSchema';
import { searchFlightApiSlice, searchFlightApiDataReset } from '../../Store/Slice/ApiSlice/SearchFlightApi';
import Loader from '../Loader/Loader';
import { handleChangeFlightList } from '../../Store/Slice/StateManagement/SearchFlightListData';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const FlightSearch = () => {
    const navigate = useNavigate();
    const { flyingForm, flyingTo, deparatureDate, traveller, classType } = useSelector((state) => {
        return state.searchFlight;
    })
    const flightSearchApiData = useSelector((state) => {
        return state.searchFlightAirportApi;
    })
    const flightApiData = useSelector((state) => {
        return state.searchFlightApi;
    })
    const [type, setType] = useState([]);
    const [options1, setOptions1] = useState([]);
    const [options2, setOptions2] = useState([]);
    const [validationErrors, setValidationErrors] = useState({})
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(flightApiData)
        if (flightApiData.isSuccess && flightApiData?.response[`res_code`] === 200) {
            dispatch(handleChangeFlightList({
                flightList: flightApiData?.response.data,
                currencySymbol: flightApiData?.response[`currency_symbol`],
                maxPrice: flightApiData?.response[`max_price`],
                minPrice: flightApiData?.response[`min_price`],
                maxHour: flightApiData?.response[`max_hour`],
                minHour: flightApiData?.response[`min_hour`],
            }))
            dispatch(searchFlightApiDataReset())
            navigate(`/flight/list`)
        } else if (flightApiData?.response[`res_code`] === 201) {
            toast.error(flightApiData.response.response, {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch(searchFlightApiDataReset())
        }
    }, [dispatch, flightApiData])
    useEffect(() => {
        console.log(flightSearchApiData.response)
        if (flightSearchApiData.isSuccess && flightSearchApiData?.response[`res_code`] === 200) {
            if (type === 'flyingFrom')
                setOptions1([...flightSearchApiData.response.data]);
            else
                setOptions2([...flightSearchApiData.response.data]);
            dispatch(searchFlightAirportApiDataReset())
        }
    }, [dispatch, flightSearchApiData])
    const handleChange = async (e) => {
        dispatch(handleChangeFieldForSearchFlight({ [e.target.name]: e.target.value }));
    }
    const handleInputChange = async (type, inputText) => {
        try {
            setType(type);
            if (inputText !== '') {
                const requestBody = {
                    search_key: inputText
                }
                await dispatch(searchFlightAirportApiSlice({
                    method: 'post',
                    url: 'v2/flight/search-flight-airport',
                    data: requestBody,
                }))
            }
        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    };
    const travellerData = [
        {
            id: 'adults',
            label: 'Adults',
        },
        {
            id: 'childrens',
            label: 'Childrens',
        },
        {
            id: 'infants',
            label: 'Infants',
        }
    ]
    const renderMenuItemChildren = (option) => (
        <div>
            <div>{option.airport_name} <span style={{ color: 'gray' }}>({option.city})</span></div>
        </div>
    );
    const filterBy = (option, data) => {
        // Customize the filtering logic based on your requirements
        return (
            data.text === 0 ? [] : option
        );
    };
    const handleSelect = (e) => {
        dispatch(handleChangeFieldForSearchFlight({ classType: e.target.value }));
    };
    const handleDoneClick = () => {
        const dropdownToggle = document.getElementById("dropdown-basic");
        if (dropdownToggle) {
            dropdownToggle.click(); // Simulate a click on the dropdown toggle
        }
    }
    const handleSubmit = () => {
        console.log(deparatureDate)
        const searchData = {
            from_airport: flyingForm?.iata,
            to_airport: flyingTo?.iata,
            departure_date: deparatureDate,
            adults:traveller.adults,
        }
        flightSearchSchema.validate(searchData, { abortEarly: false })
            .then((validData) => {
                setValidationErrors({});
                console.log('Valid data:', validData);
                const requestBody = {
                    ...validData,
                    return_date: "",
                    adults: traveller.adults,
                    childs: traveller.childrens,
                    infants: traveller.infants,
                    class_type: classType.toUpperCase(),
                    travel_type: "oneway",
                    max_result: 100,
                    user_id: 0,
                }
                dispatch(searchFlightApiSlice({
                    method: 'post',
                    url: 'v2/flight/flight-search-list',
                    data: requestBody,
                }));
            })
            .catch((error) => {
                const errors = {};
                error.inner.forEach(err => {
                    errors[err.path] = err.message;
                });
                setValidationErrors(errors);
            })
    }
    function formatDepartureDate(dateString) {
        const dateObject = new Date(dateString);
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };

        return dateObject.toLocaleDateString('en-US', options);
    }
    return (
        <div className='main_container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '90vh', }}>
            <div className='container' style={{ opacity: flightApiData?.isLoading ? '0.6' : '1' }}>
                <div className='box'>
                    <div className='form_group'>
                        <label>Flying From</label>
                        <div style={{ position: 'relative' }}>
                            <Typeahead
                                id="autocomplete"
                                labelKey="airport_name"
                                onChange={(selected) => {
                                    console.log(selected);
                                    dispatch(handleChangeFieldForSearchFlight({ flyingForm: selected[0] }));
                                    setOptions1([])
                                }}
                                options={options1}
                                onInputChange={(text) => handleInputChange('flyingFrom', text)}
                                renderMenuItemChildren={renderMenuItemChildren}
                                className='flyingFor'
                                filterBy={filterBy}
                                placeholder="City OR Airport"
                            />
                            <FaLocationDot className='atrisk_css' style={{ position: 'absolute', right: '10px', top: '10px' }} />
                        </div>
                        {<small style={{ color: 'red', fontWeight: '400' }}>{validationErrors.from_airport}</small>}
                    </div>
                    <div className='bi_direc_arrow'><LuArrowRightLeft className='atrisk_css' /></div>
                    <div className='form_group'>
                        <label>Flying To</label>
                        <div style={{ position: 'relative' }}>
                            <Typeahead
                                id="autocomplete"
                                labelKey="airport_name"
                                onChange={(selected) => {
                                    console.log(selected);
                                    dispatch(handleChangeFieldForSearchFlight({ flyingTo: selected[0] }));
                                    setOptions2([])
                                }}
                                options={options2}
                                onInputChange={(text) => handleInputChange('flyingTo', text)}
                                renderMenuItemChildren={renderMenuItemChildren}
                                className='flyingFor'
                                filterBy={filterBy}
                                placeholder="City OR Airport"
                            />
                            <FaLocationDot className='atrisk_css' style={{ position: 'absolute', right: '10px', top: '10px' }} />
                        </div>
                        {<small style={{ color: 'red', fontWeight: '400' }}>{validationErrors.to_airport}</small>}
                    </div>
                    <div className='form_group'>
                        <label>Deparature Date</label>
                        <div className='date_class'>
                            <input type='text' className='form-control show_date' value={deparatureDate?formatDepartureDate(deparatureDate):deparatureDate} placeholder="Deparature Date" />
                            <FaCalendarAlt className='atrisk_css' style={{ position: "absolute", right: '10px', top: '25%' }} />
                            <input type='date' name="deparatureDate" value={deparatureDate} onChange={handleChange} id='dateSelect' />
                        </div>
                        {<small style={{ color: 'red', fontWeight: '400' }}>{validationErrors.departure_date}</small>}
                    </div>
                    <div className='form_group'>
                        <label>Traveller(s)</label>
                        {/* <div className='form-control' style={{ height: '38px', cursor: "pointer" }}></div> */}

                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className='traveller_btn'>
                                <FaUser className='atrisk_css' />
                                <div>
                                    {traveller.adults} Adults <span className='atrisk_css'>*</span> {traveller.childrens} Child <span className='atrisk_css'>*</span> {traveller.infants} Infant
                                </div>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className='traveller_menu'>
                                    Travellers
                                    <ul style={{ padding: '0px', marginTop: '10px' }}>
                                        {
                                            travellerData.map((item) => {
                                                return (
                                                    <>
                                                        <li style={{ display: "flex", justifyContent: "space-between", gap: '20px', alignItems: 'center' }}>
                                                            <label>{item.label}</label>
                                                            <div style={{ display: 'flex', gap: "10px" }}>
                                                                <button className='btn app_btn' onClick={() => dispatch(handleTraveller({ key: item.id, type: 'decrease' }))}>-</button> {traveller?.[item.id]} <button className='btn app_btn' onClick={() => dispatch(handleTraveller({ key: item.id, type: 'increase' }))}>+</button>
                                                            </div>
                                                        </li>
                                                        <hr color='#61dafb' style={{ margin: '0.7rem 0px' }} />
                                                    </>

                                                )
                                            })
                                        }
                                    </ul>
                                    <button className='btn app_btn' onClick={handleDoneClick}>Done</button>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        {<small style={{ color: 'red', fontWeight: '400' }}>{validationErrors.adults}</small>}
                    </div>
                    <div className='form_group'>
                        <label>Preferred Class</label>
                        <div>
                            <select className='form-control select_preffered_class' onChange={handleSelect}>
                                <option value="">Preffered Class</option>
                                <option value="Economy">Economy</option>
                                <option value="Premium Economy">Premium Economy</option>
                                <option value="Bussiness">Bussiness</option>
                                <option value="First">First</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='submit_btn'>
                    <button className='btn app_btn' onClick={handleSubmit} disabled={flightApiData.isLoading}>Submit</button>
                </div>
            </div>
            {flightApiData?.isLoading && <Loader />}
            <ToastContainer />
        </div>
    )
}
export default FlightSearch;