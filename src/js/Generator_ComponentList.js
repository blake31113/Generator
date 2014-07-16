/**
 * Created by ~~ on 2014/6/21.
 */
function updateUnuseList()//Update Unuse List
{
    var table=document.getElementById("Generator_ComponetList");
    var tbody=table.children[1];
    tbody.innerHTML=null;
    for(var i=0;i<componentData.length;i++)
    {
        if(!componentData[i].isUsed)
        {
            var tr = document.createElement("tr");
            tbody.appendChild(tr);
            var th=[]
            for(var j=0;j<4;j++)
            {
                th[j]=document.createElement("td");
                tr.appendChild(th[j]);
            }
            th[0].innerHTML = componentData[i].ID;
            th[1].innerHTML = componentData[i].name;
            th[2].innerHTML = typeTraslateITS(componentData[i].type);
            if(Math.floor(componentData[i].type/10)==1)
            {
                tr.setAttribute('class',"success");
            }
            else if(Math.floor(componentData[i].type/10)==2)
            {
                tr.setAttribute('class',"warning");
            }
            else if(Math.floor(componentData[i].type/10)==3)
            {
                tr.setAttribute('class',"info");
            }
            for(var j=0;j<componentData[i].NIC.length;j++)
                th[3].innerHTML = th[3].innerHTML+" "+componentData[i].NIC[j].NICName;
        }
    }
}