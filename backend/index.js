  // ('web3');
  import Web3 from 'web3';

  // Connect to the Ethereum network
  const web3 = new Web3('https://mainnet.infura.io/v3/1e5f5ecdead549e6850dbf4696b7604f'); // Replace with your provider URL

  // ABI and contract address
  const contractABI = [ /* Your ABI Array Here */ ];
  const contractAddress = '0xd5666f5b46f311ab406fab1f054bfd55562bf45a'; // Replace with your contract address


  // Create a contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Function to create a warranty
  async function createWarranty(productName, warrantyPeriod) {
      try {
          const accounts = await web3.eth.getAccounts();
          await contract.methods.createWarranty(productName, warrantyPeriod)
              .send({ from: accounts[0] });
          console.log('Warranty created successfully');
      } catch (error) {
          console.error('Error creating warranty:', error);
      }
  }

  // Function to get warranty info
  async function getWarrantyInfo() {
      try {
          const accounts = await web3.eth.getAccounts();
          const warrantyInfo = await contract.methods.getWarrantyInfo().call({ from: accounts[0] });
          console.log('Warranty Info:', warrantyInfo);
      } catch (error) {
          console.error('Error getting warranty info:', error);
      }
  }

  // Function to claim warranty
  async function claimWarranty() {
      try {
          const accounts = await web3.eth.getAccounts();
          await contract.methods.claimWarranty()
              .send({ from: accounts[0] });
          console.log('Warranty claimed successfully');
      } catch (error) {
          console.error('Error claiming warranty:', error);
      }
  }

  // Listening for WarrantyCreated events
  contract.events.WarrantyCreated()
      .on('data', (event) => {
          console.log('Warranty Created:', event);
      })
      .on('error', console.error);

  // Example usage (you can replace these with your actual logic)
  (async () => {
      await createWarranty('Product A', 12); // Example call to create warranty
      await getWarrantyInfo(); // Example call to get warranty info
      // await claimWarranty(); // Example call to claim warranty
  })();
