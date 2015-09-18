//Check Internet connection Start
var connectionStatus = false;
function checkInternetconnection(){
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        alert('No Internet Connection');

    } else {

        alert('Internet Connection there');
    }
}
//<feature name="http://api.phonegap.com/1.0/network"/>
$(document).ready(function () {
    //setInterval(function () {
    //    checkInternetconnection();
    //}, 5000);
});

//$(document).ready(function () {
//    $.ajax({
//        url: "http://www.google.com",
//        context: document.body,
//        error: function (jqXHR, exception) {
//            alert('offline')
//        },
//        success: function () {
//            alert('ONline')
//        }
//    })
//});
//Check Internet connection End

//clearInterval(myInterval);
//logout function Start

var aLogout = "0";
$(document).ready(function () {
   
        $('.AAlogout').click(function () {
            var res = confirm("Are you sure you want to logout ?");
            
            if (res == true) {
                aLogout = "0";
                
                window.location.href = "#page1";
                $(".AAlogout").text('').hide();

            } else {
                aLogout = aLogout;
                
            }

            //alert(aLogout);
        });
});

//logout function End


//login function Start
try {
    $(document).ready(function () {
        $("#aaLogin").click(function () {

            //alert('fsdfsdfsd');
            if (aLogout == "1") {
                window.location.href = "#page15";
            }
            else {
                window.location.href = "#dvLogin";
                aLogout = "0"
            }

        });
    });
}
catch (ex) { }

function GetDashboard(sUserId) {
    //alert(sUserId);
   

        $.ajax({
            type: "post",
            dataType: "json",
            url: "http://constantdesign.com/samples/indian-african/api/getDashboard.php",
            data: 'user_id=' + sUserId + '',
            success: function (res) {

                //e.preventDefault();
                var sJsonData1 = res.data
              
                var a22 = sJsonData1[0].title;
                var aa = sJsonData1.length;
               
                if (aa > 0) {
                   
                    //$.each(sJsonData1, function (parindex1, paritem1) {                                            
                    //alert(sJsonData1[0].title);

                    //var row = "<div  class='press-release'><a href='" + paritem1.url + "'><p class='lead-font'>" + paritem1.title + "</p></a></div>";
                    $("#P1").html(sJsonData1[0].title);
                    $("#dba1").attr("href", sJsonData1[0].url);
                    $("#P2").html(sJsonData1[1].title);
                    $("#dba2").attr("href", sJsonData1[1].url);
                    $("#P3").html(sJsonData1[2].title);
                    $("#P4").html(sJsonData1[3].title);
                    $("#P5").html(sJsonData1[4].title);
                    $("#P6").html(sJsonData1[5].title);
                    $("#P7").html(sJsonData1[6].title);
                    $("#P8").html(sJsonData1[7].title);
                    $('#dvDashboardd').show().removeAttr('display', 'block');
                    window.location.href = "#page15";
                   

                }
                else {
                    
                    //$('#dvResult').text("You are not a valid user. Try again.");
                    $('#dvDashboarddd').text("Data is not available.").removeAttr('display', 'block');;
                    alert('Data is not available.');
                    window.location.href = "#dvLogin";
                    $("#txtUserId").focus();
                    

                }
            },
            error: function (xhr, textStatus, error) {
                
                //Show error message(if occured)
                //$('#dvResult').text("Error: " + error);
                //alert("Error: " + error);
                alert('You are not a valid user. Try again.');
                $("#txtUserId").focus();
                

            }
        });

}

function LoginFunc() {
   
        if (aLogout == "1") {
            window.location.href = "#page15";
        }
        else {
            var sJsonData = "[]";
            //e.preventDefault();
            //e.stopPropagation();
            //Get control's values
            var sUserId = $("#txtUserId").val();
            var sPwd = $("#txtPassword").val();
           
            var msg = "";
            //check for validation
            if (sUserId == '') {
                msg = "Please enter User-Id.";
                alert(msg);
                $("#txtUserId").focus();
                return false;
            }
            if (sPwd == '') {
                msg = "Please enter password";
                alert(msg);
                $("#txtPassword").focus();
                return false;
            }

            if (msg.length == 0) {
                //Jquery ajax call to server side method
                $.ajax({
                    type: "post",
                    dataType: "json",
                    url: "http://constantdesign.com/samples/indian-african/api/getLogin.php",
                    data: 'user_name=' + sUserId + '&password=' + sPwd,
                    //data: '{"user_name":' + sUserId + ', "password":' + sPwd + '}',
                    //data: '{"country":"India"}',

                    success: function (res) {
                       
                        //e.preventDefault();
                        aLogout = "1";
                        //$(".AAlogout").text('Logout').show();
                        $(".AAlogout").html('<img src="images/logout.png" width="32" height="32">').show();
                        sJsonData = res.data;
                        var sStatus = sJsonData[0].status;
                       
                        var aa = sJsonData.length;
                        //console.log(aa);

                       
                        if (sStatus == 1) {

                            //Set message
                            //$('#dvResult').text("Your are successfully login.");
                            //Reset controls                          
                            $('#txtUserId').val('');
                            $('#txtPassword').val('');
                            alert('You are successfully logged in.');
                            var uid = sJsonData[0].user_id;
                            GetDashboard(uid);

                            //window.location.href = "#page15";

                        }
                        else {
                            //$('#dvResult').text("You are not a valid user. Try again.");
                            alert('You are not a valid user. Try again.');
                            $("#txtUserId").focus();
                        }
                        //Fade Out to disappear message after 6 seconds
                        //$('#dvResult').fadeOut(6000);
                    },
                    error: function (xhr, textStatus, error) {
                        //Show error message(if occured)
                        //$('#dvResult').text("Error: " + error);
                        alert('You are not a valid user. Try again.');
                        $("#txtUserId").focus();
                       
                    }
                });
            }
            else {
                //Validation failure message
                $('#dvResult').html('');
                $('#dvResult').html(msg);
            }
            $('#dvResult').fadeIn();
        }
}

//login function End

//PressReleases Start



$(document).ready(function () {
    var xJsonData = "[]";
    //var jsonList = "PressReleases.json";
    var jsonList = "http://iafs.in/api/getPressReleases.php";
    $.getJSON(jsonList, function (r) {
        xJsonData = r.data;
        console.log(r.data);
        var items = [];
        $("#dvpressRelease").html("");
        var block = "<div>";
        $.each(xJsonData, function (index, item) {
            var row = "<div class='press-release'>";
            row += "<a class='PRDesc' href='#dvPRDescription' data-id=" + item.archive_id + ">";
            row += "<p class='lead-font'>" + item.title1 + "</p></a>";
            row += "</div>";
            block += row;
        });
        block += '</div>';
        $('#dvpressRelease').html(block);
        $("#dvpressRelease").slideDown("slow");

    });

    $("#page5").on("click", "a.PRDesc", function () {

        var sArchiveId = $(this).attr("data-id");
        $("#dvPressReleaseDrp").html("");
        var block = "<div>";
        $.each(xJsonData, function (parindex, paritem) {
            if (paritem.archive_id === sArchiveId) {
                //console.log(paritem.archive_id);
                //alert(paritem.archive_id);
                var row = "<div id='box-press-release-link'>";
                row += "";
                row += "<div id='dv_Title1' class='press-release'><p class='lead-font'>" + paritem.title1 + "</p></div>";
                row += "<div id='dv_Description' class='press-release-desc'><p class='lead-font'>" + paritem.description + "</p></div>";
                block += row;
                //$.each(paritem.images, function (childindex, childitem) {
                //    $("#children").append("<img class='img' data-id='" + childitem.gallery_media_id + "' tite='" + childitem.gallery_media_id + "' src='http://iafs.in/images/gallery/" + childitem.url + "' />");
                //});
            }
        });
        block += '</div>';
        $('#dvPressReleaseDrp').html(block);
        $("#dvPressReleaseDrp").slideDown("slow");

    });
});
//PressReleases End



//START Media Coverage
$(document).ready(function () {
    //var jsonList = "mediaCovrage.json";
    var jsonList = "http://constantdesign.com/samples/indian-african/api/getMediaCoverage.php";
    var json = $.getJSON(jsonList, function (data) {
        //alert(data.data[0].title1);
        var block = "<div>";

        for (var i = 0; i < data.data.length; i++) {
            //alert(data.data[i].archive_id);
            //console.log(data.data[i].title2);

            var row = "<div class='press-release'>";
            row += '<a href="' + data.data[i].url + '" target="_blank">';
            row += "<p class='lead-font'>" + data.data[i].title1 + "</p></a>";
            row += '</div>';
            block += row;
        }
        block += '</div>';
        $('#dvMediaCovrage').html(block);
        $("#dvMediaCovrage").slideDown("slow");

    });
    //alert(json);
});
//end Media Coverage

//end Media Archive
$(document).ready(function () {
    var jsonList = "http://constantdesign.com/samples/indian-african/api/getMediaArchive.php";
    var json = $.getJSON(jsonList, function (data) {
        //alert(data.data[0].title1);
        var block = "<div>";

        for (var i = 0; i < data.data.length; i++) {
            //alert(data.data[i].archive_id);
            //console.log(data.data[i].title2);

            var row = "<div class='press-release'>";
            row += '<a href="#" target="_blank">';
            row += "<p class='lead-font'>" + data.data[i].title1 + "</p></a>";
            row += '</div>';
            block += row;
        }
        block += '</div>';
        $('#dvMediaAdvisory').html(block);
        $("#dvMediaAdvisory").slideDown("slow");
    });
    //alert(json);
});
//end Media Archive


//Start Speeches & Statements
$(document).ready(function () {
    //var jsonList = "mediaCovrage.json";
    var jsonList = "http://constantdesign.com/samples/indian-african/api/getSpeeches.php";
    var json = $.getJSON(jsonList, function (data) {
        //alert(data.data[0].title1);
        var block = "<div>";

        for (var i = 0; i < data.data.length; i++) {
            //alert(data.data[i].archive_id);
            //console.log(data.data[i].title2);

            var row = "<div class='press-release'>";
            //row += '<a href="' + data.data[i].url + '" target="_blank">';
            row += "<p class='lead-font'>" + data.data[i].title1 + "</p></div>";
            row += "<p class='lead-font'>" + data.data[i].description + "</p>";

            block += row;
        }
        block += '</div>';
        $('#dvSpeeches').html(block);
        $("#dvSpeeches").slideDown("slow");

    });
    //alert(json);
});
//End Speeches & Statements

//End getProgramme
$(document).ready(function () {
    var xJsonData = "[]";
    //var jsonList = "Aganda.json";
    var jsonListAganda = "http://constantdesign.com/samples/indian-african/api/getProgramme.php";
    $.getJSON(jsonListAganda, function (r) {
        xJsonData = r.data;
        console.log(r.data);
        var items = [];
        var block = "<div>";
        $.each(xJsonData, function (index, item) {
            var scheduleidd = item.schedule_id;
            //if (scheduleidd === 1) {
            //    alert(item.location);

            //}
            //alert(data.data[i].archive_id);
            //console.log(data.data[i].title2);
            //alert(item.archive_id);
            var row = "<div class='press-release'>";
            row += "<h1 style='display: block; text-align: left; width: 100%; font-size: 22px; font-family: 'Roboto', sans-serif;'><b>" + item.schedule_name + "</b></h1>";
            row += "<div style='display: block; text-align: left; width: 100%;'>";
            row += "<i class='fa fa-calendar' style='display: inline-block;'></i><div style='display: inline-block; font-size: 15.5px; margin-left:10px; font-family: 'Roboto', sans-serif;'>" + item.time + "</div>";
            row += "</div>";
            row += "<p class='lead-font'>" + item.location + "</p>";
            row += "</div>";
            block += row;
        });
        block += '</div>';
        $('#dvSummitAgenda').html(block);
        $("#dvSummitAgenda").slideDown("slow");

    });
});

//End getProgramme



//Start Documents
$(document).ready(function () {
    var xJsonData = "[]";
    var jsonList = "http://constantdesign.com/samples/indian-african/api/getMediaArchive.php";
    $.getJSON(jsonList, function (r) {
        xJsonData = r.data;
        console.log(r.data);
        var items = [];
        var block = "<div>";
        $.each(xJsonData, function (index, item) {
            //alert(item.archive_id);
            var row = "<div class='press-release'>";
            row += "<a class='DDesc' href='#page14' data-id=" + item.archive_id + ">";
            row += "<p class='lead-font'>" + item.title1 + "</p></a>";
            row += "</div>";
            block += row;
        });
        block += '</div>';
        $('#dvDocument').html(block);
        $("#dvDocument").slideDown("slow");

    });

    $("#page13").on("click", "a.DDesc", function () {

        var sArchiveId = $(this).attr("data-id");
        $("#dvDocumentDesc").html("");
        var block = "<div>";
        $.each(xJsonData, function (parindex, paritem) {
            if (paritem.archive_id === sArchiveId) {
                //console.log(paritem.archive_id);
                //alert(paritem.archive_id);
                var row = "<div id='box-press-release-link'>";
                row += "";
                row += "<div id='dv_Title1' class='press-release'><p class='lead-font'>" + paritem.title1 + "</p></div>";
                row += "<div id='dv_Description' class='press-release-desc'><p class='lead-font'>" + paritem.description + "</p></div>";
                block += row;
                //$.each(paritem.images, function (childindex, childitem) {
                //    $("#children").append("<img class='img' data-id='" + childitem.gallery_media_id + "' tite='" + childitem.gallery_media_id + "' src='http://iafs.in/images/gallery/" + childitem.url + "' />");
                //});
            }
        });
        block += '</div>';
        $('#dvDocumentDesc').html(block);
        $("#dvDocumentDesc").slideDown("slow");

    });
});
//End Documents


//End Photo Gallary
var xJsonData = "[]";
$(function () {
    var jsonListPhotoGallery = "http://constantdesign.com/samples/indian-african/api/getImageGallery.php";
    //var jsonListPhotoGallery = "ImageGallary.json";
    $.getJSON(jsonListPhotoGallery, function (r) {
        xJsonData = r.data;
        console.log(r.data);
        var items = [];
        var block = "<div id='owl-demo' class='ocarouselwl-'>";
        $.each(xJsonData, function (index, item) {
            //alert(item.gallery_id);
            var row = "<a href='#dvImageList'>";
            row += "<div class='item'>";
            row += "<img class='img' data-id=" + item.gallery_id + " src='" + item.thumb + "' alt='Owl Image'/>";
            row += "<p>" + item.title1 + "</p>";
            row += "</div>";
            row += "</a>";
            block += row;
        });
        block += '</div>';
        $('#myImgGallary').html(block);
    });

    $("#myImgGallary").on("click", "img.img", function () {
        var xParID = $(this).attr("data-id");
        $("#dvPhotoList").html("");
        var block = "<div id='owl-demo' class='ocarouselwl-'>";
        $.each(xJsonData, function (parindex, paritem) {
            if (paritem.gallery_id === xParID) {
                console.log(paritem.images);
                //alert(paritem.images);
                $.each(paritem.images, function (childindex, childitem) {
                    var row = "<div class='item'>";
                    row += "<img class='img' title=" + childitem.gallery_media_id + " src='http://iafs.in/images/gallery/" + childitem.url + "' alt='Owl Image'/>";
                    row += "<p>" + childitem.caption + "</p>";
                    row += "</div>";
                    block += row;

                    //$("#dvPhotoList").append("<img class='img' data-id='" + childitem.gallery_media_id + "' tite='" + childitem.gallery_media_id + "' src='http://iafs.in/images/gallery/" + childitem.url + "' />");
                });
                block += '</div>';
                $('#dvPhotoList').html(block);
                $("#dvPhotoList").slideDown("slow");
            }
        });
    });
});
//End Photo Gallary



//Notification      

function myNotify(sType, sTitle, sMessage) {
    notify({
        type: sType, //alert | success | error | warning | info
        title: sTitle,
        theme: "default",//Orange-theme  |  default
        //autoHide: true, //true | false
        //delay: 30000, //number ms
        position: {
            x: "right", //right | left | center
            y: "top" //top | bottom | center
        },
        spacing: 10, //number px
        //icon: '<img src="images/info.png" />',
        message: sMessage
    });
}

//$(document).ready(function () {
//    setInterval(function () {
//        myNotify3('info', 'Notice', 'Hare Krishna');
//    }, 7000);
//});

function myFunctionCalling(sType, sTitle, sMessage) {
    $(document).ready(function () {
        setInterval(function () {
            //myNotify3('info', 'Notice', 'Hare Krishna');
            myNotify(sType, sTitle, sMessage);
        }, 2000);
    });
}
function myFunctionCalling1(sType, sTitle, sMessage) {
    $(document).ready(function () {
        myNotify(sType, sTitle, sMessage);
    });
}
$(document).ready(function () {
   
        var xJsonNotification = "[]";
        var sNotificationid = "";
        var sTitle = "";
        var sNotification = "";
        var sisdisplay = "";
        //$("#btnClick").click(function () {
        //$(window).load(function () {
        $(window).load(function () {
            //alert('hiii');
            //function GetJson() {
            //var jsonList = "mediaCovrage.json";
            var jsonList = "http://constantdesign.com/samples/indian-african/api/getNotification.php";
            //var jsonList = "Noti.json";
            var json = $.getJSON(jsonList, function (data) {
                //alert($.now());
                xJsonNotification = data.data;
             
                //alert(xJsonNotification[0].title);
                var sLength = xJsonNotification.length;
                if (sLength > 0) {
                    $(".circle").text(sLength);
                }
               
                if (sLength > 0) {

                    //for (var i = 0; i < data.data.length; i++) {

                    //sNotificationid = data.data[i].notification_id;
                    //sTitle = data.data[i].title;
                    //sNotification = data.data[i].notification;
                    //sisdisplay = data.data[i].is_display;

                    //if (sisdisplay == "1") {
                    //    myFunctionCalling1("info", sTitle, sNotification);
                    //}
                    //    debugger;
                    //}

                    $("#dvNotification").html("");
                    var block = "<div>";
                    $.each(xJsonNotification, function (index, item) {

                        sNotificationid = item.notification_id;
                        sTitle = item.title;
                        sNotification = item.notification;
                        sisdisplay = item.is_display;

                        if (sisdisplay == "1") {
                            myFunctionCalling1("alert", sTitle, sNotification);
                        }

                        var row = "<div class='press-release'>";
                        row += "<h2>" + item.title + "</h2>";
                        row += "<p class='lead-font'>" + item.notification + "</p>";
                        row += "</div>";
                        block += row;
                        
                    });
                    block += '</div>';
                    $('#dvNotification').html(block);
                    $("#dvNotification").slideDown("slow");
                    

                }
            });
        });
});

//Notification


//Loading Page
$(window).load(function () {
    try {        
        //$("#pageloaddiv").fadeOut(5000);
        $(".loader").fadeOut("slow");
    }
    catch (ex) { ex.message; }
});

//Loading Page

//Read more End

function closeMore() {
    //alert('calling foucs.');
    $('.about_profile').animate({ height: startHieght }, 500);
    $('#more').text('Read More...');
    cc = 1;
}
//Read more End



//START logo-concept
//$(document).ready(function () {
//    try{
//        var jsonList = "http://constantdesign.com/samples/indian-african/api/getCMS.php";
//        var json = $.getJSON(jsonList, function (r) {
//            var aaJson = r.data;
//            alert(data.data[0].cms_title);
//            debugger;
//            for (var i = 0; i < r.data.length; i++) {
//                var sCmsId = r.data[i].cms_id;
//                debugger;
//                if (sCmsId == 3) {
//                    debugger;
//                    $("#h2LogoConceptTitle").html(r.data[i].cms_title);
//                    $("#imgLogo").attr("src", r.data[i].image).attr("title", r.data[i].caption);
//                    $("#dvLogoConceptContent").html(r.data[i].cms_content);

//                }
//                //alert(data.data[i].archive_id);
//                //console.log(data.data[i].title2);
//            }
//        });
//    }
//    catch (ex)
//    { ex.message;}
//});
//end logo-concept