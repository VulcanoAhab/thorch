var exports = module.exports;

function test_input(variable, default_value){
    if (typeof variable !== 'undefined') {
        return variable;
    }
    return default_value;
}

exports.test_input=test_input;
