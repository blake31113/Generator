/**
 * Created by ~~ on 2014/6/21.
 */
const constDisplayTextDisplayment=35;
function createFabricComponent(tempType,X,Y,Component)//create Fabric Component
{
    var img = new Image;
    img.src = listIconURL[Math.floor(tempType/10)-1][tempType%10];
    var fabricComponent=new fabric.Image(img,
    {
        top 	:Y,
        left 	:X,
        width	:72,
        height	:72,
        hasBorders:	false,
        hasControls:false
    });//add Image
    fabricComponent.MainComponent=Component;
    fabricComponent.setDisText=function()//Set Text
    {
        fabricComponent.displayText=new  fabric.Text(Component.componentName,
            {
                left: fabricComponent.left,
                top: fabricComponent.top+constDisplayTextDisplayment,
                fontSize: 20
            });
        canvas.add(fabricComponent.displayText);
        fabricComponent.displayText.selectable=false;
    }
    canvas.add(fabricComponent);
    fabricComponent.setDisText();
    return fabricComponent;
}
//Create Fabric Link
function createFabricLinkComponent(com1_fabricComponent,com2_fabricComponent,com1_fabricLinkComponent,com2_fabricLinkComponent,index)
{
    var coords=[ com1_fabricComponent.left, com1_fabricComponent.top,com2_fabricComponent.left, com2_fabricComponent.top ];
    var link=new fabric.Line(coords,
        {
            fill: '00FA80',
            stroke: '00FA80',
            strokeWidth: 5,
            selectable: false
        });
    link.setDisText=function()
    {
        link.displayText=new  fabric.Text(index.toString(),
            {
                left: (link.x1+link.x2)/2,
                top: (link.y1+link.y2)/2,
                fontSize: 20
            });
        canvas.add(link.displayText);
        link.displayText.selectable=false;
    }
    link.updateCoords=function()
    {
        link.displayText.left=(link.x1+link.x2)/2;
        link.displayText.top=(link.y1+link.y2)/2;
    }
    link.setDisText();
    canvas.add(link);
    canvas.sendToBack(link);
    return link;
}
//Move Component On Canvas
function moveImage(target)
{
    var p=target;
    var left= p.left;
    var top= p.top;
    p.displayText.left= left;
    p.displayText.top = top+constDisplayTextDisplayment;
    var diff_y1;
    var diff_x1;
    var diff_y2;
    var diff_x2;
    var diff=50;
    var NIC=p.MainComponent.NIC;
    for (var i = 0; i<NIC.length; i++)
    {
        if(NIC[i].fabricLinkComponent!=null)
        {
            diff_y1=top-NIC[i].fabricLinkComponent.y1;
            diff_x1=left-NIC[i].fabricLinkComponent.x1;
            diff_y2=top-NIC[i].fabricLinkComponent.y2;
            diff_x2=left-NIC[i].fabricLinkComponent.x2;
            if((diff_y1>-diff&&diff_y1<diff)&&(diff_x1>-diff&&diff_x1<diff))
            {
                NIC[i].fabricLinkComponent && NIC[i].fabricLinkComponent.set({ 'x1': left, 'y1': top });
                NIC[i].fabricLinkComponent.updateCoords();
                canvas.renderAll();
            }
            else if((diff_y2>-diff&&diff_y2<diff)&&(diff_x2>-diff&&diff_x2<diff))
            {
                NIC[i].fabricLinkComponent && NIC[i].fabricLinkComponent.set({ 'x2': left, 'y2': top });
                NIC[i].fabricLinkComponent.updateCoords();
                canvas.renderAll();
            }
        }
    }
}
//Move Components
function moveGroup(target,top,left)
{
    var p=target;
    var left= left;
    var top= top;
    p.displayText.left= left;
    p.displayText.top = top+constDisplayTextDisplayment;
    var diff_y1;
    var diff_x1;
    var diff_y2;
    var diff_x2;
    var diff=50;
    var NIC=p.MainComponent.NIC;
    for (var i = 0; i<NIC.length; i++)
    {
        if(NIC[i].fabricLinkComponent!=null)
        {
            diff_y1=top-NIC[i].fabricLinkComponent.y1;
            diff_x1=left-NIC[i].fabricLinkComponent.x1;
            diff_y2=top-NIC[i].fabricLinkComponent.y2;
            diff_x2=left-NIC[i].fabricLinkComponent.x2;
            if((diff_y1>-diff&&diff_y1<diff)&&(diff_x1>-diff&&diff_x1<diff))
            {
                NIC[i].fabricLinkComponent && NIC[i].fabricLinkComponent.set({ 'x1': left, 'y1': top });
                NIC[i].fabricLinkComponent.updateCoords();
                canvas.renderAll();
            }
            else if((diff_y2>-diff&&diff_y2<diff)&&(diff_x2>-diff&&diff_x2<diff))
            {
                NIC[i].fabricLinkComponent && NIC[i].fabricLinkComponent.set({ 'x2': left, 'y2': top });
                NIC[i].fabricLinkComponent.updateCoords();
                canvas.renderAll();
            }
        }
    }
}
//Change Viewable Components when Change Slice Select
function changeSliceSelect()
{
    var select=document.getElementById('SliceSelect').value;

    if(select==-1)//Overview
    {
        for(var i=0;i<componentBucket.length;i++)
        {
            if(componentBucket[i]!=null)
            {
                ComponentBringToFront(componentBucket[i]);
            }
        }
    }
    else if(select==-2)//NonSlice
    {
        for(var i=0;i<componentBucket.length;i++)
        {
            if(componentBucket[i]!=null)
            {
                if(componentBucket[i].slice==null)
                    ComponentBringToFront(componentBucket[i]);
                else
                    ComponentSendToBack(componentBucket[i]);
            }
        }
    }
    else//Else Select
    {
        for(var i=0;i<componentBucket.length;i++)
        {
            if(componentBucket[i]!=null)
            {
                if(componentBucket[i].slice==SliceBucket[select])
                    ComponentBringToFront(componentBucket[i]);
                else
                    ComponentSendToBack(componentBucket[i]);
            }
        }
    }
    updateAll();
}
function ComponentBringToFront(Component)//visible
{
    Component.fabricComponent.visible=true;
    Component.fabricComponent.displayText.visible=true;
    for(var i=0;i<Component.NIC.length;i++)
    {
        if(Component.NIC[i].fabricLinkComponent!=null)
        {
            Component.NIC[i].fabricLinkComponent.visible=true;
            Component.NIC[i].fabricLinkComponent.displayText.visible=true;
        }
    }
    canvas.renderAll();
}
function ComponentSendToBack(Component)//Un visible
{
    Component.fabricComponent.visible=false;
    Component.fabricComponent.displayText.visible=false;
    for(var i=0;i<Component.NIC.length;i++)
    {
        if(Component.NIC[i].fabricLinkComponent!=null)
        {
            Component.NIC[i].fabricLinkComponent.visible=false;
            Component.NIC[i].fabricLinkComponent.displayText.visible=false;
        }
    }
    canvas.renderAll();
}
function updateSelectSlice()//Update Slice List
{
//    console.log(0);
    var select=document.getElementById('SliceSelect');
//    console.log(select);
//    console.log(0);
    select.innerHTML=null;
    var Overview_option=document.createElement("option");
    Overview_option.innerHTML="Overview";
    Overview_option.setAttribute("value",-1);
    select.appendChild(Overview_option);

    var Non_Slice=document.createElement("option");
    Non_Slice.innerHTML="Non_Slice";
    Non_Slice.setAttribute("value",-2);
    select.appendChild(Non_Slice);

//    console.log(SliceBucket.length);
    for(var j=0;j<SliceBucket.length;j++)
    {
        if(SliceBucket[j]!=null)
        {
//            console.log(SliceBucket[j].SliceName);
            var option=document.createElement("option");
            option.innerHTML=SliceBucket[j].SliceName;
            option.setAttribute("value",j);
            select.appendChild(option);
        }
    }
}