/**
 * Created by ~~ on 2014/6/21.
 */
function initial_tooltip_popover()
{

    var img=[];
    for(var i=0;i<8;i++)
    {
        img[i]=document.createElement('img');
        img[i].setAttribute('width',128);
        img[i].setAttribute('height',128)
    }
    img[0].setAttribute('src',listIconURL[0][0]);
    img[1].setAttribute('src',listIconURL[0][1]);
    img[2].setAttribute('src',listIconURL[1][0]);
    img[3].setAttribute('src',listIconURL[1][1]);
    img[4].setAttribute('src',listIconURL[1][2]);
    img[5].setAttribute('src',listIconURL[1][3]);
    img[6].setAttribute('src',listIconURL[2][0]);
    img[7].setAttribute('src',listIconURL[2][1]);
    $j("#create_host").popover(         {title: 'Create Host'                       , content:  img[0]      , html:true});
    $j('#create_vhost').popover(        {title: 'Create Virtual Host'               , content:  img[1]      , html:true});
    $j("#create_switch").popover(       {title: 'Create Switch'                     , content:  img[2]     , html:true});
    $j("#create_vswitch").popover(      {title: 'Create Virtual Switch'             , content:  img[3]     , html:true});
    $j("#create_oswitch").popover(      {title: 'Create Openflow Switch'            , content:  img[4]     , html:true});
    $j("#create_ovswitch").popover(     {title: 'Create Openflow Virtual Switch'    , content:  img[5]     , html:true});
    $j("#create_controller").popover(   {title: 'Create Controller'                 , content:  img[6]     , html:true});
    $j("#create_vcontroller").popover(  {title: 'Create Virtual Controller'         , content:  img[7]     , html:true});
}
function setSideComponent_popover()
{
    for(var i=0;i<componentData.length;i++)
    {
        if(!componentData[i].isUsed)
        {
            var popoverDiv=document.createElement('div');
            var img=document.createElement('img');
            img.setAttribute('width',128);
            img.setAttribute('height',128)
            img.setAttribute('src',listIconURL[Math.floor(componentData[i].type/10)-1][componentData[i].type%10]);
            popoverDiv.appendChild(img);
            popoverDiv.appendChild(document.createElement('br'));
            var submit=document.createElement('button');
            submit.innerText="Select";
            submit.setAttribute('class','btn btn-default');
            submit.setAttribute('onclick',"setSelectComponentIndex("+i+")");
            popoverDiv.appendChild(submit);
            var submit2=document.createElement('button');
            submit2.innerText="Add";
            submit2.setAttribute('class','btn btn-default');
            submit2.setAttribute('onclick',"createComponent_RanPos("+i+")");
            popoverDiv.appendChild(submit2);
            var submit3=document.createElement('button');
            submit3.innerText="Cancel";
            submit3.setAttribute('class','btn btn-default');
            submit3.setAttribute('onclick',"setSide_popover_hide("+i+")");
            popoverDiv.appendChild(submit3);
            $j("#comData_"+i).popover({title: 'Create '+componentData[i].name, content:popoverDiv, html:true});
        }
    }
    setSideSD_popover();
}
function endPopover()
{
    for(var i=0;i<componentData.length;i++)
        $j("#comData_"+i).popover('hide');
    $j('#create_sd_vswitch').popover('hide');
    $j('#create_sd_ovswitch').popover('hide');
    $j('#create_sd_vhost').popover('hide');
}
function setSide_popover_hide(index)
{
    $j("#comData_"+index).popover('hide');
}
function setSideSD_popover_hide(index)
{
    var sd=[];
    sd[0]='#create_sd_vswitch';
    sd[1]='#create_sd_ovswitch';
    sd[2]='#create_sd_vhost';
    $j(sd[index]).popover('hide');
}
function setSideSD_popover()
{
    var sd=[];
    sd[0]='#create_sd_vswitch';
    sd[1]='#create_sd_ovswitch';
    sd[2]='#create_sd_vhost';
    var dataname=[];
    dataname[0]="Virtual Switch";
    dataname[1]="Virtual Openflow Switch";
    dataname[2]="Virtual Host";

    for (var i = 0; i < 2; i++)
    {
        var type = 22+i;
        var popoverDiv = document.createElement('div');
        var img = document.createElement('img');
        img.setAttribute('width', 128);
        img.setAttribute('height', 128)
        img.setAttribute('src', listIconURL[1][i+2]);
        popoverDiv.appendChild(img);
        popoverDiv.appendChild(document.createElement('br'));
        var submit = document.createElement('button');
        submit.innerText = "Select";
        submit.setAttribute('class', 'btn btn-default');
        submit.setAttribute('onclick', "setCreateSDComponentType(" + type + ")");
        popoverDiv.appendChild(submit);
        var submit2 = document.createElement('button');
        submit2.innerText = "Add";
        submit2.setAttribute('class', 'btn btn-default');
        submit2.setAttribute('onclick', "createSDComponent_RanPos(" + type + ")");
        popoverDiv.appendChild(submit2);
        var submit3 = document.createElement('button');
        submit3.innerText = "Cancel";
        submit3.setAttribute('class', 'btn btn-default');
        submit3.setAttribute('onclick', "setSideSD_popover_hide(" + i + ")");
        popoverDiv.appendChild(submit3);
        $j(sd[i]).popover({title: 'Create ' + dataname[i], content: popoverDiv, html: true});
    }
    for (var i = 2; i < 3; i++)
    {
        var type = 9+i;
        var popoverDiv = document.createElement('div');
        var img = document.createElement('img');
        img.setAttribute('width', 128);
        img.setAttribute('height', 128)
        img.setAttribute('src', listIconURL[0][i-1]);
        popoverDiv.appendChild(img);
        popoverDiv.appendChild(document.createElement('br'));
        var submit = document.createElement('button');
        submit.innerText = "Select";
        submit.setAttribute('class', 'btn btn-default');
        submit.setAttribute('onclick', "setCreateSDComponentType(" + type + ")");
        popoverDiv.appendChild(submit);
        var submit2 = document.createElement('button');
        submit2.innerText = "Add";
        submit2.setAttribute('class', 'btn btn-default');
        submit2.setAttribute('onclick', "createSDComponent_RanPos(" + type + ")");
        popoverDiv.appendChild(submit2);
        var submit3 = document.createElement('button');
        submit3.innerText = "Cancel";
        submit3.setAttribute('class', 'btn btn-default');
        submit3.setAttribute('onclick', "setSideSD_popover_hide(" + i + ")");
        popoverDiv.appendChild(submit3);
        $j(sd[i]).popover({title: 'Create ' + dataname[i], content: popoverDiv, html: true});
    }
}