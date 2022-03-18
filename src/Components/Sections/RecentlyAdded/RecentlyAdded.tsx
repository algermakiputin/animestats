import React from "react";
import axios from "axios";
import './RecentlyAdded.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import PlaceholderLoading from 'react-placeholder-loading';
import { Link } from 'react-router-dom';

class RecentlyAdded extends React.Component<any, any> {

    constructor(props: any) {
        super(props)

        this.state = {
            anime:[],
            totalSlides:0,
            slides:[],
            error:false
        }
    }

    async getRecentlyAdded() {

        await axios.get('https://api.jikan.moe/v4/watch/episodes', {
                    params: {
                        limit:20
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
                    this.setState({error:true});
                })
    }

    formatResults(result: []) {
        
        let counter = 0; 
        let slides = [];
        var data : string[] = [];
        let totalSlides = Math.floor(result.length / 3); 
        
        this.setState({totalSlides: totalSlides});
       
        for (let i = 0; i < result.length; i++) { 
            
            if (i % 3 == 0 && i) {
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

    placeHolderLoading() {

        return (
            <div className="recently-added">
                <PlaceholderLoading 
                    shape="rect" 
                    width="100%" 
                    height={180}
                    colorStart="#212121"
                    colorEnd="#171717"
                />
                <PlaceholderLoading 
                    shape="rect" 
                    width="100%" 
                    height={180}
                    colorStart="#212121"
                    colorEnd="#171717"
                />
                <PlaceholderLoading 
                    shape="rect" 
                    width="100%" 
                    height={180}
                    colorStart="#212121"
                    colorEnd="#171717"
                />
            </div>
        )
    }

    createSlides(formattedResult:any) {

        let slides = []; 
        for (let i = 1; i < formattedResult.length; i++) {
            
            const rows = formattedResult[i];
            var elements = [];
             
            for (let x = 0; x < rows.length; x++) {
                const entry = rows[x].entry;
                const image = entry.images.webp.large_image_url;
                const title = entry.title;
                const score = entry.score
                const element = (<Link
                                    to={'anime/' + entry.mal_id}
                                    key={x}
                                >
                                    <div className="carousel-column">
                                        <div className="featured-wrapper">
                                            <span className="rating"><span className="star">&#10004;</span> New update</span>
                                            <img className="featured-image" src={image} />
                                            <span className="bottom-title">{title}</span>
                                        </div>
                                    </div>
                                </Link>);
                elements.push(element)
            } 

            slides.push(
                <Slide key={i} index={i}>
                    <div className="recently-added">
                        {elements}
                    </div>
                </Slide>
                );
        }
        
        return slides;
    }

    componentDidMount() {

        this.getRecentlyAdded();
    }
    
    render() {

        return (
            <div>
                { this.state.error ? <p>Opps something went wrong please try again later</p> : (
                    !this.state.slides.length ? this.placeHolderLoading() : (
                        <CarouselProvider
                            naturalSlideWidth={500}
                            naturalSlideHeight={95}
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
                    )
                )}
            </div>
        );
    }

}

export default RecentlyAdded;