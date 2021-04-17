function showButton(){
    if(document.getElementById('confirmCheck').checked == true){
        for(var i = 0; i < document.getElementsByClassName('subscribeButton').length; i++){
            document.getElementsByClassName('subscribeButton')[i].style.opacity = 1
            document.getElementsByClassName('subscribeButton')[i].disabled = false
        }
    }else{
        for(var i = 0; i < document.getElementsByClassName('subscribeButton').length; i++){
            document.getElementsByClassName('subscribeButton')[i].style.opacity = 0.5
            document.getElementsByClassName('subscribeButton')[i].disabled = true
        }  
    }
}

// function addEmail(){
//     $.ajax({
//         url : 'myurl',
//         method : 'delete',
//         data : {
//            itemid :id
//         }
//    })
// }