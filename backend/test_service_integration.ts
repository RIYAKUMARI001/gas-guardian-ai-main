
import GasOracleService from './src/services/GasOracleService.js';

async function testIntegration() {
    console.log('Testing GasOracleService integration...');
    try {
        const gas = await GasOracleService.getCurrentGas();
        console.log('Got gas from service:', gas);

        // We expect gwei to be around the values we saw in Etherscan test (e.g. ~0.5 - 20 gwei)
        // If it falls back to 25, it means Etherscan failed or fallback logic triggered.
        if (gas.gwei === 25 && gas.wei === "25000000000") {
            console.log('Warning: Got default fallback value (25 gwei). Etherscan might have failed or provider fallback used default.');
        } else {
            console.log('Success: Got non-default gas price.');
        }
    } catch (error) {
        console.error('Service test failed:', error);
    }
    process.exit(0);
}

testIntegration();
