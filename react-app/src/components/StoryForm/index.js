import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostStory } from "../../store/story";
import { useHistory } from "react-router-dom/";
import { titleToSword, options , titleValidator, urlChecka} from "../_helpers";

import './StoryForm.css'

export default function StoryFormPage() {
  const dispatch = useDispatch();
  const [user, story] = useSelector((state) => [state.session.user, state.stories.singleStory]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag1, setTag1] = useState("");
  const [mature, setMature] = useState("")
  const [cover, setCover] = useState("")
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length){
      setSubmitted(true);
      return
    }
    let newStory = await dispatch(fetchPostStory({title, description, tags: [tag1], 'user_id': user.id}))
    history.push(`/myworks/${newStory.id}-${titleToSword(newStory.title)}/${newStory.singleChapter.id}-${titleToSword(newStory.singleChapter.title)}`)
    console.log(newStory)
    //I THINK I WANT THIS TO CREATE A NEW STORY AND A NEW CHAPTER,
    //THEN WE CAN RUN A PUT REQUEST ON THE CHAPTER.
    }

  useEffect(() => {
    const ve = [] //Validation Errors
    setErrors([])
    if(titleValidator(title)) ve.push(titleValidator(title))
    if(cover && urlChecka(cover)) ve.push(urlChecka(cover))
    if(ve.length) setErrors(ve)
    console.log("!!")
  },[title, description, cover, tag1])

  const changeRating = () => {
    mature ? setMature(false) : setMature(true)
  }

  return (
    <div className="story-form-div">
      <h2>Story Details</h2>
      <div className="form-div"></div>
      <div className="form-div">
      <form onSubmit={handleSubmit} className="new-story-form">
        <ul >
          {submitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label className="label">
          <div>Title</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </label>
        <label className="label">
        <div>Description</div>
          <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={10}
          />
        </label>
        <label className="label">
        <div>Cover</div>
          <input
            type="text"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            placeholder="Cover Image Url"
          />
        </label>
        <label className="label mature">
          Mature Content:
          <input
            type="checkbox"
            value={mature}
            onChange={() => changeRating()}
          />
        </label>
        <div className="story-tag-selection-div">
					<h5>Which tag best fits your story?</h5>
					<select className="story-tag-selector" value={tag1} onChange={(e) => setTag1(e.target.value)}>
						{options.map(option => <option>{option}</option>)}
					</select>
        </div>
        <button className="submit-story-button btn log-in" type="submit">Submit</button>
      </form>
      </div>
    </div>

    // <div className="story-form-div">
    //   <h2>Story Details</h2>
    //   <div className="form-div">
    //   <form onSubmit={handleSubmit} className="new-story-form">
    //     <ul>
    //       {errors.map((error, idx) => <li key={idx}>{error}</li>)}
    //     </ul>
    //     <label className="label">
    //       <div>Title</div>
    //       <input
    //         type="text"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         placeholder="Title"
    //       />
    //     </label>
    //     <label className="label">
    //     <div>Description</div>
    //       {/* <input
    //         type="textarea"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         placeholder="Description"
    //       /> */}
    //       <textarea
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       placeholder="Description"
    //       rows={10}
    //       />
    //     </label>
    //     <label className="label">
    //     <div>Tags</div>
    //       <input
    //         type="text"
    //         value={tags}
    //         onChange={(e) => setTags(e.target.value)}
    //         placeholder="Tags"
    //       />
    //     </label>
    //     <label className="label">
    //     <div>Cover</div>
    //       <input
    //         type="text"
    //         value={cover}
    //         onChange={(e) => setTags(e.target.value)}
    //         placeholder="Cover Image Url"
    //       />
    //     </label>
    //     <label className="label mature">
    //       Mature Content:
    //       <input
    //         type="checkbox"
    //         value={mature}
    //         onChange={() => changeRating()}
    //       />
    //     </label>
    //     <button className="submit-story-button btn log-in" type="submit">Post Story</button>
    //   </form>
    //   </div>
    // </div>
  );
}
