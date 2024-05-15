function Show() {
    var element = document.getElementById("change__information");
    var style = window.getComputedStyle(element);
    //  Thông tin cá nhân
    var icon = document.getElementById("information__list--items__icon");
    var colorText = document.getElementById("information__list");
    //  Thay đổi thông tin
    var ChangeInformation = document.getElementById("Change_information");
    var information = document.querySelector('.information')
    var changepass = document.getElementById('Change_password');

    // var icon_changeinfo = document.querySelector("#change__info--icon");
    // var color_changeinfo = document.querySelector("#change__info");
    var schedule = document.getElementById("Schedule");
    var registerSchedule = document.getElementById("Register_Schedule")
    var registerScheduleIcon = document.getElementById("Register_Schedule--icon")
    
    var colorTextChangInfor = document.querySelector('#change__info')
    var iconChangeInfor = document.querySelector('#change__info--icon')
    var icon_changepass = document.querySelector('#change__password--icon');
    var color_changepass = document.querySelector('#change__password');
    
    var areaRegistedSchedule = document.getElementById("ScheduleRegisted");
    var RegistedIcon = document.getElementById('Registed__Schedule--Icon')
    var RegistedText = document.getElementById('Registed__Schedule')

    if(style.display === "none" || icon.style.transform === "" || information.style.display ==="none") {
        ChangeInformation.style.display = "none";
        information.style.display = 'block';
        element.style.display = "block";
        schedule.style.display = "none";
        areaRegistedSchedule.style.display = "none";
        icon.style.transform = "rotate(90deg)";
        colorText.style.color = "#33b5e5";
        icon.style.color = "#33b5e5";   
        element.style.color = "#fff";
        registerSchedule.style.color = "#fff";
        registerScheduleIcon.style.color = "#fff";
        changepass.style.display = 'none';
        colorTextChangInfor.style.color = "#fff";
        iconChangeInfor.style.color = "#fff";
        icon_changepass.style.color = "#fff";
        color_changepass.style.color = "#fff";
        RegistedIcon.style.color = "#fff";
        RegistedText.style.color = "#fff";
    }
    else {
        element.style.display = "none";
        areaRegistedSchedule.style.display = "none";
        icon.style.transform = "";
        colorText.style.color = "#fff";
        icon.style.color = "#fff";
        schedule.style.display = "none";
        registerSchedule.style.color = "#fff";
        registerScheduleIcon.style.color = "#fff";
        colorTextChangInfor.style.color = "#fff";
        iconChangeInfor.style.color = "#fff";
        icon_changepass.style.color = "#fff";
        color_changepass.style.color = "#fff";
        RegistedIcon.style.color = "#fff";
        RegistedText.style.color = "#fff";
    }
}

function ShowchangInfor() {
    var information = document.getElementById("information");
    var ChangeInformation = document.getElementById("Change_information");
    var colorText = document.querySelector('#change__info')
    var icon = document.querySelector('#change__info--icon')
    var iconinfor = document.getElementById("information__list--items__icon");
    var colorTextinfor = document.getElementById("information__list");

    var changepass = document.querySelector('.Change_password')
    var icon_changepass = document.querySelector('#change__password--icon')
    var color_changepass = document.querySelector('#change__password');

    var schedule = document.getElementById("Schedule");
    var registerSchedule = document.getElementById("Register_Schedule");
    var registerScheduleIcon = document.getElementById("Register_Schedule--icon");

    var areaRegistedSchedule = document.getElementById("ScheduleRegisted");
    var RegistedIcon = document.getElementById('Registed__Schedule--Icon')
    var RegistedText = document.getElementById('Registed__Schedule')

    if(ChangeInformation.style.display === "none") {
        ChangeInformation.style.display = "block";
        information.style.display = "none";
        areaRegistedSchedule.style.display = "none";
        colorText.style.color = '#33b5e5';
        icon.style.color = '#33b5e5';
        iconinfor.style.color = '#fff';
        colorTextinfor.style.color = '#fff';
        changepass.style.display = 'none';

        icon_changepass.style.color = '#fff';
        color_changepass.style.color = '#fff';

        schedule.style.display = "none";
        registerSchedule.style.color = "#fff";
        registerScheduleIcon.style.color = "#fff";

        RegistedIcon.style.color = "#fff";
        RegistedText.style.color = "#fff";
    }
    else {
        ChangeInformation.style.display = "none"
        schedule.style.display = "none";
        registerSchedule.style.color = "#fff";
        registerScheduleIcon.style.color = "#fff";

        areaRegistedSchedule.style.display = "none";
        RegistedIcon.style.color = "#fff";
        RegistedText.style.color = "#fff";
    }
}

function ShowPassword() {
    var showPassword = document.getElementById("show__password");
    var password = document.getElementById("password");
    if(showPassword.checked) {
        password.type = "text";
    }
    else {
        password.type = "password";
    }
}

function ShowChangePassword() {
    var showPassword = document.getElementById("changePassword__show--password");
    var passwordOld = document.getElementById("password__old");
    var password = document.getElementById("passwordnew");
    var Confirmpassword = document.getElementById("confirmpassword--new");
    if(showPassword.checked) {
        passwordOld.type = "text";
        password.type = "text";
        Confirmpassword.type = "text";
    }
    else {
        passwordOld.type = "password";
        password.type = "password";
        Confirmpassword.type = "password";
    }
}


function ShowchangPassword() {
    var information = document.getElementById("information");
    var ChangeInformation = document.getElementById("Change_information");
    var ChangePassword = document.getElementById("Change_password");
    // Xóa màu
    var icon = document.getElementById("information__list--items__icon");
    var colorText = document.getElementById("information__list");
    var colorTextChangeInfroIcon = document.getElementById("change__info--icon");
    var colorTextChangeInfro = document.getElementById("change__info");
    //
    var colorTextChangePasswordIcon = document.getElementById("change__password--icon");
    var colorTextChangePassword = document.getElementById("change__password");

    var schedule = document.getElementById("Schedule");
    var registerSchedule = document.getElementById("Register_Schedule")
    var registerScheduleIcon = document.getElementById("Register_Schedule--icon")

    var areaRegistedSchedule = document.getElementById("ScheduleRegisted");
    var RegistedIcon = document.getElementById('Registed__Schedule--Icon')
    var RegistedText = document.getElementById('Registed__Schedule')

    if(ChangePassword.style.display === "none") {
        ChangePassword.style.display = "block";
        information.style.display = "none";
        ChangeInformation.style.display = "none";
        colorText.style.color = "#fff";
        icon.style.color = "#fff"; 
        colorTextChangeInfroIcon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePasswordIcon.style.color = "#33b5e5" ;
        colorTextChangePassword.style.color = "#33b5e5";
        schedule.style.display = "none";
        registerSchedule.style.color = "#fff";
        registerScheduleIcon.style.color = "#fff";

        areaRegistedSchedule.style.display = "none";
        RegistedIcon.style.color = "#fff";
        RegistedText.style.color = "#fff";
    }
    else {
        ChangePassword.style.display = "none";
        ChangeInformation.style.display = "none"
        colorText.style.color = "#33b5e5";
        icon.style.color = "#33b5e5";
        colorTextChangeInfroIcon.style.color = "#fff" ;
        colorTextChangeInfro.style.color = "#fff";
        colorTextChangePasswordIcon.style.color = "#fff" ;
        colorTextChangePassword.style.color = "#fff";
        schedule.style.display = "none";
        registerSchedule.style.color = "#fff";
        registerScheduleIcon.style.color = "#fff";

        areaRegistedSchedule.style.display = "none";
        RegistedIcon.style.color = "#fff";
        RegistedText.style.color = "#fff";
    }

}

function ShowChangePassword() {
    var showPassword = document.getElementById("changePassword__show--password");
    var passwordOld = document.getElementById("account__infor--email__input");
    var password = document.getElementById("password__new");
    var Confirmpassword = document.getElementById("confirm__password--new");
    if(showPassword.checked) {
        passwordOld.type = "text";
        password.type = "text";
        Confirmpassword.type = "text";
    }
    else {
        passwordOld.type = "password";
        password.type = "password";
        Confirmpassword.type = "password";
    }
}