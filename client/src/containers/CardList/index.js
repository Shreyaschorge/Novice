import React from 'react'
import './index.scss'
import Card from 'components/Card';

const CardList = () => {
  return (
    <div className='container'>
      <div className="card-list">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}

export default CardList
