
document.getElementById("container").innerHTML="";
 var i,j,k,i1,max,max1=0,max2=0,data1=[],data2=[],tool_text1=[],tool_text2=[],text,length,div,block_size,face_set=[],points_set,pallete=[],height=[],tool_tip,flag=1,m=1,line,cursor_enabled_bar=1,cursor_enabled_line=1;
 pallete=["270-#9370db:5-#483d8b:95","180-#9370db:5-#483d8b:95","#483d8b"],
 pallete2=["270-#ffcc66:5-#ff9933:95","180-#ffcc66:5-#ff9933:95","#ff9933"];
 pallete3=["270-#9999ff:5-#483d8b:95","180-#9999ff:5-#483d8b:95","#483d8b"];
 pallete4=["270-#ffcc99:5-#ff9933:95","180-#ffcc99:5-#ff9933:95","#ff9933"];
  Raphael.fn.path_generator=function(x1,y1,x2,y2,hgt){
  var path="M"+x1+","+y1+" L"+x2+","+y2+" L"+x2+","+(y2-hgt)+" L"+x1+","+(y1-hgt)+" z";
    return path;
}

    Render=function(){
     var obj=arguments[0];
     obj=JSON.parse(obj);
     console.log(typeof obj);
       k=(Number(obj.height)-200)/5;
       var paper=new Raphael(obj.renderAt,Number(obj.width),2*Number(obj.height));
       var back_grnd=paper.rect(80,80,Number(obj.width)-130,(Number(obj.height)-200)).attr({fill:"0-#dcdcdc:5-#f8f8ff:95",opacity:0.3});
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
          if(data1[i]>max1)
              max1=data1[i];
          }
        for(i=0;i<length;i++){
           data2[i]=Number(obj.dataSource.dataset[1].data[i][Object.keys(obj.dataSource.dataset[1].data[i])[0]]);
            if(data2[i]>1000){
              tool_text2[i]=obj.dataSource.dataset[1].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+(data2[i]/1000).toFixed(2)+"K";    
             // obj.dataSource.dataset[1].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+data2[i]
            }
          else{
              tool_text2[i]=obj.dataSource.dataset[1].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+data2[i];    
          }
           if(data2[i]>max2)
              max2=data2[i];
           }
           max=(max1>max2?max1:max2);
      div=max/5;
      block_size=(Number(obj.width)-130)/length;
      for(j=0;j<=5;j++){
              if(div*j==0){
              var left_calib_up=paper.text(75,(Number(obj.height)-120)-k*j,div*j).attr({"text-anchor":"end"});
              }
              else{
              var left_calib_up=paper.text(75,(Number(obj.height)-120)-k*j,(div*j/1000).toFixed(2)+"K").attr({"text-anchor":"end"});
              }
             // if(div*j!=0){
              //var left_calib_down=paper.text(75,(Number(obj.height)-120)+k*j,"-"+(div*j/1000).toFixed(2)+"K").attr({"text-anchor":"end"});
             // }
            }
  //---------------**********************************************************************************************************

     for(i=0;i<length;i++){
         face_set[i]=paper.set();
          height[i]=(data1[i]/max)*(Number(obj.height)-200);
          var front_face_path=paper.path_generator((75+block_size*i)+5,(Number(obj.height)-105),75+block_size*i+5+block_size/2-10,(Number(obj.height)-105),0);
          var front_face=paper.path(front_face_path);
          front_face.attr({fill:pallete[0],"stroke-width":0});
          front_face.node.setAttribute("number",i);
          height[i]=(data1[i]/max)*(Number(obj.height)-200);
          var top_face=paper.path("M"+((75+block_size*i)+5)+","+(Number(obj.height)-105)+
                       " L"+((75+block_size*i)+15)+","+(Number(obj.height)-120)+
                       " L"+((75+block_size*i)+15+block_size/2-10)+","+(Number(obj.height)-120)+
                       " L"+((75+block_size*i)+5+block_size/2-10)+","+(Number(obj.height)-105)+" z");
          top_face.attr({fill:pallete[1],"stroke-width":0});
          top_face.node.setAttribute("number",i);
          height[i]=(data1[i]/max)*(Number(obj.height)-200);
          var side_face_path=paper.path_generator(((75+block_size*i)+5+block_size/2-10),(Number(obj.height)-105),((75+block_size*i)+15+block_size/2-10),(Number(obj.height)-120),0);
          var side_face=paper.path(side_face_path);
          side_face.attr({fill:pallete[2],"stroke-width":0});
          side_face.node.setAttribute("number",i);
          face_set[i].push(front_face,top_face,side_face);  
         
       }

          for(i=0;i<length;i++){
          var front_face_path=paper.path_generator((75+block_size*i)+5,(Number(obj.height)-105),75+block_size*i+5+block_size/2-10,(Number(obj.height)-105),height[i]);
          var anim_front=Raphael.animation({path:front_face_path},1000);
          face_set[i][0].animate(anim_front);
          var anim_top=Raphael.animation({transform:"T0,"+-height[i]},1000);
          face_set[i][1].animate(anim_top);
          var side_face_path=paper.path_generator(((75+block_size*i)+5+block_size/2-10),(Number(obj.height)-105),((75+block_size*i)+15+block_size/2-10),(Number(obj.height)-120),height[i]);
           var anim_side=Raphael.animation({path:side_face_path},1000);
            face_set[i][2].animate(anim_side);
          face_set[i].mouseover(function(e){
             // if(cursor_enabled_bar){
              if(flag){
                  console.log("in");
                  /*if((e.clientX+130)>Number(obj.width)){
                     tool_tip=paper.rect((e.clientX)-105,e.clientY,130,20,3).attr({fill:"black",opacity:0.8});
                     text=paper.text((e.clientX)-100,e.clientY+10,tool_text1[this.node.getAttribute("number")]).attr({fill:"white","text-anchor":"start"});
                     m=1;
                    }*/
                 //else{
                 tool_tip=paper.rect((e.pageX)-480,e.pageY,130,20,3).attr({fill:"black",opacity:0.8});
                     text=paper.text((e.pageX)-470,e.pageY+10,tool_text1[this.node.getAttribute("number")]).attr({fill:"white","text-anchor":"start"});
                 //m=0;
                   //}                 
               flag=0;
              }
            
              j=this.node.getAttribute("number");
              face_set[j][0].attr({fill:pallete3[0]});
              face_set[j][1].attr({fill:pallete3[1]});
              face_set[j][2].attr({fill:pallete3[2]});
            // }
            }).mousemove(function(ev){
             // if(cursor_enabled_bar){
              /*if(m==1){
              tool_tip.attr("x",(e.clientX)-105);
              tool_tip.attr("y",e.clientY);
              text.attr("x",(e.clientX)-100);
              text.attr("y",(e.clientY)+10);
             }*/
             //else{
              tool_tip.attr("x",ev.pageX-480);
              tool_tip.attr("y",ev.pageY);
              text.attr("x",(ev.pageX)-470);
              text.attr("y",(ev.pageY)+10);
             // }  
        //  }
          }).mouseout(function(){
                //console.log("out");
             // if(cursor_enabled_bar){
              face_set[j][0].attr({fill:pallete[0]});
              face_set[j][1].attr({fill:pallete[1]});
              face_set[j][2].attr({fill:pallete[2],opacity:1});
              tool_tip.remove();
              text.remove();
              flag=1;
         // }
        });
        }
        //-------*******************************************************************************************
        
       var height2=[],face_set2=[],j;
         /* for(i=0;i<length;i++){
           data2[i]=Number(obj.dataSource.dataset[1].data[i][Object.keys(obj.dataSource.dataset[1].data[i])[0]]);
            if(data2[i]>1000){
              tool_text2[i]=obj.dataSource.dataset[1].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+(data2[i]/1000).toFixed(2)+"K";    
             // obj.dataSource.dataset[1].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+data2[i]
            }
          else{
              tool_text2[i]=obj.dataSource.dataset[1].seriesName+" , "+obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]+" , "+data2[i];    
          }
           if(data2[i]>max2)
              max2=data2[i];
           }*/
        for(i=0;i<length;i++){
         face_set2[i]=paper.set();
          height2[i]=(data2[i]/max)*(Number(obj.height)-200);
          var front_face_path2=paper.path_generator(80+block_size*i+5+block_size/2-10,(Number(obj.height)-105),80+block_size*i+5+block_size-20,(Number(obj.height)-105),0);
          var front_face2=paper.path(front_face_path2);
          front_face2.attr({fill:pallete2[0],"stroke-width":0});
          front_face2.node.setAttribute("number",i);
          height2[i]=(data2[i]/max)*(Number(obj.height)-200);
          var top_face2=paper.path("M"+((80+block_size*i)+5+block_size/2-10)+","+(Number(obj.height)-105)+
                       " L"+((80+block_size*i)+15+block_size/2-10)+","+(Number(obj.height)-120)+
                       " L"+((80+block_size*i)+15+block_size-20)+","+(Number(obj.height)-120)+
                       " L"+((80+block_size*i)+5+block_size-20)+","+(Number(obj.height)-105)+" z");
          top_face2.attr({fill:pallete2[1],"stroke-width":0});
          top_face2.node.setAttribute("number",i);
          height2[i]=(data2[i]/max)*(Number(obj.height)-200);
          var side_face_path2=paper.path_generator(((80+block_size*i)+5+block_size-20),(Number(obj.height)-105),((80+block_size*i)+15+block_size-20),(Number(obj.height)-120),0);
          var side_face2=paper.path(side_face_path2);
          side_face2.attr({fill:pallete2[2],"stroke-width":0});
          side_face2.node.setAttribute("number",i);
          face_set2[i].push(front_face2,top_face2,side_face2);  
         
       }

          for(i=0;i<length;i++){
          var front_face_path2=paper.path_generator(80+block_size*i+5+block_size/2-10,(Number(obj.height)-105),80+block_size*i+5+block_size-20,(Number(obj.height)-105),height2[i]);
          var anim_front2=Raphael.animation({path:front_face_path2},1000);
          face_set2[i][0].animate(anim_front2);
          var anim_top2=Raphael.animation({transform:"T0,"+-height2[i]},1000);
          face_set2[i][1].animate(anim_top2);
          var side_face_path2=paper.path_generator(((80+block_size*i)+5+block_size-20),(Number(obj.height)-105),((80+block_size*i)+15+block_size-20),(Number(obj.height)-120),height2[i]);
           var anim_side2=Raphael.animation({path:side_face_path2},1000);
            face_set2[i][2].animate(anim_side2);
          face_set2[i].mouseover(function(e){
             // if(cursor_enabled_bar){
              if(flag){
                 /* if((e.clientX+130)>Number(obj.width)){
                     tool_tip=paper.rect((e.clientX)-105,e.clientY,130,20,3).attr({fill:"black",opacity:0.8});
                     text=paper.text((e.clientX)-100,e.clientY+10,tool_text2[this.node.getAttribute("number")]).attr({fill:"white","text-anchor":"start"});
                     m=1;
                    }*/
                 //else{
                 tool_tip=paper.rect((e.pageX)-480,e.pageY,130,20,3).attr({fill:"black",opacity:0.8});
                     text=paper.text((e.pageX)-470,e.pageY+10,tool_text2[this.node.getAttribute("number")]).attr({fill:"white","text-anchor":"start"});
                 //m=0;
                  // }                 
               flag=0;
              }
            
              j=this.node.getAttribute("number");
             // console.log(j);
            face_set2[j][0].attr({fill:pallete4[0]});
              face_set2[j][1].attr({fill:pallete4[1]});
              face_set2[j][2].attr({fill:pallete4[2],opacity:1});
            // }
            }).mouseout(function(){
              //if(cursor_enabled_bar){
              face_set2[j][0].attr({fill:pallete2[0]});
              face_set2[j][1].attr({fill:pallete2[1]});
              face_set2[j][2].attr({fill:pallete2[2],opacity:1});
              tool_tip.remove();
              text.remove();
              flag=1;
          //}
          }).mousemove(function(e){
              if(cursor_enabled_bar){
             /* if(m==1){
              tool_tip.attr("x",(e.clientX)-105);
              tool_tip.attr("y",e.clientY);
              text.attr("x",(e.clientX)-100);
              text.attr("y",(e.clientY)+10);
             }*/
             //else{
              tool_tip.attr("x",e.clientX-480);
              tool_tip.attr("y",e.clientY);
              text.attr("x",(e.clientX)-470);
              text.attr("y",(e.clientY)+10);
             // }  
          }
          });
        }
        //--------------------------------------------------------------------------------------
           var dx=80+(Number(obj.width)-130)/3;
           var legend_bar_rect1=paper.path("M"+(dx-10)+","+(Number(obj.height)-55)+" L"+(dx-10)+","+(Number(obj.height)-70)+" L"+(dx-5)+","+(Number(obj.height)-70)+" L"+(dx-5)+","+(Number(obj.height)-55)+" z").attr({fill:"#6a5acd","stroke-width":0});
           var legend_bar_rect2=paper.path("M"+(dx-4)+","+(Number(obj.height)-55)+" L"+(dx-4)+","+(Number(obj.height)-75)+" L"+(dx+1)+","+(Number(obj.height)-75)+" L"+(dx+1)+","+(Number(obj.height)-55)+" z").attr({fill:"#6a5acd","stroke-width":0});
           var legend_bar_rect3=paper.path("M"+(dx+2)+","+(Number(obj.height)-55)+" L"+(dx+2)+","+(Number(obj.height)-65)+" L"+(dx+7)+","+(Number(obj.height)-65)+" L"+(dx+7)+","+(Number(obj.height)-55)+" z").attr({fill:"#6a5acd","stroke-width":0});
           var legend_bar_text=paper.text((dx+11),(Number(obj.height)-60),obj.dataSource.dataset[0].seriesName).attr({"text-anchor":"start","font-size":13});
           var bar_legend=paper.set(legend_bar_rect1,legend_bar_rect2,legend_bar_rect3,legend_bar_text);
           
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
           
          
          
          
          
          
          
          
           var legend_bar2_rect1=paper.path("M"+(dx+90)+","+(Number(obj.height)-55)+" L"+(dx+90)+","+(Number(obj.height)-70)+" L"+(dx+95)+","+(Number(obj.height)-70)+" L"+(dx+95)+","+(Number(obj.height)-55)+" z").attr({fill:"#ffa550","stroke-width":0});
           var legend_bar2_rect2=paper.path("M"+(dx+96)+","+(Number(obj.height)-55)+" L"+(dx+96)+","+(Number(obj.height)-75)+" L"+(dx+101)+","+(Number(obj.height)-75)+" L"+(dx+101)+","+(Number(obj.height)-55)+" z").attr({fill:"#ffa550","stroke-width":0});
           var legend_bar2_rect3=paper.path("M"+(dx+102)+","+(Number(obj.height)-55)+" L"+(dx+102)+","+(Number(obj.height)-65)+" L"+(dx+107)+","+(Number(obj.height)-65)+" L"+(dx+107)+","+(Number(obj.height)-55)+" z").attr({fill:"#ffa550","stroke-width":0});
           var legend_bar2_text=paper.text((dx+109),(Number(obj.height)-60),obj.dataSource.dataset[1].seriesName).attr({"text-anchor":"start","font-size":13});
           var bar_legend2=paper.set(legend_bar2_rect1,legend_bar2_rect2,legend_bar2_rect3,legend_bar2_text);

           var f12=1,f22=1;
           bar_legend2.click(function(){
               if(f12==1){
                   for(i=0;i<length;i++){
                       for(j=0;j<3;j++){
                           face_set2[i][j].attr({fill:"yellow",opacity:0});
                       }
                      }
                   bar_legend2.attr({fill:"#c0c0c0"});
                   f12=0;
                   cursor_enabled_bar=0;
               }
               else{
                    for(i=0;i<length;i++){
                       for(j=0;j<3;j++){
                           face_set2[i][j].attr({fill:pallete2[j],opacity:1});
                       }
                      }
                      bar_legend2[0].attr({fill:"#ffa550"});
                      bar_legend2[1].attr({fill:"#ffa550"});
                      bar_legend2[2].attr({fill:"#ffa550"});
                      bar_legend2[3].attr({fill:"black"});
                      f12=1;
                      cursor_enabled_bar=1;
               }
           });
        //--------------------------------------------------------------------------------------
          for(var i=0;i<length;i++){
          var base_calib=paper.text(65+block_size*i+block_size/2,Number(obj.height)-85,obj.dataSource.categories[0].category[i][Object.keys(obj.dataSource.categories[0].category[i])[0]]).attr({"text-anchor":"start"});;
          }
            var caption=paper.text(80+(Number(obj.width)-130)/2,20,obj.dataSource.chart.caption).attr({"text-anchor":"middle","font-size":Number(obj.dataSource.chart.captionFontSize),"font-weight":"bold"});;
            var caption=paper.text(80+(Number(obj.width)-130)/2,50,obj.dataSource.chart.subCaption).attr({"text-anchor":"middle","font-size":Number(obj.dataSource.chart.subcaptionFontSize)});;

      };
     
      
      


