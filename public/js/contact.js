window.onload = (event) => {
    if(document.getElementById('serviceInterest').value == ''){
        document.getElementById('time_slots').style.display = 'none'
        document.getElementById('date').required = false
        document.getElementById('timeSlot').required = false
    }else{
        document.getElementById('time_slots').style.display = ''
        document.getElementById('date').required = true
        document.getElementById('timeSlot').required = true
    }
}

function validateEmail(){
    var email = document.getElementById('email_form').value;
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase()) == false){
        document.getElementById('errorEmail').style.display = ''
        document.getElementById('email_form').style.borderColor = 'red'
        return false
    }
    document.getElementById('errorEmail').style.display = 'none'
    document.getElementById('email_form').style.borderColor = 'green'
    
    return true
}  

function validateForm(){
    
    if(document.getElementById('date').value == ''){
        return true && validateEmail()
    }else{
        var d = moment(document.getElementById('date').value).add(new Date().getHours(), 'hours').add(new Date().getMinutes(), 'minutes').add(new Date().getSeconds()+1, 'seconds')
        var nowDate = moment(new Date())
        if(nowDate <= d){
            return true && validateEmail()
        }else{
            document.getElementById('errorDate').style.display = 'block'
            document.getElementById('date').style.border = '1px solid red'
            return false && validateEmail()
        }
    }
}

function showTimeSlots() {
    if(document.getElementById('serviceInterest').value == ''){
        document.getElementById('time_slots').style.display = 'none'
        document.getElementById('date').required = false
        document.getElementById('date').value = ''
        document.getElementById('errorDate').style.display = 'none'
        document.getElementById('date').style.border = '1px solid black'
        document.getElementById('timeSlot').required = false
        document.getElementById('timeSlot').value = ''
        document.getElementById('message').required = true
        document.getElementById('messageRequired').style.display = 'inline'
    }else{
        document.getElementById('time_slots').style.display = ''
        document.getElementById('date').required = true
        document.getElementById('timeSlot').required = true
        document.getElementById('message').required = false
        document.getElementById('messageRequired').style.display = 'none'
        datePicked()
    }
}

function datePicked(){
    document.getElementById('timeSlot').disabled = false
    document.getElementById('timeSlot').value = ''
    if(document.getElementById('date').value == ''){

    }else{
        var d = moment(document.getElementById('date').value).add(new Date().getHours(), 'hours').add(new Date().getMinutes(), 'minutes').add(new Date().getSeconds()+1, 'seconds')
        var nowDate = moment(new Date())

        if(nowDate <= d){
            document.getElementById('errorDate').style.display = 'none'
            document.getElementById('date').style.border = '1px solid black'
        
            // fetching data at user enetered date
            var url = '/booking/'+document.getElementById('date').value
        
            fetch(url).then(function(res){
                res.json().then(async function(data){
                    if(data){
                        showAvailableTimeSlot(data)
                    }
                })
            })

        }else{
            document.getElementById('errorDate').style.display = 'block'
            document.getElementById('date').style.border = '1px solid red'
            document.getElementById('timeSlot').disabled = true
        }
    }
}

function showAvailableTimeSlot(bookings){
    var serviceInterest = document.getElementById('serviceInterest').value
    var numberOfSlots = 0;
    var found = 0
    var hide = 0 // Max - 26

    if(serviceInterest == 'Driver Fitting'){
        numberOfSlots = 2
    }else if(serviceInterest == 'Iron Fitting'){
        numberOfSlots = 3
    }else if(serviceInterest == 'Wedge Fitting'){
        numberOfSlots = 2
    }else if(serviceInterest == 'Full Bag Fitting'){
        numberOfSlots = 7
    }else if(serviceInterest == 'Long Game Fitting'){
        numberOfSlots = 5
    }else if(serviceInterest == 'Short Game Fitting'){
        numberOfSlots = 4
    }else if(serviceInterest == 'Putter Fitting'){
        numberOfSlots = 2
    }else if(serviceInterest == 'Lie/Loft Fitting'){
        numberOfSlots = 1
    }else if(serviceInterest == 'Re-shafting/Repairs'){
        numberOfSlots = 1
    }else if(serviceInterest == 'Other'){
        numberOfSlots = 1
    }

    const timeSlots = ['0900','0930','1000','1030','1100','1130','1200','1230','1300','1330','1400','1430','1500','1530','1600','1630','1700','1730','1800','1830','1900','1930','2000','2030','2100','2130']
    const availableSlots = ['0900','0930','1000','1030','1100','1130','1200','1230','1300','1330','1400','1430','1500','1530','1600','1630','1700','1730','1800','1830','1900','1930','2000','2030','2100','2130']

    for(var i = 0; i < timeSlots.length; i++){
        document.getElementById(timeSlots[i]).style.display = 'block'
    }

    if(bookings.timeSlots != undefined){
        for(var i = 0; i < bookings.timeSlots.length; i++){
            document.getElementById(bookings.timeSlots[i]).style.display = 'none'
            hide++
        }
    }

    for(var i = 0 ; i < availableSlots.length; i++){
        if(bookings.timeSlots != undefined){
            for(var j = 0; j < bookings.timeSlots.length; j ++){
                if(availableSlots[i] == bookings.timeSlots[j]){
                    availableSlots[i] = 'no'
                }
            }
        }
    }

    for(var i = 0 ; i < availableSlots.length; i++){
        if(availableSlots[i] == 'no'){
            continue
        }

        if((i+numberOfSlots) <= availableSlots.length){
            for(var j = i ; j < numberOfSlots+i; j++){
                if(availableSlots[j] == 'no'){
                    found = 1 
                }
            }
            if(found == 1){
                document.getElementById(availableSlots[i]).style.display = 'none'
                hide++
            }
            found = 0
        }else{
            if(availableSlots[i] != 'no'){
                document.getElementById(availableSlots[i]).style.display = 'none'
                hide++
            }
        }
    }
    if(hide == 26){
        document.getElementById('errorTime').style.display = 'block'
        document.getElementById('timeSlot').style.border = '1px solid red'
    }else{
        document.getElementById('errorTime').style.display = 'none'
        document.getElementById('timeSlot').style.border = '0.5px solid black'
    }   
}