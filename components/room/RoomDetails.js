import Head from 'next/head';
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/roomActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import RoomFeatures from './roomFeatures';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/router';
import axios from 'axios';

const RoomDetails = () => {
  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [daysOfStay, setDaysOfStay] = useState();

  const {room, error} = useSelector(state=> state.roomDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if(error)
      toast.error(error);
      dispatch(clearErrors());
  }, [])

  function onDateChange(dates) {
    const [checkInDate, checkOutDate] = dates;
    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if(checkInDate && checkOutDate) {
      // Calculate days of stay
      const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000 + 1))
      
      setDaysOfStay(days);
    }

  }

  const newBookingHandler = async () => {
    const bookingData = {
      room: router.query.id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: 90,
      paymentInfo: {
        id: 'stripe',
        status: 'stripe_status'
      }
    }

    try {
      const config = {
        headers: {
          'Content-Type': "application/json"
        }
      }

      const {data} = await axios.post('/api/bookings', bookingData, config);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  }
  
    
  return (
    <>
        <Head>
            <title> {room.name} </title>
        </Head>
        <div className="container container-fluid">
        <h2 className='mt-5'>{room.name}</h2>
        <p> {room.address} </p>

        <div className="ratings mt-auto mb-3">
            <div className="rating-outer">
              <div className="rating-inner" style={{ width: `${(room.ratings / 5) * 100}%` }}>

              </div>
            </div>
            <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
          </div>

          <Carousel autoPlay interval={1500} infiniteLoop>
              {room.images && room.images.map((image)=>(
                  <div key={image.public_id}>
                      <img src={image.url} alt={room.name} />
                  </div>
              ))}
          </Carousel>

          <div className="row my-5">
              <div className="col-12 col-md-6 col-lg-8">
                  <h3>Description</h3>
                  <p> {room.description} </p>

                <RoomFeatures room={room} />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                  <div className="booking-card shadow-lg p-4">
                    <p className='price-per-night'><b>${room.pricePerNight}</b> / night</p>

                    <hr />
                    <p className="mt-5 mb-3">Pick CheckIn and Checkout Date</p>
                    <DatePicker
                    className='w-100'
                    selected={checkInDate}
                    onChange={onDateChange}
                    startDate={checkInDate}
                    endDate={checkOutDate}
                    selectsRange
                    inline
                    />
                    <button className="btn btn-block py-3 booking-btn"
                    onClick={newBookingHandler}>Pay</button>

                  </div>
              </div>
          </div>


          <div className="reviews w-75">
            <h3>Reviews:</h3>
            <hr />
                <div className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner"></div>
                    </div>
                    <p className="review_user">by John</p>
                    <p className="review_comment">Good Quality</p>

                    <hr />
                </div>

                <div className="review-card my-3">
                  <div className="rating-outer">
                      <div className="rating-inner"></div>
                  </div>
                  <p className="review_user">by John</p>
                  <p className="review_comment">Good Quality</p>

                  <hr />
              </div>
        </div>
    </div>
    </>
  )
}

export default RoomDetails