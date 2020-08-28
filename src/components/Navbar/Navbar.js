import React from 'react'
import {Layout} from 'antd'
import SelectYear from '../SelectYear/SelectYear'
const {Header} = Layout

class Navbar extends React.Component {
   render() {
       return (
           <Header>
               <SelectYear />
           </Header>
       )
   }
}

export default Navbar
