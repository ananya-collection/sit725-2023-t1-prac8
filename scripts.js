//card's display format
const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.Path + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.Title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.SubTitle + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.Title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.Description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}
//the form for posting data
const formSubmitted = () => {
    let formData = {};
    formData.Title = $('#Title').val();
    formData.SubTitle = $('#SubTitle').val();
    formData.Path = $('#Path').val();
    formData.Description = $('#Description').val();

    console.log(formData);
    console.log(catPost);
    catPost(formData);
    
}

function catPost(cat){
    $.ajax({
        url:'/api/cat',
        type:'POST',
        data:cat,
        success: (result)=>{
            if(result.statusCode == 201){
                alert('cat post successful');
            }
        }
    });
}

function getAllCats(){
    $.get('/api/cats', (response)=>{
        if(response.statusCode == 200){
        addCards(response.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllCats()
});