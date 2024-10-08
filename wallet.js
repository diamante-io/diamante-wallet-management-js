import {
  Keypair,
  Networks,
  Operation,
  TransactionBuilder,
  Aurora,
  BASE_FEE,
} from "diamnet-sdk";

// Define the DiamNet Aurora server for Testnet
const server = new Aurora.Server("https://diamtestnet.diamcircle.io/");
const networkPassphrase = Networks.TESTNET;

// Function to generate a keypair
const generateKeypair = () => {
  const newKeypair = Keypair.random();
  return {
    publicKey: newKeypair.publicKey(),
    secretKey: newKeypair.secret(),
  };
};

// Create and fund a new account
async function createAccount(sourceKeypair, destination, startingBalance) {
  try {
    // Load the source account to create the transaction
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());
    console.log("Source Account Loaded:", sourceKeypair.publicKey());

    // Build the transaction to create and fund the new account
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase: networkPassphrase, // Use the TESTNET network passphrase
    })
      .addOperation(
        Operation.createAccount({
          destination: destination, // The new account's public key
          startingBalance: startingBalance, // Initial balance in DIAM
        })
      )
      .setTimeout(30) // Set transaction timeout
      .build();

    // Sign the transaction with the source account's secret key
    transaction.sign(sourceKeypair);

    // Submit the transaction to the DiamNet Testnet
    const result = await server.submitTransaction(transaction);
    console.log("Transaction successful:", result);
  } catch (error) {
    console.error("Error creating account:", error);
  }
}

// Example usage
(async () => {
  // Generate a new keypair
  const { publicKey, secretKey } = generateKeypair();
  console.log("Generated Keypair:");
  console.log("Public Key:", publicKey);
  console.log("Secret Key:", secretKey);

  //  activate the keypair by creating and funding the account
  const sourceKeypair = Keypair.fromSecret(
    "SBYXSUFKM5WN7T7MQVBNR6PS6SALDWEUREA6AK6OJERR2CNOMBJOWVDY"
  );
  const startingBalance = "10"; // Define the starting balance in DIAM
  await createAccount(sourceKeypair, publicKey, startingBalance);
})();
