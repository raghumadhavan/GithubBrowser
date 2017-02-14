var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');
const authKey = 'auth';
const userKey = 'user';

export class AuthService {
  getAuthInfo(cb){
      AsyncStorage.multiGet([authKey,userKey],(err,val) => {
        if(err){
          return cb(err);
        }
        if(!val){
           return cb();
        }
        var zippedObj =  _.fromPairs(val)
        if(!zippedObj[authKey]){
          return cb();
        }
        var authInfo = {
          header: {
            Authorization: 'Basic ' + zippedObj[authKey]
          },
          user: JSON.parse(zippedObj[userKey])
        }
        return cb(null, authInfo);
      });
  }

  login(creds, cb){
    var b = new buffer.Buffer(creds.username + ':' + creds.password);
    var encodedAuth = b.toString('base64');

    fetch('https://api.github.com/user', {
      headers: {
        'Authorization' : 'Basic ' + encodedAuth
      }
    })
    .then((response) =>
    {
      if(response.status >= 200 && response.status <300){
          return response;
      }
      // if (response.status == 401){
      //   throw 'bad credentials';
      // }
      // throw 'Unkown error';
      throw {
          badCredentials : response.status == 401,
          UnkownError: response.status != 401
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      AsyncStorage.multiSet([
        [authKey,encodedAuth],
        [userKey, JSON.stringify(results)]
      ],(err)=> {
        if(err){
          throw err;
        }
        return cb({
          success : true
        });
      })

    })
    .catch((err) => {
      return cb(err);
    })
    // .finally(() =>{
    //   this.setState({ showProgress : false});
    // });
  }
}
module.exports = new AuthService();
