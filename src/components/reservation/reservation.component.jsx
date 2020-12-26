import React, { useEffect, useState } from 'react';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import '../../assets/dateRangePicker.scss';
import moment from 'moment'

const Reservation = ({ itemId, memberId }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [preReservedDates, setPreReservedDates] = useState([]);
    // const [reserved, setReserved] = useState(false);
    const [notification, setNotification] = useState({});

    useEffect(() => {
        const getReservations = async (itemId) => {
        try {
            const { response } = await  fetch(`http://localhost:4000/api/reservations/${itemId}`);
            
            console.log('After reservations response fetch', response)
            const json = await response.json();
            console.log('After reservations json fetch', json)
            if (json.message) {
              setPreReservedDates([])
              throw new Error(json.message);
            }
            const dates = response.map(rvs => ({ 'start': moment(rvs.start_date), 'end': moment(rvs.end_date) }))
            setPreReservedDates(dates);
        } catch (error) {
            console.error('FetchReservations Error', error);
          }
        }
        getReservations(itemId)
    }, [itemId]);


    const isInvalidDate = function (date) {
        return preReservedDates.reduce(function (bool, range) {
            return bool || (date >= range.start && date <= range.end);
        }, false);
    }

    const createReservation = async () => {
        const newReservation = {
            "item_id": itemId,
            "member_id": memberId,
            "reservation_status": "ACTIVE",
            "reservation_date": moment().format("YYYY-MM-DD"),
            "start_date": startDate.format("YYYY-MM-DD"),
            "end_date": endDate.format("YYYY-MM-DD")
        }
        try {
            await fetch('http://localhost:4000/api/reservations', {
              method: 'post',
              body: JSON.stringify(newReservation),
              headers: {
                  'Content-Type': 'application/json'
              }    
            }).then(res => { 
                if (res.status >= 400) {
                  throw new Error("Bad response from server");
                }
                return res.json
              }).then(data => {
                  console.log('Reservation Id = ', data);

        if (!!data) {
            setStartDate(null);
            setEndDate(null)
            const reservedDates = [...preReservedDates, { 'start': moment(data.start_date), 'end': moment(data.end_date) }]
            setPreReservedDates(reservedDates)
            setNotification({ status: true, dates: `${startDate.format("DD/MM/YYYY")}-${endDate.format("DD/MM/YYYY")}` })
            // setReserved(true)
        }
    })
        
    } catch (error) {
        console.error(error);
      }
    }

    return (
        <>
            {!!Object.keys(notification).length &&

                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <h4 className="alert-heading">Congratulations!</h4>
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
                    onDatesChange={({ startDate, endDate }) => { setStartDate(startDate); setEndDate(endDate) }} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)} // PropTypes.func.isRequired,
                    // keepOpenOnDateSelect={true}
                    hideKeyboardShortcutsPanel={true}
                    minDate={moment()}
                    maxDate={moment().add(2, 'years')}
                    isDayBlocked={(date) => !!preReservedDates.length ? isInvalidDate(date) : false}
                    startDatePlaceholderText="--/--/----"
                    endDatePlaceholderText="--/--/----"
                    noBorder={true}
                    showClearDates={true}
                    customArrowIcon={' '}
                
                />
              
            </div>
            <div className="w-100 h-1 border border-bottom-0 border-top-0 "></div>
            <button disabled={!startDate && !endDate} className="btn btn-home btn-lg btn-block ml-auto mr-auto  mt-4 w-75"
                    onClick={() => createReservation()} >Reserve</button>
        </>
    );
}

export default Reservation;
