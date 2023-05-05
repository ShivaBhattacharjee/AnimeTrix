import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Card from './Card';
import { HomeApi } from './constants';
const ForYou = () => {
  const [forYou, setforYou] = useState([])
  const [isBookmark, setIsBookmark] = useState(false);

  //bookmark
  function handleIconClick() {
    setIsBookmark(!isBookmark);
  }
  const getRandom = async () => {
    try {
      const api = await fetch(`${HomeApi}/meta/anilist/random-anime`)
      const response = await api.json()
      setforYou(response)
    }
    catch (error) {
      console.log("Error loading recommended for you")
    }
  }
  useEffect(() => {
    getRandom();
  }, [])
  return (
    <>
      {forYou && (

        <section className='movies for'>
          <div className='filter-bar'>
            <div className="heading">
              <h3>You might like</h3>
            </div>
          </div>
          <div className="seasons-grid">
            <Card rec={forYou}></Card>
          </div>
        </section>
      )}
    </>
  )
}

export default ForYou