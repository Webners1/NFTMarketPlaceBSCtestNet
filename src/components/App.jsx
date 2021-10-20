import  React,{ Component, useEffect, useState } from "react";
import myNFTs from '../abis/myNFTs.json'
import getWeb3 from "./getWeb3";
import Web3 from 'web3';
import Navbar from './Navbar'
import Main from './Main'
import "./App.css";
import { create } from 'ipfs-http-client'

// connect to the default API address http://localhost:5001
const ipfs = create('https://ipfs.infura.io:5001')
function App(){
 

  let [account, setAccount] = useState()
  let [Nft, setNFT] = useState()
  let [name, setName] = useState()
  let [nft, setnft] = useState([])
  let[imageUrl,setImageUrl] = useState('')
  let [tokenURI, setTokenURI] = useState()
  let [description, setDescription] = useState()
  let [loading, setLoading] = useState(true)
  let [buffer, setBuffer] = useState(true)

  const loadBlockChainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    setAccount(account = accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = myNFTs.networks[networkId]
    if (networkData) {
      const myNFT = new web3.eth.Contract(myNFTs.abi, networkData.address)
      setNFT(Nft = myNFT);
      setLoading(loading = false);
      const totalCount = await Nft.methods.totalCount().call()
      console.log(totalCount)
      for (let i = 0; i <= totalCount; i++) {
        const nfts = await Nft.methods.Items(i).call()
        setnft(nft = [...nft, nfts])
        console.log(nft)
      }

    }
    else {
      window.alert('The contract is not deployes')
    }

  }
  const loabWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum Browser Detected')
    }
  }
  const captureFile = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setBuffer(buffer = Buffer(reader.result))
      console.log(buffer)

    }
  }
  const uploadImage = async(desc,nam) => {
    if(buffer){

      setDescription(description = desc)
      setName(name = nam)
      const result = await ipfs.add(buffer)
        setLoading(true)
      setImageUrl(imageUrl ="https://ipfs.io/ipfs/" + result.path)
      console.log(imageUrl)
    }
    else{
      console.log("no buffer")
    }
  }
  const mintNFT = async () => {
    //error handling


 //error handling
    if (imageUrl.trim() == "" || (name.trim() == "" || description.trim() == "")) {
   return {
    success: false,
    status: "❗Please make sure all fields are completed before minting.",
   }
  }


    //make metadata
    let metadata = new Object()
    metadata.name = name;
    metadata.description = description;
    metadata.url = imageUrl;
    setTokenURI(tokenURI = await ipfs.add(JSON.stringify(metadata)))
    //make pinata call
  //  metadata= JSON.stringify(metadata)
  //   const pinataResponse = await pinJSONToIPFS(metadata);
  //   console.log(pinataResponse)

  //   if (!pinataResponse.success) {
  //     return {
  //       success: false,
  //       status: "😢 Something went wrong while uploading your tokenURI.",
  //     }
  //   }
  //   setTokenURI (tokenURI= pinataResponse.pinataUrl);
  //   console.log(tokenURI)
    const nftCount = await Nft.methods.createItem(imageUrl, name, description).send({from:account}).on('transactionHash',(hash)=>{
      setLoading(false)
    });
    
  }
  const init = async () => {
    await loabWeb3()
    await loadBlockChainData()
  }
  useEffect(() => {
    init();
  }, [])
    return (
      <div className="App">
        <div>
          <Navbar account={account} />
          {loading
            ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
            : <Main
              nft={nft}
              captureFile={captureFile}
              uploadImage={uploadImage}
              mintNFT={mintNFT}
            />
            // Code...
          }

        </div>
      </div>
    );
  
}

export default App;
