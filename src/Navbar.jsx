
import React from 'react';
import logo from './logo.png'

function Navbar(){



    return(
        <div className='nav'>
            <div className="logo">
                <img id='logo' src={logo} alt='logo'/>
                <h1 className='navH1'>Software Information System</h1>
            
            </div>


            
            <div className="links">
                <ul>
                    <li><a href="#">SIS</a></li>
                    <li><a href="#">Blogs</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">News</a></li>
                </ul>
            </div>

        </div>
    )
}

export default Navbar;