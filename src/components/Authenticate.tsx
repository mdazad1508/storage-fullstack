import React from "react";
import { useMoralis } from "react-moralis";
import New from "../components/Home";
import { useEffect } from "react";

function Authenticate() {
  const {
    authenticate,
    isAuthenticated,
    user,
    enableWeb3,
    isWeb3Enabled,
    account,
    deactivateWeb3,
    Moralis,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (
      !isWeb3Enabled &&
      typeof window !== "undefined" &&
      window.localStorage.getItem("connected")
    ) {
      enableWeb3();
      // enableWeb3({provider: window.localStorage.getItem("connected")}) // add walletconnect
    }
  }, [isWeb3Enabled]);
  // no array, run on every render
  // empty array, run once
  // dependency array, run when the stuff in it changesan

  useEffect(() => {
    Moralis.onAccountChanged((newAccount) => {
      console.log(`Account changed to ${newAccount}`);
      if (newAccount == null) {
        window.localStorage.removeItem("connected");
        deactivateWeb3();
        console.log("Null Account found");
      }
    });
  }, []);

  return (
    <div className=" min-h-screen ">
      {!isWeb3Enabled ? (
        <div>
          <button
            onClick={async () => {
              // await walletModal.connect()
              const ret = await enableWeb3();
              if (typeof ret !== "undefined") {
                // depends on what button they picked
                if (typeof window !== "undefined") {
                  window.localStorage.setItem("connected", "injected");
                  // window.localStorage.setItem("connected", "walletconnect")
                }
              }
            }}
            disabled={isWeb3EnableLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          >
            Connect
          </button>
          <h1 className=" text-3xl font-bold flex justify-center items-center">
            {" "}
            NOT CONNECTED PLEASE CONNECT TO METAMASK !!!!!!
          </h1>
          <h3 className="flex justify-center items-center">
            {" "}
            Please connect to your wallet{" "}
          </h3>
          <div className="flex justify-center gap-2 mt-10 ">
            <div className="w-20 h-20 p-2 bg-blue-900 rounded-md  animate-spin "></div>
            <div className="w-20 h-20 p-2 bg-purple-500 rounded-md animate-ping"></div>
            <div className="w-20 h-20 p-2 bg-green-500 rounded-md animate-ping"></div>
            <div className="w-20 h-20 p-2 bg-gray-500 rounded-md animate-spin"></div>
          </div>
        </div>
      ) : (
        <div>
          <New />
        </div>
      )}
    </div>
  );
}
export default Authenticate;
