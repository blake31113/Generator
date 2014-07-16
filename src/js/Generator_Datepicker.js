/**
 * Created by Blake on 2014/6/24.
 */
function setDatePicker()//Sete Schedule Date Picker
{
    $j(function()
    {
        $j('#ScheduleSelect').datetimepicker({
            language: 'pt-BR'
        });
    });
}