import { useState} from 'react'
import SimpleStorage from './contracts/SimpleStorage.json';
import Web3 from 'web3';
import './App.css';

function App() {
  const [state,setState] = useState({
    web3:null,
    contract:null
  })
  async function template() {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorage.networks[networkId];
    // console.log(deployedNetwork.address);
    const contract = new web3.eth.Contract(
      SimpleStorage.abi,
      deployedNetwork.address
    );
    setState({web3:web3,contract:contract})
    // console.log(contract);
  }
  console.log(state);
  template();

  return <div className="App">
      
    </div>;
}

export default App;
