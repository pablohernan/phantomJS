var phantom = require('phantom');

phantom.create().then(function(ph) {
  ph.createPage().then(function(page) {
    page.open('http://dolarpeso.mx/bitcoin-pronostico-precio-bitcoin-hoy').then(function(status) {

      page.property('viewportSize', {
        width: 1366,
        height: 200
      });


      setTimeout(function(){
        console.log(status);
        page.render('basic.png', {'format': 'png' , 'quality': '100'});
        ph.exit();
      },10000);

    });
  });
});