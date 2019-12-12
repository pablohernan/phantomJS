
/*
Example

node index.js http://clarin.com imagen 1680
node index.js http://g1.globo.com/ imagen3 1366

*/


var phantom = require('phantom');

phantom.create().then(function(ph) {
  ph.createPage().then(function(page) {

    var url = process.argv[2]; // 'http://profru.com';
    var format = 'png';
    var img = process.argv[3] + '.' + format; // 'profru'
    var width = process.argv[4]; //1200;
    var limitHeigth = 10000;

    page.property('viewportSize', {
      width: width,
      height: 768
    }) 

    page.open(url).then(function(status) {

      console.log(status);
      if (status !== 'success') {
          console.log('Pagina no encontrada: ' + url);
          ph.exit();
      } else {

          var scrollHeight = 0;
          function scrollEnd(){
              page.evaluate(function() {
                //problema con las paginas dinamicas
                var h = (document.body.scrollTop = document.body.scrollHeight);
                return h;
              }).then(function(h){
                  if(h != scrollHeight && h < limitHeigth){
                    setTimeout(function () {
                        scrollHeight = h;
                        scrollEnd();
                    }, 2000); // Change timeout as required to allow sufficient time 
                  }else{
                    console.log('scrollHeight: '+h);
                    pageRender(scrollHeight);
                  }            

              });
          }

          function pageRender(scrollHeight){
                  
                  page.property('viewportSize', {
                    width: width,
                    height: scrollHeight
                  });

                  setTimeout(function () {
                     
                      /*
                      // retorna base64 de la imagen
                      page.renderBase64('PNG').then(function(base64){
                        console.log(base64);
                        ph.exit();
                      });
                      */

                      //crea la imagen
                      page.render(img, {'format': format , 'quality': '100'}).then(function(){
                        console.log('Fue creada : ' + img);
                        ph.exit();
                      });

                   }, 10000); // Change timeout as required to allow sufficient time 

          }

          scrollEnd();

      }




      /*
      page.property('content').then(function(content) {
        console.log(content);
        page.close();
        ph.exit();
      });
      */


    });
  });
});