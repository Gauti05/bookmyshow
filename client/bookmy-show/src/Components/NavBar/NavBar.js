
import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;


function Navbar(){
const navItems = [
    {
        label:"home",

    }, 
    {
        label:"Gautam"
    }
]


    return  <Layout>
    <Header 
    className='d-flex'
     style={{
        position:"sticky",
        top:0,
        display:"flex",
        alignItems:"center",
        // items:{navItems}
     }}
    >
      <h3 className='text-white m-0'> Book My Show </h3>
      <Menu
        theme="dark"
        mode="horizontal"
        items={navItems}
      />
    </Header>
  </Layout>
}

export default Navbar;