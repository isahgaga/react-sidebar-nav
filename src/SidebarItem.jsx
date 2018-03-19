import React,{Component} from 'react'
import { Link } from 'react-router-dom';
class SidebarItem extends Component{
    constructor(props){
        super(props)
        this.clickHandler=this.clickHandler.bind(this)
        this.state={active:false,activeClassName:''}
    }
    componentWillReceiveProps(nextProps){
        const {activeIndex,inActiveChildren} = nextProps
        
        if(nextProps.location.pathname !== this.props.location.pathname && nextProps.location.pathname === this.props.to){
            this.setState((prevState,props)=>({active:true,activeClassName:'active'}))
            nextProps.isActive(nextProps.index)
        }

        if (activeIndex !== null && activeIndex !== this.props.activeIndex && activeIndex !== this.props.index) {
            this.setState((prevState,props)=>({active:false,activeClassName:''}))
        }

        if (inActiveChildren !== this.props.inActiveChildren && inActiveChildren === true) {
            this.setState((prevState,props)=>({active:false,activeClassName:''}))
        }
    }
    componentDidMount(){
        if(this.props.location.pathname === this.props.to){
            this.setState((prevState,props)=>({active:true,activeClassName:'active'}))
            this.props.isActive(this.props.index)
        }
    }
    clickHandler(e){
        e.stopPropagation()
        this.setState((prevState,props)=>({active:true,activeClassName:'active'}))
        this.props.isActive(this.props.index)
    }
    render(){
        return(
            <li onClick={this.clickHandler} className={['sidebar-item',this.state.activeClassName,this.props.className].join(' ')}>
                <Link to={this.props.to}>
                {
                    this.props.icon ?
                    this.props.icon
                    :
                    <svg id="default-icon" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                }
                <span>
                
                {this.props.label}
                </span>
                </Link>
            </li>
        )
    }
}
export default SidebarItem