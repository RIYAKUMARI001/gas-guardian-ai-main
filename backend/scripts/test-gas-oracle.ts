
import gasOracleService from '../src/services/GasOracleService.js';

async function test() {
    console.log('Testing GasOracleService Integration...');
    try {
        const gas = await gasOracleService.getCurrentGas();
        console.log('✅ Gas Price Result:', JSON.stringify(gas, null, 2));

        // Check if it looks like Etherscan data (we expect specific wei/gwei relation or just valid data)
        if (gas.gwei > 0) {
            console.log('✅ Valid gas price returned.');
        } else {
            console.log('⚠️ Gas price is 0 or invalid.');
        }
    } catch (error) {
        console.error('❌ Error during test:', error);
    }
    process.exit(0);
}

test();
