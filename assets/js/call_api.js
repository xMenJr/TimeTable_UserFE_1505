function login() {
    const loginUrl = "https://localhost:7013/api/Users/SignIn";
    const username = document.getElementById("name-login").value;
    const password = document.getElementById("password").value;
    fetch(loginUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: username,
        passWordHas: password,
        }),
    })
    .then((response) => {
        if (!response.ok) {
          alert("Đăng nhập không thành công.\nVui lòng kiểm tra lại tài khoản và mật khẩu");
        throw new Error("Đăng nhập không thành công.");
        }
        return response.json();
    })
    .then((data) => {
        // Xử lý dữ liệu trả về từ API
        // console.log(data);
        // const setjson=JSON.stringify(data);
        
        localStorage.setItem("login",data.token);
        // Thực hiện các hành động khác sau khi đăng nhập thành công
        const namelogin = data.name;
        localStorage.setItem("fullname",namelogin);
        localStorage.setItem("email",data.email);
        localStorage.setItem("avata",data.avata);
        if(data.status === "Thành công") {
            window.location.href = "main_user.html";
        }
        else {
            alert(data.token);
        }

        // localStorage.removeItem("signin");
    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
  }
  
  // sign up
  function signin() {
    const signinUrl = "https://localhost:7013/api/Users/SignUp";
    const email = document.getElementById("account").value;
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("confirmPassWord").value;
    const firstname = document.getElementById("first__name").value;
    const lastname = document.getElementById("last__name").value;
    const dateofbirth = document.getElementById("birth").value;
    var genderRadioButtons = document.getElementsByName("gender");
    var genderValue;
    for (var i = 0; i < genderRadioButtons.length; i++) {
        if (genderRadioButtons[i].checked) {
            var selectedGender = genderRadioButtons[i].value;
            genderValue = (selectedGender === "Nam") ? "1" : "0";
        }
    }
    const numberphone = document.getElementById("phonenumber").value;
    const avata = document.getElementById("avata").value;
    fetch(signinUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName:firstname,
          lastName:lastname,
          email: email,
          phoneNumber: numberphone,
          password: password,
          confirmPassword: confirmpassword,
          gender: genderValue,
          dateOfBirth: dateofbirth,
          avata: avata
        }),
    })
    .then((response) => {
        if (!response.ok) {
        alert("Đăng ký không thành công.\nVui long kiểm tra lại")
        throw new Error("Đăng ký không thành công.");
        }
        return response.json();
    })
    .then((data) => {
        // Xử lý dữ liệu trả về từ API
        alert(data.status);
        window,location.href = "index.html";
        // alert(data.result);

    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
  }
  
  function DeleteLocalStorage() {
    localStorage.removeItem("fullname");
    localStorage.removeItem("avata");
    localStorage.removeItem("login");
    localStorage.removeItem("dateofbirth");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("gender");
  }

function getInformation() {
    CheckToken();
    const getInforUrl = "https://localhost:7013/api/Users/Info";

    fetch(`${getInforUrl}?email=${localStorage.getItem("email")}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Lỗi khi gọi API");
        }
        return response.json();
    })
    .then((data) => {
        localStorage.setItem("username", data.email);
        localStorage.setItem("fullname", data.userName);
        const dateObject = new Date(data.dateOfBirth);
    
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
        const year = dateObject.getFullYear();
        
        const formattedDate = `${day}-${month}-${year}`;
        localStorage.setItem("dateofbirth", formattedDate);
        localStorage.setItem("gender", data.gender === 1 ? "Nữ" : "Nam");

        // Lấy tên đăng nhập từ localStorage
        const username = localStorage.getItem("email");
        const dateofbirth = localStorage.getItem("dateofbirth");
        const gender = localStorage.getItem("gender");
        // Hiển thị tên đăng nhập
        const nameLogin = document.getElementById("account__infor--username__input"); 
        const FullName = document.getElementById("account__infor--fullname__input"); 
        const DateOfBirth = document.getElementById("infor__list--birth__input"); 
        const Gender = document.getElementById("infor__list--gender__input"); 
        // Change infor
        const changeFirstName = document.getElementById("Change__firstName"); 
        const changeLastName = document.getElementById("Change_lastName"); 
        const changeDateOfBirth = document.getElementById("Change__dateOfBirth"); 
        const changeGender = document.getElementById("Change__gender"); 
        const changeAvata = document.getElementById("Change_avata"); 
        // get: Insert data to Input
        nameLogin.value = username; 
        FullName.value = fullname;
        DateOfBirth.value = dateofbirth;
        Gender.value = gender;

        //Change: Insert data to input 
        changeFirstName.value = data.firstName;
        changeLastName.value = data.lastName
        changeDateOfBirth.value = dateofbirth;
        changeGender.value = gender;
        changeAvata.value = localStorage.getItem("avata");
    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
}

function ChangeInformation() {
    CheckToken();
    const changeInforUrl = "https://localhost:7013/api/EditAccount";
    const changeFirstName = document.getElementById("Change__firstName").value; 
    const changeLastName = document.getElementById("Change_lastName").value; 
    const changeDateOfBirth = document.getElementById("Change__dateOfBirth").value; 
    const changeGenderInput = document.getElementById("Change__gender"); 
    const changeAvata = document.getElementById("Change_avata").value; 
    let changeGender = changeGenderInput.value.toUpperCase(); // Chuyển đổi thành chữ in hoa

    if (changeGender === "NAM") {
        changeGender = 1;
    }
    else if (changeGender === "NỮ") {
        changeGender = 0;
    }
    else {
        changeGender = 0;
    }

    var parts = changeDateOfBirth.split('-'); // Tách ngày, tháng và năm thành mảng

    if (parts.length !== 3) {
        return "Ngày không hợp lệ";
    }

    var ngay = parts[0];
    var thang = parts[1];
    var nam = parts[2];

    var ngayMoi = nam + '-' + thang.padStart(2, '0') + '-' + ngay.padStart(2, '0');
    fetch(`${changeInforUrl}?token=${localStorage.getItem("login")}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName:changeFirstName,
          lastName:changeLastName,
          gender: changeGender,
          dateOfBirth: ngayMoi,
          avata: changeAvata,
          description: ""
        }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Lỗi khi gọi API");
        }
        return response.json();
    })
    .then((data) => {
        alert(data.result);
    })
    .catch((error) => {
        // Xử lý lỗi
        console.error(error);
    });
}


let dataLoaded = false;
let tableBody = null; 
let pageIndexManagerAccount = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberManagerAccount() {
    try {
        
        const getAccountUrl = `https://localhost:7013/api/LectureSchedule/Registered_Calendar?pageIndex=${1}&pageSize=${9999}&check=${0}&Name=${'string'}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationManagerAccount(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationManagerAccount(data, currentPage) {
    const dataContainer = document.getElementById('schedule__body--allNotUser');//AccountManager__search--table
    // Hiển thị dữ liệu trong bảng
    if (!tableBody) {
        const table = document.createElement('table');
        table.id = "table__SearchRegister";
        table.classList.add("striped-table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã học phần</th>
                <th>Lớp học</th>
                <th>Phòng học</th>
                <th>Môn học</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Lịch học</th>
                <th>Đăng ký</th>
            </tr>
        </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody = table.querySelector('tbody');
    }
    else {
        tableBody.innerHTML = ''; 
    }

    tableBody.innerHTML = '';
    var stt = 1;
    data.result.forEach(item => {
        const dateObject = new Date(item.dateStart);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        //
        const dateObject1 = new Date(item.dateEnd);
        const day1 = dateObject1.getDate();
        const month1 = dateObject1.getMonth() + 1;
        const year1 = dateObject1.getFullYear();
        const formattedDate1 = `${day1}-${month1}-${year1}`;
        // if(item.monHoc === "Đồ án chuyên ngành") {
        //     alert(item.lichHocTongList);
        // }
        
        const row = document.createElement('tr');
        // console.log(item);
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.course_Code == null ? "" : item.course_Code}</td>
            <td>${item.lopHoc}</td>
            <td>${item.phongHoc}</td>
            <td>${item.monHoc}</td>
            <td>${formattedDate}</td>
            <td>${formattedDate1}</td>
            <td>${item.lichHocTongList}</td>
            <td>
                <button style = "padding: 8px; background-color: #3399CC; cursor: pointer; color: #fff;cursor: pointer;" onclick="registerSchedule('${item.idLecture_Schedule}', '${item.course_Code}',this)">Chọn</button>
            </td>
        `;
        stt++;
        tableBody.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    // const paginationContainer = document.createElement("div");
    // paginationContainer.style.margin = "20px 20px";
    // paginationContainer.style.position = "absolute";
    // paginationContainer.style.left = "40%";

    // for (let i = 1; i <= Math.ceil(data.totalRecords / 10); i++) {
    //     const button = document.createElement("button");
    //     button.style.padding = "10px 10px";
    //     button.innerText = i;

    //     button.addEventListener("click", () => {
    //         pageIndexManagerAccount = i;
    //         fetchApiWithPageNumberManagerAccount(pageIndexManagerAccount);
    //     });

    //     paginationContainer.appendChild(button);
    // }

    // tableBody.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllManagerAccountForSchedule(pageIndex) {
    CheckToken();
    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoaded) {
        await fetchApiWithPageNumberManagerAccount(pageIndex);
        dataLoaded = true;
    }
    else {
        await fetchApiWithPageNumberManagerAccount(pageIndex);
    }
}

// Search Account

let dataLoaded__search = false;
let tableBody__search = null; 
let pageIndexSearchAccount = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberSearchAccount(pageNumber, userId) {
    try {
        
        const getAccountUrl = `https://localhost:7013/api/LectureSchedule/Registered_Calendar?pageIndex=${pageNumber}&pageSize=${5}&check=${0}&Name=${userId}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationManagerAccount(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationSearchAccount(data, currentPage) {
    // lấy dữ liệu từ thẻ input
    const userId = document.getElementById("accountManager__search--name").value;
    const dataContainer = document.getElementById('schedule__body--allNotUser');
    // Hiển thị dữ liệu trong bảng
    if (!tableBody__search) {
        const table = document.createElement('table');
        table.id = "table__SearchRegister";
        table.classList.add("striped-table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã học phần</th>
                <th>Lớp học</th>
                <th>Phòng học</th>
                <th>Môn học</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Lịch học</th>
                <th>Đăng ký</th>
            </tr>
        </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody__search = table.querySelector('tbody');
    }
    else {
        tableBody__search.innerHTML = ''; 
    }

    tableBody__search.innerHTML = '';
    var stt = 1;
    data.result.forEach(item => {
        const dateObject = new Date(item.dateStart);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        //
        const dateObject1 = new Date(item.dateEnd);
        const day1 = dateObject1.getDate();
        const month1 = dateObject1.getMonth() + 1;
        const year1 = dateObject1.getFullYear();
        const formattedDate1 = `${day1}-${month1}-${year1}`;
        // if(item.monHoc === "Đồ án chuyên ngành") {
        //     alert(item.lichHocTongList);
        // }
        
        const row = document.createElement('tr');
        // console.log(item);
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.course_Code == null ? "" : item.course_Code}</td>
            <td>${item.lopHoc}</td>
            <td>${item.phongHoc}</td>
            <td>${item.monHoc}</td>
            <td>${formattedDate}</td>
            <td>${formattedDate1}</td>
            <td>${item.lichHocTongList}</td>
            <td>
                <button style = "padding: 8px; background-color: #3399CC; cursor: pointer; color: #fff;cursor: pointer;" onclick="registerSchedule('${item.idLecture_Schedule}', '${item.course_Code}' ,this)">Chọn</button>
            </td>
        `;
        stt++;
        tableBody__search.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "40%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexSearchAccount = i;
            fetchApiWithPageNumberSearchAccount(pageIndexSearchAccount, userId);
        });

        paginationContainer.appendChild(button);
    }

    tableBody__search.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllSearchAccountForSchedule(pageIndex) {
    CheckToken() ;
    //Hiển thị
    var areaRegisterSchedule = document.getElementById("Schedule");
    var information = document.getElementById("information");
    var changeInformation = document.getElementById("Change_information");
    var changePass = document.getElementById("Change_password");
    var areaRegistedSchedule = document.getElementById("ScheduleRegisted");
    //Đổi màu
    var registerSchedule = document.getElementById("Register_Schedule")
    var registerScheduleIcon = document.getElementById("Register_Schedule--icon")
    var colorText = document.querySelector('#change__info')
    var icon = document.querySelector('#change__info--icon')
    var iconinfor = document.getElementById("information__list--items__icon");
    var colorTextinfor = document.getElementById("information__list");
    var icon_changepass = document.querySelector('#change__password--icon')
    var color_changepass = document.querySelector('#change__password')
    var RegistedIcon = document.getElementById('Registed__Schedule--Icon')
    var RegistedText = document.getElementById('Registed__Schedule')
    if(areaRegisterSchedule.style.display === "none") {
        //Hiển thị
        areaRegisterSchedule.style.display = "block";
        information.style.display = "none";
        changeInformation.style.display = "none";
        changePass.style.display = "none";
        areaRegistedSchedule.style.display = "none";
        //Đổi màu
        
        colorText.style.color = "#fff";
        icon.style.color = "#fff";
        iconinfor.style.color = "#fff";
        colorTextinfor.style.color = "#fff";
        icon_changepass.style.color = "#fff";
        color_changepass.style.color = "#fff";
        registerSchedule.style.color = "#33b5e5";
        registerScheduleIcon.style.color = "#33b5e5";
        RegistedIcon.style.color = "#fff";
        RegistedText.style.color = "#fff";
    }
    else {
        areaRegisterSchedule.style.display = "block";
        information.style.display = "none";
        changeInformation.style.display = "none";
        changePass.style.display = "none";
        areaRegistedSchedule.style.display = "none";
        //Đổi màu
        colorText.style.color = "#fff";
        icon.style.color = "#fff";
        iconinfor.style.color = "#fff";
        colorTextinfor.style.color = "#fff";
        icon_changepass.style.color = "#fff";
        color_changepass.style.color = "#fff";
        registerSchedule.style.color = "#33b5e5";
        registerScheduleIcon.style.color = "#33b5e5";
        RegistedIcon.style.color = "#fff";
        RegistedText.style.color = "#fff";
    }
    //Lấy dữ liệu thẻ input để search
    const userId = document.getElementById("search__register--schedule").value;
    // Gọi API ban đầu với số trang pageIndex
    if(userId === "") {
        if (!dataLoaded) {
            await fetchApiWithPageNumberManagerAccount(pageIndex);
            dataLoaded = true;
        }
        else {
            await fetchApiWithPageNumberManagerAccount(pageIndex);
        }
    }
    else {
        if (!dataLoaded__search) {
            await fetchApiWithPageNumberSearchAccount(pageIndex, userId);
            dataLoaded__search = true;
        }
        else {
            await fetchApiWithPageNumberSearchAccount(pageIndex, userId);
        }
    }
    
}

function registerSchedule(IdSchedure, Course_Code, button) {
    CheckToken() ;
    var token = localStorage.getItem("login");
    const loginUrl = `https://localhost:7013/api/LectureSchedule?token=${token}&IdSchedure=${IdSchedure}&Course_Code=${Course_Code}`;
    if(window.confirm("Bạn có chắc chắn muốn đăng ký lớp học này không?")) {
        fetch(loginUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (!response.ok) {
              alert("Đăng ký không thành công\nVui lòng đăng ký lại");
            throw new Error("Đăng ký không thành công.");
            }
            return response.json();
        })
        .then((data) => {
          if(data.statusCode === 400) {
              alert("Đăng ký không thành công");
              alert(data.result);
              console.log(data);
          }
          else if(data.statusCode === 200) {
              alert("Đăng ký thành công");
              button.innerText = "Hủy đăng ký";
          }
        })
        .catch((error) => {
            // Xử lý lỗi
            console.error(error);
        });
    }
    else {
        alert("Đăng ký không thành công");
    }
}

// Schedule Registed

let dataLoadedRegisted = false;
let tableBodyRegisted = null; 
let pageIndexManagerRegisted = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberManagerRegisted() {
    try {
        var token = localStorage.getItem("login");
        const getAccountUrl = `https://localhost:7013/api/LectureSchedule?token=${token}&pageIndex=${1}&pageSize=${999}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationManagerRegisted(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationManagerRegisted(data, currentPage) {
    const dataContainer = document.getElementById('schedule__body--allNotUser__Registed');//AccountManager__search--table
    // Hiển thị dữ liệu trong bảng
    if (!tableBodyRegisted) {
        const table = document.createElement('table');
        table.id = "table__SearchRegister";
        table.classList.add("striped-table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã học phần</th>
                <th>Lớp học</th>
                <th>Phòng học</th>
                <th>Môn học</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Lịch học</th>
            </tr>
        </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBodyRegisted = table.querySelector('tbody');
    }
    else {
        tableBodyRegisted.innerHTML = ''; 
    }

    tableBodyRegisted.innerHTML = '';
    var stt = 1;
    data.result.forEach(item => {
        const dateObject = new Date(item.dateStart);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        //
        const dateObject1 = new Date(item.dateEnd);
        const day1 = dateObject1.getDate();
        const month1 = dateObject1.getMonth() + 1;
        const year1 = dateObject1.getFullYear();
        const formattedDate1 = `${day1}-${month1}-${year1}`;
        // if(item.monHoc === "Đồ án chuyên ngành") {
        //     alert(item.lichHocTongList);
        // }
        
        const row = document.createElement('tr');
        // console.log(item);
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.course_Code == null ? "" : item.course_Code}</td>
            <td>${item.lopHoc}</td>
            <td>${item.phongHoc}</td>
            <td>${item.monHoc}</td>
            <td>${formattedDate}</td>
            <td>${formattedDate1}</td>
            <td>${item.lichHocTongList}</td>
        `;
        stt++;
        tableBodyRegisted.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    // const paginationContainer = document.createElement("div");
    // paginationContainer.style.margin = "20px 20px";
    // paginationContainer.style.position = "absolute";
    // paginationContainer.style.left = "40%";

    // for (let i = 1; i <= Math.ceil(data.totalRecords / 10); i++) {
    //     const button = document.createElement("button");
    //     button.style.padding = "10px 10px";
    //     button.innerText = i;

    //     button.addEventListener("click", () => {
    //         pageIndexManagerRegisted = i;
    //         fetchApiWithPageNumberManagerRegisted(pageIndexManagerRegisted);
    //     });

    //     paginationContainer.appendChild(button);
    // }

    // tableBodyRegisted.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllManagerRegistedForSchedule(pageIndex) {
    CheckToken();
    // Gọi API ban đầu với số trang pageIndex
    if (!dataLoadedRegisted) {
        await fetchApiWithPageNumberManagerRegisted(pageIndex);
        dataLoadedRegisted = true;
    }
    else {
        await fetchApiWithPageNumberManagerRegisted(pageIndex);
    }
}

// Search Account

let dataLoaded__searchRegisted = false;
let tableBody__searchRegisted = null; 
let pageIndexSearchAccountRegisted = 1;

// Gọi API với số trang được truyền vào
async function fetchApiWithPageNumberSearchRegisted(pageNumber, userId) {
    try {
        var token = localStorage.getItem("login");
        const getAccountUrl = `https://localhost:7013/api/LectureSchedule/Id?token=${token}&pageIndex=${pageNumber}&pageSize=${5}&search=${userId}`;
        const response = await fetch(getAccountUrl);
        const data = await response.json();
        displayDataAndPaginationManagerRegisted(data, pageNumber);
    } catch (error) {
        console.error('Error fetching data:', error);
        alert(error);
    }
}

// Hiển thị dữ liệu và nút phân trang
function displayDataAndPaginationSearchRegisted(data, currentPage) {
    // lấy dữ liệu từ thẻ input
    const userId = document.getElementById("search__registed--schedule").value;
    const dataContainer = document.getElementById('schedule__body--allNotUser__Registed');
    // Hiển thị dữ liệu trong bảng
    if (!tableBody__searchRegisted) {
        const table = document.createElement('table');
        table.id = "table__SearchRegister";
        table.classList.add("striped-table");
        table.innerHTML = `
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã học phần</th>
                <th>Lớp học</th>
                <th>Phòng học</th>
                <th>Môn học</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th>Lịch học</th>
            </tr>
        </thead>
            <tbody>
            </tbody>
        `;
        dataContainer.appendChild(table);
        tableBody__searchRegisted = table.querySelector('tbody');
    }
    else {
        tableBody__searchRegisted.innerHTML = ''; 
    }

    tableBody__searchRegisted.innerHTML = '';
    var stt = 1;
    data.result.forEach(item => {
        const dateObject = new Date(item.dateStart);
        const day = dateObject.getDate();
        const month = dateObject.getMonth() + 1;
        const year = dateObject.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        //
        const dateObject1 = new Date(item.dateEnd);
        const day1 = dateObject1.getDate();
        const month1 = dateObject1.getMonth() + 1;
        const year1 = dateObject1.getFullYear();
        const formattedDate1 = `${day1}-${month1}-${year1}`;
        // if(item.monHoc === "Đồ án chuyên ngành") {
        //     alert(item.lichHocTongList);
        // }
        
        const row = document.createElement('tr');
        // console.log(item);
        row.innerHTML = `
            <td>${stt}</td>
            <td>${item.course_Code == null ? "" : item.course_Code}</td>
            <td>${item.lopHoc}</td>
            <td>${item.phongHoc}</td>
            <td>${item.monHoc}</td>
            <td>${formattedDate}</td>
            <td>${formattedDate1}</td>
            <td>${item.lichHocTongList}</td>
        `;
        stt++;
        tableBody__searchRegisted.appendChild(row);
    });

    // Tạo và gắn sự kiện cho các nút phân trang
    const paginationContainer = document.createElement("div");
    paginationContainer.style.margin = "20px 20px";
    paginationContainer.style.position = "absolute";
    paginationContainer.style.left = "40%";

    for (let i = 1; i <= Math.ceil(data.totalRecords / 5); i++) {
        const button = document.createElement("button");
        button.style.padding = "10px 10px";
        button.innerText = i;

        button.addEventListener("click", () => {
            pageIndexSearchAccountRegisted = i;
            fetchApiWithPageNumberSearchRegisted(pageIndexSearchAccountRegisted, userId);
        });

        paginationContainer.appendChild(button);
    }

    tableBody__searchRegisted.appendChild(paginationContainer);
}

// Hàm gọi API ban đầu và hiển thị dữ liệu
async function GetAllSearchRegistedForSchedule(pageIndex) {
    CheckToken();
    alert("abc")
    //Hiển thị
    var areaRegistedSchedule = document.getElementById("ScheduleRegisted");
    var areaRegisterSchedule = document.getElementById("Schedule");
    var information = document.getElementById("information");
    var changeInformation = document.getElementById("Change_information");
    var changePass = document.getElementById("Change_password");
    //Đổi màu
    var registerSchedule = document.getElementById("Register_Schedule")
    var registerScheduleIcon = document.getElementById("Register_Schedule--icon")
    var colorText = document.querySelector('#change__info')
    var icon = document.querySelector('#change__info--icon')
    var iconinfor = document.getElementById("information__list--items__icon");
    var colorTextinfor = document.getElementById("information__list");
    var icon_changepass = document.querySelector('#change__password--icon')
    var color_changepass = document.querySelector('#change__password')
    var RegistedIcon = document.getElementById('Registed__Schedule--Icon')
    var RegistedText = document.getElementById('Registed__Schedule')
    if(areaRegisterSchedule.style.display === "none") {
        //Hiển thị
        areaRegistedSchedule.style.display = "block";
        areaRegisterSchedule.style.display = "none";
        information.style.display = "none";
        changeInformation.style.display = "none";
        changePass.style.display = "none";
        //Đổi màu
        RegistedIcon.style.color = "#33b5e5";
        RegistedText.style.color = "#33b5e5";
        colorText.style.color = "#fff";
        icon.style.color = "#fff";
        iconinfor.style.color = "#fff";
        colorTextinfor.style.color = "#fff";
        icon_changepass.style.color = "#fff";
        color_changepass.style.color = "#fff";
        registerSchedule.style.color = "#fff";
        registerScheduleIcon.style.color = "#fff";
    }
    else {
        areaRegistedSchedule.style.display = "block";
        areaRegisterSchedule.style.display = "none";
        information.style.display = "none";
        changeInformation.style.display = "none";
        changePass.style.display = "none";
        //Đổi màu
        RegistedIcon.style.color = "#33b5e5";
        RegistedText.style.color = "#33b5e5";
        colorText.style.color = "#fff";
        icon.style.color = "#fff";
        iconinfor.style.color = "#fff";
        colorTextinfor.style.color = "#fff";
        icon_changepass.style.color = "#fff";
        color_changepass.style.color = "#fff";
        registerSchedule.style.color = "#fff";
        registerScheduleIcon.style.color = "#fff";
    }
    //Lấy dữ liệu thẻ input để search
    const userId = document.getElementById("search__registed--schedule").value;
    // Gọi API ban đầu với số trang pageIndex
    if(userId == "") {
        if (!dataLoadedRegisted) {
            await fetchApiWithPageNumberManagerRegisted(pageIndex);
            dataLoadedRegisted = true;
        }
        else {
            await fetchApiWithPageNumberManagerRegisted(pageIndex);
        }
    }
    else {
        if (!dataLoaded__searchRegisted) {
            await fetchApiWithPageNumberSearchRegisted(pageIndex, userId);
            dataLoaded__searchRegisted = true;
        }
        else {
            await fetchApiWithPageNumberSearchRegisted(pageIndex, userId);
        }
    }
    
}


function CheckToken() {
    // Lấy token từ lưu trữ, ví dụ localStorage hoặc sessionStorage
    var token = localStorage.getItem('login');

    if (token) {
        // Giải mã token để truy cập thông tin thời gian hết hạn
        var tokenData = JSON.parse(atob(token.split('.')[1]));
        
        // Lấy thời gian hết hạn từ token
        var expirationTime = tokenData.exp * 1000; // Do token lưu thời gian dưới dạng giây
        
        // Kiểm tra xem token đã hết hạn chưa
        var currentTime = Date.now();
        
        if (currentTime > expirationTime) {
            // Token đã hết hạn, thực hiện đăng xuất người dùng ở đây
            // Có thể thực hiện logout bằng cách xóa token và chuyển người dùng về trang đăng nhập
            alert("Phiên làm việc của bạn đã hết hạn, vui lòng đăng nhập lại");
            DeleteLocalStorage();
            window.location.href = 'index.html'; // Chuyển hướng người dùng đến trang đăng nhập
        } 
    } 
}
  