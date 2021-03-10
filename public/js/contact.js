function validateEmail(){
    var email = document.getElementById('email-form').value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase()) == false){
        alert('Please enter Valid email address');
        document.getElementById('email-form').style.borderColor = 'red'
        return false
    }

    document.getElementById('email-form').style.borderColor = 'green'
    return true
}   