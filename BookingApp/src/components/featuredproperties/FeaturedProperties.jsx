import React from 'react'
import './FeaturedProperties.css'
import useFetch from '../../hooks/useFetch'

const FeaturedProperties = () => {

    const { data, loading, error, reFetch } = useFetch("http://localhost:3003/api/hotels?featured=true&limit=4");
    console.log(data);


    return (
        <div className='fp'>

            {
                loading ? "Loading please wait" :
                <>
                {
                            data && data.map(item => (
                                <div key={item._id} className='fpItem'>
                                    <img src={item.photos[0]} alt="" className='fpImg' />
                                    <span className='fpName'>{item.title}</span>
                                    <span className='fpCity'>{item.city}</span>
                                    <span className='fpPrice'>Starting from {item.cheapestPrice}€</span>
                                    {
                                        item.rating && <div className="fpRating">
                                            <button>{item.rating}</button>
                                            <span>Excellent</span>
                                        </div>
                                    }

                                </div>
                            ))
                            
                            }
                        </>
                    
            }




        </div>
    )
}

export default FeaturedProperties
