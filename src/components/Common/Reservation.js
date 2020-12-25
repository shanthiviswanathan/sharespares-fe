import React, { useEffect, useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../../assets/dateRangePicker.scss'
import moment from 'moment'
import axios from 'axios';

const Reservation = ({ itemId, memberId, buttonTitle }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [preReservedDates, setPreReservedDates] = useState([]);
    const [intialReservedDates, setIntialReservedDates] = useState([]);
    const [notification, setNotification] = useState({});
    const [isReservedDatesIncluded, setReservedDatesIncluded] = useState(false);
    const [preReservedStartDates, setPreReservedStartDates] = useState([]);


    useEffect(() => {
        const getReservations = async (itemId) => {
            const { data } = await axios.get(`/reservations/${itemId}`)
            if (!!data.length) {
                const dates = data.map(rvs => ({ 'start': moment(rvs.start_date), 'end': moment(rvs.end_date) }))
                setPreReservedDates(dates);
                setIntialReservedDates(dates);
                const startDates=dates.map(date=>date.start.format('YYYY-MM-DD'))
                setPreReservedStartDates(startDates)
            } else setPreReservedDates([]);
        }
        getReservations(itemId)
    }, [itemId]);

    const isInvalidDate = function (date) {
        return [...preReservedDates].reduce(function (bool, range) {
            return bool || (date >= moment(range.start).add(1,'days') && date <= range.end);
        }, false);
    }
    const isHighlighted =function (date) {
        return [...preReservedDates].reduce(function (bool, range) {
            return bool || (date >= range.start && date <= range.end);
        }, false);
    }

    const createReservation = async (event) => {
        event.preventDefault();
        const newReservation = {
            "item_id": itemId,
            "member_id": memberId,
            "reservation_status": "ACTIVE",
            "reservation_date": moment().format("YYYY-MM-DD HH:mm:ss"),
            "start_date": startDate.format("YYYY-MM-DD"),
            "end_date": endDate.format("YYYY-MM-DD"),
            "created_by": memberId,
            "created_date":moment().format("YYYY-MM-DD HH:mm:ss")
        }
        const { data } = await axios.post('/reservations', newReservation)
        if (!!data) {
            setStartDate(null);
            setEndDate(null)
            const reservedDates = [...intialReservedDates, { 'start': moment(data.start_date), 'end': moment(data.end_date) }]
            setPreReservedDates(reservedDates)
            setIntialReservedDates([...reservedDates])
            setNotification({ status: true, dates: `${startDate.format("DD/MM/YYYY")}-${endDate.format("DD/MM/YYYY")}` })
        }
    }

    const handleSelectedDates = (startDate, endDate) => {
        const nextToStartDay=moment(startDate).add(1,'days').format('YYYY-MM-DD');
        if(preReservedStartDates.includes(nextToStartDay)){
           const modifiedPreDates= [...preReservedDates].map(date=>{
            date.start=moment(date.start).isSame(nextToStartDay, 'day')?moment(date.start).add(1,'days'):date.start 
        return date   
        })
        setPreReservedDates(modifiedPreDates)
        }
        setStartDate(startDate);
        setEndDate(endDate);
        if (!!endDate) {
            setReservedDatesIncluded(false)
            const reservedDates = [...preReservedDates].reduce((a, c) => {
                return [...a, c.start.format("DD/MM/YYYY"), moment(c.end).subtract(1, 'days').format("DD/MM/YYYY")]
            }, [])

            const getRange = (startDate, endDate, type) => {
                let fromDate = moment(startDate)
                let toDate = moment(endDate)
                let diff = toDate.diff(fromDate, type)
                let range = []
                for (let i = 0; i < diff; i++) {
                    range.push(moment(startDate).add(i, type).format("DD/MM/YYYY"))
                }
                return range
            }
            const range = getRange(startDate, endDate, 'days')
            const isReservedDatesIncluded = range.some(date => reservedDates.includes(date))
            setReservedDatesIncluded(isReservedDatesIncluded)
        }
    }

    return (
        <>
            {!!Object.keys(notification).length &&
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <h4 className="alert-heading">Congrations!</h4>
                    <p>
                        your booking for {notification.dates} is reserved.
                    </p>
                    <hr />
                    <h5 className="mb-0">
                        <span aria-hidden="true" data-dismiss="alert" onClick={() => setNotification({})}>OKAY</span>
                    </h5>

                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setNotification({})}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            }
            <div className="text-center mt-5 border rounded-top">
                <div className="w-50 float-left pt-2">CHECK-IN</div>
                <div className="w-50 float-right pt-2 text-left pl-5">CHECK-OUT</div>
                <DateRangePicker
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="start_date" // PropTypes.string.isRequired,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="end_date" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => { handleSelectedDates(startDate, endDate) }} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                    minDate={moment()}
                    maxDate={moment().add(2, 'years')}
                    isDayBlocked={(date) => !!preReservedDates.length ? isInvalidDate(date) : false}
                    startDatePlaceholderText="--/--/----"
                    endDatePlaceholderText="--/--/----"
                    noBorder={true}
                    showClearDates={true}
                    customArrowIcon={' '}
                    isDayHighlighted={(date)  => preReservedDates? isHighlighted(date) : false}
                     // keepOpenOnDateSelect={true}
                    // hideKeyboardShortcutsPanel={true}

                />

            </div>
            <div className="w-100 h-1 border border-bottom-0 border-top-0 "></div>
            <button disabled={(!startDate && !endDate) || isReservedDatesIncluded} className="btn btn-home btn-lg btn-block ml-auto mr-auto  mt-4 w-75"
                onClick={(e) => createReservation(e)}>{!!buttonTitle ? buttonTitle : 'Reserve'}</button>

            {isReservedDatesIncluded && <div className="border border-danger rounded p-2 m-3 " >
                <span className="pr-2">&#9888;</span>

                Booking date range should not include pre-reserved date.
                </div>}
        </>
    );
}

export default Reservation;
