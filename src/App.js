import Book from './Components/Book';
import React, { useEffect, useState } from 'react';
import PhantomLogo from '../src/assets/icons/phantom-logo.png'
import './Styles/App.css';
import ToolBox from '../src/Components/ToolBox';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const loader = async (wallet) => {
    const body = {
      method: "qn_fetchNFTs",
      params: [wallet, []],
    };
    const options = {
      method: "POST",
      body: JSON.stringify(body),
    };
    const res = await fetch("https://falling-sly-diamond.solana-mainnet.discover.quiknode.pro/2edddc20bb7caa868a355c0db3bfa17c80854e55/", options)
    res.json().then(data => {
      let leng = data.result.assets.length
      let status = false
      if (leng !== 0) {
        for (let i = 0; i < leng; i++) {
          if (data.result.assets[i].collectionAddress === "44kiGWWsSgdqPMvmqYgTS78Mx2BKCWzduATkfY4biU97") {
            console.log(data.result.assets[i].name)
            status = true
            break
          } else {
            status = false
          }
        }
        if (status === true) {
          console.log("you can write!", wallet)
        } else {
          console.log("you can't write :(", wallet)
        }
      } else {
        console.log("you can't write :(", wallet)
      }
    });
  };
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!");
          const response = await solana.connect({ onlyIfTrusted: true });
          const address = response.publicKey.toString();
          console.log("Connected with Public Key:", address);
          setWalletAddress(address);
          await loader(address)
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      const address = response.publicKey.toString();
      console.log("Connected with Public Key:", address);
      setWalletAddress(address);
      await loader(address)
    }
  };
  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  const renderNotConnectedContainer = () => (
    <button className="connect-wallet-button" onClick={() => connectWallet()}><img src={PhantomLogo} /> Connect to Wallet</button>
  );


  return (
    <div className="App">
      <ToolBox />
      <Book />
      {!walletAddress && renderNotConnectedContainer()}
    </div>
  );
}

export default App;
