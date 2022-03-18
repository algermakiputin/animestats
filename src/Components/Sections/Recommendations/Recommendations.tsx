import axios from "axios";
import React from "react";
import './Recommendations.css';
import { Link } from "react-router-dom";

class Recommendations extends React.Component<any, any> {

    constructor(props:any) {
        super(props)

        this.state = {
            recommendations: []
        }
    }

    async getRecommendations() {

        await axios.get('https://api.jikan.moe/v4/anime/28977/recommendations')
                    .then(res => {
                        const result = (res.data.data); 
                        this.setState({recommendations: result});
                    })
                    .catch(err => {
                        console.log(err)
                    })
    }

    componentDidMount() {

        this.getRecommendations(); 
    }

    DisplayRecommendations = () => {

        let elements = [];

        for (let i = 0; i < this.state.recommendations.length; i++) {
            
            const row = this.state.recommendations[i]; 
            elements.push(
                <Link to={'anime/' + row.entry.mal_id} key={i}>
                    <div className="item" >
                        <span className="rating">Votes: {row.votes}</span>
                        <img className="image" src={row.entry.images.webp.image_url} />
                    </div>
                </Link>
            );
        }

        return <div className="grid">{elements}</div>;
    }


    render() {

        return <div id="recommendations">
            <this.DisplayRecommendations />
        </div>;
    }

}

export default Recommendations;