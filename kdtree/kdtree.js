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
    g =  dot_nodes(node);
    return 'digraph G {' + g + '}';
}

function dot_nodes ( node ) 
{
    g = '';
    if(node !== null)
    {
        g += this.dot_nodes(node.left);
        g += this.dot_nodes(node.right);
       
        if (node.left)
            g +=  '"' + node.point  + '"'+ ' -> ' + '"' + node.left.point + '";'
        if (node.right)
            g +=  '"' + node.point  + '"'+ ' -> ' + '"' + node.right.point + '";'
        return g;    
    }
    else
    {
        return '';
    }
}


function build_kdtree(points, depth = 0){
    var n = points.length;
    var axis = depth % k;
    
    if (n <= 0){
        return null;
    }

    if (n == 1)
    {
        //stroke (Math.floor(Math.random() * 255) + 100 , Math.floor(Math.random() * 255) + 100  , Math.floor(Math.random() * 255) + 100) ;
        //line(points[0][0],0,points[0][0],width);

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
    
    stroke (Math.floor(Math.random() * 255) + 100 , Math.floor(Math.random() * 255) + 100  , Math.floor(Math.random() * 255) + 100) ;

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
    point_menor = [];
    for (var i = 0; i < points.length; i ++)
    {
        point_t = points[i];
        dist = distanceSquared (point_t, point);
        console.log(point_t + '|||' + dist);
        if (dist < dist_menor)
        {
            dist_menor = dist;
            point_menor = point_t;
        }
    }
    return point_menor;
}

function naive_closest_point (node , point , depth = 0, best = null ) 
{
	if (!node) 
        return best; 

    if(best==null || distanceSquared(best.point,point)>distanceSquared(node.point,point)){
        best = node;
    }

	if (node.point[node.axis] > point[node.axis])
	{
		if(node.left) 
            best = naive_closest_point(node.left,point,depth++,best);
	} 
	else
	{
		if(node.right) 
            best = naive_closest_point(node.right,point,depth++,best);
	}
	return best;
}


function closer_point(point,p1,p2)
{
	if(!p1) 
        return p2;
	if(!p2) 
        return p1;

	if(distanceSquared(point,p1.point) > distanceSquared(point,p2.point)) 
        return p2;
    else
	    return p1;
}

function closest_point(node,point_2,depth = 0)
{
	if (node == null) 
        return null; 
	var next_branch  = null;
	var opposite_branch  = null;
	if (node.point[node.axis] > point_2[node.axis])
	{
		next_branch  = node.left;
		opposite_branch  = node.right;
	} 
	else
	{
		next_branch  = node.right;
		opposite_branch  = node.left;
	}
	
	var best = closer_point(point_2,closer_point(point_2,closest_point(next_branch ,point_2,depth+1),node),best);
	
	if (distanceSquared(best.point,point_2) > Math.abs(point_2[node.axis] - node.point[node.axis]))
	{
		best2 = closer_point(point_2,closest_point(opposite_branch ,point_2,depth+1),node);
	}
	best = closer_point(point_2,best2,best);
	
	return best;	
}