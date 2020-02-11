import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

const Thumb = ({thumb}) => (
    <Card>
    <Image src={thumb} wrapped ui={false} />
    <Card.Content>
      <Card.Header></Card.Header>
      <Card.Meta>
        <span className='date'></span>
      </Card.Meta>
      <Card.Description>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
      </a>
    </Card.Content>
  </Card>
  )
  
  export default Thumb