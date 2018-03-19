import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'

class SidebarList extends Component{
    constructor(props){
        super(props)
        this.handleChildActive=this.handleChildActive.bind(this)
        this.handleChildOpen=this.handleChildOpen.bind(this)
        this.state={activeIndex:null,openIndex:null}
    }
    handleChildActive(activeIndex){
        this.setState((prevState,props)=>({activeIndex}))
    }
    handleChildOpen(openIndex){
        this.setState((prevState,props)=>({openIndex}))
    }
    render(){
        return(
            <ul className={['sidebar',this.props.className].join(' ')}>
                {
                    React.Children.map(this.props.children,(child,index)=>{
                        return React.cloneElement(child,{
                            isActive:this.handleChildActive,
                            index,
                            activeIndex:this.state.activeIndex,
                            openIndex:this.state.openIndex,
                            isOpen:this.handleChildOpen,
                            history:this.props.history,
                            location:this.props.location,
                            match:this.props.match
                        })
                    })
                }
            </ul>
        )
    }
}
export default withRouter(SidebarList)