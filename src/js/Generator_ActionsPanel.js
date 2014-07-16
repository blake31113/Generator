/**
 * Created by Blake on 2014/6/21.
 */
function showActionsPanel(componentID)//Show Action Panel depending Select Type
{
    var sliceselect=document.getElementById('SliceSelect').value;
    var panel=document.getElementById('ActionsPanel');
    panel.innerHTML=null;
//    $('#ActionsPanel').show();
    if(selectType==0)
    {
        if(componentData[componentID]!=null)
        {
            var div=[];
            for(var i=0;i<3;i++)
            {
                div[i]=document.createElement('div');
                panel.appendChild(div[i]);
            }
            var img=document.createElement('img');
            img.setAttribute('width',100);
            img.setAttribute('height',100);
            img.setAttribute('src',listIconURL[Math.floor(componentData[componentID].type/10)-1][componentData[componentID].type%10]);
            div[0].appendChild(img);
            var label=document.createElement('label');
            label.innerText=componentData[componentID].name;
            div[1].appendChild(label);
        }
    }
    //-----------------------------------------------------Link Component-------------------------------------------
    else if(selectType==3)
    {
        var div=[];
        for(var i=0;i<4;i++)
        {
            div[i]=document.createElement('div');
            panel.appendChild(div[i]);
        }
        var label=document.createElement('h4');
        label.innerText="Choose Link";
        div[0].appendChild(label);
        div[0].appendChild(document.createElement('br'));


        var label_com1=document.createElement('label');
        label_com1.innerText="Component1: ";
        div[1].appendChild(label_com1);

        var label_com2=document.createElement('label');
        label_com2.innerText="Component2: ";
        div[2].appendChild(label_com2);

        var label_NIC=[]
        label_NIC[0]=document.createElement('label');
        label_NIC[0].innerText="  NIC1: ";

        label_NIC[1]=document.createElement('label');
        label_NIC[1].innerText="  NIC2: ";

        var componentList=[];
        var NICList=[];
        for(var i=0;i<2;i++)
        {
            componentList[i]=document.createElement('select');
            componentList[i].setAttribute('class','btn btn-default');
            componentList[i].setAttribute('id','selectlink_'+i);
            componentList[i].setAttribute('onchange',"updateLinkSelect();");
            NICList[i]=document.createElement('select');
            NICList[i].setAttribute('class','btn btn-default');
            NICList[i].setAttribute('id','selectNIC_'+i);
            div[i+1].appendChild(componentList[i]);
            div[i+1].appendChild(label_NIC[i]);
            div[i+1].appendChild(NICList[i]);
        }
        for(var i=0;i<componentBucket.length;i++)
        {
            if((componentBucket[i]!=null)&&(sliceselect!=-1&&sliceselect!=-2)&&(componentBucket[i].slice==SliceBucket[sliceselect]))
            {
                for(var j=0;j<2;j++)
                {
                    var option=document.createElement('option');
                    option.setAttribute('value',componentBucket[i].componentIndex);
                    option.innerText=componentBucket[i].componentName;
                    componentList[j].appendChild(option);
                }
            }
        }
        updateLinkSelect();
        var submit=[];
        for(var i=0;i<2;i++)
        {
            submit[i]=document.createElement('button');
            submit[i].setAttribute('class','btn btn-default');
            div[3].appendChild(submit[i]);
        }
        submit[0].innerText="Connect";
        submit[1].innerText="Cancel";
        var componentValue=[];
        var NICValue=[]
        componentValue[0]=document.getElementById('selectlink_0').value;
        componentValue[1]=document.getElementById('selectlink_1').value;
        NICValue[0]=document.getElementById('selectNIC_0').value;
        NICValue[1]=document.getElementById('selectNIC_1').value;
//        submit[0].setAttribute('onclick',"linkNICToNICByIndex("+componentValue[0]+","+componentValue[1]+","+NICValue[0]+","+NICValue[1]+")");
        submit[0].onclick = (function()
        {
            return function()
            {
                linkNICToNICByIndex(document.getElementById('selectlink_0').value,document.getElementById('selectlink_1').value,document.getElementById('selectNIC_0').value,document.getElementById('selectNIC_1').value);
                hideActionsPanel();
            }
        })();
        submit[1].setAttribute('onclick',"hideActionsPanel()");
        div[3].setAttribute('class','panel-footer');
    }
    //-----------------------------------------------------Delete Link-------------------------------------------
    else if(selectType==4)
    {
        var div=[];
        for(var i=0;i<4;i++)
        {
            div[i]=document.createElement('div');
            panel.appendChild(div[i]);
        }
        var label=document.createElement('h4');
        label.innerText="Choose Delete Link";
        div[0].appendChild(label);
        div[0].appendChild(document.createElement('br'));
        var label_com1=document.createElement('label');
        label_com1.innerText="Component1: ";
        div[1].appendChild(label_com1);
        var label_com2=document.createElement('label');
        label_com2.innerText="Component2: ";
        div[2].appendChild(label_com2);
        var label_NIC=[]
        label_NIC[0]=document.createElement('label');
        label_NIC[0].innerText="  NIC1: ";
        label_NIC[1]=document.createElement('label');
        label_NIC[1].innerText="  NIC2: ";
        var componentList=[];
        var NICList=[];
        for(var i=0;i<2;i++)
        {
            componentList[i]=document.createElement('select');
            componentList[i].setAttribute('class','btn btn-default');
            componentList[i].setAttribute('id','selectDlink_'+i);
            componentList[i].setAttribute('onchange',"updateDLinkSelect("+i+")");
            NICList[i]=document.createElement('select');
            NICList[i].setAttribute('class','btn btn-default');
            NICList[i].setAttribute('id','selectDNIC_'+i);
            NICList[i].setAttribute('onchange',"updateDLinkSelect("+i+")");
            div[i+1].appendChild(componentList[i]);
            div[i+1].appendChild(label_NIC[i]);
            div[i+1].appendChild(NICList[i]);
        }
        for(var i=0;i<componentBucket.length;i++)
        {
            for(var j=0;j<1;j++)
            {
                if(componentBucket[i]!=null&&componentBucket[i].componentIndex!=null)
                {
                    var option=document.createElement('option');
                    option.setAttribute('value',componentBucket[i].componentIndex);
                    option.innerText=componentBucket[i].componentName;
                    componentList[j].appendChild(option);
                }
            }
        }
        updateDLinkSelect(0);
        var componentValue=[];
        var NICValue=[]
        componentValue[0]=document.getElementById('selectDlink_0').value;
        componentValue[1]=document.getElementById('selectDlink_1').value;
        NICValue[0]=document.getElementById('selectDNIC_0').value;
        NICValue[1] = document.getElementById('selectDNIC_1').value;
        updateDLinkNICSelect(0);
        var submit=[];
        for(var i=0;i<2;i++)
        {
            submit[i]=document.createElement('button');
            submit[i].setAttribute('class','btn btn-default');
            div[3].appendChild(submit[i]);
        }
        submit[0].innerText="Delete";
        submit[1].innerText="Cancel";

        submit[0].onclick = (function()
        {
            return function()
            {
                choosedeletelink();
                hideActionsPanel();
            }
        })();
        submit[1].setAttribute('onclick',"hideActionsPanel()");
        div[3].setAttribute('class','panel-footer');
    }
    //-----------------------------------------------------Delete Link-------------------------------------------
}
function hideActionsPanel()//hide action panel
{
    var panel=document.getElementById('ActionsPanel');
    panel.innerHTML=null;
}
function updateDLinkSelect(selectindex)//update when Select Delete link
{
    if(selectType==4)
    {
    //    console.log(selectindex);
        var other=(selectindex+1)%2;
        var componentValue=[];
        var NIC=[]
        componentValue[0]=document.getElementById('selectDlink_0').value;
        componentValue[1]=document.getElementById('selectDlink_1').value;
        NIC[0]=document.getElementById('selectDNIC_0');
        NIC[1]=document.getElementById('selectDNIC_1');
        NIC[0].innerHTML=null;
        NIC[1].innerHTML=null;
        for (var i = 0; i < componentBucket[componentValue[selectindex]].NIC.length; i++)
        {
            if (componentBucket[componentValue[selectindex]].NIC[i].otherComponent != null)
            {
                var option = document.createElement('option');
                option.setAttribute('value', componentBucket[componentValue[selectindex]].NIC[i].NICLocalIndex);
                option.innerText = componentBucket[componentValue[selectindex]].NIC[i].NICName;
                NIC[selectindex].appendChild(option);
            }
        }
        updateDLinkNICSelect(selectindex);
    }
}
function updateDLinkNICSelect(selectindex)//update when Select NIC of Delete link
{
    if(selectType==4)
    {
        var other=(selectindex+1)%2;
        var component=[];
        var componentValue=[];
        var NICValue=[]
        var NIC=[];
        componentValue[0]=document.getElementById('selectDlink_0').value;
        componentValue[1]=document.getElementById('selectDlink_1').value;
        NICValue[0]=document.getElementById('selectDNIC_0').value;
        NICValue[1]=document.getElementById('selectDNIC_1').value;
        component[0]=document.getElementById('selectDlink_0');
        component[1]=document.getElementById('selectDlink_1');
        NIC[0]=document.getElementById('selectDNIC_0');
        NIC[1]=document.getElementById('selectDNIC_1');
        component[other].innerHTML=null;
        NIC[other].innerHTML=null;
        var other=(selectindex+1)%2;
        for(var i=0;i<componentBucket.length;i++)
        {
            if(componentBucket[i]!=null&&componentBucket[componentValue[selectindex]].NIC[NICValue[selectindex]]!=null&&componentBucket[componentValue[selectindex]].NIC[NICValue[selectindex]].otherComponent!=null)
            {
                if(componentBucket[i]==componentBucket[componentValue[selectindex]].NIC[NICValue[selectindex]].otherComponent)
                {
                    var option = document.createElement('option');
                    option.setAttribute('value',componentBucket[i].componentIndex);
                    option.innerText = componentBucket[i].componentName;
                    document.getElementById('selectDlink_1').appendChild(option);
                    for(var j=0;j<componentBucket[i].NIC.length;j++)
                    {
                        if(componentBucket[i].NIC[j]!=null&&componentBucket[i].NIC[j].linkIndex!=null)
                        {
                            if(componentBucket[i].NIC[j].linkIndex==componentBucket[componentValue[selectindex]].NIC[NICValue[selectindex]].linkIndex)
                            {
                                var option = document.createElement('option');
                                option.setAttribute('value',componentBucket[i].NIC[j].NICLocalIndex);
                                option.innerText = componentBucket[i].NIC[j].NICName;
                                document.getElementById('selectDNIC_1').appendChild(option);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
}
function updateLinkSelect()//Update when Select Link
{
    if(selectType==3)
    {
        var componentValue=[];
        var NIC=[]
        componentValue[0]=document.getElementById('selectlink_0').value;
        componentValue[1]=document.getElementById('selectlink_1').value;
        NIC[0]=document.getElementById('selectNIC_0');
        NIC[1]=document.getElementById('selectNIC_1');
        NIC[0].innerHTML=null;
        NIC[1].innerHTML=null;
        for(var j=0;j<2;j++)
        {
            if(componentBucket[componentValue[j]]!=null)
            {
                for(var i=0;i<componentBucket[componentValue[j]].NIC.length;i++)
                {
                    if(componentBucket[componentValue[j]].NIC[i].otherComponent==null)
                    {
                        var option=document.createElement('option');
                        option.setAttribute('value',componentBucket[componentValue[j]].NIC[i].NICLocalIndex);
                        option.innerText=componentBucket[componentValue[j]].NIC[i].NICName;
                        NIC[j].appendChild(option);
                    }
                }
            }
        }
    }
}