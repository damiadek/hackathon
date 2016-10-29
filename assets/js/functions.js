var working_hour_array;

// close alert button
function closeAlert(){
	var _al_msg = $(".alert.message");
	_al_msg.find(".fa.fa-close").off("click");
	_al_msg.find(".fa.fa-close").click(function(){
		_al_msg.slideUp();
	});
}

// display alert
function _alert(d, parent, _aclass){
	parent.find('.alert.message').slideUp();
	parent.find(".alert.message").html(d + '<i class="fa fa-close pull-right"></i>');
	parent.find(".alert.message").attr("class" , _aclass).slideDown();
	closeAlert();
}

// success alert
function successAlert(data, parent){
	_alert(data, parent, "alert alert-success message");
}

// error alert
function errorAlert(data, parent){
	_alert(data, parent, "alert alert-danger message");
}

// display loading anim
function showLoading(){
	$('.load_cover').show();
}

// hide loading anim
function hideLoading(){
	$('.load_cover').delay(2000).fadeOut(400,function(){
		setHeight();
	});
}

//show blanket
function showBlanket(msg){
    $("body").append(
        '<div class="blanket">' +
        '<span onclick="closeBlanket()">&times;</span>'+
        '<div class="content" ></div>'+
        '</div>'
    );
    $(".content").append(msg);
    $(".blanket").fadeIn();
}

function closeBlanket(){
    $(".blanket").fadeOut(1000, function () {
        $(".blanket").remove();
    });
}

// scrolling function
function smoothScroll(link){
    var $anchor = $(link);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
}

// set container height to body height
function setHeight(){
	var body_height = $(window).innerHeight();
	$(".page-wrapper, .side-nav.wrapper").css("min-height", body_height);
	body_height = parseInt($("body").height()) - 250;
	$(".side-nav.wrapper").css("height", body_height);
}

function addSpinner($button){
    $button.prop("disabled", true);
    $button.append('<span class="fa fa-refresh fa-spin btn_spinner pull-right"></span>');
}

function removeSpinner(parent){
    var $spinner_class = '.btn_spinner';
    var $parent = $($spinner_class).parent();
    $parent.prop('disabled', false);
    if (parent == null || $(parent).length !== 1) {
        $('.btn_spinner').remove();
    }else{
        $(parent).find($spinner_class).remove();
    }
}

// toggle scroll to top arrow display
function toggleArrow(){
	var top = $(document).scrollTop();
	if (top>250) {
		$("#doc_arrow").fadeIn();
	}
	else{
		$("#doc_arrow").fadeOut();
	}
}


//check form fields
function checkForm(parent){
    var check = 1;
    $.each(parent.find("input, select"), function(i, data) {
        data = $(data).val();
        if (data == "") {
            check = 0;
        }
    });
    return check;
}

//swap booking fields
function swapBookingForms($this){
    var this_form = $this.closest(".form_div"),
        check = checkForm(this_form),
        next_form = $("#" + $this.attr("target"));

    if (!($this.hasClass("prev")) && check == 0){
        errorAlert("Please fill all fields", this_form, "alert-danger");
        return;
    }

    var parent = $("#booking_parent"),
        $btn = $this;
    parent.css("opacity", "0.5");
    addSpinner($btn);
    this_form.fadeOut(400, function () {
        next_form.fadeIn();
        parent.css("opacity", "1");
    });
    removeSpinner($btn);
    $(".alert.message").slideUp();
}

//get services
function getServices(){
    var type = "GET",
        url = base_url + "service/" + api_key,
        data = "",
        callBack= new Service("get"),
        ajax = new Ajax(type, url, data, callBack);
        //ajax.submit();
        callBack.action({
            "status": true,
            "data": [
                {
                    "service_id": 1,
                    "service": "dentist",
                    "active_status": 1,
                    "time_created": "2016-09-23 18:09:31",
                    "time_modified": "2016-09-23 18:09:31"
                },
                {
                    "service_id": 3,
                    "service": "gynaecologist",
                    "active_status": 1,
                    "time_created": "2016-09-23 18:09:39",
                    "time_modified": "2016-09-23 18:09:39"
                }
            ]
        });
}

//display confirmation modal
function modalDisplay(option, text){
    var modal = $("#modal_display");
    modal.find(".modal-title").html(
        'Do you want to '+option+' <b class="text-primary">' + text + '</b> ? '
        +'<button class="btn btn-success m-r-xs" data-dismiss="modal" id="yes">Yes</button> '
        +'<button class="btn btn-danger" data-dismiss="modal">No</button>'
    ).css("text-align","center");
    modal.find(" .modal-body").html('');
    modal.find(" .modal-footer").html('');
    modal.modal("toggle");
}

// generate years and months
function genYearsMonths(){
    var date = new Date(),
        _y = date.getFullYear(),
        $yob = $("#yob"),
        str = "";
    for (var i = _y; i >= 1940; i--){
        str+="<option value=" + Number(i) + ">" + i + "</option>";
    }
    $yob.append(str);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        str = "";
    var j;
    var $mob = $("#mob");
    for (i = 0; i < months.length; i++) {
        j = (i+1).toString();
        j.length == 1 ? j = 0 + j : j;
        str += "<option value='"+ Number(j) +"'>"+ months[i] +"</option>"
    }
    $mob.append(str);
    genDays(1);
}


// date
function formatDateTime(date_time){
    date_time = new Date(date_time);
    var curr_date = date_time.toDateString();
    var curr_time = date_time.toTimeString().split(" ")[0];
    var curr_date_array = curr_date.split(" ");
    var date = curr_date_array[2];
    curr_date_array = setDayString(date, curr_date_array);
    curr_time = setTimeString(curr_time);
    if (typeof(curr_date_array) != "string"){
        day = date.split("")[1];
        if (day == 1) {
            curr_date_array[2]+="st";
        }else if (day == 2) {
            curr_date_array[2]+="nd";
        }else if (day == 3) {
            curr_date_array[2]+="rd";
        }else{
            curr_date_array[2]+="th";
        }
        curr_date = curr_date_array[2] + " " + curr_date_array[1] + ", " + curr_date_array[3];
        return curr_date + " by " + curr_time;
        return;
    }else{
        return curr_date_array + curr_time;
    }
    return;
}

function setDayString(day, curr_date_array){
    if (day.split("")[0] == 0) {
        curr_date_array[2] = day.split("")[1];
    }
    curr_date_array_ = new Date(curr_date_array.join(" "));
    curr_date_array_ = compareDays(curr_date_array_);
    if (curr_date_array_ != null) {
        curr_date_array = curr_date_array_;
    }
    return curr_date_array;
}

function compareDays(date_time){
    date_time = new Date(date_time);
    var nowDate = new Date();
    if (Number(nowDate.getUTCFullYear()) == Number(date_time.getUTCFullYear()) ) {
        if (Number(nowDate.getUTCMonth()) == Number(date_time.getUTCMonth()) ) {
            date_time_ = Number(date_time.getUTCDate()) + 1;
            if (Number(nowDate.getUTCDate()) == date_time_){
                date_time = "Today by ";
            }else if (Number(nowDate.getUTCDate()) > date_time_){
                date_time_ = Number(nowDate.getUTCDate()) - (Number(date_time.getUTCDate()) + 1);
                if (date_time_ < 7) {
                    if (date_time_ > 5 ) {
                        date_time = getDayName(date_time.getDay());
                    }else{
                        (date_time_ == 1 ) ? date_time =  "Yesterday by " : date_time = date_time_ + " days ago by ";
                    }
                }else{
                    return null;
                    return;
                }
            }
        }
        else if (Number(nowDate.getUTCMonth()) > Number(date_time.getUTCMonth()) ) {
            date_time = Number(nowDate.getUTCMonth()) - Number(date_time.getUTCMonth());
            (date_time == 1) ? "a month ago" : null;
            return;
        }
    }
    else {
        return null;
        return;
    }
    return date_time;
}

// date
function getDayName(date){
    var dayNameArray = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return dayNameArray[date];
}

// timestring
function setTimeString(curr_time){
    var curr_time_hour = Number(curr_time.split(":")[0]);
    if ( curr_time_hour == 0) {
        curr_time = 12 + ":" + curr_time.split(":")[1];
    }else if (curr_time_hour > 12) {
        curr_time = curr_time_hour - 12 + ":" + curr_time.split(":")[1];
    }else{
        curr_time = curr_time.split(":")[0] + ":" + curr_time.split(":")[1];
    }

    if (curr_time_hour > 11){
        curr_time+=" PM";
    }else{
        curr_time+=" AM";
    }
    return curr_time;
}



//generate days
function genDays(month){
    if (month == "") return;
    var i = 31,str = "",$dob = $("#dob");
    if(month == 4 || month == 6 || month == 9 || month == 11)
        i = 30;
    else if(month == 2)
        i = 29;
    for (var j = 1; j <= i; j++){
        j = j.toString();
        j.length == 1 ? j = "0" + j : j;
        str+="<option value=" + Number(j) + ">" + j + "</option>";
    }
    $dob.html("<option value=''>Day</option>").append(str);
}

//get month string
function monthString(date){
    var month_array = ["Jan.","Feb.","Mar.","Apr.","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."];
    return month_array[date];
}


function loadAppointments(doctor_id){
    $('#calendar').fullCalendar('removeEvents');
    var action = "get_doc";
    if  (doctor_id == "" || doctor_id == null || doctor_id == undefined){
        action = "get";
    }
    var type = "POST",
        url = base_url + "appointment/" + api_key,
        data = {
            access_token: $("#token").val(),
            doctor_id: doctor_id
        },
        callBack = new Appointment(action),
        ajax = new Ajax(type, url,data, callBack);
    //ajax.submit();
    var appointments_data;
    if (doctor_id == 1){
        appointments_data = [
        {
            appointment_id: 1,
            patient_name: "Mr John",
            doctor_name: "Dr. Rajkot",
            appointment_time: "2016-10-12 03:00:00"
        }];
    }
    else if(doctor_id == "" || doctor_id == null || doctor_id == undefined){
        appointments_data = [
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-10-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mrs. John",
                doctor_name: "Dr. Mrs. Rajkot",
                appointment_time: "2016-10-13 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr James",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-10-13 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-10-14 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-10-15 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-10-15 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            },
            {
                appointment_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                appointment_time: "2016-09-12 03:00:00"
            }
        ];
    }
    else if(doctor_id == 2){
        appointments_data = [
            {
                appointment_id: 2,
                patient_name: "Mrs. John",
                doctor_name: "Dr. Mrs. Rajkot",
                appointment_time: "2016-10-12 03:00:00"
            },
            {
                appointment_id: 2,
                patient_name: "Mrs. John",
                doctor_name: "Dr. Mrs. Rajkot",
                appointment_time: "2016-10-13 03:00:00"
            },
            {
                appointment_id: 2,
                patient_name: "Mrs. John",
                doctor_name: "Dr. Mrs. Rajkot",
                appointment_time: "2016-10-14 03:00:00"
            }
        ];
    }
    var appointments = {
        status: true,
        data: appointments_data
    };
    callBack.action(appointments);
}
function loadVisitations(){
    var type = "POST",
        url = base_url + "visitation/" + api_key,
        data = {
            access_token: $("#token").val()
        },
        callBack = new Visitation("getAll"),
        ajax = new Ajax(type, url,data, callBack);
    //ajax.submit();
    var visitations = {
        status: true,
        data: [
            {
                visitation_id: 1,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                "treatment_desc": "she is having malaria",
                entry_time: "2016-09-12 03:00:00"
            },
            {
                visitation_id: 2,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                "treatment_desc": "she is having malaria",
                entry_time: "2016-09-12 03:00:00"
            },
            {
                visitation_id: 3,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                "treatment_desc": "she is having malaria",
                entry_time: "2016-09-12 03:00:00"
            },
            {
                visitation_id: 4,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                "treatment_desc": "she is having malaria",
                entry_time: "2016-09-12 03:00:00"
            },
            {
                visitation_id: 5,
                patient_name: "Mr John",
                doctor_name: "Dr. Rajkot",
                "treatment_desc": "she is having malaria",
                entry_time: "2016-09-12 03:00:00"
            }
        ]
    };
    callBack.action(visitations);
}
function loadPatients(){
    var type = "POST",
        url = base_url + "patients/" + api_key,
        data = {
            access_token: $("#token").val()
        },
        callBack = new Patient("getAll"),
        ajax = new Ajax(type, url,data, callBack);
    //ajax.submit();
    var patients = {
        status: true,
        data: [
        {
            user_id: 1,
            first_name: "Patient",
            last_name: "One",
            phone_number: "080223",
            date_of_birth: "1990-03-20",
            address: "Green Road",
            email: "mail@mail.com",
            image_url: "../../assets/img/avatar1.png"
        },
        {
            user_id: 2,
            first_name: "Patient",
            last_name: "Two",
            phone_number: "080223",
            date_of_birth: "1990-03-20",
            address: "Green Road",
            email: "mail@mail.com",
            image_url: "../../assets/img/avatar1.png"
        },
        {
            user_id: 3,
            first_name: "Patient",
            last_name: "Three",
            phone_number: "080223",
            date_of_birth: "1990-03-20",
            address: "Green Road",
            email: "mail@mail.com",
            image_url: "../../assets/img/avatar1.png"
        },
        {
            patient_id: 4,
            first_name: "Patient",
            last_name: "Four",
            phone_number: "080223",
            date_of_birth: "1990-03-20",
            address: "Green Road",
            email: "mail@mail.com",
            image_url: "../../assets/img/avatar1.png"
        }
    ]
    };
    callBack.action(patients);
}
function loadWorking(){
    var type = "POST",
        url = base_url + "working-hour" + api_key,
        data = {
            access_token: $("#token").val()
        },
        callBack = new WorkingHour("all"),
        ajax = new Ajax(type, url,data, callBack);
    //ajax.submit();
    var working =
    {
        "status": true,
        "data": [
            {
                "working_hour_id": "1",
                "doctor_name": "Dr. Rajkot",
                "working_date": "1994-02-01 00:00:00",
                "start_range_time": "12:12:00",
                "stop_range_time": "15:10:00",
                "start_break": "10:00:00",
                "stop_break": "12:30:00"
            },
            {
                "working_hour_id": "1",
                "doctor_name": "Dr. Rajkot",
                "working_date": "1994-02-01 00:00:00",
                "start_range_time": "12:12:00",
                "stop_range_time": "15:10:00",
                "start_break": "10:00:00",
                "stop_break": "12:30:00"
            },
            {
                "working_hour_id": "1",
                "doctor_name": "Dr. Rajkot",
                "working_date": "1994-02-01 00:00:00",
                "start_range_time": "12:12:00",
                "stop_range_time": "15:10:00",
                "start_break": "10:00:00",
                "stop_break": "12:30:00"
            },
            {
                "working_hour_id": "1",
                "doctor_name": "Dr. Rajkot",
                "working_date": "1994-02-01 00:00:00",
                "start_range_time": "12:12:00",
                "stop_range_time": "15:10:00",
                "start_break": "10:00:00",
                "stop_break": "12:30:00"
            },
            {
                "working_hour_id": "1",
                "doctor_name": "Dr. Rajkot",
                "working_date": "1994-02-01 00:00:00",
                "start_range_time": "12:12:00",
                "stop_range_time": "15:10:00",
                "start_break": "10:00:00",
                "stop_break": "12:30:00"
            },
            {
                "working_hour_id": "1",
                "doctor_name": "Dr. Rajkot",
                "working_date": "1994-02-01 00:00:00",
                "start_range_time": "12:12:00",
                "stop_range_time": "15:10:00",
                "start_break": "10:00:00",
                "stop_break": "12:30:00"
            }
        ]
    };
    callBack.action(working);
}
function loadTreatments(){
    var type = "POST",
        url = base_url + "payment/get-payment" + api_key,
        data = {
            access_token: $("#token").val()
        },
        callBack = new Patient("loadTreatments"),
        ajax = new Ajax(type, url,data, callBack);
    //ajax.submit();
    var treatments =
        {
            "status": true,
            "data": [
                {
                    "treatment_id": "1",
                    "image_url": null,
                    "patient_name": "victoria",
                    "doctor_name": "Dr. Rajkot",
                    "payment": "100",
                    "treatment_desc": "she is having malaria",
                    "payment_type": "cash"
                },
                {
                    "treatment_id": "1",
                    "image_url": null,
                    "patient_name": "victoria",
                    "doctor_name": "Dr. Rajkot",
                    "payment": null,
                    "treatment_desc": "she is having malaria",
                    "payment_type": "cash"
                },
                {
                    "treatment_id": "1",
                    "image_url": null,
                    "patient_name": "victoria",
                    "doctor_name": "Dr. Rajkot",
                    "payment": null,
                    "treatment_desc": "she is having malaria",
                    "payment_type": "cash"
                }
            ]
        };
    callBack.action(treatments);
}
function loadPayments(){
    var type = "GET",
        url = base_url + "payment/payment-types" + api_key,
        data = "",
        callBack = new Visitation("payment type"),
        ajax = new Ajax(type, url,data, callBack);
    //ajax.submit();
    var treatments =
        {
            "status": true,
            "data": [
                {
                    "payment_type_id": 1,
                    "payment_type": "cash",
                    "active_status": 1,
                    "time_created": "2016-09-28 06:09:18",
                    "time_modified": "2016-09-28 06:09:18"
                },
                {
                    "payment_type_id": 2,
                    "payment_type": "cheque",
                    "active_status": 1,
                    "time_created": "2016-09-28 06:09:18",
                    "time_modified": "2016-09-28 06:09:18"
                },
                {
                    "payment_type_id": 3,
                    "payment_type": "online",
                    "active_status": 1,
                    "time_created": "2016-09-28 06:09:18",
                    "time_modified": "2016-09-28 06:09:18"
                }
            ]
        };
    callBack.action(treatments);
}
function loadReceptionists(){
    var type = "POST",
        url = base_url + "receptionist/" + api_key,
        data = {
            access_token: $("#token").val()
        },
        callBack = new Receptionist("getAll"),
        ajax = new Ajax(type, url,data, callBack);
    //ajax.submit();
    var receptionists = {
        status: true,
        data: [
            {
                user_id: 1,
                name: "Mrs. Receptionist",
                phone_number: "080223",
                date_of_birth: "1980-03-23",
                address: "Green Road",
                email: "mail@mail.com",
                image_url: "../../assets/img/avatar1.png",
            },
            {
                user_id: 2,
                name: "Mr. Receptionist",
                phone_number: "080223",
                date_of_birth: "1980-03-23",
                address: "Green Road",
                email: "mail@mail.com",
                image_url: "../../assets/img/avatar1.png",
            }
        ]
    };
    callBack.action(receptionists);
}
function loadDoctors(){
    var type = "POST",
        url = base_url + "doctors/" + api_key,
        data = {
            access_token: $("#token").val()
        },
        callBack = new Doctor("getAll"),
        ajax = new Ajax(type, url,data, callBack);
    //ajax.submit();
    var doctors = {
        status: true,
        data: [
            {
                user_id: 1,
                name: "Dr. Rajkot",
                phone_number: "080223",
                date_of_birth: "1980-03-23",
                address: "Green Road",
                email: "mail@mail.com",
                image_url: "../../assets/img/avatar1.png",
                service: "gynaecologist"
            },
            {
                user_id: 2,
                name: "Dr. Mrs. Rajkot",
                phone_number: "9988829",
                date_of_birth: "1980-03-23",
                address: "Green Road, India",
                email: "mail@mail.com",
                image_url: "../../assets/img/avatar2.jpg",
                service: "dentist"
            }
        ]
    };
    callBack.action(doctors);
}
function initCalendar(events_array){
    $("#calendar").fullCalendar({
        businessHours: [ // specify an array instead
            {
                dow: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
                start: '08:00', // 8am
                end: '18:00' // 6pm
            },
            {
                dow: [ 4, 5 ], // Thursday, Friday
                start: '10:00', // 10am
                end: '16:00' // 4pm
            }
        ],
        buttonText: {
            listMonth: "list"
        },
        noEventsMessage: "no appointments this month!",
        header: {
            left: ' today,listMonth',
            center: 'prev, title, next',
            right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: events_array,
        eventMouseover: function ( appointment, event) {

        }
    });
}