import React, { useState } from 'react';
import Button from "@mui/material/Button";
import "./card.scss"
import Formation from "../formation/page"; // Renamed to avoid conflict
import Reunion from "../reunion/page"; // Renamed to avoid conflict
import Documents from "../documents/page"; // Renamed to avoid conflict


const NewsCard = ({}) => {
    const [buttonPressed, setButtonPressed] = useState(<Reunion />);

    const handleButtonClick = (component) => {
        setButtonPressed(component);
    };
    const Page = {buttonPressed};
    return (
        
        <div>
            <div className="buttons-container">
                <button className="button" onClick={() => handleButtonClick(<Reunion />)}>Réunion</button>
                <button className="button" onClick={() => handleButtonClick(<Formation />)}>Formation</button>
                <button className="button" onClick={() => handleButtonClick(<Documents />)}>Documents</button>
            </div>
            <div>
                {buttonPressed}
            </div>
        </div>
    );
};

export default NewsCard;
