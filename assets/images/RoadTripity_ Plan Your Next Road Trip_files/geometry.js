google.maps.__gjsload__('geometry', function(_){var ix=function(a,b){return Math.abs(_.Fb(b-a,-180,180))},jx=function(a,b,c,d,e){if(!d){c=ix(a.lng(),c)/ix(a.lng(),b.lng());if(!e)return e=Math.sin(_.yb(a.lat())),e=Math.log((1+e)/(1-e))/2,b=Math.sin(_.yb(b.lat())),_.zb(2*Math.atan(Math.exp(e+c*(Math.log((1+b)/(1-b))/2-e)))-Math.PI/2);a=e.fromLatLngToPoint(a);b=e.fromLatLngToPoint(b);return e.fromPointToLatLng(new _.y(a.x+c*(b.x-a.x),a.y+c*(b.y-a.y))).lat()}e=_.yb(a.lat());a=_.yb(a.lng());d=_.yb(b.lat());b=_.yb(b.lng());c=_.yb(c);return _.Fb(_.zb(Math.atan2(Math.sin(e)*
Math.cos(d)*Math.sin(c-b)-Math.sin(d)*Math.cos(e)*Math.sin(c-a),Math.cos(e)*Math.cos(d)*Math.sin(a-b))),-90,90)},kx=_.k(),lx={containsLocation:function(a,b){var c=_.Fb(a.lng(),-180,180),d=!!b.get("geodesic"),e=b.get("latLngs"),f=b.get("map");f=!d&&f?f.getProjection():null;for(var g=!1,h=0,l=e.getLength();h<l;++h)for(var n=e.getAt(h),q=0,r=n.getLength();q<r;++q){var u=n.getAt(q),B=n.getAt((q+1)%r),w=_.Fb(u.lng(),-180,180),C=_.Fb(B.lng(),-180,180),A=Math.max(w,C);w=Math.min(w,C);(180<A-w?c>=A||c<w:
c<A&&c>=w)&&jx(u,B,c,d,f)<a.lat()&&(g=!g)}return g||lx.isLocationOnEdge(a,b)},isLocationOnEdge:function(a,b,c){c=c||1E-9;var d=_.Fb(a.lng(),-180,180),e=b instanceof _.Kg,f=!!b.get("geodesic"),g=b.get("latLngs");b=b.get("map");b=!f&&b?b.getProjection():null;for(var h=0,l=g.getLength();h<l;++h)for(var n=g.getAt(h),q=n.getLength(),r=e?q:q-1,u=0;u<r;++u){var B=n.getAt(u),w=n.getAt((u+1)%q),C=_.Fb(B.lng(),-180,180),A=_.Fb(w.lng(),-180,180),E=Math.max(C,A),I=Math.min(C,A);if(C=1E-9>=Math.abs(_.Fb(C-A,-180,
180))&&(Math.abs(_.Fb(C-d,-180,180))<=c||Math.abs(_.Fb(A-d,-180,180))<=c)){C=a.lat();A=Math.min(B.lat(),w.lat())-c;var H=Math.max(B.lat(),w.lat())+c;C=C>=A&&C<=H}if(C)return!0;if(180<E-I?d+c>=E||d-c<=I:d+c>=I&&d-c<=E)if(B=jx(B,w,d,f,b),Math.abs(B-a.lat())<c)return!0}return!1}};var mx={computeHeading:function(a,b){var c=_.vc(a),d=_.wc(a);a=_.vc(b);b=_.wc(b)-d;return _.Fb(_.zb(Math.atan2(Math.sin(b)*Math.cos(a),Math.cos(c)*Math.sin(a)-Math.sin(c)*Math.cos(a)*Math.cos(b))),-180,180)},computeOffset:function(a,b,c,d){b/=d||6378137;c=_.yb(c);var e=_.vc(a);a=_.wc(a);d=Math.cos(b);b=Math.sin(b);var f=Math.sin(e);e=Math.cos(e);var g=d*f+b*e*Math.cos(c);return new _.D(_.zb(Math.asin(g)),_.zb(a+Math.atan2(b*e*Math.sin(c),d-f*g)))},computeOffsetOrigin:function(a,b,c,d){c=_.yb(c);b/=
d||6378137;d=Math.cos(b);var e=Math.sin(b)*Math.cos(c);b=Math.sin(b)*Math.sin(c);c=Math.sin(_.vc(a));var f=e*e*d*d+d*d*d*d-d*d*c*c;if(0>f)return null;var g=e*c+Math.sqrt(f);g/=d*d+e*e;var h=(c-e*g)/d;g=Math.atan2(h,g);if(g<-Math.PI/2||g>Math.PI/2)g=e*c-Math.sqrt(f),g=Math.atan2(h,g/(d*d+e*e));if(g<-Math.PI/2||g>Math.PI/2)return null;a=_.wc(a)-Math.atan2(b,d*Math.cos(g)-e*Math.sin(g));return new _.D(_.zb(g),_.zb(a))},interpolate:function(a,b,c){var d=_.vc(a),e=_.wc(a),f=_.vc(b),g=_.wc(b),h=Math.cos(d),
l=Math.cos(f);b=mx.cf(a,b);var n=Math.sin(b);if(1E-6>n)return new _.D(a.lat(),a.lng());a=Math.sin((1-c)*b)/n;c=Math.sin(c*b)/n;b=a*h*Math.cos(e)+c*l*Math.cos(g);e=a*h*Math.sin(e)+c*l*Math.sin(g);return new _.D(_.zb(Math.atan2(a*Math.sin(d)+c*Math.sin(f),Math.sqrt(b*b+e*e))),_.zb(Math.atan2(e,b)))},cf:function(a,b){var c=_.vc(a);a=_.wc(a);var d=_.vc(b);b=_.wc(b);return 2*Math.asin(Math.sqrt(Math.pow(Math.sin((c-d)/2),2)+Math.cos(c)*Math.cos(d)*Math.pow(Math.sin((a-b)/2),2)))},computeDistanceBetween:function(a,
b,c){c=c||6378137;return mx.cf(a,b)*c},computeLength:function(a,b){b=b||6378137;var c=0;a instanceof _.cd&&(a=a.getArray());for(var d=0,e=a.length-1;d<e;++d)c+=mx.computeDistanceBetween(a[d],a[d+1],b);return c},computeArea:function(a,b){return Math.abs(mx.computeSignedArea(a,b))},computeSignedArea:function(a,b){b=b||6378137;a instanceof _.cd&&(a=a.getArray());for(var c=a[0],d=0,e=1,f=a.length-1;e<f;++e)d+=mx.fl(c,a[e],a[e+1]);return d*b*b},fl:function(a,b,c){return mx.il(a,b,c)*mx.hm(a,b,c)},il:function(a,
b,c){var d=[a,b,c,a];a=[];for(c=b=0;3>c;++c)a[c]=mx.cf(d[c],d[c+1]),b+=a[c];b/=2;d=Math.tan(b/2);for(c=0;3>c;++c)d*=Math.tan((b-a[c])/2);return 4*Math.atan(Math.sqrt(Math.abs(d)))},hm:function(a,b,c){a=[a,b,c];b=[];for(c=0;3>c;++c){var d=a[c],e=_.vc(d);d=_.wc(d);var f=b[c]=[];f[0]=Math.cos(e)*Math.cos(d);f[1]=Math.cos(e)*Math.sin(d);f[2]=Math.sin(e)}return 0<b[0][0]*b[1][1]*b[2][2]+b[1][0]*b[2][1]*b[0][2]+b[2][0]*b[0][1]*b[1][2]-b[0][0]*b[2][1]*b[1][2]-b[1][0]*b[0][1]*b[2][2]-b[2][0]*b[1][1]*b[0][2]?
1:-1}};var nx={decodePath:function(a){for(var b=_.Ab(a),c=Array(Math.floor(a.length/2)),d=0,e=0,f=0,g=0;d<b;++g){var h=1,l=0;do{var n=a.charCodeAt(d++)-63-1;h+=n<<l;l+=5}while(31<=n);e+=h&1?~(h>>1):h>>1;h=1;l=0;do n=a.charCodeAt(d++)-63-1,h+=n<<l,l+=5;while(31<=n);f+=h&1?~(h>>1):h>>1;c[g]=new _.D(1E-5*e,1E-5*f,!0)}c.length=g;return c},encodePath:function(a){a instanceof _.cd&&(a=a.getArray());return nx.Bn(a,function(a){return[Math.round(1E5*a.lat()),Math.round(1E5*a.lng())]})},Bn:function(a,b){for(var c=
[],d=[0,0],e,f=0,g=_.Ab(a);f<g;++f)e=b?b(a[f]):a[f],nx.ki(e[0]-d[0],c),nx.ki(e[1]-d[1],c),d=e;return c.join("")},ki:function(a,b){return nx.Cn(0>a?~(a<<1):a<<1,b)},Cn:function(a,b){for(;32<=a;)b.push(String.fromCharCode((32|a&31)+63)),a>>=5;b.push(String.fromCharCode(a+63));return b}};_.mb.google.maps.geometry={encoding:nx,spherical:mx,poly:lx};_.m=kx.prototype;_.m.decodePath=nx.decodePath;_.m.encodePath=nx.encodePath;_.m.computeDistanceBetween=mx.computeDistanceBetween;_.m.interpolate=mx.interpolate;_.m.computeHeading=mx.computeHeading;_.m.computeOffset=mx.computeOffset;_.m.computeOffsetOrigin=mx.computeOffsetOrigin;_.je("geometry",new kx);});