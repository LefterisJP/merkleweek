var untitled_endpointregistryContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"eth_address","type":"address"}],"name":"findEndpointByAddress","outputs":[{"name":"socket","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"socket","type":"string"}],"name":"registerEndpoint","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"socket","type":"string"}],"name":"findAddressByEndpoint","outputs":[{"name":"eth_address","type":"address"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"eth_address","type":"address"},{"indexed":false,"name":"socket","type":"string"}],"name":"AddressRegistered","type":"event"}]);
var untitled_endpointregistry = untitled_endpointregistryContract.new(
   {
     from: web3.eth.accounts[0], 
     data: '0x6060604052341561000c57fe5b5b6107428061001c6000396000f300606060405263ffffffff60e060020a600035041663028a582e811461003757806308b5a85a146100d3578063460123cf1461012b575bfe5b341561003f57fe5b610053600160a060020a036004351661019d565b604080516020808252835181830152835191928392908301918501908083838215610099575b80518252602083111561009957601f199092019160209182019101610079565b505050905090810190601f1680156100c55780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156100db57fe5b610129600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061024d95505050505050565b005b341561013357fe5b610181600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284375094965061051d95505050505050565b60408051600160a060020a039092168252519081900360200190f35b6101a5610664565b600160a060020a0382166000908152602081815260409182902080548351601f6002600019610100600186161502019093169290920491820184900484028101840190945280845290918301828280156102405780601f1061021557610100808354040283529160200191610240565b820191906000526020600020905b81548152906001019060200180831161022357829003601f168201915b505050505090505b919050565b60008161026a816020604051908101604052806000815250610590565b15156001141561027957610000565b600160a060020a0333166000908152602081815260409182902080548351601f60026000196101006001861615020190931692909204918201849004840281018401909452808452909450610328929185919083018282801561031d5780601f106102f25761010080835404028352916020019161031d565b820191906000526020600020905b81548152906001019060200180831161030057829003601f168201915b505050505084610590565b1561033257610517565b600060018360405180828054600181600116156101000203166002900480156103925780601f10610370576101008083540402835291820191610392565b820191906000526020600020905b81548152906001019060200180831161037e575b505092835250506040805160209281900383019020805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039485161790553390921660009081528082529190912084516103ec92860190610676565b50336001846040518082805190602001908083835b602083106104205780518252601f199092019160209182019101610401565b51815160209384036101000a6000190180199092169116179052920194855250604080519485900382018520805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03978816179055818552885185830152885133909616957f3a62a9d7855df5303e50b0440124304fefafde7f677fc33787b784fc92cfa618958a9550935083929183019185019080838382156104dd575b8051825260208311156104dd57601f1990920191602091820191016104bd565b505050905090810190601f1680156105095780820380516001836020036101000a031916815260200191505b509250505060405180910390a25b5b505050565b60006001826040518082805190602001908083835b602083106105515780518252601f199092019160209182019101610532565b51815160209384036101000a6000190180199092169116179052920194855250604051938490030190922054600160a060020a0316925050505b919050565b6000816040518082805190602001908083835b602083106105c25780518252601f1990920191602091820191016105a3565b51815160209384036101000a6000190180199092169116179052604051919093018190038120885190955088945090928392508401908083835b6020831061061b5780518252601f1990920191602091820191016105fc565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902060001916141561065a5750600161065e565b5060005b92915050565b60408051602081019091526000815290565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106106b757805160ff19168380011785556106e4565b828001600101855582156106e4579182015b828111156106e45782518255916020019190600101906106c9565b5b506106f19291506106f5565b5090565b61071391905b808211156106f157600081556001016106fb565b5090565b905600a165627a7a723058209ab78b22835b8d5fa048eb16531a8c701882307fd50a1cdef68da0f0b05e014c0029', 
     gas: '3100000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })