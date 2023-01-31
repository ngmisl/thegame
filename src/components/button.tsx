import { Web3Button } from "@web3modal/react";


interface Props {
    icon?: "show" | "hide";
    label?: string;
    balance?: "show" | "hide";
  }

const Wagmi = async() => {
    return ( <Web3Button />    )
}