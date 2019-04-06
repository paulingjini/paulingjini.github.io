/**
 *
 * @param data
 * @param config
 * @param callback
 * @return object
 *
 */


function dataMsgParse(data, config, callback) {
    if (data === 'undefined' || config === 'undefined') {
        console.log("Error function dataMsgParse: Parametri non corretti!");
        throw "Error: Parametri non corretti!";
    }
    console.log(data + config);
    var regExpMsgParse = '';
    for (var x = 0; x < config.fields.length; x++) {
        if (typeof config.fields[x].regex === 'undefined') {
            regExpMsgParse += '(.{' + config.fields[x].len + '})';
        } else {
            regExpMsgParse += config.fields[x].regex;
        }
    }
    console.log("regExpMsgParse:"+regExpMsgParse);
    var lines = data.match(regExpMsgParse);

    for (var x = 0; x < config.fields.length; x++) {
        config.fields[x].text = lines[x + 1];
    }

    console.log(JSON.stringify(config));

    if (typeof callback === "function")
        callback(lines);
    return config;
}
