import axios from "axios";
import React from "react";
import PlaceholderLoading from 'react-placeholder-loading';
import './Statistics.css';  

class Statistics extends React.Component<any, any> {

    constructor(props:any) {
        super(props)

        this.state = {
            statistics:[],
            error:false,
            loaded:false
        }
    }

    placeHolderLoading() {

        return <div>
            <PlaceholderLoading 
                shape="rect" 
                width="100%" 
                height={30}
                colorStart="#212121"
                colorEnd="#171717"
            />
            <PlaceholderLoading 
                shape="rect" 
                width="100%" 
                height={30}
                colorStart="#212121"
                colorEnd="#171717"
            />
            <PlaceholderLoading 
                shape="rect" 
                width="100%" 
                height={30}
                colorStart="#212121"
                colorEnd="#171717"
            />
            <PlaceholderLoading 
                shape="rect" 
                width="100%" 
                height={30}
                colorStart="#212121"
                colorEnd="#171717"
            />
            <br/>
            <br/>
            <br/>
        </div>
    }

    async getStatistics() {

        await axios.get('https://api.jikan.moe/v4/anime/'+this.props.id+'/statistics')
                    .then(res => {
                        
                        this.setState({statistics: res.data.data})
                        this.setState({loaded:true})
                    })
                    .catch(err => { 
                        this.setState({error:true});
                    })
    }

    componentDidMount() {
        
        this.getStatistics(); 
    }
    render() {

        return this.state.error ? <p className="errorMessage">Failed to load data please try again later.</p> : (
            !this.state.loaded ? this.placeHolderLoading() : (
                <table id="statistics">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td>Currently Watching</td>
                            <td>{parseInt(this.state.statistics?.watching).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Completed Watching</td>
                            <td>{parseInt(this.state.statistics?.completed).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Dropped</td>
                            <td>{parseInt(this.state.statistics?.dropped).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>On Hold</td>
                            <td>{parseInt(this.state.statistics?.on_hold).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Plans to watch</td>
                            <td>{parseInt(this.state.statistics?.plan_to_watch).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>{(parseInt(this.state.statistics?.total)).toLocaleString()}</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            )
        );
    }
}

export default Statistics;