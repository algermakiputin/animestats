import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './AnimeDetailsPage.css'; 
import Statistics from "../../Sections/Statistics/Statistics";
import axios from "axios";  

interface Anime {
    title: string, 
    imageURL: string,
    synopsis: string,
    year: number,
    genres: [],
    score: number,
    status: string,
    season:string,
    otherTitle: string 
}

const getAnime = async(id:any, setAnime: Function, setGenres: Function, setError: Function ) => {
     
    await axios.get('https://api.jikan.moe/v4/anime/' + id)
                .then(res => {  
                    const result = res.data.data;
                    setAnime({
                        title: result.title,
                        synopsis: result.synopsis,
                        imageURL: result.images.webp.large_image_url,
                        year: result.year, 
                        score: result.score,
                        genres: result.genres,
                        otherTitle: result.title_english,
                        season:result.season,
                        status: result.status 
                    });
 
                })
                .catch(err => {
                    setError(true)
                })
 
}
 
const AnimeDetailsPage = () => {

    const {id} = useParams(); 
    const [anime, setAnime] = useState<Anime>(); 
    const [error, setError] = useState(false); 
    const [genres, setGenres] = useState<Object>();  

    useEffect(() => {
        getAnime(id, setAnime, setGenres, setError); 
 
    },[]);

    return (
        <div className="container">
            <div className="page" id="anime-details">
                {error ? <div className="not-found"><h1>Anime not found...</h1></div> : (
                    !anime ? <h1 className="loader">Loading...</h1> : (
                        <div className="summary">
                            <div className="image-wrapper">
                                {anime ? <img src={anime.imageURL} /> : ''}
                            </div>
                            <div className="description">
                                <h1>{anime?.title} 
                                    <span className="year">&nbsp; {anime?.year}</span> 
                                    <span className="score"> {anime?.score ? <span className="star">&#9733;</span> : ''} {anime?.score}</span>
                                </h1>
                                <p>{anime?.synopsis}</p> 
                                <p className="info"><span className="label">Release:</span> {anime?.year}</p>
                                <p className="info"><span className="label">Status:</span> {anime?.status}</p>
                                <p className="info"><span className="label">Season:</span> {anime?.season}</p>
                                <p className="info"><span className="label">Other Title:</span> {anime?.otherTitle}</p>
                                <ul className="genres">
                                    {anime?.genres.map((item:any, index) => { 
                                        return <li key={index}>{item.name}</li>
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                )
                }   

                <Statistics id={id} />
            </div>
        </div>
    )
}

export default AnimeDetailsPage;