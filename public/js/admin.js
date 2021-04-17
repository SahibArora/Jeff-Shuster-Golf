window.onload = function(){
    document.getElementById('bookings').style.display = 'block'
    showBookings()
}

function showContent(contentId){
if(contentId == 'bookings'){
        document.getElementById('messages').style.display = 'none'
        document.getElementById('subscribers').style.display = 'none'
        document.getElementById('bookings').style.display = 'block'
        showBookings()
    }else if(contentId == 'messages'){
        document.getElementById('subscribers').style.display = 'none'
        document.getElementById('bookings').style.display = 'none'
        document.getElementById('messages').style.display = 'block'
        showMessages()
    }else if(contentId == 'subscribers'){
        document.getElementById('bookings').style.display = 'none'
        document.getElementById('messages').style.display = 'none'
        document.getElementById('subscribers').style.display = 'block'
        showSubcribers()
    }
}

function showBookings() {
    fetch('/admin/getContact').then(function(res){
        res.json().then(async function(data){
            if(data){
                //const serviceSlots = ['0900','0930','1000','1030','1100','1130','1200','1230','1300','1330','1400','1430','1500','1530','1600','1630','1700','1730','1800','1830','1900','1930','2000','2030','2100','2130']
                var numberOfSlots = 0;
                var noDate = 0;

                var element = document.getElementById('listBookings');
                var html = '<table style="border: 1px solid black; border-collapse: separate;border-spacing: 30px;"><tr><td><strong>Name</strong></td><td><strong>Email</strong></td><td><strong>Service Interest</strong></td><td><strong>Subject</strong></td><td><strong>Date of Booking (dd-mm-yyyy)</strong></td><td><strong>Booked Time</strong></td><td><strong>Slots Booked</strong></td><td><strong>Action</strong></td></tr>'

                for(var i = 0 ; i < data.length; i++){
                    if(data[i].serviceInterest == 'Driver Fitting'){
                        numberOfSlots = 2
                    }else if(data[i].serviceInterest == 'Iron Fitting'){
                        numberOfSlots = 3
                    }else if(data[i].serviceInterest == 'Wedge Fitting'){
                        numberOfSlots = 2
                    }else if(data[i].serviceInterest == 'Full Bag Fitting'){
                        numberOfSlots = 7
                    }else if(data[i].serviceInterest == 'Long Game Fitting'){
                        numberOfSlots = 5
                    }else if(data[i].serviceInterest == 'Short Game Fitting'){
                        numberOfSlots = 4
                    }else if(data[i].serviceInterest == 'Putter Fitting'){
                        numberOfSlots = 2
                    }else if(data[i].serviceInterest == 'Lie/Loft Fitting'){
                        numberOfSlots = 1
                    }else if(data[i].serviceInterest == 'Re-shafting/Repairs'){
                        numberOfSlots = 1
                    }else if(data[i].serviceInterest == 'Other'){
                        numberOfSlots = 1
                    }

                    if(data[i].date == null){
                        noDate++    
                        continue
                    }

                    html += '<tr><td>'+data[i].name + '</td><td>' + data[i].email_form +'</td><td>' + data[i].serviceInterest + '</td><td>' + data[i].subject + '</td><td>' + (new Date(data[i].date).getDate()+1)+'-'+new Date(data[i].date).getMonth()+'-'+new Date(data[i].date).getFullYear() + '</td><td>' + data[i].timeSlot + ' hrs</td><td>' + numberOfSlots + '</td><td><a href="/admin/delete/contactInfo/booking/' + data[i]._id + '">delete</a></td></tr>'
                }
                html += '</table> <br><h3>Total - ' + (data.length - noDate) + '</h3>'
                element.innerHTML = html
            }
        })
    })

}

function showMessages(){
    fetch('/admin/getContact').then(function(res){
        res.json().then(async function(data){
            if(data){
                var element = document.getElementById('listMessages');
                var html = '<table style="border: 1px solid black; border-collapse: separate;border-spacing: 30px;"><tr><td><strong>Name</strong></td><td><strong>Email</strong></td><td><strong>Subject</strong></td><td><strong>Message</strong></td><td><strong>Has a Booking</strong></td><td><strong>Date and Time Message Sent</strong></td><td><strong>Action</strong></td></tr>'
                var noData = 0

                for(var i = 0 ; i < data.length; i++){
                    if(data[i].message == ''){
                        noData++
                        continue
                    }
                    html += '<tr><td>'+data[i].name + '</td><td>' + data[i].email_form +'</td><td>' + data[i].subject + '</td><td>' + data[i].message + '</td><td>' + (data[i].date == null ? "No" : "<mark>Yes</mark>") + '</td><td>' + new Date(data[i].createdAt) + '</td><td><a href="/admin/delete/contactInfo/message/' + data[i]._id + '">delete</a></td></tr>'
                }
                html += '</table> <br> <h3>Total - ' + (data.length-noData) + '</h3>'
                element.innerHTML = html
            }
        })
    })
}

function showSubcribers(){
    fetch('/admin/email').then(function(res){
        res.json().then(async function(data){
            if(data){
                var element = document.getElementById('listEmails');
                var html = '</h3><table style="border: 1px solid black; border-collapse: separate;border-spacing: 30px;"><tr><td><strong>Email</strong></td><td><strong>Registered On </strong></td><td><Strong>Action</strong></td></tr>'

                for(var i = 0 ; i < data.length; i++){
                    html += '<tr><td>'+data[i].email + '</td><td>' + new Date(data[i].createdAt) +'</td><td><a href="/admin/email/delete/' + data[i].email + '">Delete</a></td></tr>'
                }

                html += '</table> <br> <h3>Total - ' + data.length + '</h3>'
                element.innerHTML = html
            }
        })
    })
}