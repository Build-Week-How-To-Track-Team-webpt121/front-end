import React, { useState } from 'react';
import {axiosWithAuth} from "../utils/axiosWithAuth";

const AddGuide = (props) => {
    const [guideForm, setGuideForm] = useState({
        userId: props.userId,
        username: props.username,

        guideName:"", 
        category:"",
        description:"", 
        upVotes: 0
        
    })

    const changeHandler = (e) => {
        e.persist();
        //console.log(e.target.name, e.target.value);
        setGuideForm({
            ...guideForm,
            [e.target.name]: [e.target.value]
        });
    }

    const pushGuide = (e) => {
        console.log("button pushed");
        console.log(guideForm);
        e.preventDefault();
        axiosWithAuth()
        .post("https://how-to-backend-lambda.herokuapp.com/guides", guideForm)
        .then(response => {
            //props.setListings(response.data);
        console.log(response.data)})
        .catch(error => console.log(error))
    };

    return(
        <div className="container is-fluid" style={{ padding: '50px' }}>
        <div className="container has-text-centered box" style={{ maxWidth: '700px' }}>
        <h4 className="title">Add a Guide</h4>
        <form onSubmit={pushGuide}>
        <label className="label" htmlFor='title'>
        <h4 className="subtitle has-text-left">Guide Title</h4>
        <input
                        className="input"
                        type="text"
                        id="guideName"
                        name="guideName"
                        placeholder="insert guide title here"
                        onChange={changeHandler}
                        value={guideForm.guideName}
                    />
        </label>
        <label className="label" htmlFor='description'>
                <h4 className="subtitle has-text-left">Guide Description</h4>
                    <input
                        className="input"
                        type="text"
                        id="description"
                        name="description"
                        placeholder="insert guide description here"
                        onChange={changeHandler}
                        value={guideForm.description}
                    />
                </label>
                <label className="label" htmlFor='category'>
                <h4 className="subtitle has-text-left">Guide Category</h4>
                    <input
                        className="input"
                        type="text"
                        id="category"
                        name="category"
                        placeholder="insert Guide Category here"
                        onChange={changeHandler}
                        value={guideForm.category}
                    />
                </label>
                <button className="button is-medium is-primary is-fullwidth" type="submit" style={{ padding: '20px' }}>Add Life Hack</button>
        </form>
        </div></div>
    )

}

export default AddGuide;