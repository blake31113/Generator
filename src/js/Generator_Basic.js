/**
 * Created by ~~ on 2014/6/21.
 */
function rollToTop()//scroll Screen to Top
{
    var body = $j("html, body");
    body.animate({scrollTop:0}, '500', 'swing');
}
function createComponentData(inputType,inputID,inputName,functype)//Basic Component Data Structure
{
    this.type=inputType;
    this.ID=inputID;
    this.name=inputName;
    this.funcType=functype;
    this.isUsed=false;
    this.NIC=new Array();
    return this;
}
function createComponent_RanPos(index)//Create Component and Add to Canvas regularly
{
    var RanX;
    var RanY;
    var X_unit=100;
    var Y_unit=150;
    if(Math.floor(componentData[index].type/10)==1)//Host
    {
        hostNumber=hostNumber%8;
        RanX=X_unit*hostNumber;
        RanY=Y_unit*3;
        hostNumber++;
    }
    else if(Math.floor(componentData[index].type/10)==2)//Switch
    {
        switchNumber=switchNumber%8;
        RanX=X_unit*switchNumber-50;
        RanY=Y_unit*2;
        switchNumber++;
    }
    else if(Math.floor(componentData[index].type/10)==3)//Controller
    {
        controllerNumber=controllerNumber%8;
        RanX=X_unit*controllerNumber;
        RanY=Y_unit*1;
        controllerNumber++;
    }

    componentBucket.push(new createComponent(componentData[index].name,componentData[index].type,RanX,RanY,componentData[index]));
    create_addToSlice(componentBucket[componentBucket.length-1]);
    componentData[index].isUsed=true;
    endPopover();
    updateAll();
    setSideComponent_popover();
}
function createComponent_MouPos(index,mouX,mouY)//Create Component and Add to Canvas with Mouse
{
    var MouX=mouX;
    var MouY=mouY;
    componentBucket.push(new createComponent(componentData[index].name,componentData[index].type,MouX,MouY,componentData[index]));
    create_addToSlice(componentBucket[componentBucket.length-1]);
    componentData[index].isUsed=true;
    endPopover();
    updateAll();
    setSideComponent_popover();
}
function createComponent(name,type,posX,posY,componentData)//Create Component
{
    this.componentName=componentData.name;
    this.componentType=componentData.type;
    this.componentFuncType=componentData.funcType;
    this.dataInfo=componentData;
    this.slice=null
    this.NIC=componentData.NIC;
    this.componentIndex=componentBucket.length;
    this.fabricComponent=new createFabricComponent(this.componentType,posX,posY,this);
    return this;
}
function createSDComponent_RanPos(type)//Create Self Define Component and Add it to Canvas regularly
{
    console.log(type);
    var RanX;
    var RanY;
    var X_unit=100;
    var Y_unit=150;
    if(Math.floor(type/10)==1)//host
    {
        hostNumber=hostNumber%8;
        RanX=X_unit*hostNumber;
        RanY=Y_unit*3;
        hostNumber++;
    }
    else if(Math.floor(type/10)==2)//Switch
    {
        switchNumber=switchNumber%8;
        RanX=X_unit*switchNumber-50;
        RanY=Y_unit*2;
        switchNumber++;
    }
    else if(Math.floor(type/10)==3)//Controller
    {
        controllerNumber=controllerNumber%8;
        RanX=X_unit*controllerNumber;
        RanY=Y_unit*1;
        controllerNumber++;
    }
    createSelfDefineComponent(type,RanX,RanY);
}
function createSDComponent_MouPos(type,mouX,mouY)//Create Self Define Component and add it to Canvas with Mouse
{
    if(createSDType!=-1)
        createSelfDefineComponent(type,mouX,mouY);
}
function createSelfDefineComponent(type,posX,posY)//Create Self Define Component
{
    var componentName;
    var sequenceNumber=selfdefineNumber.toString();
    var funcType=typeTraslatefunctype(type);
    if(type==10)
        componentName="host"+"_sd"+sequenceNumber;
    else if(type==11)
        componentName="host_v"+"_sd"+sequenceNumber;
    else if(type==20)
        componentName="switch"+"_sd"+sequenceNumber;
    else if(type==21)
        componentName="switch_of"+"_sd"+sequenceNumber;
    else if(type==22)
        componentName="switch_v"+"_sd"+sequenceNumber;
    else if(type==23)
        componentName="switch_v_of"+"_sd"+sequenceNumber;
    else if(type==30)
        componentName="host_of"+"_sd"+sequenceNumber;
    else if(type==31)
        componentName="host_v_of"+"_sd"+sequenceNumber;

    componentData.push(new createComponentData(type,componentData.length,componentName,funcType));
    addSDComponentData(type,componentData[componentData.length-1]);
    componentData[componentData.length-1].isUsed=true;
    componentBucket.push(new createComponent(componentName,type,posX,posY,componentData[componentData.length-1]));
    create_addToSlice(componentBucket[componentBucket.length-1]);
    endPopover();
    updateAll();
    setSideComponent_popover();
    selfdefineNumber++;
}
function create_addToSlice(componentBucket)//Create Component and Add to Selected Slice
{
    var sliceselect=document.getElementById('SliceSelect').value;
    if(sliceselect==-1||sliceselect==-2);
    else
    {
        SliceBucket[sliceselect].addComponent(componentBucket);
    }
}
function addSDComponentData(type,componentData)//add Component Date to Self Define Component
{
    if(type==10);
    else if(type==11)
    {
        for(var i=0;i<2;i++)
        {
            componentData.NIC.push(new createNIC('eth'+ i.toString(),i));
        }
    }
    else if(type==20);
    else if(type==21);
    else if(type==22)//v_switch
    {
        for(var i=0;i<12;i++)
        {
            componentData.NIC.push(new createNIC('eth'+ i.toString(),i));
        }
    }
    else if(type==23)//ov_switch
    {
        for(var i=0;i<12;i++)
            componentData.NIC.push(new createNIC('eth'+ i.toString(),i));
    }
    else if(type==30);
    else if(type==31);
}
function createNIC(NICName,localIndex)//Create NIC
{
    this.fabricLinkComponent=null;
    this.otherComponent=null;
    this.otherComponentNIC=null;
    this.MacAddress=null;
    this.IPAddress=null;
    this.NICName=NICName;
    this.linkIndex=null;
    this.NICLocalIndex=localIndex;
    this.deleteLink=function()
    {
        this.fabricLinkComponent=null;
        this.otherComponent=null;
        this.otherComponentNIC=null;
    }
}
function linkNICToNIC(component1,component2,NIC1,NIC2)//Link NIC to NIC
{
    if((component1!=component2)&&(NIC1!=null)&&(NIC2!=null))
    {

        var fabriclink=new createFabricLinkComponent(component1.fabricComponent,component2.fabricComponent,NIC1.fabricLinkComponent,NIC2.fabricLinkComponent,linkBucket.length);
        fabriclink.linkIndex=linkBucket.length;
        fabriclink.Component1=component1;
        fabriclink.Component2=component2;
        fabriclink.NIC1=NIC1;
        fabriclink.NIC2=NIC2;
        NIC1.otherComponent=component2;
        NIC2.otherComponent=component1;
        NIC1.otherComponentNIC=NIC2;
        NIC2.otherComponentNIC=NIC1;
        NIC1.fabricLinkComponent=fabriclink;
        NIC2.fabricLinkComponent=fabriclink;
        NIC1.linkIndex=linkBucket.length;
        NIC2.linkIndex=linkBucket.length;
        linkBucket.push(fabriclink);
    }
}
function linkNICToNICByIndex(component1_index,component2_index,NIC1_index,NIC2_index)//Link NIC to NIC using their Index
{
    console.log(componentBucket[component1_index]);
    console.log(componentBucket[component2_index]);
    console.log(NIC1_index);
    console.log(NIC2_index);
    console.log(componentBucket[component1_index].NIC[NIC1_index]);
    console.log(componentBucket[component2_index].NIC[NIC2_index]);
    linkNICToNIC(componentBucket[component1_index],componentBucket[component2_index],componentBucket[component1_index].NIC[NIC1_index],componentBucket[component2_index].NIC[NIC2_index]);
}
function createSlice(SliceName)//Create Slice
{
    this.components=new Array();
    this.SliceName=SliceName;
    this.SliceIndex=SliceBucket.length;
    this.addComponent=function(component)
    {
        this.components.push(component);
        component.slice=this;
    }
}

function deleteLinkIndex(delete_index)//Delete Link using Index
{
    for(var i=0;i<componentBucket.length;i++)
    {
        if(componentBucket[i]!=null)
        {
            for(var j=0;j<componentBucket[i].NIC.length;j++)
            {
                if(componentBucket[i].NIC[j].linkIndex!=null)
                {
                    if(componentBucket[i].NIC[j].linkIndex==delete_index)
                    {
                        var NIC=componentBucket[i].NIC[j];
                        NIC.otherComponent=null;
                        NIC.otherComponentNIC=null;
                        NIC.fabricLinkComponent=null;
                        NIC.linkIndex=null;
                    }
                }
            }
        }
    }
    canvas.remove(linkBucket[delete_index].displayText);
    canvas.remove(linkBucket[delete_index]);
    canvas.renderAll();
    delete(linkBucket[delete_index]);
}
function deleteComponentLinkIndex(index)//Delete all the Component Links
{
    var deletecomponentindex=index;
    for(i=0;i<componentBucket[deletecomponentindex].NIC.length;i++)
    {
        if(componentBucket[deletecomponentindex].NIC[i].otherComponent!=null)
            deleteLinkIndex(componentBucket[deletecomponentindex].NIC[i].linkIndex);
    }
}
function deleteComponent(index)//Delete Component
{
    console.log("DELETE INDEX  "+index);
    deleteComponentLinkIndex(index);
    canvas.remove(componentBucket[index].fabricComponent.displayText);
    canvas.remove(componentBucket[index].fabricComponent);
    componentData[componentBucket[index].dataInfo.ID].isUsed=false;
    delete componentBucket[index];
}
function chooseDeleteComponent(delete_index)//select Component to Delete
{
    console.log(delete_index);
    deleteComponent(delete_index);
    selectType=0;
    updateAll();
    setSideComponent_popover();
}
function choosedeletelink()//select link to Delete
{
    var componentValue=[];
    var NICValue=[]
    componentValue[0]=document.getElementById('selectDlink_0').value;
    componentValue[1]=document.getElementById('selectDlink_1').value;
    NICValue[0]=document.getElementById('selectDNIC_0').value;
    NICValue[1]=document.getElementById('selectDNIC_1').value;
    deleteLinkIndex(componentBucket[componentValue[0]].NIC[NICValue[0]].linkIndex);
    selectType=0;
    updateAll();
    setSideComponent_popover();
}
function setSelectType(input)//Set SelectType
{
    selectType=input;
    showActionsPanel();
}
function setSelectComponentIndex(input)////Set SelectType to Select(1) and Set SelectComponentIndex
{
    setSelectType(1);
    selectComponentIndex=input;
    endPopover();
}
function addToSlice()//Add Components to Slice
{
    var slicename=document.getElementById("SliceName").value;
    SliceBucket.push(new createSlice(slicename));
    var activeObject = canvas.getActiveObject();
    var activeGroup = canvas.getActiveGroup();
    if(activeGroup)
    {
        for(var i=0;i<activeGroup.objects.length;i++)
        {
            console.log(SliceBucket[SliceBucket.length-1].SliceName);
            SliceBucket[SliceBucket.length-1].addComponent(activeGroup.objects[i].MainComponent);
        }
    }
    else if(activeObject)
    {
        console.log(SliceBucket[SliceBucket.length-1].SliceName);
        SliceBucket[SliceBucket.length-1].addComponent(activeObject.MainComponent);
    }
    updateSelectSlice();
    $j('#CreateSlice').modal('hide');
}
function createSlice(SliceName)//Create Slice
{
    this.components=new Array();
    this.SliceName=SliceName;
    this.SliceIndex=SliceBucket.length;
    this.addComponent=function(component)
    {
        this.components.push(component);
        component.slice=this;
    }
}
function deleteSlice()//Delete Slice
{
    var index=document.getElementById('DeSliceSelect').value;
    console.log(index);
    for(var i=0;i<SliceBucket[index].components.length;i++)
    {
        SliceBucket[index].components[i].slice=null;
        console.log(SliceBucket[index].components[i].slice);
    }
    delete SliceBucket[index];
    updateSelectSlice();
    $j('#DeleteSlice').modal('hide');
}
function typeTraslateSTI(input)//Component Type Translate ( String to Integer)
{
    var type;
    if(input=="host")
        type=10;
    else if(input=="host_v")
        type=11;
    else if(input=="switch")
        type=20;
    else if(input=="switch_of")
        type=21;
    else if(input=="switch_v")
        type=22;
    else if(input=="switch_v_of")
        type=23;
    else if(input=="host_of")
        type=30;
    else if(input=="host_v_of")
        type=31;
    return type;
}
function typeTraslateITS(input)//Component Type Translate ( Integer to String )
{
    var type;
    if(input==10)
        type="host";
    else if(input==11)
        type="host_v";
    else if(input==20)
        type="switch";
    else if(input==21)
        type="switch_of";
    else if(input==22)
        type="switch_v";
    else if(input==23)
        type="switch_v_of";
    else if(input==30)
        type="host_of";
    else if(input==31)
        type="host_v_of";
    return type;
}
function typeTraslatefunctype(input)//Translate Type to FunctionType
{
    var type;
    if(input==10)
        type="compute";
    else if(input==11)
        type="compute";
    else if(input==20)
        type="switch";
    else if(input==21)
        type="switch";
    else if(input==22)
        type="switch";
    else if(input==23)
        type="switch";
    else if(input==30)
        type="Hypervisor";
    else if(input==31)
        type="Hypervisor";
    return type;
}
function initialize()//Initialize
{
//    hideActionPanel();
    setDatePicker();
}
function hideActionPanel()//Hide Action Panel
{
    $('#ActionsPanel').hide();
}
function updateAll()//Update Add Panel
{
    setSideMenu();
    updateUnuseList();
    updateLinkSelect();
}
function deleteAllComponent()//Delte Add Components
{
    var i=0;
    while(i<componentBucket.length)
    {
        if(componentBucket[i]!=null)
        {
            deleteComponent(i);
        }
        i++;
    }
    updateAll();
}
function setCreateSDComponentType(type)//set self Define Component Type
{
    createSDType=type;
}