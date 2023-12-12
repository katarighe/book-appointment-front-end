import PropTypes from 'prop-types';
import './DoctorCard.scss';
import { BsFacebook, BsInstagram, BsTwitterX } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function DoctorCard({
  id, imageUrl, name, description,
}) {
  return (
    <Link
      to={`doctordetails/${id}`}
      className="doctorCard d-flex flex-column justify-content-center align-items-center text-center"
    >
      <figure className="">
        <img src={imageUrl} alt="" />
      </figure>

      <div className="my-4 d-flex flex-column align-items-center justify-content-center text-center">
        <h4>
          {' '}
          {name}
          {' '}
        </h4>
        <p className="col-12 col-md-8 mx-auto">
          {' '}
          {description}
          {' '}
        </p>
      </div>

      <div className="d-flex gap-3 justify-content-center ">
        <BsFacebook size={30} color="var(--Grey3)" />
        <BsTwitterX size={30} color="var(--Grey3)" />
        <BsInstagram size={30} color="var(--Grey3)" />
      </div>
    </Link>
  );
}

DoctorCard.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
};

export default DoctorCard;
