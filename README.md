#  Architecture Link (Excalidraw)  ----> <a href="https://excalidraw.com/#json=2CfZH-kOQNEY-LwSMCz0X,tgeWgzzLfog8njhnOgYMcg">LINK</a>


## <a href="https://t.me/kjbbv_Bot">BOT LINK</a>
 

# DeFi Telegram Bot

A Telegram bot built using Node.js that allows users to interact with custom tokens on the blockchain. The bot facilitates actions like creating wallets, buying/selling tokens, checking balances, and ejecting private keys. It integrates with smart contracts for tokens and stores user data securely using MongoDB.

## Features
- **Custom Token Integration**: Supports seven custom tokens: USDC, USDT, BNB, WBTC, SHY, PEPE, and SHIB.
- **Wallet Generation**: Automatically generates a public-private key pair for each user upon initialization.
- **Token Operations**: Allows users to buy, sell, and check the balance of their tokens.
- **Private Key Management**: Stores the private key in MongoDB and allows users to eject it securely.

## Technologies Used
- **Node.js**: Backend logic and Telegram bot server.
- **Foundry**: Smart contract testing.
- **Solidity**: Smart contract development for token management.
- **MongoDB**: Database for storing user private keys.
- **Telegram API**: For bot interaction.

## Getting Started

### Prerequisites
- **Node.js**: Install [Node.js](https://nodejs.org/en/download/) (v14+).
- **MongoDB**: Set up a MongoDB instance to store private keys.
- **Telegram Bot Token**: Create a bot on Telegram using [BotFather](https://core.telegram.org/bots#botfather) and get the token.
- **Foundry**: Install [Foundry](https://getfoundry.sh/) for testing and deploying smart contracts.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/psg-19/DeFi_Telegram_BOT.git
   cd test
   ```

2. Install dependencies:
   ```bash
   cd BOT-Server
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file and add the following:
   ```bash
   BOT_API_KEY= < YOUR TELEGRAM BOT API KEY >
   MONGO_DB= < YOUR MONGO DB CONNECTION STRING >
   ALGORITHM= < Crypto Algorithm To use >
   ENCRYPTION_KEY= < Crypto Encryption Key >
   ENCRYPTION_IV=  < Crypto Encryption IV >
   ALCHEMY_RPC= < Your Alchemy RPC URL Where Smart Contracts Are Deployed >
   TOKEN_TO_SERVER_CONTRACT= <Address Of Token To Server contract >
   TOKEN_TO_SERVER_CONTRACT_OWNER_PRIVATE_KEY= < Address Of Owner Who Deployed Token To Server contract >

    
   ```

4. Setup Foundry
   ```bash
   cd Smart_Contracts
   npm i
   forge Test
   ```
   
5. Deploy the smart contracts using Foundry:
  ```bash
 forge create --rpc-url < Your Alchemy RPC URL >   --private-key <private key of yours>  src/<File name>.sol:<Function Name> --legacy --broadcast

  ```

6. Start the bot:
   ```bash
   npm run build
   npm start
   ```

## Usage

1. **/start**: Initializes the bot, creates a public-private key pair, and stores the private key in MongoDB.
2. **menu**: Opens up menu for transaction.
3. **help**: Opens up help section.
 
## Smart Contracts

- **Custom Tokens**: USDC, USDT, BNB, WBTC, SHY, PEPE, SHIB smart contracts have been created and tested.
- **Master Contract**: A smart contract that acts as the owner of all tokens and facilitates interaction with the Node.js server.
 
