import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './AnimeDetailsPage.css';
import axios from "axios";
 
interface Anime {
    title: string, 
    imageURL: string,
    synopsis: string,
    year: number,
    genres: [],
    score: number
}

const getAnime = async(id:any, setAnime: Function, setGenres: Function ) => {
     
    await axios.get('https://api.jikan.moe/v4/anime/' + id)
                .then(res => {  
                    const result = res.data.data;
                    setAnime({
                        title: result.title,
                        synopsis: result.synopsis,
                        imageURL: result.images.webp.large_image_url,
                        year: result.year, 
                        score: result.score,
                        genres: result.genres
                    });
 
                })
                .catch(err => {
                    console.log(err)
                })
 
}
 
const AnimeDetailsPage = () => {

    const {id} = useParams(); 
    const [anime, setAnime] = useState<Anime>(); 
    const [genres, setGenres] = useState<Object>();  

    useEffect(() => {
        getAnime(id, setAnime, setGenres); 
 
    },[]);

    return (
        <div className="container">
            <div className="page">
                <div className="summary">
                    <div className="image-wrapper">
                        {anime ? <img src={anime.imageURL} /> : ''}
                    </div>
                    <div className="description">
                        <h1>{anime ? anime.title : ''} 
                            <span className="year">&nbsp; {anime?.year}</span> 
                            <span className="score"> {anime?.score ? <span className="star">&#9733;</span> : ''} {anime?.score}</span>
                        </h1>
                        <p>{anime? anime.synopsis : ''}</p> 
                        <ul className="genres">
                            {anime?.genres.map((item:any, index) => { 
                                return <li key={index}>{item.name}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimeDetailsPage;