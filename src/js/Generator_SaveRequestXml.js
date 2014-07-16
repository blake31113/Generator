/**
 * Created by Blake on 2014/4/7.
 */
function generateRspecXml()
{
    var xw = new XMLWriter('UTF-8');
    xw.formatting = 'indented';//add indentation and newlines
    xw.indentChar = ' ';//indent with spaces
    xw.indentation = 2;//add 2 spaces per level
    var rspecType="request";
    var generateBy="Topology_gene_test";
    var generateDate=new Date();
    generateDate.setDate(generateDate.getDate());
    var xsi_schemaLocation="http://www.geni.net/resources/rspec/3 http://www.geni.net/resources/rspec/3/request.xsd";
    var xmlns_flack="http://www.protogeni.net/resources/rspec/ext/flack/1";
    var xmlns_client="http://www.protogeni.net/resources/rspec/ext/client/1";
    var xmlns_xsi="http://www.w3.org/2001/XMLSchema-instance";
    var xmlns="http://www.geni.net/resources/rspec/3";
    xw.writeStartDocument( );
    xw.writeStartElement( 'rspec' );
    xw.writeAttributeString( 'type', rspecType );
    xw.writeAttributeString( 'generated_by', generateBy);
    xw.writeAttributeString( 'generated', generateDate);
    xw.writeAttributeString( 'xsi:schemaLocation', xsi_schemaLocation);
    xw.writeAttributeString( 'xmlns:flack', xmlns_flack);
    xw.writeAttributeString( 'xmlns:client', xmlns_client);
    xw.writeAttributeString( 'xmlns:xsi', xmlns_xsi);
    xw.writeAttributeString( 'xmlns', xmlns);
    for(i=0;i<componentBucket.length;i++)
    {
        if(componentBucket[i]!=null)
        {
            xw.writeStartElement('node');
            xw.writeAttributeString( 'client_id', componentBucket[i].componentName);
            xw.writeAttributeString( 'exclusive', 'false');
            xw.writeAttributeString( 'func_type', componentBucket[i].componentFuncType);
            xw.writeStartElement('sliver_type');
            if(componentBucket[i].slice!=null)
                xw.writeAttributeString( 'name', componentBucket[i].slice.SliceName);
            else
                xw.writeAttributeString( 'name', null);
            xw.writeEndElement();
            for(j=0;j<componentBucket[i].NIC.length;j++)
            {
                xw.writeStartElement('interface');
                xw.writeAttributeString( 'client_id', componentBucket[i].componentName+":"+componentBucket[i].NIC[j].NICName);
                xw.writeEndElement('interface');
            }
            xw.writeEndElement();
        }
    }
    for(i=0;i<linkBucket.length;i++)
    {
        if(linkBucket[i]!=null)
        {
//            console.log(linkBucket[i].Component1);
            xw.writeStartElement('link');
            xw.writeAttributeString( 'client_id', linkBucket[i].linkIndex);
                xw.writeStartElement('interface_ref');
                xw.writeAttributeString( 'client_id', linkBucket[i].Component1.componentName+":"+linkBucket[i].NIC1.NICName);//+);
                xw.writeEndElement();
                xw.writeStartElement('interface_ref');
                xw.writeAttributeString( 'client_id', linkBucket[i].Component2.componentName+":"+linkBucket[i].NIC2.NICName);//+":");
                xw.writeEndElement();
                xw.writeStartElement('property')
                xw.writeAttributeString('source_id',linkBucket[i].Component1.componentName+":"+linkBucket[i].NIC1.NICName);
                xw.writeAttributeString('dest_id',linkBucket[i].Component2.componentName+":"+linkBucket[i].NIC2.NICName);
                xw.writeEndElement();
                xw.writeStartElement('property')
                xw.writeAttributeString('source_id',linkBucket[i].Component2.componentName+":"+linkBucket[i].NIC2.NICName);
                xw.writeAttributeString('dest_id',linkBucket[i].Component1.componentName+":"+linkBucket[i].NIC1.NICName);
                xw.writeEndElement();

                xw.writeStartElement('link_type')
                xw.writeAttributeString('name','lan');
                xw.writeEndElement();
            xw.writeEndElement();
        }
    }
    xw.writeEndElement();
    xw.writeEndElement();
    xw.writeEndDocument();
    return xw.flush();
}