/* Predefined vars */
let apiKey = 'sneaky sneaky im not pushing my api key to github ;)'; /* Etherscan API */
let uniswapAddr = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95'; /* Uniswap mainnet contract */

let pools = []; /* Array to hold list of Uniswap pools */

$.ajax({
    url: 'http://api.etherscan.io/api?module=account&action=txlistinternal&address=' + uniswapAddr + '&startblock=0&sort=asc&apikey=' + apiKey,
    type: "GET",
    success: function(result) {
        let maxPools = result.result.length;
        for (i = 0; i < maxPools; i++) {
            pools.push(result.result[i].contractAddress)
        }
        console.log(pools);
    }
})