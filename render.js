
document.getElementById("container").innerHTML="";
 var i,j,k,i1,max=0,data1=[],data2=[],tool_text1=[],tool_text2=[],text,length,div,block_size,face_set=[],points_set,pallete=[],height=[],tool_tip,flag=1,m=1,line,cursor_enabled_bar=1,cursor_enabled_line=1;
 pallete=["270-#9370db:5-#483d8b:95","180-#9370db:5-#483d8b:95","#483d8b"];
  Raphael.fn.path_generator=function(x1,y1,x2,y2,hgt){
  var path="M"+x1+","+y1+" L"+x2+","+y2+" L"+x2+","+(y2-hgt)+" L"+x1+","+(y1-hgt)+" z";
    return path;
}
var Chart=function(obj){
    this.render=function(){
       k=(Number(obj.height)-200)/5;
       var paper=new Raphael(obj.renderAt,Number(obj.width),Number(obj.height));
       var back_grnd=paper.rect(80,80,Number(obj.width)-130,Number(obj.height)-200).attr({fill:"0-#dcdcdc:5-#f8f8ff:95",opacity:0.3});
       for(i1=0;i1<5;i1++){
       var path=paper.path("M80,"+(80+k*i1)+"h"+(Number(obj.width)-130)).attr({"stroke-dasharray":"- ","stroke-width":0.6});
      }
      var base_top=paper.path("M80,"+(80+k*i1)+" L"+(80+Number(obj.width)-130)+","+(80+k*i1)+" L"+(80+Number(obj.width)-140)+","+(95+k*i1)+" L70,"+(95+k*i1)+" z");
      base_top.attr({fill:"360-#808080:5-#dcdcdc:95","stroke-width":0});
      var base_front=paper.path("M70,"+(95+k*i1)+" L"+(80+Number(obj.width)-140)+","+(95+k*i1)+" L"+(80+Number(obj.width)-140)+","+(110+k*i1)+" L70,"+(110+k*i1)+" z");
      base_front.attr({fill:"90-#808080:5-#dcdcdc:95","stroke-width":0});
      var base_right=paper.path("M"+(70+Number(obj.width)-130)+","+(110+k*i1)+" L"+(80+Number(obj.width)-140)+","+(95+k*i1)+" L"+(80+Number(obj.width)-130)+","+(80+k*i1)+" L"+(80+Number(obj.width)-130)+","+(95+k*i1)+" z");
      base_right.attr({fill:"#808080","stroke-width":0});
       length=obj.dataSource.dataset[0].data.length;
        for(i=0;i<length;i++){
          data1[i]=Number(obj.dataSource.dataset[0].data[i][Object.keys(obj.dataSource.dataset[0].data[i])[0]]);
          if(data1[i]>1000){
              tool_text1[i]=obj.dataSource.dataset[0].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+(data1[i]/1000).toFixed(2)+"K";    
            }
          else{
              tool_text1[i]=obj.dataSource.dataset[0].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+data1[i];    
          }
          if(data1[i]>max)
              max=data1[i];
          }
      div=max/5;
      block_size=(Number(obj.width)-130)/length;
      for(j=0;j<=5;j++){
              if(div*j==0)
              var left_calib=paper.text(75,(Number(obj.height)-120)-k*j,div*j).attr({"text-anchor":"end"});
              else
              var left_calib=paper.text(75,(Number(obj.height)-120)-k*j,(div*j/1000).toFixed(2)+"K").attr({"text-anchor":"end"});
            }
      for(i=0;i<length;i++){
         face_set[i]=paper.set();
          height[i]=(data1[i]/max)*(Number(obj.height)-200);
          var front_face_path=paper.path_generator((80+block_size*i)+5,(Number(obj.height)-105),80+block_size*i+5+block_size-20,(Number(obj.height)-105),0);
          var front_face=paper.path(front_face_path);
     
          front_face.attr({fill:pallete[0],"stroke-width":0});
          front_face.data("number",i);
          height[i]=(data1[i]/max)*(Number(obj.height)-200);
          var top_face=paper.path("M"+((80+block_size*i)+5)+","+(Number(obj.height)-105)+
                       " L"+((80+block_size*i)+15)+","+(Number(obj.height)-120)+
                       " L"+((80+block_size*i)+15+block_size-20)+","+(Number(obj.height)-120)+
                       " L"+((80+block_size*i)+5+block_size-20)+","+(Number(obj.height)-105)+" z");
          top_face.attr({fill:pallete[1],"stroke-width":0});
          top_face.data("number",i);
          height[i]=(data1[i]/max)*(Number(obj.height)-200);
          var side_face_path=paper.path_generator(((80+block_size*i)+5+block_size-20),(Number(obj.height)-105),((80+block_size*i)+15+block_size-20),(Number(obj.height)-120),0);
          var side_face=paper.path(side_face_path);
          side_face.attr({fill:pallete[2],"stroke-width":0});
          side_face.data("number",i);
          face_set[i].push(front_face,top_face,side_face);  
         
       }

          for(i=0;i<length;i++){
          var front_face_path=paper.path_generator((80+block_size*i)+5,(Number(obj.height)-105),80+block_size*i+5+block_size-20,(Number(obj.height)-105),height[i]);
          var anim_front=Raphael.animation({path:front_face_path},1000);
          face_set[i][0].animate(anim_front);
          var anim_top=Raphael.animation({transform:"T0,"+-height[i]},1000);
          face_set[i][1].animate(anim_top);
          var side_face_path=paper.path_generator(((80+block_size*i)+5+block_size-20),(Number(obj.height)-105),((80+block_size*i)+15+block_size-20),(Number(obj.height)-120),height[i]);
           var anim_side=Raphael.animation({path:side_face_path},1000);
            face_set[i][2].animate(anim_side);
          face_set[i].mouseover(function(e){
              if(cursor_enabled_bar){
              if(flag){
                  if((e.clientX+130)>Number(obj.width)){
                     tool_tip=paper.rect((e.clientX)-105,e.clientY,130,20,3).attr({fill:"black",opacity:0.8});
                     text=paper.text((e.clientX)-100,e.clientY+10,tool_text1[this.attr("cx")]).attr({fill:"white","text-anchor":"start"});
                     m=1;
                    }
                 else{
                 tool_tip=paper.rect((e.clientX)+5,e.clientY,130,20,3).attr({fill:"black",opacity:0.8});
                     text=paper.text((e.clientX)+10,e.clientY+10,tool_text1[this.attr("cx")]).attr({fill:"white","text-anchor":"start"});
                 m=0;
                   }                 
               flag=0;
              }
            
              j=this.data("number");
            face_set[j].attr({fill:"blue",opacity:0.5});
             }
            }).mouseout(function(){
              if(cursor_enabled_bar){
              face_set[j][0].attr({fill:pallete[0]});
              face_set[j][1].attr({fill:pallete[1]});
              face_set[j][2].attr({fill:pallete[2],opacity:1});
              tool_tip.remove();
              text.remove();
              flag=1;
          }
          }).mousemove(function(e){
              if(cursor_enabled_bar){
              if(m==1){
              tool_tip.attr("x",(e.clientX)-105);
              tool_tip.attr("y",e.clientY);
              text.attr("x",(e.clientX)-100);
              text.attr("y",(e.clientY)+10);
             }
             else{
              tool_tip.attr("x",e.clientX);
              tool_tip.attr("y",e.clientY);
              text.attr("x",(e.clientX)+5);
              text.attr("y",(e.clientY)+10);
              }  
          }
          });
        }
        //---------------------------------------------------------------------------------------------------------------
        points_set=paper.set();
        for(i=0;i<length;i++){
           data2[i]=Number(obj.dataSource.dataset[1].data[i][Object.keys(obj.dataSource.dataset[1].data[i])[0]]);
           }
        div=Number(obj.dataSource.chart.sYAxisMaxValue)/5;
        for(j=0;j<=5;j++){
               var right_calib=paper.text(Number(obj.width)-45,(Number(obj.height)-120)-k*j,div*j).attr({"text-anchor":"start"});
            }
          
           line="M"+(75+block_size/2)+","+(Number(obj.height)-120-(data2[0]/Number(obj.dataSource.chart.sYAxisMaxValue))*(Number(obj.height)-200));
           for(i=1;i<length;i++){
                line+=" L"+(75+block_size*i+block_size/2)+","+(Number(obj.height)-120-(data2[i]/(Number(obj.dataSource.chart.sYAxisMaxValue)))*(Number(obj.height)-200));
           }
           var line_graph=paper.path("M"+(75+block_size/2)+","+(Number(obj.height)-120-(data2[0]/(Number(obj.dataSource.chart.sYAxisMaxValue)))*(Number(obj.height)-200))).attr({stroke:"#32cd32","stroke-width":2});
           var line_anim=Raphael.animation({path:line},1500,"elastic");
           line_graph.animate(line_anim);
           for(i=0;i<length;i++){
                var point=paper.circle(75+block_size*i+block_size/2,Number(obj.height)-120-(data2[i]/(Number(obj.dataSource.chart.sYAxisMaxValue)))*(Number(obj.height)-200),3).attr({fill:"white",opacity:0});
                tool_text2[i]=obj.dataSource.dataset[1].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+data2[i];    
                points_set.push(point);
                point.data("number",i);
                var base_calib=paper.text(65+block_size*i+block_size/2,Number(obj.height)-85,obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]).attr({"text-anchor":"start"});;
             }
             var points_show=function(){
                 points_set.attr({opacity:1});
             };
             setTimeout(points_show,1500);
             points_set.mouseover(function(e){
                if(cursor_enabled_line){
                 this.attr("transform","S2,2");
                  if(flag){
                  if((e.clientX+120)>Number(obj.width)){
                     tool_tip=paper.rect((e.clientX)-105,e.clientY,120,20,3).attr({fill:"black",opacity:0.8});
                     text=paper.text((e.clientX)-95,e.clientY+10,tool_text2[this.data("number")]).attr({fill:"white","text-anchor":"start"});
                     m=1;
                    }
                 else{
                 tool_tip=paper.rect((e.clientX)+5,e.clientY,120,20,3).attr({fill:"black",opacity:0.8});
                 text=paper.text((e.clientX)+15,e.clientY+10,tool_text2[this.data("number")]).attr({fill:"white","text-anchor":"start"});
                 m=0;
                   }                 
               flag=0;
              }
              }
             }).mouseout(function(){
                 if(cursor_enabled_line){
                 this.attr("transform","");
                  tool_tip.remove();
                  text.remove();
                  flag=1;
              }
             });
      //-------------------------------------------------------------------------------------------------------------------
           var dx=80+(Number(obj.width)-130)/3;
           var legend_bar_rect1=paper.path("M"+dx+","+((Number(obj.height)-120)+90)+" L"+dx+","+((Number(obj.height)-120)+75)+" L"+(dx+5)+","+((Number(obj.height)-120)+75)+" L"+(dx+5)+","+((Number(obj.height)-120)+90)+" z").attr({fill:"#6a5acd","stroke-width":0});
           var legend_bar_rect2=paper.path("M"+(dx+6)+","+((Number(obj.height)-120)+90)+" L"+(dx+6)+","+((Number(obj.height)-120)+70)+" L"+(dx+11)+","+((Number(obj.height)-120)+70)+" L"+(dx+11)+","+((Number(obj.height)-120)+90)+" z").attr({fill:"#6a5acd","stroke-width":0});
           var legend_bar_rect3=paper.path("M"+(dx+12)+","+((Number(obj.height)-120)+90)+" L"+(dx+12)+","+((Number(obj.height)-120)+80)+" L"+(dx+17)+","+((Number(obj.height)-120)+80)+" L"+(dx+17)+","+((Number(obj.height)-120)+90)+" z").attr({fill:"#6a5acd","stroke-width":0});
           var legend_bar_text=paper.text((dx+21),((Number(obj.height)-120)+85),obj.dataSource.dataset[0].seriesName).attr({"text-anchor":"start","font-size":13});
           var bar_legend=paper.set(legend_bar_rect1,legend_bar_rect2,legend_bar_rect3,legend_bar_text);
           
           var legend_line_path=paper.path("M"+(dx+110)+","+((Number(obj.height)-120)+85)+"h30,0").attr({"stroke":"#32cd32","stroke-width":3});
           var legend_line_circle=paper.circle((dx+125),((Number(obj.height)-120)+85),5).attr({fill:"white"});
           var legend_line_text=paper.text((dx+142),((Number(obj.height)-120)+85),obj.dataSource.dataset[1].seriesName).attr({"text-anchor":"start","font-size":13});
           var line_legend=paper.set(legend_line_path,legend_line_circle,legend_line_text);
           
           var f1=1,f2=1;
           bar_legend.click(function(){
               if(f1==1){
                   for(i=0;i<length;i++){
                       for(j=0;j<3;j++){
                           face_set[i][j].attr({fill:"blue",opacity:0});
                       }
                      }
                   bar_legend.attr({fill:"#c0c0c0"});
                   f1=0;
                   cursor_enabled_bar=0;
               }
               else{
                    for(i=0;i<length;i++){
                       for(j=0;j<3;j++){
                           face_set[i][j].attr({fill:pallete[j],opacity:1});
                       }
                      }
                      bar_legend[0].attr({fill:"#6a5acd"});
                      bar_legend[1].attr({fill:"#6a5acd"});
                      bar_legend[2].attr({fill:"#6a5acd"});
                      bar_legend[3].attr({fill:"black"});
                      f1=1;
                      cursor_enabled_bar=1;
               }
           });
            line_legend.click(function(){
                if(f2==1){
                    points_set.attr({opacity:0,"stroke-width":0});
                    line_graph.attr({"stroke-width":0});
                    line_legend[0].attr({stroke:"#c0c0c0"});
                    line_legend[1].attr({fill:"#c0c0c0","stroke-width":0});
                    line_legend[2].attr({fill:"#c0c0c0"});
                     f2=0;
                     cursor_enabled_line=0;
                }
                else{
                    points_set.attr({opacity:1,"stroke-width":1});
                    line_graph.attr({"stroke-width":2});
                    line_legend[0].attr({stroke:"#32cd32"});
                    line_legend[1].attr({fill:"white","stroke-width":1});
                    line_legend[2].attr({fill:"black"});
                     f2=1;
                     cursor_enabled_line=1;
                }
           
                
            });
            var sYAxisName=paper.text((Number(obj.width)-50)+40,80+(Number(obj.height)-200)/2,obj.dataSource.chart.sYAxisName).attr({"text-anchor":"middle","transform":"R90,"+((Number(obj.width)-50)+30)+","+(80+(Number(obj.height)-200)/2),"font-size":12,"font-weight":"bold"});
            var pYAxisName=paper.text(30,80+(Number(obj.height)-200)/2,obj.dataSource.chart.pYAxisName).attr({"text-anchor":"middle","transform":"R-90,30,"+(80+(Number(obj.height)-200)/2),"font-size":12,"font-weight":"bold"});
            var xAxisName=paper.text(80+(Number(obj.width)-130)/2,(Number(obj.height)-120)+55,obj.dataSource.chart.xAxisName).attr({"text-anchor":"middle","font-size":13,"font-weight":"bold"});
            var caption=paper.text(80+(Number(obj.width)-130)/2,20,obj.dataSource.chart.caption).attr({"text-anchor":"middle","font-size":Number(obj.dataSource.chart.captionFontSize),"font-weight":"bold"});;
            var caption=paper.text(80+(Number(obj.width)-130)/2,50,obj.dataSource.chart.subCaption).attr({"text-anchor":"middle","font-size":Number(obj.dataSource.chart.subcaptionFontSize)});;

      };
     
      }
      



