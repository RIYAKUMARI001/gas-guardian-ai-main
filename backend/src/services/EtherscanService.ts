
import dotenv from 'dotenv';

dotenv.config();

interface EtherscanGasOracleResponse {
    status: string;
    message: string;
    result: {
        LastBlock: string;
        SafeGasPrice: string;
        ProposeGasPrice: string;
        FastGasPrice: string;
        suggestBaseFee: string;
        gasUsedRatio: string;
    };
}

export class EtherscanService {
    private baseUrl = 'https://api.etherscan.io/v2/api';
    private apiKey = process.env.ETHERSCAN_API_KEY;

    async getGasOracle(): Promise<{ safe: number; propose: number; fast: number; baseFee: number } | null> {
        try {
            // Construct URL. If apiKey is present, append it.
            // The user specially requested https://api.etherscan.io/v2/api
            // Standard Etherscan gas oracle params: module=gastracker&action=gasoracle
            let url = `${this.baseUrl}?chainid=1&module=gastracker&action=gasoracle`;

            if (this.apiKey) {
                url += `&apikey=${this.apiKey}`;
            }

            console.log(`Fetching gas from Etherscan: ${url.replace(this.apiKey || '', '***')}`);

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = (await response.json()) as EtherscanGasOracleResponse;

            if (data.status !== '1' || !data.result) {
                console.error('Etherscan API error or invalid response:', data.message);
                return null;
            }

            return {
                safe: parseFloat(data.result.SafeGasPrice),
                propose: parseFloat(data.result.ProposeGasPrice),
                fast: parseFloat(data.result.FastGasPrice),
                baseFee: parseFloat(data.result.suggestBaseFee)
            };

        } catch (error) {
            console.error('Error fetching from Etherscan:', error);
            return null;
        }
    }
}

export default new EtherscanService();
