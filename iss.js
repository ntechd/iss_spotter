/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

 const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
	const url = "https://api.ipify.org?format=json";
	request(url,(error,response,body)=>{
		if(error) {
			callback(error);
		}
		// if non-200 status, assume server error
	if (response.statusCode !== 200) {
		const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
		callback(Error(msg), null);
		return;
	}
		const data = JSON.parse(body);
		callback(undefined,data.ip);
	});

};

const fetchCoordsByIP = function(ip,callback) {

	let url = "https://freegeoip.app/json/";
	url = url+ip;

	request(url,(error,response,body)=>{
		if(error) {
			callback(error,null);
		}
		// if non-200 status, assume server error
	if (response.statusCode !== 200) {
		const msg = `Status Code ${response.statusCode} when fetching IP address coordinates. Response: ${body}`;
		callback(Error(msg), null);
		return;
	}
		const {latitude , longitude} = JSON.parse(body);
		callback(undefined,{latitude,longitude});

	});

};

//module.exports = { fetchMyIP };
//module.exports = { fetchCoordsByIP };


/*
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

 const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
	const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

	request(url,(error,response,body)=>{
		

		if(error) {
			callback(error,null);
		}
		// if non-200 status, assume server error
	if (response.statusCode !== 200) {
		const msg = `Status Code ${response.statusCode} when fetching pass times. Response: ${body}`;
		callback(Error(msg), null);
		return;
	}
		const pass = JSON.parse(body);
		callback(undefined,pass.response);
		
	});
}; 
/*
module.exports = {fetchISSFlyOverTimes};
*/
// iss.js 

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
 const nextISSTimesForMyLocation = function(callback) {
  // empty for now
	fetchMyIP((error,ip)=>{
		if(error) {
			return callback(error,null);
		}

		fetchCoordsByIP(ip,(error,loc) => {
			if(error) {
				return callback(error,null);
		}
		
		fetchISSFlyOverTimes(loc,(err,nextPass) => {
			if(error)
			{
				return callback(err,null);
			}

			callback(null,nextPass);
		});
	 });
	});
};

module.exports = {nextISSTimesForMyLocation};