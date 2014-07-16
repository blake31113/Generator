/**
 * Created by Blake on 2014/4/7.
 */
function loadRspecXml(XmlInput)//Parse Request Xml
{
//    console.log(XmlInput);
    var $j = jQuery.noConflict();

    var xml = "XmlInput",
        xmlDoc = $j.parseXML(XmlInput);
        $xml = $j( xmlDoc );
    var loadComponentBucket=new Array();
    var loadLinkBucket=new Array();
//    <rspec type="request" generated_by="Flack" generated="2013-06-24T02:50:53Z" xsi:schemaLocation="http://www.geni.net/resources/rspec/3 http://www.geni.net/resources/rspec/3/request.xsd " xmlns:flack="http://www.protogeni.net/resources/rspec/ext/flack/1" xmlns:client="http://www.protogeni.net/resources/rspec/ext/client/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.geni.net/resources/rspec/3">
    var rspec_type=$xml.find('rspec').attr('type');
    var rspec_geneBy=$xml.find('rspec').attr('generated_by');
    var rspec_geneDate=$xml.find('rspec').attr('generated');
    var rspec_xsi_schemaLocation=$xml.find('rspec').attr('xsi:schemaLocation');
    var rspec_xmlns_flack=$xml.find('rspec').attr('xmlns:flack');
    var rspec_xmlns_client=$xml.find('rspec').attr('xmlns:client');
    var rspec_xmlns_xsi=$xml.find('rspec').attr('xmlns:xsi');
    var rspec_xmlns=$xml.find('rspec').attr('xmlns');
//    console.log(rspec_type);
//    console.log(rspec_geneBy);
//    console.log(rspec_geneDate);
//    console.log(rspec_xsi_schemaLocation);
//    console.log(rspec_xmlns_flack);
//    console.log(rspec_xmlns_client);
//    console.log(rspec_xmlns_xsi);
//    console.log(rspec_xmlns);
    tempComponentBucket=Array();
    tempLinkBucket=Array();
    tempSliceBucket=Array();
    $xml.find('node').each(function()
    {
        var id                  = $j(this).attr('client_id');
        var exclusive           = $j(this).attr('exclusive');
        var sliver_type_name    = $j(this).find('sliver_type').attr('name');
        var iface=new Array();
        $j(this).find('interface').each
        (
            function()
            {
                var temp=$j(this).attr('client_id');
                iface.push(temp.substring(temp.indexOf(":")+1,temp.length));
            }
        );
        console.log("id= "+id);
        tempComponentBucket.push(id);
        //---------------------Slice-------------
        var haveThisSlice=false;
        for(w=0;w<tempSliceBucket.length;w++)
        {
//            console.log("TEMP: "+tempSliceBucket[w].slicename);
//            console.log("Sliver: "+sliver_type_name);
            if(tempSliceBucket[w].slicename==sliver_type_name)
            {
                console.log("have same sliver");
                haveThisSlice=true;
                tempSliceBucket[w].addComponent(id);
                console.log(tempSliceBucket[w]);
                break;
            }
        }
        if(!haveThisSlice)
        {
            tempSliceBucket.push(new makeTempSlice(sliver_type_name,id));
        }

//        console.log("exclusive= "+exclusive);
//        console.log("sliver_type_name= "+sliver_type_name);
//        console.log(iface);
    });
    function makeTempSlice(slicename,id)
    {
        this.slicename=slicename;
        this.coms=new Array();
        this.coms.push(id);
        this.addComponent=function(inputid)
        {
            this.coms.push(inputid);
        }
    }
    $xml.find('link').each(function()
    {
        var id                  = $j(this).attr('client_id');
        var link_type           = $j(this).find('link_type').attr('name');
        var iface=new Array();
        var source=new Array();
        var dest=new Array();
        $j(this).find('interface_ref').each
        (
            function()
            {
                var temp=$j(this).attr('client_id');
                iface.push(temp.substring(temp.indexOf(":")+1,temp.length));
            }
        );
        $j(this).find('property').each
        (
            function()
            {
                source.push($j(this).attr('source_id'));
                dest.push($j(this).attr('dest_id'));
            }
        );
//        console.log(id);
//        console.log(link_type);
//        console.log(iface);
//        console.log(source);
//        console.log(dest);
        tempLinkBucket.push(source);
    });
//    console.log(tempLinkBucket[0][0]);
//    for(var i=0;i<tempSliceBucket.length;i++)
//    {
//        console.log(tempSliceBucket[i]);
//    }
}