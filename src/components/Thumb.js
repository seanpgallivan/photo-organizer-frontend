import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const Thumb = ({photo}) => (
  <Link to={`/photo/${photo.id}`}>
    <Card>
      <Image src={photo.filename}/>
    </Card>
  </Link>
)
  
export default Thumb