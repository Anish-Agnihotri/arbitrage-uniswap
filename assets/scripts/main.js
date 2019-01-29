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
        
        let counter = 0;

        getPools(poolContractsCleanup[counter]);

        function getPools() {
            if (counter < poolContractsCleanup.length) {
                setInterval(function() {
                    $.ajax({
                        url: 'http://api.etherscan.io/api?module=account&action=tokentx&address=' + poolContractsCleanup[counter] + '&startblock=0&endblock=999999999&sort=asc&apikey=' + apiKey,
                        type: "GET",
                        success: function (result) {
                            if (result.status !== '0') {
                                let tokenAddress = (result.result[0].contractAddress);
                                let tokenSymbol = (result.result[0].tokenSymbol);
                                let tokenName = (result.result[0].tokenName);

                                getPrice(tokenSymbol);

                                $('#attach').append('<div><span>' + tokenName + '</span><span>(' + tokenSymbol + ')</span><span>' + tokenAddress + '</span><span>' + tokenPrice + '</span></div>');
                            }
                        }
                    })
                    counter++;
                }, 600);
            }
        }

        function getPrice(symbol) {
            $.ajax({
                url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=' + symbol,
                type: "GET",
                success: function (result) {
                    storeValue(result[symbol]); // why is jquery so disgusting
                }
            })
        }

        function storeValue(pricing) {
            if (pricing == undefined) {
                pricing = 'no number found';
            } else {
                tokenPrice = pricing;
            }
            return tokenPrice;
        }
    }
})


