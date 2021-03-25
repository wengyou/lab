import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import './index.scss';

const Nav = (props) => {

    const { location } = props;

    useEffect(() =>{
        // const str = location.substr(0,location.lastIndexOf('/'));
        // setActiveOne(str);
        // console.log(location, 1234);
        setActiveOne(location);
    },[location]);

    const { tabList } = props;
    const [activeOne, setActiveOne] = useState('/user/home');

    //改变activeOne
    const changeActive = (path) =>{
        setActiveOne(path);
    }

    return (
        <div className='nav flex'>
            {
                tabList.length !== 0 && tabList.map((e) => {
                    return (
                        <Link to={e.path} key={e.path}>
                            <div 
                                onClick={()=>changeActive(e.path)} 
                                className={`nav_item ${activeOne === e.path ? 'nav_active' : 'nav_not_active' }`} 
                            >
                                {e.name}
                            </div>
                        </Link>
                    )
                })
            }
        </div>

    )
}

export default Nav;
