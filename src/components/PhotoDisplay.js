import React from 'react'

// Include callback for onPhotoClick in return

// Which props go here and which go in PhotoDetails?
// Destructure the props in the function parameter for readability 
// const PhotoDisplay = (props) => {
    
const PhotoDisplay = ({ filename }) => {
    
    return (
        // PhotoDisplay
        <div className="photo-display">
            {filename} 
        </div>
    )
}

export default PhotoDisplay

////////////////////////////////////////////////////////////////////

// Example show/card component from Stock lab below for reference only

// import React from 'react'

// const Stock = (props) => {

// return (
//   <div>

//     <div className="card" onClick={() => props.onClickStock(props.stock)}>
//       <div className="card-body">
//         <h5 className="card-title">{
//             props.stock.name
//           }</h5>
//         <p className="card-text">{
//             //props.stock.ticker + ": " + props.stock.price
//             `${props.stock.ticker}: ${props.stock.price}`
//           }</p>
//       </div>
//     </div>


//   </div>
//   )
// }

// export default Stock