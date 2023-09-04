import React from "react"

import { Star } from "@components"
import { styles, upper, stars } from './Review.module.css'

const Review = ({ nombre, comentario, rating }) => {
    const linkImg = "https://st3.depositphotos.com/7438112/18448/v/450/depositphotos_184486262-stock-illustration-yellow-star-icon-on-white.jpg"

    return (
        <div className={styles}>
            <div className={upper}>
                <h3>{nombre}</h3>
                <div className={stars}>
                    <span>
                        {Array(rating)
                            .fill()
                            .map((_, index) => (
                            <Star
                                key={index}
                                filled={true} />
                            ))}
                    </span>
                </div>
            </div>
            <p>{comentario}</p>
        </div>
    )
}

export default Review