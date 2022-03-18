import axios from "axios";
import React from "react";
import './Statistics.css';  

class Statistics extends React.Component<any, any> {

    constructor(props:any) {
        super(props)

        this.state = {
            statistics:[]
        }
    }

    async getStatistics() {

        await axios.get('https://api.jikan.moe/v4/anime/'+this.props.id+'/statistics')
                    .then(res => {
                        
                        this.setState({statistics: res.data.data})

                        console.log(this.state.statistics)
                    })
                    .catch(err => {
                        console.log(err)
                    })
    }

    componentDidMount() {
        
        this.getStatistics();
    }
    render() {

        return (<table id="statistics">
            <thead></thead>
            <tbody>
                <tr>
                    <td>Currently Watching</td>
                    <td>{parseInt(this.state.statistics.watching).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Completed Watching</td>
                    <td>{parseInt(this.state.statistics.completed).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Dropped</td>
                    <td>{parseInt(this.state.statistics.dropped).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>On Hold</td>
                    <td>{parseInt(this.state.statistics.on_hold).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Plans to watch</td>
                    <td>{parseInt(this.state.statistics.plan_to_watch).toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>{(parseInt(this.state.statistics.total)).toLocaleString()}</td>
                </tr>
            </tbody>
            <tfoot></tfoot>
        </table>);
    }
}

export default Statistics;