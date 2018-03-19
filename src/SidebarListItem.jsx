import React, { Component } from 'react'
import { CSSTransitionGroup } from 'react-transition-group'

class SidebarListItem extends Component {
    constructor(props) {
        super(props)
        this.handleChildActive = this.handleChildActive.bind(this)
        this.handleChildOpen = this.handleChildOpen.bind(this)
        this.afterStateChange = this.afterStateChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = { activeIndex: null, openIndex: null, display: false, activeClassName: "", inActiveChildren: false }
    }
    componentWillReceiveProps(nextProps) {
        const { openIndex, activeIndex, inActiveChildren } = nextProps
        if (openIndex !== null && openIndex !== this.props.openIndex && openIndex !== this.props.index) {
            this.setState((prevState, props) => ({ display: false }))
        }
        if (activeIndex !== null && activeIndex !== this.props.activeIndex && activeIndex !== this.props.index) {
            this.setState((prevState, props) => ({ display: false, inActiveChildren: true, activeClassName: '' }))
        }
        if (inActiveChildren !== this.props.inActiveChildren && inActiveChildren === true) {
            this.setState((prevState, props) => ({ display: false, inActiveChildren: true }))
        }
    }
    handleChildActive(activeIndex) {
        this.setState((prevState, props) => ({ activeIndex, inActiveChildren: false, activeClassName: 'activeList' }))
        this.props.isActive(this.props.index)
    }
    handleChildOpen(openIndex) {
        this.setState((prevState, props) => ({ openIndex }))
    }
    handleClick(e) {
        e.stopPropagation()
        this.setState((prevState, props) => ({ display: !prevState.display }), this.afterStateChange)
    }
    afterStateChange() {
        if (this.state.display) {
            this.props.isOpen(this.props.index)
        }
    }
    render() {
        const listStyle = {
            maxHeight: this.state.display ? '6.5rem' : 0
        }
        return (
            <li onClick={this.handleClick} className={['sidebar-item', this.state.activeClassName, this.props.className, this.state.display ? 'open' : ''].join(' ')}>
                <span className="listItem-label">
                    <span>
                        {
                            this.props.icon ?
                                this.props.icon
                                :
                                <svg id="default-icon" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                                    <path d="M0 0h24v24H0z" fill="none" />
                                </svg>
                        }
                        {
                            this.props.label
                        }
                    </span>

                    <svg id="chevron" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                        <path d="M0 0h24v24H0z" fill="none" />
                    </svg>
                </span>
                
                        <ul style={{...this.props.style }} key={1} className={['sidebarListItem', this.props.className].join(' ')}>
                            {
                                React.Children.map(this.props.children, (child, index) => {
                                    return React.cloneElement(child, {
                                        isActive: this.handleChildActive,
                                        index,
                                        activeIndex: this.state.activeIndex,
                                        openIndex: this.state.openIndex,
                                        isOpen: this.handleChildOpen,
                                        inActiveChildren: this.state.inActiveChildren,
                                        history: this.props.history,
                                        location: this.props.location,
                                        match: this.props.match
                                    })
                                })
                            }
                        </ul>

            </li>

        )
    }
}
export default SidebarListItem
