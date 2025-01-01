import React from 'react';
import './Feature.css'; // Make sure the CSS file is named correctly
import useFetch from '../../hooks/useFetch';

const Feature = () => {
  const { data, loading, error } = useFetch("http://localhost:3003/api/hotels/countByCity?cities=Berlin,Madrid,London");

  return (
    <div className="feature">
      {loading ? "Loading please wait" : (
        <>
          {/* Berlin */}
          <div className="featureItem">
            <img
              src="https://cf2.bstatic.com/xdata/images/xphoto/300x240/140052776.jpg?k=19caf7a48d510088ec6069be87f5cf0b60425aa257ef7102af45c570ade8b168&o="
              alt="Berlin"
              className="featureImg"
            />
            <div className="featureTitles">
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          {/* Madrid */}
          <div className="featureItem">
            <img
              src="https://cf2.bstatic.com/xdata/images/xphoto/720x405/292260574.webp?k=efc8e339ea66514c3b64c5bc891f1608d22a40eb23b853bc0c9ecb93c541ef10&o="
              alt="Madrid"
              className="featureImg"
            />
            <div className="featureTitles">
              <h1>Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>

          {/* London */}
          <div className="featureItem">
            <img
              src="https://cf2.bstatic.com/xdata/images/xphoto/540x405/290483794.webp?k=916f7bac0ccdb08efcb269ad29cc10816ab66cd1671359066d23d32fb17b5c39&o="
              alt="London"
              className="featureImg"
            />
            <div className="featureTitles">
              <h1>London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Feature;
