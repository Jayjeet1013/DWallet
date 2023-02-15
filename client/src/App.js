import { useEffect, useState} from 'react'
import SimpleStorage from './contracts/SimpleStorage.json';
import Web3 from 'web3';
import './App.css';

function App() {
  const [state,setState] = useState({
    web3:null,
    contract:null
  })
  const [data,setData] =useState(null);
  const [accounts,setAccounts]=useState([]);
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
// console.log(accounts);
setAccounts(accounts);
}

useEffect(()=>{
  const {contract}=state;
async function readContract(){
  
  const value =await contract.methods.getter().call();
setData(value);
}

contract && readContract();

},[state])



async function writeContract(){
  const {contract} =state;
  const data= document.querySelector('#data').value;
  await contract.methods.setter(data).send({from:"0xeEEaA0f512547767b105F0E1c4529378A2287483"});
  
}

  return  (
  <div className="App">
    <button onClick={getAccounts}> Get Accounts</button>
    <p>These are accounts: {accounts.map((account)=>{
      return <li key={account}>{account}</li>
    })}</p>  
    {/* <button onClick={readContract}>Contract</button>   */}
    <br></br>
    <input type='text' id='data'></input>
    <p>this is data: {data}</p>
    <button onClick={writeContract}>Contract</button>  

    </div>
    );
}

export default App;
