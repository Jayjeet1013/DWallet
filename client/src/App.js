import SimpleStorage from './contracts/SimpleStorage.json';
import Web3 from 'web3';
import './App.css';

function App() {
  async function template() {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SimpleStorage.networks[networkId];
    console.log(deployedNetwork.address);
  }
  template();

  return <div className="App">
      
    </div>;
}

export default App;
