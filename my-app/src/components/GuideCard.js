import React from 'react';

const GuideCard = (props) => {

    return(
    <div className="guides">
        <h3>{props.guide.guideName}</h3>
        <p>Description: {props.guide.description}</p>
        <p>Category: {props.guide.category}</p>
    </div>
    )}

export default GuideCard;