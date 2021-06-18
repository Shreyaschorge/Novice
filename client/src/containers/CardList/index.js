import React from 'react'
import './index.scss'
import Card from 'components/Card';

const CardList = ({students}) => {
  return (
    <div className='container'>
      <div className="card-list">
        {students.map((student) => {
          return <Card key={student.email} student={student}/>
        })}
      </div>
    </div>
  )
}

export default CardList
