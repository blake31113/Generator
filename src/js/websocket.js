/**
 * Created by Blake on 2014/4/8.
 */
function createWebSocket()//Link to Websocket Server
{
//    var ws = new WebSocket("ws://140.115.156.132:30010/");
//    var ws = new WebSocket("ws://140.115.216.4:8080/");
//    var ws = new WebSocket("ws://127.0.0.1:8080/");
    var ws = new WebSocket("ws://140.115.156.135:35003/");
    ws.onopen = function()//when open Websocket
    {
        console.log("Successful Connect to : "+ws.url);
        ws.send("Hello WebSocketServer");
        updateGeneratorLinkStatus(0);
    };
    ws.onmessage = function (evt)//when receive msg from Server
    {
//        console.log("From Server Message: " + evt.data);
        var temp=evt.data;
//        console.log(temp.substr(temp.indexOf("%")+1,temp.indexOf("\n")-1));
        if(temp.substr(temp.indexOf("%")+1,temp.indexOf("\n")-1)=="AD")//Parse Advertisement
        {
            adXml=temp.substr(temp.indexOf("\n")+1);
            parseADXml(adXml);
        }
        else if(temp.substr(temp.indexOf("%")+1,temp.indexOf("%%")-1)=="LD")//Load
        {
            if(temp.substr(temp.indexOf("%%")+2,temp.indexOf("%%%")-5)=="LIST")//Load Request List
            {
                var temp2=temp.substr(temp.indexOf("%%%")+3).replace("\[",'');
                temp2=temp2.replace("\]",'');
                requestBucket=(temp2.split(","));
                for(i=0;i<requestBucket.length;i++)
                    requestBucket[i]=requestBucket[i].replace(" ","");

                var listSelect=[]
                listSelect[0]=document.getElementById('LoadRequestSelect');
                listSelect[1]=document.getElementById('ScheduleRequestSelect');
                listSelect[0].innerHTML=null;
                listSelect[1].innerHTML=null;
                for(var j=0;j<2;j++)
                {
                    for(var i=0;i<requestBucket.length;i++)
                    {
                        var option = document.createElement('option');
                        option.setAttribute('value',i);
                        option.innerText=requestBucket[i];
                        listSelect[j].appendChild(option);
                    }
                }
            }
            else if(temp.substr(temp.indexOf("%%")+2,temp.indexOf("%%%")-5)=="XML")//Load Request Xml
            {
                loadXml=temp.substr(temp.indexOf("%%%")+4);
                loadRspecXml(loadXml);
                //-----------------Component
                for(var j=0;j<tempComponentBucket.length;j++)
                {
                    for(var i=0;i<componentData.length;i++)
                    {
                        if(componentData[i].name==tempComponentBucket[j])
                        {
                            createComponent_RanPos(i);
                        }
                    }
                }
                //--------------------link
                for(var j=0;j<tempLinkBucket.length;j++)
                {
                    var com1=tempLinkBucket[j][0].substr(0,tempLinkBucket[j][0].indexOf(":"));
                    var com2=tempLinkBucket[j][1].substr(0,tempLinkBucket[j][1].indexOf(":"));
                    var NIC1=tempLinkBucket[j][0].substr(tempLinkBucket[j][0].indexOf(":")+1);
                    var NIC2=tempLinkBucket[j][1].substr(tempLinkBucket[j][1].indexOf(":")+1);
                    for(var i=0;i<componentBucket.length;i++)
                    {
                        if(componentBucket[i]!=null&&componentBucket[i].componentName==com1)
                        {
                            com1=i;
                            for(var k=0;k<componentBucket[i].NIC.length;k++)
                            {
                                if(componentBucket[i].NIC[k].NICName==NIC1)
                                {
                                    NIC1=k;
                                }
                            }
                            console.log(NIC1);
                        }
                        if(componentBucket[i]!=null&&componentBucket[i].componentName==com2)
                        {
                            com2=i;
                            for(k=0;k<componentBucket[i].NIC.length;k++)
                            {
                                if(componentBucket[i].NIC[k].NICName==NIC2)
                                {
                                    NIC2=k;
                                }
                            }
                            console.log(NIC2);
                        }
                    }
                    linkNICToNICByIndex(com1,com2,NIC1,NIC2);
                }
                //switch1 sliver1
                //host1 sliver1
                //host_of3 sliver2
                //switch_of4 sliver2
                //-----------------slice
                for(var i=0;i<tempSliceBucket.length;i++)
                {
                    SliceBucket.push(new createSlice(tempSliceBucket[i].slicename));
                    for(var j=0;j<tempSliceBucket[i].coms.length;j++)
                    {
                        for(var k=0;k<componentBucket.length;k++)
                        {
                            if(componentBucket[k]!=null&&componentBucket[k].componentName!=null)
                            {
                                if(tempSliceBucket[i].coms[j]==componentBucket[k].componentName)
                                {
    //                                tempSliceBucket[i].coms[j]=k;
                                    SliceBucket[SliceBucket.length-1].addComponent(componentBucket[k]);
                                    console.log(componentBucket[k].slice);
                                    break;
                                }
                            }

                        }
                    }

                }
                updateSelectSlice();
            }
        }
        else if(temp.substr(temp.indexOf("%")+1,temp.indexOf("\n")-1)=="AD_M");//don't Parse Monitor Advertisement
        else if(temp.substr(temp.indexOf("%")+1,temp.indexOf("%%")-1)=="MNT");//don't Parse Monitor Advertisement
        else//Other Msg from Server
        {
            console.log("From Server Message: " + evt.data);
        }
    };
    ws.onclose = function()//When Connection Close
    {
        console.log("Successful Close Connection : "+ws.url);
        updateGeneratorLinkStatus(1);
//        connectServer_LoadAD();
    };
    ws.onerror = function(err)//When Connection Error
    {
        console.error("Error: " + err);
        updateGeneratorLinkStatus(1);
//        connectServer_LoadAD();
    };
    ws.sendMsg= function(msg)//send Message to Server
    {
        ws.send(msg);
    };
    return ws;//return this websocket
}