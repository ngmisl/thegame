import React, { useEffect, useState } from "react";
import "./App.css";
import SelectCharacter from "./Components/SelectCharacter";
import { CONTRACT_ADDRESS, transformCharacterData } from "./constants";
import myEpicGame from "./utils/MyEpicGame.json";
import { ethers } from "ethers";
import Arena from "./Components/Arena";
import LoadingIndicator from "./Components/LoadingIndicator";


const checkNetwork = async () => {
    try { 
      if (window.ethereum.networkVersion !== '80001') {
        alert("Please connect to Mumbai!")
      }
    } catch(error) {
      console.log(error)
    }
  };

const App = () => {
    
    // State
    const [currentAccount, setCurrentAccount] = useState(null);
    const [characterNFT, setCharacterNFT] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        checkIfWalletIsConnected();
        checkNetwork();
    }, []);

    /*
     * Add this useEffect right under the other useEffect where you are calling checkIfWalletIsConnected
     */
    useEffect(() => {
        
        const fetchNFTMetadata = async () => {
            console.log("Checking for Character NFT on address:", currentAccount);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const gameContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicGame.abi, signer);

            const characterNFT = await gameContract.checkIfUserHasNFT();
            if (characterNFT.name) {
                console.log("User has character NFT");
                setCharacterNFT(transformCharacterData(characterNFT));
            }

            /*
             * Once we are done with all the fetching, set loading state to false
             */
            setIsLoading(false);
        };

        if (currentAccount) {
            console.log("CurrentAccount:", currentAccount);
            fetchNFTMetadata();
        }
    }, [currentAccount]);

    // Render Methods
    const renderContent = () => {
        /*
         * Scenario #1
         */
        if (isLoading) {
            return <LoadingIndicator />;
        }

        if (!currentAccount) {
            return (
                <div className="connect-wallet-container">
                    <img
                        src="https://gateway.lighthouse.storage/ipfs/QmS2W6KhYbgnNML3XBx11ydP17L938m22PpQxTVGTtghkE/monster.jpeg"
                        alt="Encanto"
                    />
                    {/*
                     * Button that we will use to trigger wallet connect
                     * Don't forget to add the onClick event to call your method!
                     */}
                    <button className="cta-button connect-wallet-button" onClick={connectWalletAction}>
                        {currentAccount
                            ? `Wallet ${currentAccount.substring(0, 6)}...${currentAccount.substring(
                                  currentAccount.length - 4
                              )} is connected`
                            : "Connect Wallet To Get Started"}
                    </button>
                </div>
            );
            /*
             * Scenario #2
             */
        } else if (currentAccount && !characterNFT) {
            return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
        } else if (currentAccount && characterNFT) {
            return <Arena characterNFT={characterNFT} />;
        }
    };

    // Actions
    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                console.log("Make sure you have MetaMask!");
                setIsLoading(false);
                return;
            } else {
                console.log("We have the ethereum object", ethereum);

                const accounts = await ethereum.request({ method: "eth_accounts" });

                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log("Found an authorized account:", account);
                    setCurrentAccount(account);
                } else {
                    console.log("No authorized account found");
                }
            }
        } catch (error) {
            console.log(error);
        }

        setIsLoading(false);
    };

    /*
     * Implement your connectWallet method here
     */
    const connectWalletAction = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }

            /*
             * Fancy method to request access to account.
             */
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            /*
             * Boom! This should print out public address once we authorize Metamask.
             */
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <p className="header gradient-text">⚔️ Encanto Game ⚔️</p>
                    <p className="sub-text">Team up to fight the Evil Dragooon!</p>
                    {renderContent()}
                </div>
                <div className="footer-container">
            </div>
        </div>
        </div>
    );
};

export default App;
