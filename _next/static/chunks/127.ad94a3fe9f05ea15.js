"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[127],{13127:function(t,r,e){e.r(r),e.d(r,{NFTDrop:function(){return c}});var a=e(2508),n=e(10317),i=e(2593),s=e(9279),o=e(29251);e(41323),e(25025),e(70332),e(8455),e(26729),e(54098),e(62555),e(26219),e(61303),e(49242),e(94317),e(13670),e(79120),e(97604),e(8187),e(19362),e(54730),e(36250),e(85725),e(38730),e(237),e(65609),e(77208),e(86841),e(49561),e(40553),e(26),e(69392),e(62822),e(24234),e(82037),e(2162),e(64063),e(34161),e(50266),e(98839),e(51375),e(43320),e(65815),e(59189),e(40721),e(24601),e(46878),e(20583),e(92355),e(84194),e(51121),e(32484),e(78435);class c extends n.aE{constructor(t,r,e){let i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,o=arguments.length>5?arguments[5]:void 0,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new n.cm(t,r,s,i);super(l,e,o),(0,a._)(this,"abi",void 0),(0,a._)(this,"encoder",void 0),(0,a._)(this,"estimator",void 0),(0,a._)(this,"metadata",void 0),(0,a._)(this,"sales",void 0),(0,a._)(this,"platformFees",void 0),(0,a._)(this,"events",void 0),(0,a._)(this,"roles",void 0),(0,a._)(this,"interceptor",void 0),(0,a._)(this,"royalties",void 0),(0,a._)(this,"claimConditions",void 0),(0,a._)(this,"revealer",void 0),(0,a._)(this,"checkout",void 0),(0,a._)(this,"erc721",void 0),(0,a._)(this,"owner",void 0),this.abi=s,this.metadata=new n.ag(this.contractWrapper,n.cz,this.storage),this.roles=new n.ah(this.contractWrapper,c.contractRoles),this.royalties=new n.ai(this.contractWrapper,this.metadata),this.sales=new n.aj(this.contractWrapper),this.claimConditions=new n.al(this.contractWrapper,this.metadata,this.storage),this.encoder=new n.af(this.contractWrapper),this.estimator=new n.aQ(this.contractWrapper),this.events=new n.aR(this.contractWrapper),this.platformFees=new n.aT(this.contractWrapper),this.erc721=new n.av(this.contractWrapper,this.storage,o),this.revealer=new n.ak(this.contractWrapper,this.storage,n.cA.name,()=>this.erc721.nextTokenIdToMint()),this.interceptor=new n.aS(this.contractWrapper),this.owner=new n.aV(this.contractWrapper),this.checkout=new n.cl(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async totalSupply(){let t=await this.totalClaimedSupply(),r=await this.totalUnclaimedSupply();return t.add(r)}async getAllClaimed(t){let r=i.O$.from((null==t?void 0:t.start)||0).toNumber(),e=i.O$.from((null==t?void 0:t.count)||a.D).toNumber(),n=Math.min((await this.contractWrapper.readContract.nextTokenIdToClaim()).toNumber(),r+e);return await Promise.all(Array.from(Array(n).keys()).map(t=>this.get(t.toString())))}async getAllUnclaimed(t){let r=i.O$.from((null==t?void 0:t.start)||0).toNumber(),e=i.O$.from((null==t?void 0:t.count)||a.D).toNumber(),n=i.O$.from(Math.max((await this.contractWrapper.readContract.nextTokenIdToClaim()).toNumber(),r)),s=i.O$.from(Math.min((await this.contractWrapper.readContract.nextTokenIdToMint()).toNumber(),n.toNumber()+e));return await Promise.all(Array.from(Array(s.sub(n).toNumber()).keys()).map(t=>this.erc721.getTokenMetadata(n.add(t).toString())))}async totalClaimedSupply(){return this.erc721.totalClaimedSupply()}async totalUnclaimedSupply(){return this.erc721.totalUnclaimedSupply()}async isTransferRestricted(){let t=await this.contractWrapper.readContract.hasRole((0,n.br)("transfer"),s.d);return!t}async createBatch(t,r){let e=await this.contractWrapper.readContract.nextTokenIdToMint(),a=await (0,n.cB)(t,this.storage,e.toNumber(),r),i=a[0].substring(0,a[0].lastIndexOf("/"));for(let s=0;s<a.length;s++){let c=a[s].substring(0,a[s].lastIndexOf("/"));if(i!==c)throw Error(`Can only create batches with the same base URI for every entry in the batch. Expected '${i}' but got '${c}'`)}let l=await this.contractWrapper.sendTransaction("lazyMint",[a.length,i.endsWith("/")?i:`${i}/`,o.Y0("")]),h=this.contractWrapper.parseLogs("TokensLazyMinted",null==l?void 0:l.logs),p=h[0].args.startTokenId,d=h[0].args.endTokenId,u=[];for(let m=p;m.lte(d);m=m.add(1))u.push({id:m,receipt:l,data:()=>this.erc721.getTokenMetadata(m)});return u}async getClaimTransaction(t,r){let e=!(arguments.length>2)||void 0===arguments[2]||arguments[2];return this.erc721.getClaimTransaction(t,r,{checkERC20Allowance:e})}async claimTo(t,r){let e=!(arguments.length>2)||void 0===arguments[2]||arguments[2];return this.erc721.claimTo(t,r,{checkERC20Allowance:e})}async claim(t){let r=!(arguments.length>1)||void 0===arguments[1]||arguments[1];return this.claimTo(await this.contractWrapper.getSignerAddress(),t,r)}async burn(t){return this.erc721.burn(t)}async get(t){return this.erc721.get(t)}async ownerOf(t){return this.erc721.ownerOf(t)}async balanceOf(t){return this.erc721.balanceOf(t)}async balance(){return this.erc721.balance()}async isApproved(t,r){return this.erc721.isApproved(t,r)}async transfer(t,r){return this.erc721.transfer(t,r)}async setApprovalForAll(t,r){return this.erc721.setApprovalForAll(t,r)}async setApprovalForToken(t,r){return{receipt:await this.contractWrapper.sendTransaction("approve",[t,r])}}async call(t){for(var r=arguments.length,e=Array(r>1?r-1:0),a=1;a<r;a++)e[a-1]=arguments[a];return this.contractWrapper.call(t,...e)}}(0,a._)(c,"contractRoles",["admin","minter","transfer"])}}]);