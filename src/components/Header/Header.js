import React from 'react'
import {Layout, Menu} from 'antd'
import {Link} from 'react-router-dom'
import { withRouter } from "react-router-dom"
import {ReactComponent as Logo} from '../../assets/f1_logo.svg'
// import {ReactComponent as Track} from '../../assets/track.svg'
import './Header.css'

const {Sider} = Layout


class SideBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            collapsed: false
        }
    }

    onCollapse = collapsed => {
        // console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        return (           
                <Sider breakpoint="md" collapsedWidth="0"  collapsed={this.state.collapsed} onCollapse={this.onCollapse} >
                    <div className="logo">
                        <Logo />
                    </div>
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="0">
                            <Link className="menu-item" to="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                        <Link className="menu-item" to="/results">Race Results</Link>                 
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link className="menu-item" to="/drivers">Drivers</Link>               
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Link className="menu-item" to="/circuits">Circuits</Link>              
                        </Menu.Item>
                        <Menu.Item key="4">
                        <Link className="menu-item" to="/constructors">Constructors</Link>             
                        </Menu.Item>
                        <Menu.Item key="5">
                        <Link className="menu-item" to="/map"> Map  </Link>             
                        </Menu.Item>
                    </Menu>
                </Sider>                
        )
    }
}

export default withRouter(SideBar)