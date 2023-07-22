import React from 'react'
import logo from "../../images/logo.svg"
import { Carousel } from "react-responsive-carousel";
import img1 from "../../images/about1.jpg";
import img2 from "../../images/about2.jpg";
import img3 from "../../images/about3.jpg";
import img4 from "../../images/about4.jpg";
import img5 from "../../images/about5.jpg";
import "./About.css";

const About = () => {
  return (
    <>
        <div className='firstDiv'>
        <div className='content'>
        <h1>Digi-Depot</h1>
        <p>we strive to provide a seamless shopping experience, offering a curated selection of cutting-edge products and services. Join us on this exciting journey as we explore the limitless possibilities of the digital realm. Your satisfaction is our top priority, and we look forward to serving you with unmatched dedication and expertise</p>
        </div>
        <div className='image'>
        <img src={logo} alt='Digi-Depot'/>
        </div>
        </div>

        <div className='secondDiv'>
            <div className='content'>
                <h1>Our Highlights</h1>
                <ul>
                    <li>Big Discounts & Offers</li>
                    <li>Secure Online Payment</li>
                    <li>Fast and Reliable Shipping </li>
                    <li>User-friendly Dashboard</li>

                </ul>
            </div>
            <div className='aboutCarousel'>
                <Carousel autoPlay={true} interval={5000} infiniteLoop={true} emulateTouch={true} showIndicators={false} showThumbs={false}>
                    <img src={img1} alt='img'/>
                    <img src={img2} alt='img'/>
                    <img src={img3} alt='img'/>
                    <img src={img4} alt='img'/>
                </Carousel>
            </div>
        </div>

        <div className='thirdDiv'>
        <div className='content'>
            <h1>Unlock Your Business Potential: Amplify Sales on Our Platform!</h1>
        </div>
        <div className='image'>
            <img src={img5} alt='img'/>
        </div>
        </div>

    </>
  )
}

export default About
