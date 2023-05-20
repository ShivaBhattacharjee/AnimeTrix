import React, { useEffect, useState } from 'react'
import Card from './Card';
import { HomeApi } from './constants';
import { showErrorToast } from '../utils/toast';
const ForYou = () => {
  const [forYou, setforYou] = useState([])
  const getRandom = async () => {
    try {
      const api = await fetch(`${HomeApi}/meta/anilist/random-anime`)
      const response = await api.json()
      setforYou(response)
    }
    catch (error) {
      showErrorToast('Error loading You Might Like');
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
          <div className="movies-grid">
            <Card rec={forYou}></Card>
          </div>
        </section>
      )}
    </>
  )
}

export default ForYou