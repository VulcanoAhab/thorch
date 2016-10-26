var creds = require('./creds.js')
var places = require('./places.js')


var cred_set=creds.new_set()
var geots=places.targets()

module.exports ={


    CREDS:cred_set,
    GEOTS:geots,
}


