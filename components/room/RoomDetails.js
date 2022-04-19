import Head from 'next/head';
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/roomActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import RoomFeatures from './roomFeatures';

const RoomDetails = () => {
  const {room, error} = useSelector(state=> state.roomDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if(error)
      toast.error(error);
      dispatch(clearErrors());
  }, [])
  
    
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

                    <button className="btn btn-block py-3 booking-btn">Pay</button>

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