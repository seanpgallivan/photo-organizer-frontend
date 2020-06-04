import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Thumb = ({photo}) => (
  <Link to={`/photo/${photo.id}`}>
    <Card style={{backgroundImage: `url(${photo.filename})`}}></Card>
  </Link>
)
  
export default Thumb