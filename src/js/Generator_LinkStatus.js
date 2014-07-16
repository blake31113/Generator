/**
 * Created by ~~ on 2014/6/21.
 */
function updateGeneratorLinkStatus(num)//Update Server Status
{
    var divlinkstatus=document.getElementById('GeneratorLinkStatus');
    divlinkstatus.innerHTML=null;
    var strongdiv=document.createElement("strong");
    var spandiv=document.createElement("span");
    if(num==0)
    {
        divlinkstatus.className="alert alert-success alert-dismissable";
        strongdiv.innerHTML="Successful!";
        spandiv.innerHTML="Successfully connect to Server!";
    }
    else
    {
        divlinkstatus.className="alert alert-danger alert-dismissable";
        strongdiv.innerHTML="Error!";
        spandiv.innerHTML="Cannot connect to Server!";
    }
    divlinkstatus.appendChild(strongdiv);
    divlinkstatus.appendChild(document.createElement("br"));
    divlinkstatus.appendChild(spandiv);
}