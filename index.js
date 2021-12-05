// index.js
//const { fetchMyIP } = require('./iss');
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);
});
*/

/*
const { fetchCoordsByIP } = require('./iss');
fetchCoordsByIP('122.176.194.224',(err,coords) => {
	if(err) {
		console.log(err);
		return;
	}
	console.log("It worked! Returned coordinats:",coords);
});
*/

/*
const{fetchISSFlyOverTimes}=require('./iss');

fetchISSFlyOverTimes({latitude:'49.27670',longitude:'-123.13000'},(error,pass) => {
	if(error) {
		console.log("It didn't work!",error);
		return;
	}
	console.log('It worked! Returned pass times : ',pass);
});
*/

const { nextISSTimesForMyLocation } = require('./iss');
nextISSTimesForMyLocation((err,passes)=>{
	if(err)
	{
		return console.log("ERROR!!",err);
	}
	for(let pass of passes)
	{
		const dt = new Date(0);
		dt.setUTCSeconds(pass.risetime);
		const dur = pass.duration;
		console.log(`NEXT PASS : ${dt} FOR ${dur} SECONDS`)
	}

})