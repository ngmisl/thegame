# Encanto Game

## GamePlay Season 0 / Genesis

Goal is for players to fight the Monster.

### Play

1. Player mints SoulBound NFT (Note: currently deployed on Polygon Mumbai, price is set to 0.001 TestnetMATIC, but will be 1 Canto)
2. Player attacks The Monster
3. If the Player's character dies, they can Resurrect it (set to 0.0001 TestnetMATIC)

### Rewards

1. Most Damage dealt gets 50% of the Pool (Minting & Resurrections)
2. Last Hit Monster gets 40% of the Pool
3. Devs get 10% of the Pool

## TODOS

- [] Implement web3modal or WAGMI (I tried already and failed to implement)
- [] Make the Resurrection more dynamic
- [] Fix CSS across the board
- [] Add costs (currently 0.0001 TestnetMatic) to const runReviveAction in Arena/index.jsx
- [] Add Leaderboard (Damage)
- [] Add a global chat
- [] There is a chance attacks miss (both character and monster) - this needs to be reflected in the result
