angular.module("app").controller("lastestJobGraphController",["$scope","$http",function(a,b){"use strict";var c=new Date(Date.now());a._init=0;var d=new Array({second:10,code:"1e4"},{second:60,code:"6e4"},{second:300,code:"3e5"},{second:3600,code:"36e5"},{second:84600,code:"864e5"});a.init=function(a){var b=80;d3.json("http://"+CUBE_URL+"/1.0/metric/get"+"?expression=sum(got)"+"&start="+encodeURIComponent("2012-07-07T16:00:00Z")+"&stop="+encodeURIComponent(formatISO(c))+"&limit="+b+"&step="+d[0].code,function(c){function e(){m.domain([c[0].time,l(c[c.length-1].time)]),n.domain([0,d3.max(c.map(function(a){return a.value}))]);var a=p.selectAll("rect").data(c,function(a){return a.time});a.enter().insert("rect").call(q).attr("x",function(a){return m(l(a.time))}).attr("clip-path","url(#clip)").transition().duration(ANIMATION_DURATION).attr("x",function(a){return m(a.time)+i+2}),a.transition().duration(ANIMATION_DURATION).attr("clip-path","url(#clip)").call(r),a.exit().transition().duration(ANIMATION_DURATION).attr("x",function(a){return m(a.time)+j}).remove(),u.transition().duration(ANIMATION_DURATION).call(s),v.transition().duration(ANIMATION_DURATION).call(t)}var f={top:25,right:35,bottom:35,left:20},g=860-f.right-f.left,h=180-f.top-f.bottom,i=g/b-2,j=0,k=20,l=function(a){return a=new Date(a),new Date(a.setSeconds(a.getSeconds()+d[0].second))};c=c.map(function(a){return{time:new Date(a.time),value:a.value}}).slice(0,b);var m=d3.time.scale().domain([c[0].time,l(c[c.length-1].time)]).range([0,g]),n=d3.scale.linear().domain([0,d3.max(c.map(function(a){return a.value}))]).rangeRound([h,0]),o=d3.select("#lastest-jobs").append("svg").attr("class","chart").attr("width",g+f.left+f.right).attr("height",h+f.top+f.bottom).append("g").attr("transform","translate("+f.left+","+f.top+")");o.append("svg:clipPath").attr("id","clip").append("svg:rect").attr("width",g).attr("height",h),o.append("svg:text").attr("x",g).attr("y",-5).attr("text-anchor","end").text("jobs/10sec").attr("class","axis-legend"),o.append("svg:text").attr("x",g/2).attr("y",h+k+10).attr("text-anchor","middle").text("time").attr("class","axis-legend");var p=o.append("svg").attr("clip-path","url(#clip)").attr("class","bar-area"),q=function(b){b.attr("title",function(a){return a.value}).attr("data-target",".modal").on("click",function(b){a.viewJobs(b.time)}).call(r)},r=function(a){a.attr("x",function(a){return m(a.time)+j}).attr("y",function(a){return n(a.value)}).attr("width",i).attr("height",function(a){return h-n(a.value)})};p.selectAll("rect").data(c).enter().append("rect").call(q);var s=d3.svg.axis().scale(m).tickSubdivide(2).tickSize(6,3,0).orient("bottom"),t=d3.svg.axis().scale(n).tickSize(6,3,0).orient("right").ticks(4),u=o.append("g").attr("transform","translate(0,"+h+")").attr("class","x-axis").call(s),v=o.append("g").attr("class","y-axis").attr("transform","translate("+g+",0)").call(t),w=new WebSocket("ws://"+CUBE_URL+"/1.0/metric/get");w.onopen=function(){var a=l(c[c.length-1].time);w.send(JSON.stringify({expression:"sum(got)",start:a.toISOString(),stop:l(a).toISOString(),limit:1,step:d[0].code}))},w.onmessage=function(a){var b=JSON.parse(a.data);b.hasOwnProperty("value")&&(b.time=new Date(b.time),c.shift(),c.push(b),e(),setTimeout(function(){var a=l(c[c.length-1].time);w.send(JSON.stringify({expression:"sum(got)",start:a.toISOString(),stop:l(a).toISOString(),limit:1,step:d[0].code}))},1e3*d[0].second))},a._init=1})},a.jobs=[],a.init(a,b),a.jobmodal={_init:0,lastTime:null};var e=$("#job-details");a.viewJobs=function(b){e.modal("show"),a.jobmodal.lastTime=b,a.fillModal(b)},a.fillModal=function(c){var e=Date.parse(c)/1e3;b({method:"GET",url:"api/jobs/"+encodeURIComponent(e)+"/"+encodeURIComponent(e+d[0].second)}).success(function(b){a.jobs=b,a.jobmodal._init=1}).error(function(b,c){a.jobmodal._init=3,a.jobmodal._errorCode=c})},e.on("hide",function(){a.jobs=[],a.jobmodal={_init:0,lastTime:null}})}]);