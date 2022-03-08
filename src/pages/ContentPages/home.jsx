import Header from "../../components/ContentPages/header";
import Footer from "../../components/ContentPages/footer";
import React from 'react'
import slide1 from "../../images/slide-1.jpg"
import slide2 from "../../images/slide-2.jpg"
import slide3 from "../../images/slide-3.jpg"

const Home = () => {
    return (
        <div>
            <Header></Header>
            <main>
                <div className="slider-frame">
                    <div className="slide-images">
                        <div className="img-container">
                            <img src={slide1} alt="Slide 1" />
                        </div>
                        <div className="img-container">
                            <img src={slide2} alt="Slide 2"></img>
                        </div>
                        <div className="img-container">
                            <img src={slide3} alt="Slide 3"></img>
                        </div>
                    </div>
                    <div className="background-home"></div>
                    <div className="text-container">
                        <h3>Lorem ipsum</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Home;