import React from "react";
import PopularAnime from "../../Sections/Popular/PopularAnime";
import './Home.css';

class HomePage extends React.Component {

    render() {

        return (
            <div className="container">
                <section>
                    <h2>Top Popular</h2>
                    <PopularAnime />
                </section>
            </div>
        )
    }
}

export default HomePage;