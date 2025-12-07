# Gas-Guard AI

## Overview
Gas-Guard AI is an advanced, AI-powered gas monitoring and optimization tool built for the **Flare Network**. It provides real-time gas price tracking, predictive analytics using AI, and a conversational interface to help users optimize their transaction costs.

## Features
- **Real-Time Gas Monitoring**: Live tracking of gas prices on the Flare Network using FTSOv2.
- **AI-Powered Predictions**: Machine learning models to predict future gas trends and suggest optimal transaction times.
- **Interactive Chat Assistant**: A "Gas-Guard" AI assistant to answer queries about gas fees and network status.
- **Visual Dashboard**: Comprehensive charts and analytics for gas usage and network load.
- **Wallet Integration**: Seamless connection with MetaMask and other Web3 wallets.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, Prisma, SQLite
- **AI/ML**: Python (TensorFlow/Scikit-learn) for predictive modeling
- **Blockchain**: Solidity, Ethers.js, Hardhat

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Metamask Wallet

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/gas-guardian-ai.git
    cd gas-guardian-ai
    ```

2.  **Install Frontend Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Backend**
    ```bash
    cd backend
    npm install
    cp .env.example .env
    npx prisma migrate dev --name init
    ```

4.  **Setup Python Environment (for AI models)**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    ```

### Running the Application

1.  **Start the Backend Server**
    ```bash
    cd backend
    npm run dev
    ```

2.  **Start the Frontend Development Server**
    ```bash
    # In a new terminal, from the root directory
    npm run dev
    ```

3.  **Start the Python Gas Monitor**
    ```bash
    # In a new terminal, from the root directory
    source venv/bin/activate
    python gas_fee_monitor.py
    ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
MIT
