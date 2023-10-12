import React, {useState, useEffect} from "react";
import { useStoreon } from "storeon/react";
import { useApi } from "@hooks";
import { Navbar, Review } from "@components"
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Manager_Menu = () => {

    const { apiUrl } = useApi();
    const { user } = useStoreon('user')

    const [ hospitals, setHospitals ] = useState([])
    const [ reviews, setReviews ] = useState([])

    const fetchHospitalsData = async () => {
        const response = await fetch(`${apiUrl}/hospitales/hospitalsByManager/${user.correo}`)
            .then(res => res.json());
        setHospitals(response);
    };

    const fetchReviewsData = async (hospital_id) => {
        const response = await fetch(`${apiUrl}/reviews/getReviewsByHospital/${hospital_id}`)
            .then(res => res.json());
        setReviews(reviews => [...reviews, ...response]);
    }

    useEffect(() => {
        fetchHospitalsData()
    }, [])

    useEffect(() => {
        hospitals.forEach(hospital => {
            fetchReviewsData(hospital.hospital_id);
        })
    }, [hospitals])

    const sliderSettings = { 
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
    };

    return (
        <div>
            <Navbar showBackButton={true} />
            <h2>Comentarios registrados</h2>
            {
                hospitals.map((hospital, index) => (
                    <div key={index}>
                        <h3>{hospital.nombre}</h3>
                        <Slider {...sliderSettings}>
                            {reviews.map((review, index) => (
                                <Review 
                                    key = {index}
                                    nombre = {review.users.correo}
                                    comentario = {review.comentario}
                                    rating = {parseInt(review.rating)}
                                />
                            ))}
                        </Slider>
                    </div> 
                )) 
            }
        </div>
    )
}

export default Manager_Menu;