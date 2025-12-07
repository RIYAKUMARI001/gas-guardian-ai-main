
import etherscanService from '../src/services/EtherscanService.js';

async function test() {
    console.log('Testing Etherscan Service...');
    try {
        const gas = await etherscanService.getGasOracle();
        if (gas) {
            console.log('✅ Success! Gas Prices:', JSON.stringify(gas, null, 2));
        } else {
            console.log('❌ Failed to get gas prices.');
        }
    } catch (error) {
        console.error('❌ Error during test:', error);
    }
}

test();
