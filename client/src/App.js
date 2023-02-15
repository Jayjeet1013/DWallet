import { useEffect, useState} from 'react'
import SimpleStorage from './contracts/SimpleStorage.json';
import Web3 from 'web3';
import './App.css';

function App() {
  const [state,setState] = useState({
    web3:null,
    contract:null
  })
  useEffect(()=>{
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
      async function template() {
    
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
  
  provider && template();
  },[]);

async function getAccounts(){
const {web3} =state;
const accounts = await web3.eth.getAccounts();
console.log(accounts);
}

async function readContract(){
  const {contract}=state;
  const value =await contract.methods.getter().call();
  console.log(value);
}

  return  (
  <div className="App">
    <button onClick={getAccounts}> Get Accounts</button>  
    <button onClick={readContract}>Contract</button>  

    </div>
    );
}

export default App;
