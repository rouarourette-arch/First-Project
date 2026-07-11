import React from "react";
import {Link }from 'react-router-dom'
function Navbar(){
    return(
        <nav style={{display:"flex",justifyContent:"space-between",padding:'15px 30 px',background:'#8B4513',color:'#fff'}}> 
            <div className="logo">
                <Link to="/" style={{color:'#fff',fontSize:'24px',fontWeight:'bold',textDecoration:"none"}}>khamsa</Link>
            </div>
            <ul style={{display:'flex',listStyle: "none",gap:"20px",margin:0,padding:0}}>
                <li><Link to="/" style={{color:"#fff",textDecoration:'none'}}>Home</Link></li>
                <li><Link to="/contact" style={{color:"#fff",textDecoration:'none'}}>Contact Us</Link></li>
                <li><Link to="/profile" style={{color:"#fff",textDecoration:'none'}}>My Profile</Link></li>
                <li><Link to="/auth" style={{color:"#fff",textDecoration:'none'}}>Register</Link></li>
            </ul>
            <div className="panier" style={{cursor:"pointer"}}>
                <span style={{background:'red',borderRadius:'50%',padding:'2px 6px',fontSize:"12px"}}>0</span>
            </div>
        </nav>

    );
}
export default Navbar;