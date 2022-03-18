import React from "react"; 
import axios from "axios"; 
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import PlaceholderLoading from 'react-placeholder-loading';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './PopularAnime.css';
import { Link } from 'react-router-dom'; 

class PopularAnime extends React.Component <any, any> {

    constructor(props: any) {
        super(props) 
        
        this.state = {
            anime:[],
            totalSlides:0,
            slides:[],
            error:''
        }
         
    }

    createSlides(formattedResult:any) {

        let slides = [];

        for (let i = 0; i < formattedResult.length; i++) {
            
            const rows = formattedResult[i];
            var elements = [];
             
            for (let x = 0; x < rows.length; x++) {
                
                const id = rows[x].mal_id;
                const rating = rows[x].score;
                const title = rows[x].title;
                const episodes = rows[x].episodes;
                const imageURL = rows[x].images.webp.image_url;
                elements.push(
                    <Link
                        to={'anime/' + id}
                        key={x}
                    >
                        <div  className="carousel-column">
                            <div className="img-wrapper">
                                <span className="rating"><span className="star">&#9733;</span> {rating}</span>
                                <img src={imageURL} /> 
                            </div>
                        </div>
                    </Link>
                )
            }

            slides.push(
                <Slide key={i} index={i}>
                    <div className="row">
                        {elements}
                    </div>
                </Slide>
                );
        }
        
        return slides;
    }
    
    async getPopularAnime() {
        
        return await axios.get('https://api.jikan.moe/v4/top/anime', {
                        params : {
                            page: 1
                        }
                    })
                    .then(res => { 
                        const result = res.data.data;
                        const formattedResult = this.formatResults(result);
                        const slides = this.createSlides(formattedResult);
                        
                        this.setState({slides: slides});
 
                    })
                    .catch(err => {
                        console.log(err)
                        this.setState({error: err});
                    })
    }

    formatResults(result: []) {
        
        let counter = 0; 
        let slides = [];
        var data : string[] = [];
        let totalSlides = Math.floor(result.length / 5); 
        this.setState({totalSlides: totalSlides});
        for (let i = 0; i < result.length; i++) { 
            
            if (i % 5 == 0 && i) {
                slides[counter] = data;
                data = [];
                counter++;
            }
            
            data.push(result[i]);
            
        } 

        if (data.length)
            slides[counter++] = data;

        return slides;
    }

    componentDidMount() {

        this.getPopularAnime();
    }


    placeHolder = () => {

        return (
            <div className="row">
                <PlaceholderLoading 
                    shape="rect" 
                    width="100%" 
                    height={260}
                    colorStart="#212121"
                    colorEnd="#171717"
                />
                <PlaceholderLoading 
                    shape="rect" 
                    width="100%" 
                    height={260}
                    colorStart="#212121"
                    colorEnd="#171717"
                />
                <PlaceholderLoading 
                    shape="rect" 
                    width="100%" 
                    height={260}
                    colorStart="#212121"
                    colorEnd="#171717"
                />
                <PlaceholderLoading 
                    shape="rect" 
                    width="100%" 
                    height={260}
                    colorStart="#212121"
                    colorEnd="#171717"
                />
                <PlaceholderLoading 
                    shape="rect" 
                    width="100%" 
                    height={260}
                    colorStart="#212121"
                    colorEnd="#171717"
                />
            </div>
        );
    }


    render() {

        return (
            <div>
                
                { this.state.error ? <p style={{color:'#fff'}}>Something went wrong try again later</p> : (
                    this.state.slides.length ? (
                        <CarouselProvider
                            naturalSlideWidth={500}
                            naturalSlideHeight={130}
                            totalSlides={this.state.totalSlides}
                            playDirection="forward"
                            touchEnabled={true}
                            infinite={true}
                            className="carousel-container"
                            >
                            <div className="carousel-buttons">
                                <ButtonBack className="back-button">
                                    <img src={require('../../../assets/chevron.png')} />
                                </ButtonBack>
                                <ButtonNext className="next-button">
                                    <img src={require('../../../assets/chevron.png')} />
                                </ButtonNext>
                            </div>
                            <Slider>
                                { this.state.slides }
                            </Slider> 
                            
                        </CarouselProvider>
                    ) : this.placeHolder()
                )}
            </div>
        )
    }
}

export default PopularAnime;