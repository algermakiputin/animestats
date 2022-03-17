import React from "react";
import { useParams } from "react-router-dom";
import './AnimeDetailsPage.css';
import axios from "axios";

const getAnime = async() => {
    
    await axios.get('')
}

const AnimeDetailsPage = () => {

    const {id} = useParams(); 

    return (
        <div className="page">
            <div className="summary"></div>
        </div>
    )
}

export default AnimeDetailsPage;