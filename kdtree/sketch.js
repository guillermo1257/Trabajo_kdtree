function setup(){
  var width = 250;
  var height = 200;

  createCanvas(width, height);
  background(0);
  for(var x = 0; x < width; x += width / 10){
    for (var y = 0; y < height; y += height/5){
      stroke (50, 50, 50);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width , y);
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
    [40, 70],
    [70, 130],
    [90, 40],
    [110, 100],
    [140, 110],
    [160, 100],
    [150, 30]
  ];

  for (let i = 0; i < data.length; i++){
    
       var x = data[i][0];
       var y = data[i][1];
       fill(255, 255, 255);
       circle (x, height - y, 6) ; // 200 -y para q se dibuje apropiadamente
       textSize (7) ;
       text(x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
  }

  point0=[140,90];// punto consulta query

  
  fill(255,0,0);
  circle(point0[0], height-point0[1], 7);
  textSize(8);
  text(point0[0]+','+point0[1],point0[0]+5, height-point0[1]);

  console.log("Punto de consulta: "+point0);
  console.log(closest_point_brute_force(data, point0));

  var root = build_kdtree(data);
  //console.log(getHeight(root));
  //console.log( root.point );
  
  console.log(generate_dot(root));

  best1 = naive_closest_point(root, point0);
  
  console.log("naive_closest_point: " + best1.point);
 
  best2 = closest_point(root, point0);
  console.log("closest_point: " + best2.point);

  //knn
  nn=4 // numero de vecinos
  neight=KNN(data ,nn, point0);

  console.log("Puntos cercano según KNN: ")
  for (let n=0; n<nn; n++){
    console.log(neight[n].point);
  }
  

  console.log();
}