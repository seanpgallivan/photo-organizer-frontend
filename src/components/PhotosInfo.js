import React from 'react'
import {Button} from 'semantic-ui-react'

const PhotosInfo = ({app: {state: {filtered}}, onSetEdit}) => {

  const handleClick = () => 
    onSetEdit({photo: {}})

  return (
    <div className="sideitem">
      <div className='side-header'>Photos Info:</div>
      <div className='counter'>{filtered.length} Photos</div>
      <Button name="new" color="teal" onClick={handleClick}>Add New Photo</Button>
    </div>
  )
}

export default PhotosInfo