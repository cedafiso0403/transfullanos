import Header from "../../components/ContentPages/header";
import Footer from "../../components/ContentPages/footer";
import React from 'react'
import slide1 from "../../images/slide-1.jpg"
import slide2 from "../../images/slide-2.jpg"
import slide3 from "../../images/slide-3.jpg"

const Home = () =>{
    return(
        <div>
            <Header></Header>
            <main>
                <div className="slider-frame">
                    <div className="slide-images">
                        <div className="img-container">
                            <img src={slide1} alt="Slide 1"/>
                        </div>
                        <div className="img-container">
                            <img src={slide2} alt="Slide 2"></img>
                        </div>
                        <div className="img-container">
                            <img src={slide3} alt="Slide 3"></img>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Home;