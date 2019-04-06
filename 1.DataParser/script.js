/**
 * Data Parser
 * Funzioni e funzionamento applicazione.
 * Da:    Paulin Gjini
 * Data:  Gennaio 2016
 * Luogo: Italy
 */

// Lancia parsing
function lanciaParsing() {
    var jsonConfig = JSON.parse(editor.getText());
    var data = areaDati.getValue();
    var parsed = dataMsgParse(data, jsonConfig);
    // stampa albero json
    document.getElementById("risultati").innerHTML = '';
    var htmlTable = CreateDetailView(parsed);
    var risultati = document.getElementById("risultati").innerHTML;
    risultati += htmlTable;
    document.getElementById("risultati").innerHTML = risultati;
}

// FullScreen element
function toggleFullScreen(id) {
    var elemento = document.getElementById(id);
    if (!document.mozFullScreen && !document.webkitFullScreen) {
        if (elemento.mozRequestFullScreen) {
            elemento.mozRequestFullScreen();
        } else {
            elemento.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else {
            document.webkitCancelFullScreen();
        }
    }
}

function salvaConfigurazione() {
    var configurazione = editor.get();
    if (typeof configurazione.nomeConfig !== 'undefined') {
        nomeConfig = configurazione.nomeConfig;
    }
    dataParseMemory.parserConfig[nomeConfig] = configurazione;
    console.log(dataParseMemory);
    store.set('dataParseMemory', dataParseMemory);
    stampaConfigurazione();
}

function caricaConfigurazione (nomeConfig){
    editor.set(dataParseMemory.parserConfig[nomeConfig]);
}

function stampaConfigurazione (){
  var risultato = '';
  for (chiave in dataParseMemory.parserConfig){
    var oggetto = dataParseMemory.parserConfig[chiave];
      risultato += '<span class="lnk"><a class="lnkLoad" onclick="caricaConfigurazione(\''+oggetto.nomeConfig+'\')">'+oggetto.nomeConfig+'</a>'+
                   '<a class="lnkCancel" onclick="cancellaConfigurazione(\''+oggetto.nomeConfig+'\')"></a></span>'
    }
    console.log('***'+risultato);
    document.getElementById('areaLinkConfig').innerHTML = risultato;
}

function cancellaConfigurazione (nomeConfig){
    console.log(dataParseMemory.parserConfig[nomeConfig]);
    delete dataParseMemory.parserConfig[nomeConfig]
    store.set('dataParseMemory',dataParseMemory);
    stampaConfigurazione();
}

/*- M A I N
 */

// prepara area

var areaDati = ace.edit("areaDati");
var areaConfig = document.getElementById("areaConfig");
var options = {
    modes: ['text', 'code', 'tree', 'form', 'view'],
    mode: 'code',
    ace: ace
};
var editor = new JSONEditor(areaConfig, options);

// inizializza variabili locali
if (!store.enabled) {
    alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.')
    //return
}
if (typeof store.get('dataParseMemory') !== 'undefined') {
    var dataParseMemory = store.get('dataParseMemory');
    var activeParserConfig = store.get('dataParseMemory').activeParserConfig;
} else {
    store.set('dataParseMemory', {
        activeParserConfig: '',
        parserConfig: {}
    });
    var dataParseMemory = {
        activeParserConfig: '',
        parserConfig: {}
    };
}
stampaConfigurazione();
var jsdata = {"nomeConfig":"ExampleNessage","messageType":"text","fields":[{"name":"Dato 1","len":5,"desc":"Test"},{"name":"Dato 2","len":5,"desc":"Test"}]};
editor.set(jsdata);
