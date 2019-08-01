pragma solidity ^0.5.0;
import "./Capsule.sol";

contract Manage {
    address payable private owner;  // 서버
    address[] list; // 고객 명단(지갑 주소)
    mapping(address => Capsul) cap; // 고객 명단을 통해 저장하는 캡슐 개수와 내용, 고객의 존재 여부
    bytes32 ok = "The process was success"; // 성공시 출력
    bytes32 fail = "The process was fail";  // 실패시 출력
    
    event last(address owner, address caps);
    
    struct Capsul {
        address[] capList;
        mapping(address => bool) capsule;
        uint num;
        bool exist;
    }
    
    constructor () public {
        owner = msg.sender;
    }
    
    modifier OwnerShip() {  // 서버가 실행한 경우 통과
        require(msg.sender == owner);
        _;
    }
    
    /*
    캡슐을 묻는 함수(hash 값을 바로 받는 걸로 수정하기)

    input : 기간, 캡슐 묻는 사람, 실행 하는 위치 x, y
    output : 만든 캡슐 컨트랙트 주소
    */
    function Bury(uint _period, address _owner, uint _x, uint _y, uint _limit, string memory _hash) public OwnerShip payable returns(address) {
        Capsule capsule = new Capsule(_period, _owner, _x, _y, msg.value, _limit, _hash);
        address(capsule).transfer(msg.value);
        if (!cap[_owner].exist) {
            cap[_owner].exist = true;
            cap[_owner].num++;
            list.push(_owner);
            cap[_owner].capsule[address(capsule)] = true;
            cap[_owner].capList.push(address(capsule));
        }else {
            cap[_owner].num++;
            cap[_owner].capsule[address(capsule)] = true;
            cap[_owner].capList.push(address(capsule));
        }
        
        
        emit last(_owner, address(capsule));
    }
    address public last_capsule;
    
    function CheckLastCapsule() public view returns(address) {
        return last_capsule;
    }
    
    // function checking(address _owner) public view returns (uint, uint) {
    //     return ();
    // }
    
    /*
    서비스 종료시 실행하는 함수
    서버만 실행 가능
    cap[list[i]].capList[j] == all address of capsule
    */
    function ServiceEnd() public OwnerShip {
        selfdestruct(owner);
    }
    
    function() external payable {
    }
}
