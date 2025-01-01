import React from 'react'
import './PropertyList.css'
import useFetch from '../../hooks/useFetch'

const PropertyList = () => {

    const { data, loading, error, reFetch } = useFetch("http://localhost:3003/api/hotels/countbyType");
    console.log(data);

    const images = [
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595550862.jpeg?k=3514aa4abb76a6d19df104cb307b78b841ac0676967f24f4b860d289d55d3964&o=",
        "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595548591.jpeg?k=01741bc3aef1a5233dd33794dda397083092c0215b153915f27ea489468e57a2&o=",
        "https://q-xx.bstatic.com/xdata/images/hotel/263x210/595551044.jpeg?k=262826efe8e21a0868105c01bf7113ed94de28492ee370f4225f00d1de0c6c44&o=",
        "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595549239.jpeg?k=ad5273675c516cc1efc6cba2039877297b7ad2b5b3f54002c55ea6ebfb8bf949&o=",
        "https://r-xx.bstatic.com/xdata/images/hotel/263x210/595549239.jpeg?k=ad5273675c516cc1efc6cba2039877297b7ad2b5b3f54002c55ea6ebfb8bf949&o="



    ]


    return (
        <div className='pList'>
            {
                loading ? ("Loading please wait")
                    : (
                        <>
                            {
                                data && images.map((img, i) => (
                                    <div className='pListItem' key={i}>
                                        <img src={img} alt="" className='pListImg' />
                                        <div className="pListTitles">
                                            <h1>{data[i]?.type}</h1>
                                            <h2>{data[i]?.count} {data[i]?.type}</h2>
                                        </div>

                                    </div>

                                ))
                            }

                        </>
                    )

            }

        </div>
    )
}

export default PropertyList
