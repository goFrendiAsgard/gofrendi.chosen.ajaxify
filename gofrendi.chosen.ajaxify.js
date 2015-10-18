// USAGE:
// $('#some_input_id').chosen();
// chosen_ajaxify('some_input_id', 'http://some_url.com/contain/');

// REQUEST WILL BE SENT TO THIS URL: http://some_url.com/contain/some_term

// AND THE EXPECTED RESULT (WHICH IS GOING TO BE POPULATED IN CHOSEN) IS IN JSON FORMAT
// CONTAINING AN ARRAY WHICH EACH ELEMENT HAS "value" AND "caption" KEY. EX:
// [{"value":"1", "caption":"Go Frendi Gunawan"}, {"value":"2", "caption":"Kira Yamato"}]

function chosen_ajaxify(id, ajax_url){
    console.log($('.chosen-search input').autocomplete);
    $('div#' + id + '_chosen .chosen-search input').keyup(function(){
        var keyword = $(this).val();
        //$('div#' + id + '_chosen ul.chosen-results').empty();
        $("#"+id).empty();
        $.ajax({
            url: ajax_url + keyword,
            dataType: "json",
            success: function(response){
                // MAP, just as in functional programming :)
                $.map(response, function(item){
                    $('#'+id).append('<option value="' + item.value + '">' + item.caption + '</option>');
                });
                $("#"+id).trigger("chosen:updated");
                $('div#' + id + '_chosen').removeClass('chosen-container-single-nosearch');
                $('div#' + id + '_chosen .chosen-search input').val(keyword);
                $('div#' + id + '_chosen .chosen-search input').removeAttr('readonly');
                $('div#' + id + '_chosen .chosen-search input').focus();

            }
        });
    });
}
