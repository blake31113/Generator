/**
 * Created by ~~ on 2014/6/21.
 */
function setSideMenu()//Set Side Menu
{
    var tag_host        =   document.getElementById('create_host_third');
    var tag_vhost       =   document.getElementById('create_vhost_third');
    var tag_switch      =   document.getElementById('create_switch_third');
    var tag_vswitch     =   document.getElementById('create_vswitch_third');
    var tag_oswitch     =   document.getElementById('create_oswitch_third');
    var tag_ovswitch    =   document.getElementById('create_ovswitch_third');
    var tag_controller  =   document.getElementById('create_controller_third');
    var tag_vcontroller =   document.getElementById('create_vcontroller_third');
    tag_host        .innerHTML=null;
    tag_vhost       .innerHTML=null;
    tag_switch      .innerHTML=null;
    tag_vswitch     .innerHTML=null;
    tag_oswitch     .innerHTML=null;
    tag_ovswitch    .innerHTML=null;
    tag_controller  .innerHTML=null;
    tag_vcontroller .innerHTML=null;
    for(var i=0;i<componentData.length;i++)
    {
        if(!componentData[i].isUsed)
        {
            var li=document.createElement('li');
            var tagName="comData_"+componentData[i].ID;
            var id=componentData[i].ID;
            li.innerHTML="<a id=\""+tagName+"\" class='glyphicon glyphicon-hand-right btn-lg' data-trigger='click' data-container='body' data-toggle='popover' data-placement='right' title='' data-content=''>"+componentData[i].name+"</a>";
//            li.onclick('onclick','showActionsPanel(componentData[i].ID)');
            li.setAttribute("onclick","showActionsPanel("+componentData[i].ID+");");
//            li.onclick = function(){ showActionsPanel(componentData[i].ID); } ;
            li.click(function()
            {
                showActionsPanel(componentData[i].ID);
            });
            if(componentData[i].type==10)
            {
                tag_host.appendChild(li);
            }
            else if(componentData[i].type==11)
            {
                tag_vhost.appendChild(li);
            }
            else if(componentData[i].type==20)
            {
                tag_switch.appendChild(li);
            }
            else if(componentData[i].type==21)
            {
                tag_vswitch.appendChild(li);
            }
            else if(componentData[i].type==22)
            {
                tag_oswitch.appendChild(li);
            }
            else if(componentData[i].type==23)
            {
                tag_ovswitch.appendChild(li);
            }
            else if(componentData[i].type==30)
            {
                tag_controller.appendChild(li);
            }
            else if(componentData[i].type==31)
            {
                tag_vcontroller.appendChild(li);
            }
        }
    }
}