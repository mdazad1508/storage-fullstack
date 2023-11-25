import { useMoralis } from "react-moralis";
import { useWeb3Contract } from "react-moralis";
import { abi, contractAddress } from "../../constants/constants";
import RecentTransactions from "./RecentTransactions";

const New = () => {
  const { account, deactivateWeb3 } = useMoralis();

  //fetch owner
  const {
    data,
    error,
    runContractFunction: getOwner,
    isFetching,
    isLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getOwner",
    params: {},
  });

  //fetch num

  const {
    data: numData,
    error: numError,
    runContractFunction: getNum,
    isFetching: numIsFetching,
    isLoading: numIsLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "getNum",
    params: {},
  });

  //increment num

  const {
    data: numIncData,
    error: numIncError,
    runContractFunction: incNum,
    isFetching: numIncIsFetching,
    isLoading: numIncIsLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "increment",
    params: {},
  });

  //decrement num

  const {
    data: numDecData,
    error: numDecError,
    runContractFunction: decNum,
    isFetching: numDecIsFetching,
    isLoading: numDecIsLoading,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress,
    functionName: "Decrement",
    params: {},
  });

  const disconnectFunction = () => {
    deactivateWeb3();
    window.localStorage.removeItem("connected");
  };
  return (
    <div className="text-black min-w-full">
      <div className="flex ">
        <h1 className="text-black">Welcome onBoard </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
          onClick={disconnectFunction}
        >
          {" "}
          Disconnet{" "}
        </button>
      </div>
      {account && (
        <h1 className=" h-10  font-extrabold ">
          {" "}
          WELCOME{" "}
          <span className=" font-extrabold text-blue-800">{`${account.slice(
            0,
            6
          )}.........${account.slice(
            account.length - 4,
            account.length
          )}`}</span>{" "}
          you are connected to Metmask
        </h1>
      )}
      <div className="m-10">
        {error && <p className="text-red">{error.message}</p>}
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={async () =>
            await getOwner({
              onError: (e) => {
                console.log(error);
              },
            })
          }
          disabled={isFetching}
        >
          {isFetching ? "fetching Owner Address... " : "get Owner Address"}
        </button>

        {data != null && <p>{JSON.stringify(data)}</p>}
      </div>

      <div className=" m-10">
        {error && <p className="text-red">{error.message}</p>}
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={async () =>
            await getNum({
              onError: (e) => {
                console.log(numError);
              },
            })
          }
          disabled={numIsFetching}
        >
          {numIsFetching ? "fetching num... " : "get num"}
        </button>

        {numData != null && <p>{JSON.stringify(numData)}</p>}
      </div>

      <div className=" m-10">
        {error && <p className="text-red">{error.message}</p>}
        <button
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          onClick={async () =>
            await incNum({
              onError: (e) => {
                console.log(numIncError);
              },
            })
          }
          disabled={numIncIsFetching}
        >
          {numIncIsFetching ? "incrementing num.. " : "Increment Num"}
        </button>

        {numIncData != null && (
          <p className="w-80">{JSON.stringify(numIncData)}</p>
        )}
      </div>

      <div className=" m-10">
        {error && <p className="text-red">{error.message}</p>}
        <button
          className="bg-pink-500 text-white font-bold py-2 px-4 rounded"
          onClick={async () =>
            await decNum({
              onError: (e) => {
                console.log(numDecError);
              },
            })
          }
          disabled={numDecIsFetching}
        >
          {numDecIsFetching ? "decrementing num.. " : "Decrement Num"}
        </button>

        {numDecData != null && (
          <p className="w-40">{JSON.stringify(numDecData)}</p>
        )}
      </div>
      <div>
        <h1> Recent Transactions</h1>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default New;
