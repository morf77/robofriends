import React, {Component} from "react";
import SearchBox from '../components/SearchBox'
import CardList from '../components/CardList'
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/Boundry'
import './app.css'


class App extends Component {
    constructor(){
        super()
        this.state={
            robots: [],
            searchfield: ''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then(users=>this.setState({robots:users}))
    }
    onSearchChange=(event)=>{
        this.setState({searchfield:event.target.value})
    }
    render(){
        const filterRobots = this.state.robots.filter(robot=>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if(this.state.robots.length===0){
            return <h1>loading</h1>
        }
        return (
            <div className="tc">
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        )
    }
}
export default App;