function setup () {
  var width = 250;
  var height = 200;
  createCanvas (width , height ) ;
  background (0) ;
  for (var x = 0; x < width; x += width / 10) {
    for (var y = 0; y < height; y += height / 5) {
      stroke (125 , 125 , 125) ;
      strokeWeight (1) ;
      line (x, 0, x, height );
      line (0 , y, width , y);
      }
  }
      
  var data = [];
  for ( let i = 0; i < 10; i ++) {
    var x = Math.floor ( Math.random () * height );
    var y = Math.floor ( Math.random () * height );
    data.push ([x, y]) ;
    
    fill (255 , 255 , 255) ;
    circle (x, height - y, 7) ; // 200 -y para q se dibuje apropiadamente
    textSize (8) ;
    text (x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
  }

  
  // var data = [
  //   [40 ,70] ,
  //   [70 ,130] ,
  //   [90 ,40] ,
  //   [110 , 100] ,
  //   [140 ,110] ,
  //   [160 , 100]
  //   ];

  // for ( let i = 0; i < data.length; i ++) {
    
  //     var x = data[i,0];
  //     var y = data[i,1];
  //     fill (255 , 255 , 255) ;
  //     circle (x, y, 7) ; // 200 -y para q se dibuje apropiadamente
  //     textSize (8) ;
  //     text (x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
  //   }
  
  var root = build_kdtree ( data ) ;
  console.log(getHeight(root));
  console.log ( root.point );
  console.log("AAAA");
  console.log('digraph G {' + generate_dot(root) + '}');
  
}