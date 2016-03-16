var fechas = [];
var horas = [];
var index = 0;
var d = new Date();
var n = d.getDate();


var casper = require('casper').create({
  pageSettings: {
    loadImages:  true,        // The WebPage instance used by Casper will
    loadPlugins: true         // use these settings
  },
  viewportSize: {
    width: 1200, 
    height: 800
  },
  logLevel: "debug",              // Only "info" level messages will be logged
  verbose: true                  // log messages will be printed out to the console
});


function getFechas() {
        var fechasi = document.querySelectorAll("td span.date.tooltipster.tooltipstered span.number");
        return Array.prototype.map.call(fechasi, function(e) {
            return e.innerHTML;
        });
}



casper.start('http://bearbero.com/mis-reservas/', function() {
    this.fillSelectors('form#loginform', {
    'input[name="log"]': ' ',
    'input[name="pwd"]': ' ',
    'input[name="rememberme"]': true
    }, true);
});

casper.thenOpen('http://bearbero.com/reserva-mario/', function() {});

casper.then(function(){
    this.waitForSelector("td span.date.tooltipster.tooltipstered span").then( function() {
//this.wait(3000).then( function() {
    // this.echo("Empiezo a buscar fechas");
        this.waitForSelector('a.wdpu-close', function() {
            this.mouseEvent('click',  'a.wdpu-close');
            this.waitForSelector("td span.date.tooltipster.tooltipstered span").then( function() {
                this.capture('reserva_mario', undefined, {
                    format: 'jpg',
                    quality: 65
                    });
                fechas = this.evaluate(getFechas);
            // this.echo("La longitud las fechas es " + fechas.length);
                if (fechas === undefined || fechas.length == 0) {
                this.echo("Cambio de mes para buscar más fechas");
                    this.mouseEvent('click', 'a.page-right');
                    this.wait(3000, function(){
                        fechas = this.evaluate(getFechas);
                        });
                    };
            });
            });
        });
    //this.eachThen(fechas, function(response){
        //    console.log(fechai);
    //    this.echo("Voy poniendo fechas" + response.data);
    //});
});

casper.then(function(){
    this.each(fechas, function(self, fechai){
        self.echo("Voy poniendo fechas " + fechai);
        this.then(function(){
            this.clickLabel(fechai, 'span');
            this.waitForSelector("button.new-appt.button", function(){
                if 

        });
});





casper.run(function() {
    // echo results in some pretty fashion
    this.echo(fechas.length + ' fechas found:');
    this.echo(' - ' + fechas.join('\n - '));
    // this.echo(horas.length + ' horas found:');
    this.exit();
});
