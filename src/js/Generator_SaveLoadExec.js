/**
 * Created by Blake on 2014/6/22.
 */
//Communicate to Server
function SaveRequestToServer()//Save Request to Server
{
    var filename=document.getElementById('SaveRequestInput').value;
    webSocket.send("%SV%%"+filename+".xml\n"+generateRspecXml());
    $j('#SaveRequest').modal('hide');
}
function LoadRQListfromServer()//Load Request List from Server
{
    webSocket.send("%LD%%REQLIST\n");
}
function LoadRequestfromServer()//Load RequestXml from Server
{
    webSocket.send("%LD%%XML%%%"+requestBucket[document.getElementById('LoadRequestSelect').value]+"\n");
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
    $j('#LoadRequest').modal('hide');
}
function connectServer_LoadAD()//Connect to Server & Load AD
{
    webSocket=createWebSocket();
}
function sendScheduleToServer()//Send Schedule to Server
{
    var msg=schedulingMsg();
    if(msg!=false)
    {
        webSocket.send("%SCD%%"+msg+"%%%\n");
        $j('#Schedule').modal('hide');
    }
    else
        updateScheduleFormatStatus();
}
function schedulingMsg()//Schedule Message
{
    var msg;
    var selectIndex=document.getElementById('ScheduleRequestSelect').value;
    var inputDate=document.getElementById('ScheduleSelect').children[0].value;
    msg="0|"+inputDate.toString()+"|"+"./Request/"+requestBucket[selectIndex].toString();
    if(selectIndex!=null&&inputDate!="")
    {
        return msg;
    }
    else
        return false;
}