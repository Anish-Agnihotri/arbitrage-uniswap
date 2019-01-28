/* Predefined vars */
let apiKey = ''; /* Etherscan API */
let uniswapAddr = '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95'; /* Uniswap mainnet contract */

let pools = []; /* Array to hold list of currency pools */

$.ajax({
    url: 'http://api.etherscan.io/api?module=account&action=txlistinternal&address=' + uniswapAddr + '&startblock=0&sort=asc&apikey=' + apiKey,
    type: "GET",
    success: function (result) {

        let poolContracts = [];

        for (i = 0; i < result.result.length; i++) {
            poolContracts.push(result.result[i].contractAddress)
        }

        let poolContractsCleanup = poolContracts.filter(
            function (a, v) {
                if (!this[a]) {
                    this[a] = 1;
                    return a!=='';
                }
            }, {}
        );

        poolContractsCleanup.forEach(function(address) {
            $.ajax({
                url: 'http://api.etherscan.io/api?module=account&action=tokentx&address=' + address + '&startblock=0&endblock=999999999&sort=asc&apikey=' + apiKey,
                type: "GET",
                success: function (result) {
                    if (status !== '0') {
                        pools.push(result.result[0].contractAddress);
                    }
                }
            })
        });
        
        console.log(pools);
    }
})