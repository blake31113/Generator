/**
 * Created by Blake on 2014/4/7.
 */
function parseADXml(XmlInput)//Parse Advertisement and Initialize Components
{
    var $j = jQuery.noConflict();//avoid to Conflict
    var xml = "XmlInput",
        xmlDoc = $j.parseXML(XmlInput);
        $xml = $j( xmlDoc );
    var loadComponentBucket=new Array();
    var loadLinkBucket=new Array();
    var rspec_type=$xml.find('rspec').attr('type');
    var rspec_geneDate=$xml.find('rspec').attr('generated');
    var rspec_xsi_schemaLocation=$xml.find('rspec').attr('xsi:schemaLocation');
    var rspec_xmlns_xsi=$xml.find('rspec').attr('xmlns:xsi');
    var rspec_xmlns=$xml.find('rspec').attr('xmlns');
    var rspec_valid_until=$xml.find('rspec').attr('valid_until');
    $xml.find('node').each  //Parse every node
    (
        function()
        {
            var manager_uuid        = $j(this).attr('component_manager_uuid');
            var name                = $j(this).attr('component_name');
            var uuid                = $j(this).attr('component_uuid');
            var func_type           = $j(this).attr('func_type');
            var available           = $j(this).find('available').text();
            var exclusive           = $j(this).find('exclusive').text();
            var type_name=new Array();
            var type_slots=new Array();
            var inface=new Array();
            var type;
            $j(this).find('node_type').each//every node type
            (
                function()
                {
                    type_name.push($j(this).attr('type_name'));
                    type_slots.push($j(this).attr('type_slots'));
                    type=typeTraslateSTI(type_name[type_name.length-1]);
                }
            );
            $j(this).find('interface').each//every node interface
            (
                function()
                {
                    inface.push($j(this).attr('component_id'));
                }
            );
            componentData.push(new createComponentData(type,componentData.length,name,func_type));//initialize Component Data
            for(i=0;i<inface.length;i++)//initialize NIC of ComponentData
            {
                componentData[componentData.length-1].NIC.push(new createNIC(inface[i].substring(inface[i].lastIndexOf(":")+1),i));
//                componentData[componentData.length-1].NIC[i].NICLocalIndex=i;
            }
//            console.log(AdcomponentData[AdcomponentData.length-1].iface);
        }
    );

    updateUnuseList();
    setSideMenu();
    setSideComponent_popover();
//    createComponent_RanPos(0);
//    createComponent_RanPos(2);
//    createComponent_RanPos(5);
//    createComponent_RanPos(10);
//    createComponent_RanPos(6);
//    var com0=componentBucket[0];
//    var com1=componentBucket[1];
//    var com2=componentBucket[2];
//    var switch0=componentBucket[3];
//    SliceBucket.push(new createSlice("Slice01"));
//    SliceBucket[0].addComponent(com0);
//    SliceBucket[0].addComponent(com1);
//    SliceBucket[0].addComponent(com2);
//    SliceBucket[0].addComponent(switch0);
//    linkNICToNIC(com0,switch0,com0.NIC[0],switch0.NIC[0]);
//    linkNICToNIC(com1,switch0,com1.NIC[0],switch0.NIC[1]);
//    linkNICToNIC(com2,switch0,com2.NIC[0],switch0.NIC[2]);
    updateSelectSlice();
//    createComponent_RanPos(componentData[0].name,componentData[0].type,componentData[0]);
//    console.log(AdcomponentData[0]);
//    console.log(webSocket.readyState);
//    console.log(componentData);
//    updateUnUsedList();
}