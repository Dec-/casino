const ethers = require('ethers');
const abi = require('../config/abi');

const provider = new ethers.providers.InfuraProvider('goerli', {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET
})

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// @route   GET api/filipkaic/apitest
// @desc    Give me something from chain!
// @access  Public
exports.handleChainCall = async (req, res) => {
  try {
    const signer = wallet.connect(provider)

    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, signer)

    const name = await contract.name()
    const symbol = await contract.symbol()
    const decimals = await contract.decimals()
    const totalSupply = await contract.totalSupply()

    return res.status(200).json(`${symbol} (${name}) total supply is
      ${ethers.utils.formatUnits(totalSupply, decimals)}`);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Internal server error');
  }
};
