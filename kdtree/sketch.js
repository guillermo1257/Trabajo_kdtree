function setup () {
  var width = 250;
  var height = 200;
  createCanvas (width , height ) ;
  background (0) ;
  for (var x = 0; x < width; x += width / 10) {
    for (var y = 0; y < height; y += height / 5) {
      stroke (50 , 50 , 50) ;
      strokeWeight (1) ;
      line (x, 0, x, height );
      line (0 , y, width , y);
      }
  }
      
  // var data = [];
  // for ( let i = 0; i < 10; i ++) {
  //   var x = Math.floor ( Math.random () * height );
  //   var y = Math.floor ( Math.random () * height );
  //   data.push ([x, y]) ;
    
  //   fill (255 , 255 , 255) ;
  //   circle (x, height - y, 7) ; // 200 -y para q se dibuje apropiadamente
  //   textSize (8) ;
  //   text (x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
  // }
var data = [
  // [40,70],
  // [70,130],
  // [90,40],
  // [110,100],
  // [140,110],
  // [160,100],
  // [150,30]
  // [40 ,70] ,
  [40 ,70] ,
  [70 ,130] ,
  [90 ,40] ,
  [110 , 100] ,
  [140 ,110] ,
  [160 , 100],
  [150,30]

  ];

  for ( let i = 0; i < data.length; i ++) {
    
       var x = data[i][0];
       var y = data[i][1];
       fill (255 , 255 , 255) ;
       circle (x, height - y, 7) ; // 200 -y para q se dibuje apropiadamente
       textSize (8) ;
       text (x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
  }

  console.log("MENOR");
  console.log(closest_point_brute_force(data, [140, 90]));

  var root = build_kdtree ( data ) ;
  //console.log(getHeight(root));
  //console.log ( root.point );
  
  console.log( generate_dot(root));

  best1 = naive_closest_point(root, [140, 90]);
  
  console.log("naive_closest_point " + best1.point);
 
  best2 = closest_point(root, [140, 90]);
  console.log("closest_point " + best2.point);
  console.log();
}