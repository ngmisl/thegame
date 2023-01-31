import React from "react";
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
  } from "@web3modal/ethereum";
  
import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import App from "./App";

import { polygon } from "wagmi/chains";
const chains = [polygon];


// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "13b2117c541cc78727fd125ecf1230d3" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function web3() {
    return (
      <>
        <WagmiConfig client={wagmiClient}>
            <App />
        </WagmiConfig>
        <Web3Modal
          projectId="13b2117c541cc78727fd125ecf1230d3"
          ethereumClient={ethereumClient}
        />
      </>
    );
  }

export default web3;