import React  from 'react';
import {Route, Switch} from 'react-router-dom'
import SideBar from './components/Header/Header'
import Drivers from './pages/Drivers/Drivers2'
import Home from './pages/Home/Home'
import Constructors from './pages/Constructors/Constructors'
import Results from './pages/Results/Results'
import Circuits from './pages/Circuits/Circuits'
import Navbar from './components/Navbar/Navbar'
import {Layout} from 'antd'
import Map from './pages/Map/Map'
import './App.css'

const {Content} = Layout

class App extends React.Component{
  render(){
    
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>         
          <SideBar /> 
            <Layout className="site-layout"> 
              <Navbar />                
              <Switch>
                <Route path ="/" component={Home} exact={true} />
                <Route path ="/map" component={Map} exact={true} />
                <Route path ="/circuits" component={Circuits} exact={true} />
                <Route path = "/drivers" component={Drivers} exact={true} />
                <Route path = "/results" component={Results} exact={true} />
                <Route path = "/constructors" component={Constructors} exact={true} />     
              </Switch>
            </Layout>
        </Layout>    
      </div>
    );
  }
 
}

export default App;
