import React from "react";
import PopularAnime from "../../Sections/Popular/PopularAnime";
import RecentlyAdded from "../../Sections/RecentlyAdded/RecentlyAdded";
import Recommendations from "../../Sections/Recommendations/Recommendations";
import './Home.css';

class HomePage extends React.Component {

    render() {

        return (
            <div className="container">
                <section>
                    <h2 className="section-title">Top Popular</h2>
                    <PopularAnime />
                </section>
                <section>
                    <h2 className="section-title">Recently Added</h2>
                    <RecentlyAdded />
                </section>
                <section>
                    <h2 className="section-title">Recommendations</h2>
                    <Recommendations />
                </section>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

export default HomePage;