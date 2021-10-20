// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract myNFTs is ERC721 {
    uint public totalCount=0;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MuzammilSiddiquiToken", "MST"){}

    struct Item {
        uint256 id;
        string name;
        string description;
        address creator;
        string uri;
    }

    mapping (uint256 => Item) public Items;

    function createItem(string memory uri,string memory nam, string memory description) public returns (uint256){
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);

        Items[newItemId] = Item(newItemId,nam, description, msg.sender, uri);
totalCount = newItemId;
        return newItemId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

       return Items[tokenId].uri;
    }
}