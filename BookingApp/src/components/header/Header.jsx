import React, { useContext, useState } from 'react'
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCar, faPlane, faTaxi, faCalendarDays, faPerson } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'


const Header = ({ type }) => {

    const [destination, setDestination] = useState('')
    const [openDate, setOpenDate] = useState(false)
    const navigat = useNavigate()
    const {user} = useContext(AuthContext)

    const [openOptions, setOpenOptions] = useState(false)
    const [option, setOption] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }

    ])

    const {dispatch} = useContext(SearchContext)

    const handleSearch =()=>{
        dispatch({type:"NEW_SEARCH",payload:{destination,date,option}})
        navigat('/hotels', {state:{destination, date, option}})

    }

    return (
        <div>
            <div className="header">
                <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>

                    <div className="headerList">
                        <div className="headerListItem active">
                            <FontAwesomeIcon icon={faBed} />
                            <span>Stays</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faBed} />
                            <span>Stays</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faPlane} />
                            <span>Flight</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faCar} />
                            <span>Car Rentals</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faBed} />
                            <span>Attractions</span>
                        </div>
                        <div className="headerListItem">
                            <FontAwesomeIcon icon={faTaxi} />
                            <span>Airport Taxis</span>
                        </div>
                    </div>

                    {
                        type !== "list" &&
                        <><h1 className='headerTitle'> A lifetime of discounts? It's Genius</h1>
                            <p className="headerDesc">Get rewarded for your travels - unlock instant savings of 10% or more with a free Lamabooking account</p>
                            {!user && <button className="headerBtn">Sign in / Register</button>}
                            <div className="headerSearch">
                                <div className="headerSearchItem">
                                    <FontAwesomeIcon icon={faBed} className="headerIcon" />
                                    <input onChange={(e) => setDestination(e.target.value)} type="text" placeholder='Where are you going?' className="headerSearchInput" />
                                </div>
                                <div className="headerSearchItem">
                                    <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                                    <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                                    {
                                        openDate && <DateRange
                                            editableDateInputs={true}
                                            onChange={item => setDate([item.selection])}
                                            moveRangeOnFirstSelection={false}
                                            ranges={date}
                                            className="date"

                                        />
                                    }
                                </div>
                                <div className="headerSearchItem">
                                    <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                                    <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${option.adult} adult . ${option.children} children . ${option.room} room`}</span>
                                    {openOptions &&

                                        <div className="options">
                                            <div className="optionItem">
                                                <span className="optionText">Adult</span>
                                                <div className="optionCounter">
                                                    <button className='optionCounterButton' onClick={() => setOption({ ...option, adult: option.adult - 1 })} disabled={option.adult <= 1}>-</button>
                                                    <span className="optionCounterNumber">{option.adult}</span>
                                                    <button className='optionCounterButton' onClick={() => setOption({ ...option, adult: option.adult + 1 })}>+</button>
                                                </div>
                                            </div>
                                            <div className="optionItem">
                                                <span className="optionText">Children</span>
                                                <div className="optionCounter">
                                                    <button className='optionCounterButton' onClick={() => setOption({ ...option, children: option.children - 1 })} disabled={option.children <= 0}>-</button>
                                                    <span className="optionCounterNumber">{option.children}</span>
                                                    <button className='optionCounterButton' onClick={() => setOption({ ...option, children: option.children + 1 })}>+</button>
                                                </div>
                                            </div>
                                            <div className="optionItem">
                                                <span className="optionText">Room</span>
                                                <div className="optionCounter">
                                                    <button className='optionCounterButton' onClick={() => setOption({ ...option, room: option.room - 1 })} disabled={option.room <= 1}>-</button>
                                                    <span className="optionCounterNumber">{option.room}</span>
                                                    <button className='optionCounterButton' onClick={() => setOption({ ...option, room: option.room + 1 })}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div className="headerSearchItem">
                                    <button onClick={handleSearch} className="headerBtn">Search</button>
                                </div>
                            </div></>}
                </div>

            </div>

        </div>
    )
}

export default Header
