import { Web3Button } from "@web3modal/react";


interface Props {
    icon?: "show" | "hide";
    label?: string;
    balance?: "show" | "hide";
  }

function Wagmi() {
    return ( <Web3Button />    )
}

export default Wagmi;