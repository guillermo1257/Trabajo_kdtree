k = 2;

class Node {
    constructor (point , axis ){
    this.point = point;
    this.left = null;
    this.right = null;
    this.axis = axis;
    }
}

function getHeight ( node ) {
    if (node == null)
        return -1;
    else
    {
        /* compute the depth of each subtree */
        let lDepth = getHeight(node.left);
        let rDepth = getHeight(node.right);

        /* use the larger one */
        if (lDepth > rDepth)
            return (lDepth + 1);
        else
            return (rDepth + 1);
    }
}

function generate_dot ( node ) 
{
    g = '';
    if(node !== null)
    {
        g += this.generate_dot(node.left);
        g += this.generate_dot(node.right);
       
        if (node.left)
            g +=  '"' + node.point  + '"'+ ' -> ' + '"' + node.left.point + '";'
        if (node.right)
            g +=  '"' + node.point  + '"'+ ' -> ' + '"' + node.right.point + '";'
        return g;    
    }
    else
    {
        //f = 'digraph G {' + g + '}';
        //console.log(f); 
        return '';
    }
}

function build_kdtree(points, depth = 0){
    var n = points.length;
    var axis = depth % k;
    
    
    if (n <= 0){
        return null;
        }
            if (n == 1){
            return new Node(points[0], axis)
    }
    
    var median = Math.floor(points.length / 2);
    
    // sort by the axis
    points.sort(function(a, b)
    {
        return a[axis] - b[axis];
    });
    //console.log(points);
    
    var left = points.slice(0, median);
    var right = points.slice(median + 1);
    
    //console.log(right);
    
    var node = new Node(points[median].slice(0, k), axis);
    node.left = build_kdtree(left, depth + 1);
    node.right = build_kdtree(right, depth + 1);
    
    return node;
}

function distanceSquared ( point1 , point2 ){
    var distance = 0;
    for (var i = 0; i < k; i ++)
        distance += Math.pow (( point1 [i] - point2 [i]) , 2) ;
    return Math.sqrt ( distance );
}

function closest_point_brute_force ( points , point) 
{
    dist_menor = 999999999999999;
    for (var i = 0; i < points.length; i ++)
    {
        point_t = points[i];
        dist = distanceSquared (point_t, point);
        if (dist < dist_menor)
        {
            dist_menor = dist;
        }
    }
    return dist_menor;
}
function naive_closest_point (node , point , depth = 0, best = null ) {}