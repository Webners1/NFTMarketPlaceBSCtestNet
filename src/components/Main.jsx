import React, { Component, useState } from 'react';
import { Card } from 'react-bootstrap';


// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
function Main(props) {

  let [value, setValue] = useState('')
  let [desc, setDesc] = useState('')
  let [name, setName] = useState('')
 
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <h2>Share Image</h2>
              <form onSubmit={async(e)=>{
                e.preventDefault()
                await props.uploadImage(desc.value,name.value)
                props.mintNFT()
              }}>
<input type='file' accept='.jpg, .jpeg, .png, .bmp, .gif' onChange={props.captureFile}/>
<div className='form-group mr-sm-2'>
<br></br>
<input
  id='imageDescription'
  type='text'
  ref={(e) => setDesc(e)}
  className='form-control'
  placeholder='Image description'
  required
/>
                  <input
                    id='imageDescription'
                    type='text'
                    ref={(e) => setName(e)}
                    className='form-control'
                    placeholder='Image description'
                    required
                  />
                  
</div>
<button type='submit' className='bt btn-primary bt-block btn-lg'>Upload</button>
              </form>
              <div className='container '>
              {props.nft? props.nft.map((nft,key)=>{
  return(
    <div key={key}>
      <Card style={{ width: '18rem' }} className='md-3 sm-4'>
        <Card.Img variant="top" src={nft.uri} />
        <Card.Body>
          <Card.Title> {nft.name}</Card.Title>
          <Card.Text>
            {nft.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>

  )
}):null}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  
}

export default Main;