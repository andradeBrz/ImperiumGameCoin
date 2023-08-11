// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract token_IGC {
    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowance;

    string public name = "Imperium Game Coin";
    string public symbol = "IGC";

    uint256 public numberOfCoins = 100000000;
    uint256 public decimalPlaces = 8;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    uint256 public totalSupply = numberOfCoins * 10**decimalPlaces;
    uint256 public decimals = decimalPlaces;

    uint256 public deadCoin = 0;
    uint256 public miningCoin = 0;
    uint256 public gamePool = 90000000 * 10**decimalPlaces;
    uint256 public valueLocked = 0;
    uint256 public qtdPresale = 9000000 * 10**decimalPlaces;

    address public contractOwner;
    address public contractCoFounder;

    constructor() {
        contractOwner = msg.sender;
        contractCoFounder = 0xaB123d91E3B1f08A19cDff7C2028328C0a14Bf0d;
        balances[contractOwner] = 500000 * 10**decimalPlaces;
        balances[contractCoFounder] = 500000 * 10**decimalPlaces;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return balances[owner];
    }

    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf(msg.sender) >= value, "Insufficient funds");
        balances[to] += value;
        balances[msg.sender] -= value;
        emit Transfer(msg.sender, to, value);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public returns (bool) {
        require(balanceOf(from) >= value, "Insufficient funds");
        require(
            allowance[from][msg.sender] >= value,
            "Sem permissao (allowance too low)"
        );
        balances[to] += value;
        balances[from] -= value;
        emit Transfer(from, to, value);
        return true;
    }

    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }

    function createTokens(uint256 value) public returns (bool) {
        if (msg.sender == contractOwner) {
            totalSupply += value;
            balances[msg.sender] += value;
            return true;
        }
        return false;
    }

    function destroyTokens(uint256 value) public returns (bool) {
        if (msg.sender == contractOwner) {
            require(balanceOf(msg.sender) >= value, "Insufficient funds");
            totalSupply -= value;
            balances[msg.sender] -= value;
            return true;
        }
        return false;
    }

    function resignOwnership() public returns (bool) {
        if (msg.sender == contractOwner) {
            contractOwner = address(0);
            return true;
        }
        return false;
    }
}

contract shop is token_IGC {
    event NewTruck(
        uint256 truckId,
        string name,
        uint256 uniqueId,
        string message
    );

    uint256 uniqueIdDigits = 12;
    uint256 uniqueIdModulus = 10**uniqueIdDigits;

    struct Truck {
        string name;
        uint256 uniqueId;
        uint32 level;
        uint32 fuelTime;
        uint32 repairTime;
        uint32 harvestTime;
        uint256 codeUpline;
    }

    Truck[] public trucks;

    mapping(uint256 => address) public truckToOwner;
    mapping(address => uint256) ownerTruckCount;

    mapping(address => uint256) public maximumRelationshipBonus;
    mapping(uint256 => address) ownerCodeUpline;

    function getCount() public view returns (uint256 count) {
        return trucks.length - 1;
    }

    function _createTruck(
        uint256 _value,
        uint256 _randUniqueId,
        string memory _name,
        uint32 _fuelTime,
        uint32 _repairTime,
        uint32 _harvestTime,
        uint256 _code
    ) internal {
        trucks.push(
            Truck(
                _name,
                _randUniqueId,
                1,
                uint32(block.timestamp + _fuelTime),
                uint32(block.timestamp + _repairTime),
                uint32(block.timestamp + _harvestTime),
                _code
            )
        );
        uint256 id = getCount();
        truckToOwner[id] = msg.sender;
        ownerTruckCount[msg.sender]++;
        maximumRelationshipBonus[msg.sender] +=
            (_value * 2) *
            10**decimalPlaces;
        ownerCodeUpline[_randUniqueId] = msg.sender;
        emit NewTruck(
            id,
            _name,
            _randUniqueId,
            string(abi.encodePacked("New ", _name, " type truck purchased"))
        );
    }

    function _generateRandomUniqueId(string memory _str)
        private
        view
        returns (uint256)
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(_str)));
        return rand % uniqueIdModulus;
    }

    function append(
        string memory a,
        uint256 b,
        uint256 c,
        address d
    ) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b, c, d));
    }

    function buyTruck(uint256 _value, uint256 _code) public {
        string memory name = "";
        uint32 fuelTime = 0;
        uint32 repairTime = 0;
        uint32 harvestTime = 0;
        bool next = false;
        if (_value == 100) {
            name = "Common";
            fuelTime = 9 minutes;
            repairTime = 150 minutes;
            harvestTime = 10 minutes;
            next = true;
        } else if (_value == 250) {
            name = "Rare";
            fuelTime = 7 minutes;
            repairTime = 144 minutes;
            harvestTime = 8 minutes;
            next = true;
        } else if (_value == 600) {
            name = "Epic";
            fuelTime = 6 minutes;
            repairTime = 114 minutes;
            harvestTime = 7 minutes;
            next = true;
        }
        require(next == true, "Invalid value");
        require(
            balances[msg.sender] >= _value * 10**decimalPlaces,
            "Insufficient funds"
        );
        balances[msg.sender] -= _value * 10**decimalPlaces;
        gamePool += _value * 10**decimalPlaces;
        uint256 randUniqueId = _generateRandomUniqueId(
            append(name, block.timestamp, _code, msg.sender)
        );
        randUniqueId = randUniqueId - (randUniqueId % 100);
        _createTruck(
            _value,
            randUniqueId,
            name,
            fuelTime,
            repairTime,
            harvestTime,
            _code
        );
    }
}

contract road is shop {
    function getTrucksByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](ownerTruckCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < trucks.length; i++) {
            if (truckToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    event HavestEvent(
        uint256 truckId,
        string name,
        uint256 uniqueId,
        string message
    );

    function harvest(uint256 _truckId) public {
        require(
            msg.sender == truckToOwner[_truckId],
            "This truck doesn't belong to you"
        );
        require(
            trucks[_truckId].repairTime > block.timestamp,
            "The truck needs repairs"
        );
        require(
            trucks[_truckId].fuelTime > block.timestamp,
            "The truck needs fuel"
        );
        require(
            trucks[_truckId].harvestTime < block.timestamp,
            "Don't have a reward to collect yet"
        );
        uint256 withdraw = 0;
        uint256 newHarvestTime = 0;
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Common"))
        ) {
            withdraw = (75 * trucks[_truckId].level) * 10**decimalPlaces;
            newHarvestTime = 10 minutes;
        }
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Rare"))
        ) {
            withdraw = (105 * trucks[_truckId].level) * 10**decimalPlaces;
            newHarvestTime = 8 minutes;
        }
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Epic"))
        ) {
            withdraw = (155 * trucks[_truckId].level) * 10**decimalPlaces;
            newHarvestTime = 6 minutes;
        }
        if (gamePool >= withdraw) {
            gamePool -= withdraw;
        } else {
            miningCoin += withdraw;
            totalSupply += withdraw;
        }
        balances[msg.sender] += withdraw;
        trucks[_truckId].harvestTime = uint32(block.timestamp + newHarvestTime);
        emit HavestEvent(
            _truckId,
            trucks[_truckId].name,
            trucks[_truckId].uniqueId,
            "Reward collected"
        );
    }

    event TruckUpgradeEvent(
        uint256 truckId,
        string name,
        uint256 uniqueId,
        string message
    );

    function truckUpgrade(uint256 _truckId) public {
        require(
            msg.sender == truckToOwner[_truckId],
            "This truck doesn't belong to you"
        );
        require(
            trucks[_truckId].repairTime > block.timestamp,
            "The truck needs repairs"
        );
        require(trucks[_truckId].level < 10, "Maximum level already reached");
        uint256 value = 0;
        uint32 fuelTime;
        uint32 harvestTime;
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Common"))
        ) {
            value = 95 * 10**decimalPlaces;
            fuelTime = 9 minutes;
            harvestTime = 10 minutes;
        }
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Rare"))
        ) {
            value = 238 * 10**decimalPlaces;
            fuelTime = 7 minutes;
            harvestTime = 8 minutes;
        }
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Epic"))
        ) {
            value = 570 * 10**decimalPlaces;
            fuelTime = 5 minutes;
            harvestTime = 6 minutes;
        }
        require(balances[msg.sender] >= value, "Insufficient funds");
        balances[msg.sender] -= value;
        gamePool += value;
        trucks[_truckId].fuelTime = uint32(block.timestamp + fuelTime);
        trucks[_truckId].harvestTime = uint32(block.timestamp + harvestTime);
        trucks[_truckId].level += 1;
        emit TruckUpgradeEvent(
            _truckId,
            trucks[_truckId].name,
            trucks[_truckId].uniqueId,
            "Your truck has been updated"
        );
    }
}

contract garage is road {
    event ReFuelEvent(
        uint256 truckId,
        string name,
        uint256 uniqueId,
        string message
    );

    function reFuel(uint256 _truckId) public {
        require(
            msg.sender == truckToOwner[_truckId],
            "This truck doesn't belong to you"
        );
        require(
            trucks[_truckId].repairTime > block.timestamp,
            "The truck needs repairs"
        );
        require(
            trucks[_truckId].fuelTime < block.timestamp,
            "The truck is not needing fuel"
        );
        uint256 taxFuel = (50 * trucks[_truckId].level) * 10**decimalPlaces;
        require(balances[msg.sender] >= taxFuel, "Insufficient funds");
        address upline = ownerCodeUpline[trucks[_truckId].codeUpline];
        uint256 newFuelTime = 0;
        balances[msg.sender] -= taxFuel;
        balances[contractOwner] += (taxFuel * 5) / 100;
        totalSupply -= (taxFuel * 5) / 100;
        deadCoin += (taxFuel * 5) / 100;
        if (maximumRelationshipBonus[upline] >= (taxFuel * 5) / 100) {
            balances[upline] += (taxFuel * 5) / 100;
            maximumRelationshipBonus[upline] -= (taxFuel * 5) / 100;
        } else {
            gamePool += (taxFuel * 5) / 100;
        }
        gamePool += (taxFuel * 85) / 100;
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Common"))
        ) {
            newFuelTime = 9 minutes;
        }
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Rare"))
        ) {
            newFuelTime = 7 minutes;
        }
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Epic"))
        ) {
            newFuelTime = 5 minutes;
        }
        trucks[_truckId].fuelTime = uint32(block.timestamp + newFuelTime);
        emit ReFuelEvent(
            _truckId,
            trucks[_truckId].name,
            trucks[_truckId].uniqueId,
            "Fueled truck"
        );
    }

    event RepairEvent(
        uint256 truckId,
        string name,
        uint256 uniqueId,
        string message
    );

    function repair(uint256 _truckId) public {
        require(
            msg.sender == truckToOwner[_truckId],
            "This truck doesn't belong to you"
        );
        require(
            trucks[_truckId].repairTime < block.timestamp,
            "Your truck doesn't need repairs"
        );
        uint256 newRepairTime = 0;
        uint256 value = 0;
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Common"))
        ) {
            newRepairTime = 150 minutes;
            value = (75 * trucks[_truckId].level) * 10**decimalPlaces;
        }
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Rare"))
        ) {
            newRepairTime = 144 minutes;
            value = (188 * trucks[_truckId].level) * 10**decimalPlaces;
        }
        if (
            keccak256(abi.encodePacked(trucks[_truckId].name)) ==
            keccak256(abi.encodePacked("Epic"))
        ) {
            newRepairTime = 114 minutes;
            value = (450 * trucks[_truckId].level) * 10**decimalPlaces;
        }
        require(balances[msg.sender] >= value, "Insufficient funds");
        balances[msg.sender] -= value;
        gamePool += value;
        trucks[_truckId].repairTime = uint32(block.timestamp + newRepairTime);
        emit RepairEvent(
            _truckId,
            trucks[_truckId].name,
            trucks[_truckId].uniqueId,
            "Your truck has been repaired"
        );
    }
}

contract savings is garage {
    struct StakingArray {
        uint256 valueLocked;
        uint256 estimatedReturn;
        uint32 timeLocked;
        uint32 apy;
        bool rescue;
    }

    StakingArray[] public staking;

    mapping(uint256 => address) public stakingToOwner;
    mapping(address => uint256) ownerStakingCount;

    function getCount2() public view returns (uint256 count) {
        return staking.length - 1;
    }

    event NewValueLocked(string message);

    function stakingLocked(uint256 _value, uint256 _days) public {
        require(
            balances[msg.sender] >= _value * 10**decimalPlaces,
            "Insufficient funds"
        );
        bool next = false;
        uint32 apy = 0;
        uint32 timeLocked = 0;
        uint256 estimatedReturn = 0;
        if (_days == 15) {
            next = true;
            apy = 10;
            timeLocked = 15 minutes;
        }
        if (_days == 30) {
            next = true;
            apy = 20;
            timeLocked = 30 minutes;
        }
        if (_days == 90) {
            next = true;
            apy = 30;
            timeLocked = 90 minutes;
        }
        if (_days == 180) {
            next = true;
            apy = 40;
            timeLocked = 180 minutes;
        }
        if (_days == 360) {
            next = true;
            apy = 50;
            timeLocked = 360 minutes;
        }
        require(next == true, "Invalid number of days");
        balances[msg.sender] -= _value * 10**decimalPlaces;
        gamePool += _value * 10**decimalPlaces;
        estimatedReturn = _value + ((_value * apy * _days) / 3650) / 10;
        staking.push(
            StakingArray(
                _value * 10**decimalPlaces,
                estimatedReturn * 10**decimalPlaces,
                uint32(block.timestamp + timeLocked),
                apy,
                false
            )
        );
        valueLocked += _value * 10**decimalPlaces;
        uint256 id = getCount2();
        stakingToOwner[id] = msg.sender;
        ownerStakingCount[msg.sender]++;
        emit NewValueLocked("You have successfully locked your IGC");
    }

    function getStakingByOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](ownerStakingCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < staking.length; i++) {
            if (stakingToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    event StakingRescueEvent(string message);

    function stakingRescue(uint256 _id) public {
        require(
            msg.sender == stakingToOwner[_id],
            "This locked value does not belong to you"
        );
        require(
            staking[_id].timeLocked < block.timestamp,
            "This blocked amount is not yet available for withdrawal"
        );
        require(
            staking[_id].rescue == false,
            "You have already redeemed this value"
        );
        balances[msg.sender] += staking[_id].estimatedReturn;
        if (gamePool >= staking[_id].estimatedReturn) {
            gamePool -= staking[_id].estimatedReturn;
        } else {
            miningCoin += staking[_id].estimatedReturn;
            totalSupply += staking[_id].estimatedReturn;
        }
        valueLocked -= staking[_id].valueLocked;
        staking[_id].rescue = true;
        emit StakingRescueEvent(
            "Withdrawal from the IGC successfully performed"
        );
    }
}

contract presale is savings {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    uint256 valueTokenBuy = 0.0005 ether;

    uint256 public amountCollected = 0;

    function setValueTokenBuy(uint256 _fee) external onlyOwner {
        valueTokenBuy = _fee;
    }

    event EventBuy(string message);

    function buyToken() external payable {
        require(
            msg.value >= valueTokenBuy,
            "Insufficient amount to buy IGC token"
        );
        uint256 qtd = (msg.value / valueTokenBuy) * 10**decimalPlaces;
        require(
            qtdPresale >= qtd,
            "It is not possible to buy this amount of tokens"
        );
        qtdPresale -= qtd;
        balances[msg.sender] += qtd;
        amountCollected += msg.value;
        emit EventBuy("Congratulations you bought IGC");
    }

    function withdraw() public onlyOwner {
        uint256 amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Failed to send Ether");
    }
}