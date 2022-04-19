import Head from 'next/head';
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/roomActions';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

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
                  <p>We are offering fully furnished apartment with your all basic needs being fulfilled. It consists of 2 king size bed room with a beautiful view in the living room, it also has a fully operational kitchen with microwave and basic crockery.
                    Beside all it has a amazing balcony infront of valley view.</p>


                  <div className="features mt-5">
                    <h3 className='mb-4'>Features:</h3>
                      <div className='room-feature'>
                        <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
                        <p>6 Guests</p>
                      </div>

                      <div className='room-feature'>
                        <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
                        <p>2 Beds</p>
                      </div>

                      <div className='room-feature'>
                        <i className="fa fa-cog fa-fw fa-bath" aria-hidden="true"></i>
                        <p>2 Baths</p>
                      </div>

                      <div className='room-feature'>
                        <i className="fa fa-cog fa-fw fa-cutlery" aria-hidden="true"></i>
                        <p>Kitchen</p>
                      </div>

                  </div>


              </div>

              <div className="col-12 col-md-6 col-lg-4">
                  <div className="booking-card shadow-lg p-4">
                    <p className='price-per-night'><b>$28</b> / night</p>

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