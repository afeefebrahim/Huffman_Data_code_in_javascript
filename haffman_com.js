function freq (l){
   var fr={}
   for(var i=0; i<(l.length);i++){
       if(l[i] in fr)
	  fr[l[i]]=fr[l[i]]+1;
       else
	  fr[l[i]]=1;
       }
   return fr
   }

function sortfreq(freqs){
   var letters = Object.keys(freqs)
   var tuples = [];
   for(var i = 0; i <letters.length;i++){
	tuples[i]= [freqs[letters[i]],letters[i]];
    }
   tuples.sort(sorted)
   return tuples
}

function buildTree(tuples){
     
    while (tuples.length >1 ){
	var leasttwo = tuples.slice(0,2)
	the_rest = tuples.slice(2,tuples.lenght);
	var combi_freq = leasttwo[0][0] + leasttwo[1][0]
	//var combi = [[combi_freq,leasttwo]]
        tuples = the_rest.concat([[combi_freq,leasttwo]])
	//tuples.push(combi)
	//tuples.push(the_rest)
	tuples.sort(sorted)	
	
	}
       return tuples[0]
}


function sorted(a,b){
    return a[0]-b[0]
}

function trimtree(tree){
     var p = tree[1];
     if(typeof(p) == typeof(" ")){
	return p
     }else{
        return Array(trimtree(p[0]),trimtree(p[1]))
     }
} 

var codes = {}

function assigncodes(node,pat){
    if( typeof(node) == typeof("")){
          codes[node] = pat;
     }else{
          assigncodes(node[0],pat+"0")
	  assigncodes(node[1],pat+"1")
     }
}
function encode(str){
   output = " "
   for (i in str){
     output += codes[str[i]]
    }
   return output
}
function decode(tree,str){
   output = ""
   p = tree
   for (i in str){
       if(str[i] == 0){
            p = p[0]
       }else{
            p = p[1]
	}
       if(typeof(p) == typeof(" ")){
             output += p
	     p = tree
	}
   }
   return output
}

fr =freq("aaabccdeeeeeffg");
console.log('frequency' , fr);


var srt = sortfreq(fr)
console.log(srt);

var dtree = buildTree(srt)
console.log('buildtree is',dtree);
var tree =trimtree(dtree)
console.log('trimtree is',tree)
assigncodes(tree,"")
var enc = encode("aaabccdeeeeeffg")
console.log("encoded code",enc)
var denc = decode(tree,enc)
console.log("decoded string",denc)
