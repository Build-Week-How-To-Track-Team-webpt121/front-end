import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import AddGuide from './AddGuide';
import GuideCard from './GuideCard';


const Guides = () => {

    const [guides, setGuides] = useState([]);
    const getGuides = () => {
        axiosWithAuth()
      .get("api/guides")
      .then((res) => {
        console.log("getGuides Api response:", res.data);
        setGuides(res.data);
      })
      .catch((err) => console.log("getGuides error:", err))
    };

    useEffect(()=>{
        getGuides()
    },[]);

    return (
        <div>

        <div>
            <h2>Life Hacks!</h2>
            {guides.map(item => (
                <GuideCard guides={item} key={item.id}/>
                
            ))}
        </div>

        <div>
            <AddGuide guides={guides} setGuides={setGuides}/>
        </div>
        </div>
    )
}

export default Guides;