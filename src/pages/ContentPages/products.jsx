import Header from "../../components/ContentPages/header";
import Footer from "../../components/ContentPages/footer";
import React from 'react'

const Home = () =>{
    return(
        <div>
            <Header></Header>
            <main>
                <div>
                    <div>
                        <h2>Service 1</h2>
                    </div>
                    <div>
                        <h2>Service 2</h2>
                    </div>
                    <div>
                        <h2>Service 3</h2>
                    </div>
                    <div>
                        <h2>Service 4</h2>
                    </div>
                    <div>
                        <h2>Service 5</h2>
                    </div>
                    <div>
                        <h2>Service 6</h2>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Home;