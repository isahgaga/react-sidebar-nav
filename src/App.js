import React, { Component } from 'react';
import SidebarList from './SidebarList'
import SidebarItem from './SidebarItem'
import './App.css';
import './sidebar.css'
import SidebarListItem from './SidebarListItem';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SidebarList>
          <SidebarItem to="/bar" label="users"/>
          <SidebarItem to="/boo" label="admin"/>
          <SidebarListItem label="reports">
            <SidebarItem to="/ore" label="blogs"/>
            <SidebarItem to="/home" label="pages"/>
          </SidebarListItem>
          <SidebarListItem label="houses">
            <SidebarItem to="/nob" label="members"/>
            <SidebarItem to="/cub" label="assets"/>
            <SidebarListItem label="a">
              <SidebarListItem label="b">
                <SidebarItem to="/dab" label="blogs"/>
                <SidebarItem to="/baf" label="pages"/>
              </SidebarListItem>
              <SidebarItem to="/bad" label="blogs"/>
              <SidebarItem to="/foo" label="pages"/>
            </SidebarListItem>
          </SidebarListItem>
        </SidebarList>
        <Link to="/foo">click</Link>
      </div>
    );
  }
}

export default App;
