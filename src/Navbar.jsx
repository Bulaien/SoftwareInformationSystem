
import React, {useState} from 'react';
import logo from './logo.png'



function Navbar(){
    const [menu, setMenu] = useState(false)



    return(
        <div className='nav'>
            <div className="logo">
                <img id='logo' src={logo} alt='logo'/>
                <h1 className='navH1'>Software Information System</h1>
                <h1 className='navH1a'>SIS</h1>

            </div>


            <div className="links">
            <ul>
                    <li><a href="#">SIS</a></li>
                    <li><a href="#">Blogs</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">News</a></li>
                </ul>
            </div>
            <button onClick={()=>setMenu(!menu)} id='burger'>
                <svg xmlns="http://www.w3.org/2000/svg" height="30"  viewBox="0 -960 960 960" width="36">
                    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
                </svg>
            </button>
            <div className="linker" id={menu?'':'hidden'}>
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