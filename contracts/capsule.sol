pragma solidity ^0.5.0;


contract Capsule {
    uint time;  // 캡슐을 여는 시간
    uint limit; // 캡슐 여는 기간
    address[] owner;    // 캡슐에 넣은 사람들 지갑 주소
    mapping(address => bool) taked;
    address payable public manager;    // 서버
    string hash;    // ipfs 해시값
    coordinate pos; // 묻은 좌표
    uint radius = 100;  // 한계 거리 (m)
    string key;
    uint balance;
    bool public mode = false;
    address[] moneyreturn;

    struct coordinate {
        uint longitude;
        uint latitude;
    }
    
    /*
    생성자
    input : 시간 얼마나 뒤에 열거야, 묻는 사람, x좌표, y좌표, 키
    */
    constructor (uint _period, address _owner, uint _latitude, uint _longitude, string memory _key, uint value, uint _limit, string memory _hash) public payable {
        time = now + _period;
        owner.push(_owner);
        taked[_owner] = false;
        manager = tx.origin;
        pos.latitude = _latitude;
        pos.longitude = _longitude;
        key = _key;
        balance = value;
        limit = now + _period + _limit;
        hash = _hash;
    }
    
    modifier ManagerShip() {    // 서버만 호출가능
        require(manager == msg.sender);
        _;
    }
    
    modifier TimeLimit {
        require(now <= time + limit && now >= time);
        _;
    }
    /*
    두 입력의 차 리턴
    */
    function AbsSubtract(uint a, uint b) private pure returns(uint) {
        if (a > b) return a - b;
        else if (a <= b) return b - a;
    }
    
    /*
    시간 지났는지 아닌지 체크
    
    캡슐 주인들만 확인 가능

    output : 시간 지났으면 true, 아니면 false
    */
    function check() public view returns(bool) {
        bool avail = false;
        for (uint i = 0 ; i < owner.length ; i++) {
            if (owner[i] == msg.sender) avail = true;
        }
        require(avail);
        return (now > time);
    }
    
    /*
    참여자 추가 함수

    input : 참여자 address
    output : 성공시 true
    */
    function Participate(address _owner) public ManagerShip payable returns(bool) {
        require(msg.value == balance);
        owner.push(_owner);
        return true;
    }
    
    
    function BreakCapsule1() public view ManagerShip returns(address[] memory) {
        return moneyreturn;
    }
    
    function BreakCapsule2() public ManagerShip {
        selfdestruct(manager);
    }
    
    /*
    true : service End
    */
    function ModeChange(bool _mode) public ManagerShip {
        mode = _mode;
    }
    
    /*
    열기 함수
    input : 키, 장소, 경도, 위도
    output : 저장되어진 해시값
    */
    function Open(string memory _key, uint _latitude, uint _logitude) public TimeLimit returns(string memory){
        require(keccak256(bytes(key)) == keccak256(bytes(_key)) && (AbsSubtract(pos.longitude, _logitude) ** 2 + AbsSubtract(pos.latitude, _latitude) ** 2 <= radius ** 2));
        require(!taked[msg.sender]);
        taked[msg.sender] = true;
        if (mode) {
            msg.sender.transfer(balance);
        } else {
            moneyreturn.push(msg.sender);
            return hash;
        }
    }
    
    
    
    function() external payable {}
}