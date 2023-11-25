import { useState, useEffect } from "react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  const runMoralis = async () => {
    await Moralis.start({
      apiKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijg1NzJhYTQ4LTdiZjEtNGRmYS04YTA2LTM3NWQ5ZTI5YWY4YyIsIm9yZ0lkIjoiMzY1NzUyIiwidXNlcklkIjoiMzc1ODk1IiwidHlwZUlkIjoiYjMwMzk3MzUtMzQ3ZC00ZWYxLTlkMzItZWQwZjA4MzcyMWFhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MDA5MDY4MDksImV4cCI6NDg1NjY2NjgwOX0.4RAfXYIDriOX9BaaUeyuteDUvpU-5aivnGKQmiBMSCU",
      // ...and any other configuration
    });
  };

  runMoralis();

  useEffect(() => {
    const runApp = async () => {
      const address = "0x1f4Fc1235a9cA6D880cCCD19d723Cf26EDcB64b5";

      const chain = EvmChain.SEPOLIA;

      const response = await Moralis.EvmApi.transaction.getWalletTransactions({
        address,
        chain,
      });

      console.log(response.toJSON());
      setTransactions(response.toJSON().result);
    };

    runApp();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4  text-black">
      {transactions.map((transaction, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">{`Transaction ${
            index + 1
          }`}</h2>
          <div className="mb-2">
            <strong>Hash:</strong> {transaction.hash}
          </div>
          <div className="mb-2">
            <strong>Block Number:</strong> {transaction.block_number}
          </div>
          <div className="mb-2">
            <strong>Timestamp:</strong> {transaction.block_timestamp}
          </div>
          <div className="mb-2">
            <strong>From Address:</strong> {transaction.from_address}
          </div>
          <div className="mb-2">
            <strong>To Address:</strong> {transaction.to_address}
          </div>
          <div className="mb-2">
            <strong>Value:</strong> {transaction.value}
          </div>
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export default RecentTransactions;
