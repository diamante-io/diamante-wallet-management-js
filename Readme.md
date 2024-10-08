Account Creation: In Diamante, creating a keypair (public and private key) does not automatically create an account on the Diamante blockchain. For an account to exist, it must hold a minimum balance.

Minimum Balance: The minimum balance required for an account to exist is greater than or equal to twice the base reserve. The base reserve can change based on network governance, so it's important to check the current value.

Creating an Account: An account can only be created by an existing account that already holds DIAM. This is done using the CreateAccount operation in a transaction.

Transaction Details: In the transaction that creates the account, you must specify the public key of the new account and the starting balance, which must be greater than twice the base reserve.

Successful Creation: Once the transaction is successfully processed, the new account will be valid and can then hold DIAM or other assets.

NOTE:

Generate a keypair (wallet) for the user.

The generated keypair can be activated either by your service or by allowing users to activate their own accounts by depositing DIAMS from another app (your app via other users).
