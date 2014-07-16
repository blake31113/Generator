/**
 * Created by Blake on 2014/6/22.
 */
function updateModalSliceList()//Update Modal Slice List
{
    var select=document.getElementById('DeSliceSelect');
    select.innerHTML=null;
    for(var j=0;j<SliceBucket.length;j++)//Create List
    {
        console.log(SliceBucket[j].SliceName);
        var option=document.createElement("option");
        option.innerHTML=SliceBucket[j].SliceName;
        option.setAttribute("value",j);
        select.appendChild(option);
    }
}
function updateScheduleFormatStatus()//Update Schedule Input Format Status
{
    var div=document.getElementById('ScheduleFormatStatus');
    div.setAttribute('class','alert alert-danger alert-dismissable');
    div.children[1].innerText="Wrong Format or Null Input!!";
}