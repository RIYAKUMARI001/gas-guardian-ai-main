
async function testEtherscanGas() {
    const tryUrl = async (url: string, name: string) => {
        console.log(`\n--- Testing ${name} ---`);
        console.log(`Fetching: ${url}`);
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Status:', response.status);
            console.log('Body:', JSON.stringify(data, null, 2));
            return data;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    // V2 API usually requires chainid. Chain ID 1 is Ethereum Mainnet.
    const v2UrlWithChain = 'https://api.etherscan.io/v2/api?chainid=1&module=gastracker&action=gasoracle&apikey=YourApiKeyToken';

    await tryUrl(v2UrlWithChain, 'V2 API (with chainid=1)');
}

testEtherscanGas();
