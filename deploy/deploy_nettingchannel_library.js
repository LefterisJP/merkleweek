var nettingchannel_library_abi = [{"constant":false,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"},{"name":"caller_address","type":"address"},{"name":"their_transfer","type":"bytes"},{"name":"our_transfer","type":"bytes"}],"name":"close","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"},{"name":"caller_address","type":"address"}],"name":"settle","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"},{"name":"caller_address","type":"address"},{"name":"locked_encoded","type":"bytes"},{"name":"merkle_proof","type":"bytes"},{"name":"secret","type":"bytes32"}],"name":"unlock","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"},{"name":"caller_address","type":"address"},{"name":"their_transfer","type":"bytes"}],"name":"updateTransfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"}],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"},{"name":"one_address","type":"address"}],"name":"partner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"}],"name":"addressAndBalance","outputs":[{"name":"participant1","type":"address"},{"name":"balance1","type":"uint256"},{"name":"participant2","type":"address"},{"name":"balance2","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"},{"name":"caller_address","type":"address"},{"name":"channel_address","type":"address"},{"name":"amount","type":"uint256"}],"name":"deposit","outputs":[{"name":"success","type":"bool"},{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"self","type":"NettingChannelLibrary.Data storage"},{"name":"participant_address","type":"address"}],"name":"transferredAmount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"}];
var untitled_nettingchannel_library = web3.eth.contract(nettingchannel_library_abi);
var data = '0x606060405234610000575b611ebe806100196000396000f3006060604052361561007d5763ffffffff60e060020a60003504166319947bb6811461008257806344041d011461011c5780634d39681c146101355780635ddd7922146101d15780635ef30ac81461022e5780638939d37a1461023b5780639b3b5a0b1461026e578063be4eec95146102ae578063d9d16af8146102e9575b610000565b604080516020600460443581810135601f810184900484028501840190955284845261011a9482359460248035600160a060020a03169560649492939190920191819084018382808284375050604080516020601f89358b0180359182018390048302840183019094528083529799988101979196509182019450925082915084018382808284375094965061031295505050505050565b005b61011a600435600160a060020a036024351661042d565b005b604080516020600460443581810135601f810184900484028501840190955284845261011a9482359460248035600160a060020a03169560649492939190920191819084018382808284375050604080516020601f89358b0180359182018390048302840183019094528083529799988101979196509182019450925082915084018382808284375094965050933593506110b492505050565b005b604080516020600460443581810135601f810184900484028501840190955284845261011a9482359460248035600160a060020a0316956064949293919092019181908401838280828437509496506113ce95505050505050565b005b61011a60043561147e565b005b610252600435600160a060020a036024351661149a565b60408051600160a060020a039092168252519081900360200190f35b61027960043561150f565b60408051600160a060020a03958616815260208101949094529190931682820152606082019290925290519081900360800190f35b6102ce600435600160a060020a0360243581169060443516606435611559565b60408051921515835260208301919091528051918290030190f35b610300600435600160a060020a0360243516611706565b60408051918252519081900360200190f35b60006000600060006000600089600301541180610333575060008960020154115b1561033d57610000565b6006890194508460005b509350600d850160005b508454909350600160a060020a0389811691161480159061037f57508254600160a060020a03898116911614155b1561038957610000565b60048901805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a038a161790554360028a0155865115156103c657610420565b6103d28985858a611770565b915087600160a060020a031682600160a060020a031614156103f357610000565b8551156104205761040689858589611770565b9050600160a060020a038082169089161461042057610000565b5b5b505050505050505050565b600060006000600060006101c0604051908101604052806000600160a060020a0316815260200160008152602001600081526020016000815260200160008152602001602060405190810160405280600081525081526020016000600019168152602001600060001916815260200160008152602001600067ffffffffffffffff1681526020016000600160a060020a031681526020016000600160a060020a03168152602001600060001916815260200160206040519081016040528060008152508152506101c0604051908101604052806000600160a060020a0316815260200160008152602001600081526020016000815260200160008152602001602060405190810160405280600081525081526020016000600019168152602001600060001916815260200160008152602001600067ffffffffffffffff1681526020016000600160a060020a031681526020016000600160a060020a03168152602001600060001916815260200160206040519081016040528060008152508152506000896000816003015411806105c757506002810154155b156105d157610000565b8a43816000015482600201540111156105e957610000565b60068c0197508760005b509650600d880160005b5095508660030154866003015488600101540103876002018190555085600301548760030154876001015401038660020181905550600098505b600c8701548910156106af5786600c0189815481101561000057906000526020600020906003020160005b50600101546002880180549091019055600c870180548a9081101561000057906000526020600020906003020160005b50600101546002870180549190910390555b600190980197610637565b600098505b600c86015489101561072c5785600c0189815481101561000057906000526020600020906003020160005b50600101546002870180549091019055600c860180548a9081101561000057906000526020600020906003020160005b50600101546002880180549190910390555b6001909801976106b4565b4360038d01556001808701549088015460048e01548954919092019b50600160a060020a0390811691161415610af557604080516101c0810182528854600160a060020a031681526001808a01546020808401919091526002808c01548486015260038c0154606085015260048c0154608085015260058c01805486516101009582161595909502600019011691909104601f810183900483028401830190955284835292938b9360a08601939290919083018282801561082e5780601f106108035761010080835404028352916020019161082e565b820191906000526020600020905b81548152906001019060200180831161081157829003601f168201915b50505091835250506006820154602080830191909152600783015460408084019190915260088401546060840152600984015467ffffffffffffffff81166080850152600160a060020a03604060020a909104811660a0850152600a8501541660c0840152600b84015460e0840152600c8401805482518185028101850190935280835261010090940193919290919060009084015b8282101561091e576000848152602081206003840201905b5060408051606081018252825467ffffffffffffffff1681526001808401546020808401919091526002909401549282019290925283529290920191016108c4565b50505091525050604080516101c0810182528854600160a060020a031681526001808a01546020808401919091526002808c01548486015260038c0154606085015260048c0154608085015260058c01805486516101009582161595909502600019011691909104601f810183900483028401830190955284835294995091938a9360a08601938301828280156109f65780601f106109cb576101008083540402835291602001916109f6565b820191906000526020600020905b8154815290600101906020018083116109d957829003601f168201915b50505091835250506006820154602080830191909152600783015460408084019190915260088401546060840152600984015467ffffffffffffffff81166080850152600160a060020a03604060020a909104811660a0850152600a8501541660c0840152600b84015460e0840152600c8401805482518185028101850190935280835261010090940193919290919060009084015b82821015610ae6576000848152602081206003840201905b5060408051606081018252825467ffffffffffffffff168152600180840154602080840191909152600290940154928201929092528352929092019101610a8c565b50505050815250509350610e8a565b604080516101c0810182528754600160a060020a031681526001808901546020808401919091526002808b01548486015260038b0154606085015260048b0154608085015260058b01805486516101009582161595909502600019011691909104601f810183900483028401830190955284835292938a9360a086019392909190830182828015610bc75780601f10610b9c57610100808354040283529160200191610bc7565b820191906000526020600020905b815481529060010190602001808311610baa57829003601f168201915b50505091835250506006820154602080830191909152600783015460408084019190915260088401546060840152600984015467ffffffffffffffff81166080850152600160a060020a03604060020a909104811660a0850152600a8501541660c0840152600b84015460e0840152600c8401805482518185028101850190935280835261010090940193919290919060009084015b82821015610cb7576000848152602081206003840201905b5060408051606081018252825467ffffffffffffffff168152600180840154602080840191909152600290940154928201929092528352929092019101610c5d565b50505091525050604080516101c0810182528954600160a060020a031681526001808b01546020808401919091526002808d01548486015260038d0154606085015260048d0154608085015260058d01805486516101009582161595909502600019011691909104601f810183900483028401830190955284835294995091938b9360a0860193830182828015610d8f5780601f10610d6457610100808354040283529160200191610d8f565b820191906000526020600020905b815481529060010190602001808311610d7257829003601f168201915b50505091835250506006820154602080830191909152600783015460408084019190915260088401546060840152600984015467ffffffffffffffff81166080850152600160a060020a03604060020a909104811660a0850152600a8501541660c0840152600b84015460e0840152600c8401805482518185028101850190935280835261010090940193919290919060009084015b82821015610e7f576000848152602081206003840201905b5060408051606081018252825467ffffffffffffffff168152600180840154602080840191909152600290940154928201929092528352929092019101610e25565b505050508152505093505b83604001518a10610e9f578360400151610ea1565b895b92506000831115610f295760058c015484516040805160006020918201819052825160e060020a63a9059cbb028152600160a060020a039485166004820152602481018990529251939094169363a9059cbb936044808501949192918390030190829087803b156100005760325a03f1156100005750506040515115159050610f2957610000565b5b60058c01546040805160006020918201819052825160e060020a6370a08231028152600160a060020a033081166004830152935193909416936370a08231936024808301949391928390030190829087803b156100005760325a03f11561000057505060408051519087015110905061100b5760058c01546040805160006020918201819052825160e060020a6370a08231028152600160a060020a033081166004830152935193909416936370a08231936024808301949391928390030190829087803b156100005760325a03f115610000575050604051519050611011565b84604001515b925060008311156110995760058c015485516040805160006020918201819052825160e060020a63a9059cbb028152600160a060020a039485166004820152602481018990529251939094169363a9059cbb936044808501949192918390030190829087803b156100005760325a03f115610000575050604051511515905061109957610000565b5b6110a38c61147e565b5b5b505b5050505050505050505050565b6000600060006000600060006000600060008d6000816003015411806110dc57506002810154155b156110e657610000565b6110ef8d611888565b809950819a50829b505050508e6020016000886000191660001916815260200190815260200160002060009054906101000a900460ff161561113057610000565b438967ffffffffffffffff16101561114757610000565b604080518c81529051908190036020019020871461116457610000565b60068f0193508360005b508054909350600160a060020a038f8116911614156111ab57600d840160005b508054909350600160a060020a038f81169116146111ab57610000565b5b600983015467ffffffffffffffff1615156111c657610000565b8c6040518082805190602001908083835b602083106111f65780518252601f1990920191602091820191016111d7565b51815160209384036101000a600019018019909216911617905260405191909301819003902099509094505050505b8b518211611280578b8201519450848610156112595760408051968752602087018690528051968790030190952094611274565b60408051868152602081019790975280519687900301909520945b5b602082019150611225565b600b830154861461129057610000565b82600c0180548060010182818154818355818115116112f5576003028160030283600052602060002091820191016112f591905b808211156112f157805467ffffffffffffffff1916815560006001820181905560028201556003016112c4565b5090565b5b505050916000526020600020906003020160005b6060604051908101604052808d67ffffffffffffffff1681526020018c81526020018b60001916815250909190915060008201518160000160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550602082015181600101556040820151816002019060001916905550505060018f6020016000896000191660001916815260200190815260200160002060006101000a81548160ff0219169083151502179055505b5b505050505050505050505050505050565b600060006000856000816003015411806113ea57506002810154155b156113f457610000565b86438160000154826002015401101561140c57610000565b600488015488908890600160a060020a038083169116141561142d57610000565b60048a0154600160a060020a038a81169116141561144a57610000565b60068a0196508660005b509550600d870160005b5094506110a78a87878b611770565b505b5b50505b505b50505050505050565b8080600301546000141561149157610000565b6000ff5b5b5050565b600060068301818082815b509150600d830160005b508254909150600160a060020a03868116911614156114da578054600160a060020a03169350611506565b8054600160a060020a0386811691161415611501578154600160a060020a03169350611506565b600093505b50505092915050565b600080808060068501818082815b509150600d830160005b508254600180850154835491840154600160a060020a039384169b5090995091169650945090505b5050509193509193565b60006000600060008760020154600014151561157457610000565b60058801546040805160006020918201819052825160e060020a6370a08231028152600160a060020a038c8116600483015293518a9594909416936370a082319360248084019491938390030190829087803b156100005760325a03f115610000575050506040518051905010156115eb57610000565b6006880160005b508054909150600160a060020a0388811691161461162e576013880160005b508054909150600160a060020a0388811691161461162e57610000565b5b6005880154604080516000602091820181905282517f23b872dd000000000000000000000000000000000000000000000000000000008152600160a060020a038c811660048301528b81166024830152604482018b9052935193909416936323b872dd936064808301949391928390030190829087803b156100005760325a03f11561000057505060405151945050600184151514156116f357600180820180548701908190559089015490935015156116ea574360018901555b600193506116fb565b600093508392505b505094509492505050565b600060068301818082815b509150600d830160005b508254909150600160a060020a03868116911614156117405781600301549350611506565b8054600160a060020a038681169116141561007d5780600301549350611506565b5b610000565b50505092915050565b6000602060405190810160405280600081525060006000600088866000611796826118b8565b90508260010154640100000000028167ffffffffffffffff1610806117d357508260010154600101640100000000028167ffffffffffffffff1610155b156117dd57610000565b8851604190116117ec57610000565b6117f5896118c3565b8c549198509650600160a060020a0380881691161415611817578a9450611839565b8954600160a060020a038781169116141561007d57899450611839565b610000565b5b600c890151600986015490945067ffffffffffffffff9081169085161161186057610000565b61186a85886119fd565b8454600160a060020a031697505b5b50505050505050949350505050565b6000600060008351604814151561189e57610000565b5050506008810151602882015160488301515b9193909250565b600c8101515b919050565b6040805160208181018352600080835283518083018552818152845192830190945280825284519293909260401981019290919084808080806119078c8a8a611a73565b96506119158c60008b611a73565b9550856040518082805190602001908083835b602083106119475780518252601f199092019160209182019101611928565b6001836020036101000a0380198251168184511680821785525050505050509050019150506040518091039020945061197f87611b3f565b6040805160008181526020808301845291830181905282518b815260ff851681840152808401879052606081018690529251959850939650919450600193608080830194601f198301938390039091019190866161da5a03f11561000057505060206040510351935085849a509a505b505050505050505050915091565b6000816000815181101561000057016020015160f860020a9081900481020490506005811415611a3657611a318383611b66565b611a6b565b8060071415611a4e57611a318383611c4f565b611a6b565b806008141561007d57611a318383611d71565b611a6b565b610000565b5b5b5b505050565b602060405190810160405280600081525060008285511015611a9457610000565b6000841015611aa257610000565b838303604051805910611ab25750595b908082528060200260200182016040525b5091508390505b82811015611b3657848181518110156100005790602001015160f860020a900460f860020a02828583038151811015610000579060200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053505b600101611aca565b5b509392505050565b602081015160408201516041830151600116601b8110156118b157601b015b5b9193909250565b6000600060006000600060008651609c141515611b8257610000565b50505050600c8301516028840151603c850151605c860151607c870151609c88015160098a01805467ffffffffffffffff191667ffffffffffffffff8816177fffffffff0000000000000000000000000000000000000000ffffffffffffffff16604060020a600160a060020a038089169190910291909117909155600a8b01805473ffffffffffffffffffffffffffffffffffffffff191691861691909117905560038a01839055600b8a0182905560078a0181905594965092945090929091905b5050505050505050565b60006000600060006000600060006000885161010c141515611c7057610000565b600c8901519750601c89015196506030890151955060448901519450608c890151935060ac890151925060cc890151915060ec8901519050878a60090160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508667ffffffffffffffff168a60080181905550858a60090160086101000a815481600160a060020a030219169083600160a060020a03160217905550848a600a0160006101000a815481600160a060020a030219169083600160a060020a03160217905550838a600b018160001916905550828a6006018160001916905550818a60030181905550808a600401819055505b50505050505050505050565b60006000600060006000600060006000885160c4141515611d9157610000565b600c8901519750601c89015196506030890151955060448901519450606489015193506084890151925060a4890151915060c48901519050878a60090160006101000a81548167ffffffffffffffff021916908367ffffffffffffffff1602179055508667ffffffffffffffff168a60080181905550858a60090160086101000a815481600160a060020a030219169083600160a060020a03160217905550848a600a0160006101000a815481600160a060020a030219169083600160a060020a03160217905550838a600b018160001916905550828a60030181905550818a60040181905550808a60060181600019169055505b505050505050505050505600a165627a7a72305820dc1857e1941717d60d124a2746fb92d16ba787e3d23940f863f3b7c6f191618c0029';

var untitled_nettingchannel = untitled_nettingchannel_library.new(
   {
       from: web3.eth.accounts[0], 
       data: data,
       gas: '3100000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })