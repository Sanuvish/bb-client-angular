var options = {};
var i = 0;

/* var dashboardPanelList = [];
var journeyPanelList = [
						"journey-grid",
						"journey-sub-grid",
						"journey-sub2-grid",
						];
var chatPanelList = [
						"chat-panel-grid",
					]; */

var dashboardPanelCache = [];
var journeyPanelCache = [];
var chatPanelCache = [];
var volunteerPanelCache = [];
var analyticsPanelCache = [];
var flagPanelCache = [];

var panelDoNotClose = [ "work-area-grid","work-area-notes-grid"];
tempCache = [];
$(".side-menu > li:not(:first-child) a").click(function() {
	activePanel = $(".side-menu").attr("active-panel");
	panelName = $(this).attr("panel-name");
	tempCache = [];
	tempHtml = $("#main-grid").html();
	if(panelName == "volunteer" || panelName == "analytics" || panelName == "flag") {
		$("#main-grid").hide();
		if(panelName=="volunteer") {
			$("#main-volunteer-grid").show();
			$("#main-analytics-grid").hide();
			$("#main-flag-grid").hide();
		} else if(panelName=="analytics") {
			$("#main-volunteer-grid").hide();
			$("#main-analytics-grid").show();
			$("#main-flag-grid").hide();
			initializeChart();
		} else if(panelName=="flag") {
			$("#main-volunteer-grid").hide();
			$("#main-analytics-grid").hide();
			$("#main-flag-grid").show();
		}
	} else {
		$("#main-grid").show();
		$("#main-volunteer-grid").hide();
		$("#main-analytics-grid").hide();
		$("#main-flag-grid").hide();
		$.each($("#main-grid .grid-stack-item"), function(k, v) {
			panelForCoordinates = $(tempHtml).find(".grid-stack-item:eq("+k+")");
			tempPanelId = panelForCoordinates.attr("id");
			tempPanelx = panelForCoordinates.attr("data-gs-x");
			tempPanely = panelForCoordinates.attr("data-gs-y");
			tempPanelw = panelForCoordinates.attr("data-gs-width");
			tempPanelh = panelForCoordinates.attr("data-gs-height");
			if(panelName == "volunteer" || panelName == "analytics" || panelName == "flag") {
				closePanel(tempPanelId);
				panelDetails = [tempPanelId, tempPanelx, tempPanely, tempPanelw, tempPanelh];
				tempCache.push(panelDetails);
			} else if($.inArray(tempPanelId, panelDoNotClose) < 0) {
				closePanel(tempPanelId);
				panelDetails = [tempPanelId, tempPanelx, tempPanely, tempPanelw, tempPanelh];
				tempCache.push(panelDetails);
			}
			
		});
		console.log(tempCache);
		//return;
		$(".side-menu").attr("active-panel", panelName);
		if(activePanel == "dashboard") {
			dashboardPanelCache = tempCache;
		} else if(activePanel == "journey") {
			journeyPanelCache = tempCache;
		} else if(activePanel == "chat") {
			chatPanelCache = tempCache;
		} else if(activePanel == "volunteer") {
			volunteerPanelCache = tempCache;
		} else if(activePanel == "analytics") {
			analyticsPanelCache = tempCache;
		} else if(activePanel == "flag") {
			flagPanelCache = tempCache;
		}
		
		panelToBeOpened = [];
		if(panelName == "dashboard") {
			panelToBeOpened = dashboardPanelCache;
		} else if(panelName == "journey") {
			panelToBeOpened = journeyPanelCache;
		} else if(panelName == "chat") {
			panelToBeOpened = chatPanelCache;
		} else if(panelName == "volunteer") {
			panelToBeOpened = volunteerPanelCache;
		} else if(panelName == "analytics") {
			panelToBeOpened = analyticsPanelCache;
		} else if(panelName == "flag") {
			panelToBeOpened = flagPanelCache;
		}
		$.each(panelToBeOpened, function(k, v){
			console.log(v);
			openPanelWithCordinates(v[0], v[1], v[2], v[3], v[4]);
		});
		if($(this).attr("panel-id")) {
			openPanel($(this).attr("panel-id"));
		}
	}
	
	
});

function togglePanel(panelId){
	$("#main-grid").show();
	$("#main-volunteer-grid").hide();
	$("#main-analytics-grid").hide();
	$("#main-flag-grid").hide();
	
	$('.grid-stack').gridstack(options);
	var grid_inner = $('.grid-stack').data('gridstack');
	if($('#main-grid div[data-gs-id="'+panelId+'"]').length > 0) {
		grid_inner.removeWidget($('#main-grid div[data-gs-id="'+panelId+'"]'));
		$('#cb_'+panelId).prop("checked",false);
	} else {
		/* if(panelId == "chat-panel-grid") {
			$.each($("#main-grid .grid-stack-item"), function() {
				tempPanelId = $(this).attr("id");
				closePanel(tempPanelId);
				// add closign panel id in dashboardPanels array to reopen later
			});
		} */
		var $element = $( '<div class="grid-stack-item" id="'+panelId+'">'+$("#main-data-grid #"+panelId).html()+'</div>' );
		width = $("#main-data-grid #"+panelId).attr("data-gs-width");
		height = $("#main-data-grid #"+panelId).attr("data-gs-height");
		//addWidget(el[, x, y, width, height, autoPosition, minWidth, maxWidth, minHeight, maxHeight, id]);
		grid_inner.addWidget($element, 0, 0, width, height, true, null, null, null, null, panelId);
		$('#cb_'+panelId).prop("checked",true);
		initializeDatePicker();
		if(panelId == "work-area-notes-grid") {
			loadCkeEditor();
		}
	}	
}
function openPanel(panelId) {
	$('.grid-stack').gridstack(options);
	var grid_inner = $('.grid-stack').data('gridstack');
	if($('#main-grid div[data-gs-id="'+panelId+'"]').length > 0) {
	} else {
		var $element = $( '<div class="grid-stack-item" id="'+panelId+'">'+$("#main-data-grid #"+panelId).html()+'</div>' );
		width = $("#main-data-grid #"+panelId).attr("data-gs-width");
		height = $("#main-data-grid #"+panelId).attr("data-gs-height");
		//addWidget(el[, x, y, width, height, autoPosition, minWidth, maxWidth, minHeight, maxHeight, id]);
		grid_inner.addWidget($element, 0, 0, width, height, true, null, null, null, null, panelId);
		$('#cb_'+panelId).prop("checked",true);
		initializeDatePicker();
		if(panelId == "work-area-notes-grid") {
			loadCkeEditor();
		}
	}
}
function closePanel(panelId){
	$('.grid-stack').gridstack(options);
	var grid_inner = $('.grid-stack').data('gridstack');
	grid_inner.removeWidget($('#main-grid div[data-gs-id="'+panelId+'"]'));
	$('#cb_'+panelId).prop("checked",false);
}
function openPanelWithCordinates(panelId, x, y, w, h) {
	$('.grid-stack').gridstack(options);
	var grid_inner = $('.grid-stack').data('gridstack');
	if($('#main-grid div[data-gs-id="'+panelId+'"]').length > 0) {
	} else {
		var $element = $( '<div class="grid-stack-item" id="'+panelId+'">'+$("#main-data-grid #"+panelId).html()+'</div>' );
		width = $("#main-data-grid #"+panelId).attr("data-gs-width");
		height = $("#main-data-grid #"+panelId).attr("data-gs-height");
		//addWidget(el[, x, y, width, height, autoPosition, minWidth, maxWidth, minHeight, maxHeight, id]);
		grid_inner.addWidget($element, x, y, w, h, false, null, null, null, null, panelId);
		$('#cb_'+panelId).prop("checked",true);
		initializeDatePicker();
		if(panelId == "work-area-notes-grid") {
			loadCkeEditor();
		}
	}
}
function loadCkeEditor() {
	random = Math.random();
	$("#main-grid .work-area-notes-body .cke-editor").html('<div id="editor-'+random+'"></div>');
	CKEDITOR.replace("editor-"+random);
	//$("#main-grid .work-area-notes-body #cke_editor-")
}
function toggleScheduleCalendar() {
	if($(".calendar-panel-body .schedule-appointment1").is(":visible")){
		$(".calendar-panel-body .schedule-appointment1").hide();
		$(".calendar-panel-body .schedule-appointment2").show();
	} else {
		$(".calendar-panel-body .schedule-appointment1").show();
		$(".calendar-panel-body .schedule-appointment2").hide();
	}
}


function openNav() {

    var rightBtn=document.getElementById("rightBTN");
    var leftBtn=document.getElementById("leftBTN");

    if (rightBtn.style.display!=="none")
    {
        rightBtn.style.display="none";
        leftBtn.style.display="block";
    }
}

function closeNav() {

    var rightBtn=document.getElementById("rightBTN");
    var leftBtn=document.getElementById("leftBTN");
    if (leftBtn.style.display!=="none")
    {
        leftBtn.style.display="none";
        rightBtn.style.display="inherit";
    }
}

function myFunction(){
    var right_col = document.getElementById("page_container");
    var left_col = document.getElementById("left_col");
    $('#left_col').css('height',right_col.scrollHeight+'px');

}



var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function convertTime24to12(time24h) {
    var timex = time24h.split(':');

    if(timex[0] !== undefined && timex [1] !== undefined)
    {
        var hor = parseInt(timex[0]) > 12 ? ((parseInt(timex[0])-12) >= 10 ? (parseInt(timex[0])-12) : '0'+ (parseInt(timex[0])-12))  : timex[0] ;
        var minu = timex[1];
        // var sec = timex[2];
        var merid = parseInt(timex[0]) < 12 ? 'AM' : 'PM';

        // var res = hor+':'+minu+':'+sec+' '+merid;
        var res = hor+':'+minu+' '+merid;

        return res.toString();
    }
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    // s = checkTime(s);
    // document.getElementById('txt').innerHTML =
    //     h + ":" + m + ":" + s;
    var dynamic_time=convertTime24to12(h + ":" + m )+' <span class="line-gold">-</span> '+monthNames[today.getMonth()]+' '+today.getDate()+' '+today.getFullYear() ;
    var t = setTimeout(startTime, 500);
    // <span id='date_time'>8:20 am <span class="line-gold">-</span> July 31 - 2020</span>
    $("#date_time").empty();
    $("#date_time").append(dynamic_time);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function expandCollapse(panelId) {
	if($('.'+panelId+'-body').is(":visible")) {
		$('.'+panelId+'-body').hide();
		$('.'+panelId+'-wrapper').css("height", "auto");
		$('.'+panelId+'-wrapper').css("min-height", "auto");
	} else {
		$('.'+panelId+'-body').show();
		$('.'+panelId+'-wrapper').css("height", "100%");
		$('.'+panelId+'-wrapper').css("min-height", "100%");
	}
}

function showjourneySub(){
	openPanel('journey-sub-grid');
	openPanel('journey-sub2-grid');
}




//***********************************************************************************************

//***********************************************************************************************
function toggleWorkAreaGarbageButton() {
	$(".work-area-body").find(".garbage").toggle();
	$(".work-area-body").find(".save-journey").toggle();
}

function toggleGarbageButton(panelID) {
	$("."+panelID).find(".garbage").toggle();
}

function toggleButton(panelID) {
	$("."+panelID).find("button[type='submit']").toggle();
}

function toggleAction(panelID) {
	$("."+panelID).find(".actionDiv").toggle();
}

function toggleActionButton(panelClass) {
	$("."+panelClass).find("button[type='submit']").toggle();
}

$(document).ready(function(){
    $(".workarea-psalms-details").hide();

    $("#workarea-psalms-1").click(function(){
        $("#workarea-psalms-details-1").toggle(500);
        $("#workarea-psalms-details-1 ").click(function(e) { e.stopPropagation(); }); // for ignore click on child
    });

    // <!--Work area Psalm show.hide-->
    $("#workarea-psalms-2").click(function(){
        $("#workarea-psalms-details-2").toggle(500);
        $("#workarea-psalms-details-2 ").click(function(e) { e.stopPropagation(); }); //for igonre click on child
    });

});

//    Removing Div's
function RemoveWorkAreaDiv(contentID){
    var ContentID=$('#'+contentID);
    ContentID.remove();
}

// <!--    Zoom IDE-->
function zoom() {
    document.body.style.zoom = "90%"
}

//Griding system
$(function () {
    $('.grid-stack').gridstack({
        width: 12
    });
});

// //***********************************************************************************************
// <!--Personal Favs-->
// //***********************************************************************************************

// <!--Personal Favs Slider Script-->
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // for (i = 0; i < dots.length; i++) {
    //     dots[i].className = dots[i].className.replace(" active", "");
    // }
   
    // dots[slideIndex-1].className += " active";
}


var bibleSlideIndex = 1;
bibleShowSlides(bibleSlideIndex);

function biblePlusSlides(n) {
    bibleShowSlides(bibleSlideIndex += n);
}
function bibleCurrentSlide(n) {
    bibleShowSlides(bibleSlideIndex = n);
}
function bibleShowSlides(n) {
    var i;
    var bibleSlides = $("#bible-body .mySlides");
    if (n > bibleSlides.length) {bibleSlideIndex = 1}
    if (n < 1) {bibleSlideIndex = bibleSlides.length}
    for (i = 0; i < bibleSlides.length; i++) {
        bibleSlides[i].style.display = "none";
    }
    //bibleSlides[bibleSlideIndex-1].style.display = "block";
}


// <!--Personal Favs Topics-->
/* When the user clicks on the button, toggle between hiding and showing the dropdown content */
function PersonalFavsTopics() {
    document.getElementById("personalFavsTopicDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.personalFavsDropbtn')) {
        var dropdowns = document.getElementsByClassName("personal-favs-topics");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}



// <!--Copy Content To Work Area-->
// Personal Favs
function copyMe(element) {
    element = $(element).clone(); //copy
    //element = $(element); //if move
    // personal-favs-time    the class of the time which to copy to work panel
    element.appendTo($('#creation'));
}

// PDF panel
function copyToPdf(element) {
    element = $(element).clone();
    element.appendTo($('.work-area-pdf'));
}


//***********************************************************************************************
// <!--Journey Panel-->
//***********************************************************************************************

//Journey Table TD Data
var getID, jbHead, jbHeadEdit;
jbHeadEdit = $('#jb-header-text-edit');
jbHead = $('#jb-header-text');
jbHeadDiv=$('.jb-header-headingText');

function JbTrSelected(td_id) {
    getID = $('#' + td_id);
    var idText = getID.text();

    $('#jb-header-text-edit input').val(idText);
    var jbHeadText = jbHead.text(idText);

    $('#jb-header-trash').attr('data-id',td_id);

    //Selection the selected row and remove class from other rows
    var $i = getID.closest('tr');
    if ($i.hasClass("selected")) {
        $i.siblings().removeClass('selected');
    } else {
        $i.addClass("selected");
        $i.siblings().removeClass('selected');
    }
}

function JbKeyup(attr_id, input_text) {
    jbHead.text(input_text);
    getID.text(input_text);
}

function jbEdit() {
    if (jbHeadDiv.hasClass("hidden")) {
        jbHeadDiv.removeClass("hidden");
        jbHeadEdit.addClass("hidden");

    } else {
        jbHeadDiv.addClass("hidden");
        jbHeadEdit.removeClass("hidden");
    }
}

//JB Head Trash Click
function DeleteJbText(e){

    var td_ID=$('#'+e);
    td_ID.closest('tr').remove();
    jbHead.text("");
}

$('body').delegate(".inQueue", "click", function() {
	if($('.chat-queue').is(":visible")) {
		$('.chat-queue').hide();
		$(this).removeClass("active");
	} else {
		$('.chat-queue').show();
		$(this).addClass("active");
	}
});

$('body').delegate(".cross-reference-body button[type='submit']", "click", function() {
	$(this).parent().find(".cross-reference-action-list").toggle();
});
$('body').delegate(".cross-reference-body .cross-reference-action-list-head i", "click", function() {
	$(this).closest(".cross-reference-action-list").toggle();
});

$('body').delegate(".bible-body .bible-verse .actionDiv .add", "click", function() {
	$(this).parent().find(".bible-verse-action-list").toggle();
});
$('body').delegate(".bible-body .bible-verse .actionDiv .bible-verse-action-list-head i", "click", function() {
	$(this).closest(".bible-verse-action-list").toggle();
});

$('body').delegate(".pdf-body .pdf-verse .actionDiv .add", "click", function() {
	$(this).parent().find(".pdf-verse-action-list").toggle();
});
$('body').delegate(".pdf-body .pdf-verse .actionDiv .pdf-verse-action-list-head i", "click", function() {
	$(this).closest(".pdf-verse-action-list").toggle();
});

$('body').delegate(".mp3-body .mp3-verse .actionDiv .add", "click", function() {
	$(this).parent().find(".mp3-verse-action-list").toggle();
});
$('body').delegate(".mp3-body .mp3-verse .actionDiv .mp3-verse-action-list-head i", "click", function() {
	$(this).closest(".mp3-verse-action-list").toggle();
});

$('body').delegate(".strong-verses-body .actionDiv .add", "click", function() {
	$(this).parent().find(".strong-verses-action-list").toggle();
});
$('body').delegate(".strong-verses-body .actionDiv .strong-verses-action-list-head i", "click", function() {
	$(this).closest(".strong-verses-action-list").toggle();
});

function setAppointmentData() {
	var date = $("#main-grid #datepicker-schedule2").datepicker('getDate').getDate();  
	var day = $("#main-grid #datepicker-schedule2").datepicker('getDate').getDay();  
	var month = $("#main-grid #datepicker-schedule2").datepicker('getDate').getMonth() + 1;  
	var year = $("#main-grid #datepicker-schedule2").datepicker('getDate').getFullYear();  
	//var selected = $(this).val();
	$(".schedule-appointment #month").val(month);
	$(".schedule-appointment #day").val(day);
	$(".final-appointment .date").text($("#main-grid .schedule-appointment #month option:selected").text()+' '+date+' - '+year);
	$(".final-appointment .time").text($("#main-grid .schedule-appointment #time option:selected").text()+' '+$("#main-grid .schedule-appointment #ampm option:selected").text());
}
$('body').delegate("#main-grid .datepicker-schedule", "change", function() {
	var date = $(this).datepicker('getDate').getDate();  
	var day = $(this).datepicker('getDate').getDay();  
	var month = $(this).datepicker('getDate').getMonth() + 1;  
	var year = $(this).datepicker('getDate').getFullYear();  
	var selected = $(this).val();
	$(".schedule-appointment #month").val(month);
	$(".schedule-appointment #day").val(day);
	$(".final-appointment .date").text($("#main-grid .schedule-appointment #month option:selected").text()+' '+date+' - '+year);
	$(".final-appointment .time").text($("#main-grid .schedule-appointment #time option:selected").text()+' '+$("#main-grid .schedule-appointment #ampm option:selected").text());
});

$('body').delegate("#main-grid .schedule-appointment #time", "change", function() {
	$(".final-appointment .time").text($("#main-grid .schedule-appointment #time option:selected").text()+' '+$("#main-grid .schedule-appointment #ampm option:selected").text());
});
$('body').delegate("#main-grid .schedule-appointment #ampm", "change", function() {
	$(".final-appointment .time").text($("#main-grid .schedule-appointment #time option:selected").text()+' '+$("#main-grid .schedule-appointment #ampm option:selected").text());
});

function initializeDatePicker() {
	var more_chats = ['9-10-2020','28-10-2020'];
	var single_chats = ['19-10-2020'];
	$('#main-grid .datepicker-schedule').datepicker({
	  beforeShowDay: function(date){
	   var month = date.getMonth()+1;
	   var year = date.getFullYear();
	   var day = date.getDate();
	 
	   // Change format of date
	   var newdate = day+"-"+month+'-'+year;

	   // Set tooltip text when mouse over date
	   var tooltip_text = "New event on " + newdate;

	   // Check date in Array
	   if(jQuery.inArray(newdate, more_chats) != -1){
		//return [true, "highlight", tooltip_text ];
		return [true, "highlight"];
	   }
	   if(jQuery.inArray(newdate, single_chats) != -1){
		//return [true, "highlight", tooltip_text ];
		return [true, "highlight-chat"];
	   }
	   return [true];
	  }
	 });

	var fullMonth = new Array();
	fullMonth[0] = "January";
	fullMonth[1] = "February";
	fullMonth[2] = "March";
	fullMonth[3] = "April";
	fullMonth[4] = "May";
	fullMonth[5] = "June";
	fullMonth[6] = "July";
	fullMonth[7] = "August";
	fullMonth[8] = "September";
	fullMonth[9] = "October";
	fullMonth[10] = "November";
	fullMonth[11] = "December";
	var more_chats = ['9-10-2020','28-10-2020','4-11-2020'];
	var single_chats = ['19-10-2020'];
	$('#main-grid .datepicker-schedule2').datepicker({
	  beforeShowDay: function(date){
	   var month = date.getMonth()+1;
	   var year = date.getFullYear();
	   var day = date.getDate();
	 
	   // Change format of date
	   var newdate = day+"-"+month+'-'+year;

	   // Set tooltip text when mouse over date
	   var tooltip_text = "New event on " + newdate;

	   // Check date in Array
	   if(jQuery.inArray(newdate, more_chats) != -1){
		//return [true, "highlight", tooltip_text ];
		return [true, "highlight"];
	   }
	   if(jQuery.inArray(newdate, single_chats) != -1){
		//return [true, "highlight", tooltip_text ];
		return [true, "highlight-chat"];
	   }
	   return [true];
	  },
	  onSelect: function (date) {
			date = new Date(date);
			todayDate = new Date();
			var month = date.getMonth()+1;
			var year = date.getFullYear();
			var day = date.getDate();
			var newdate = day+"-"+month+'-'+year;
			
			var month1 = todayDate.getMonth()+1;
			var year1 = todayDate.getFullYear();
			var day1 = todayDate.getDate();
			var todayDate = day1+"-"+month1+'-'+year1;
			if(jQuery.inArray(newdate, more_chats) != -1){
				if(newdate == todayDate) {
					fillScheduleData(true);
				} else {
					fillScheduleData(false);
				}
				$(".schedule-appointment h5 span").text(fullMonth[month - 1] + " "+day);
			} else {
				clearScheduleData();
				$(".schedule-appointment h5 span").text("");
			}
			setAppointmentData();
		}
	 });
}

function clearScheduleData() {
	$(".schedule-appointment input").val("");
	$(".schedule-appointment input").removeClass("filled");
	$(".schedule-appointment input").removeClass("red");
	$(".calendar-panel-body .soon").hide();
}
function fillScheduleData(haveAppintmentToday) {
	$(".schedule-appointment input").val("");
	$(".schedule-appointment input").removeClass("filled");
	$(".schedule-appointment input").removeClass("red");
	$(".calendar-panel-body .soon").hide();
	$(".schedule-appointment #9am").val("Brent1127");
	$(".schedule-appointment #9am").addClass("filled");
	$(".schedule-appointment #11am").val("John 2020");
	$(".schedule-appointment #11am").addClass("filled");
	if(haveAppintmentToday) {
		$(".schedule-appointment #9am").addClass("red");
		$(".schedule-appointment #11am").addClass("red");
		$(".calendar-panel-body .soon").show();
	}
}
$('body').delegate(".schedule-appointment .filled", "click", function() {
	openPanel('chat-history-panel-grid');
	openPanel('work-area-notes-grid');
});
function openTestament(clickedClass) {
	$(".bible-body .buttons .ot").removeClass("active");
	$(".bible-body .buttons .nt").removeClass("active");
	$(".bible-body .buttons ."+clickedClass).addClass("active");
	$(".bible-body .testament").show();
	$(".bible-body .chapter").hide();
	$(".bible-body .bible-verse").hide();
}
$('body').delegate(".bible-body .testament td", "click", function() {
	$(".bible-body .testament td").removeClass("active");
	$(this).addClass("active");
	$(".bible-body .chapter").show();
	$(".bible-body .bible-verse").hide();
});
$('body').delegate(".bible-body .chapter td", "click", function() {
	$(".bible-body .chapter td").removeClass("active");
	$(this).addClass("active");
	$(".bible-body .buttons").hide();
	$(".bible-body .testament").hide();
	$(".bible-body .chapter").hide();
	$(".bible-body .bible-verse").show();
});
function toggleButtons() {
	$(".bible-body .buttons").toggle();
}
function toggleStrong(id, textId) {
	if($(".bible-body #"+id).hasClass("enable")) {
		$(".bible-body #"+id).removeClass("enable");
		$(".bible-body #"+textId).text("S");
		$(".bible-body .transaltion").hide();
		$(".bible-body .usage").hide();
		$(".bible-body .bible-verse .mySlides .scroll-div .table-responsive > table > tbody > tr:not(.strong)").show();
		$(".bible-body #"+id).prev("tr").removeClass("enableTr");
	} else {
		$(".bible-body #"+id).addClass("enable");
		$(".bible-body #"+textId).text("<<");
		$(".bible-body .transaltion").show();
		$(".bible-body .usage").show();
		$(".bible-body .bible-verse .mySlides .scroll-div .table-responsive > table > tbody > tr:not(.strong)").hide();
		$(".bible-body #"+id).prev("tr").addClass("enableTr");
	}
}
function openChatHistory() {
	$(".chat-history-panel-body .notes .chat-panel-messages-body").toggle();
}
$('body').delegate(".bible-body .bible-verse .strong td table td", "click", function() {
	$('.bible-body .bible-verse .strong tr').removeClass("selectedStrong");
	if(!$(this).parent().hasClass("title")) {
		$(this).parent().addClass("selectedStrong");
	}
	var panel=$('.strong-verses-wrapper');
	var gridPanel=$(".strong-verses-grid");
	openPanel("strong-verses-grid");
});

function toggleNoteList() {
	if($('.notes-list-wrapper').hasClass('enable')) {
		$('.notes-list-wrapper').removeClass('enable');
		$(".work-area-notes-body .expand-icon a").html('<i class="fa fa-angle-up"></i>');
	} else {
		$('.notes-list-wrapper').addClass('enable');
		$(".work-area-notes-body .expand-icon a").html('<i class="fa fa-angle-down"></i>');
	}
}
function togglePdfVerseList() {
	if($('.pdf-verse').hasClass('enable')) {
		$('.pdf-verse').removeClass('enable');
		$(".pdf-body .expand-icon a").html('<i class="fa fa-angle-up"></i>');
	} else {
		$('.pdf-verse').addClass('enable');
		$(".pdf-body .expand-icon a").html('<i class="fa fa-angle-down"></i>');
	}
}

function toggleMp3VerseList() {
	if($('.mp3-verse').hasClass('enable')) {
		$('.mp3-verse').removeClass('enable');
		$(".mp3-body .expand-icon a").html('<i class="fa fa-angle-up"></i>');
	} else {
		$('.mp3-verse').addClass('enable');
		$(".mp3-body .expand-icon a").html('<i class="fa fa-angle-down"></i>');
	}
}

function toggleWorkAreaPDFList() {
	if($('.work-area-pdf-content').hasClass('enable')) {
		$('.work-area-pdf-content').removeClass('enable');
		$(".work-area-body .work-area-pdf h4 a").html('<i class="fa fa-angle-up"></i>');
	} else {
		$('.work-area-pdf-content').addClass('enable');
		$(".work-area-body .work-area-pdf h4 a").html('<i class="fa fa-angle-down"></i>');
	}
}

function toggleWorkAreaMP3List() {
	if($('.work-area-mp3-contents').hasClass('enable')) {
		$('.work-area-mp3-contents').removeClass('enable');
		$(".work-area-body .work-area-mp3 h4 a").html('<i class="fa fa-angle-up"></i>');
	} else {
		$('.work-area-mp3-contents').addClass('enable');
		$(".work-area-body .work-area-mp3 h4 a").html('<i class="fa fa-angle-down"></i>');
	}
}

function toggleWorkAreaScriptureList() {
	if($('.work-area-psalms-contents').hasClass('enable')) {
		$('.work-area-psalms-contents').removeClass('enable');
		$(".work-area-body .work-area-content h4 a").html('<i class="fa fa-angle-up"></i>');
	} else {
		$('.work-area-psalms-contents').addClass('enable');
		$(".work-area-body .work-area-content h4 a").html('<i class="fa fa-angle-down"></i>');
	}
}

function openTestamentPdf(clickedClass) {
	$(".pdf-body .buttons .ot").removeClass("active");
	$(".pdf-body .buttons .nt").removeClass("active");
	$(".pdf-body .buttons ."+clickedClass).addClass("active");
	$(".pdf-body .testament").show();
	$(".pdf-body .chapter").hide();
	$(".pdf-body .pdf-verse").removeClass("enable");
}
$('body').delegate(".pdf-body .testament td", "click", function() {
	$(".pdf-body .testament td").removeClass("active");
	$(this).addClass("active");
	$(".pdf-body .chapter").show();
	$(".pdf-body .pdf-verse").removeClass("enable");
});
$('body').delegate(".pdf-body .chapter td", "click", function() {
	$(".pdf-body .chapter td").removeClass("active");
	$(this).addClass("active");
	$(".pdf-body .testament").hide();
	$(".pdf-body .chapter").hide();
	$(".pdf-body .pdf-verse").addClass("enable");
});

function openTestamentMp3(clickedClass) {
	$(".mp3-body .buttons .ot").removeClass("active");
	$(".mp3-body .buttons .nt").removeClass("active");
	$(".mp3-body .buttons ."+clickedClass).addClass("active");
	$(".mp3-body .testament").show();
	$(".mp3-body .chapter").hide();
	$(".mp3-body .mp3-verse").removeClass("enable");
}
$('body').delegate(".mp3-body .testament td", "click", function() {
	$(".mp3-body .testament td").removeClass("active");
	$(this).addClass("active");
	$(".mp3-body .chapter").show();
	$(".mp3-body .mp3-verse").removeClass("enable");
});
$('body').delegate(".mp3-body .chapter td", "click", function() {
	$(".mp3-body .chapter td").removeClass("active");
	$(this).addClass("active");
	$(".mp3-body .testament").hide();
	$(".mp3-body .chapter").hide();
	$(".mp3-body .mp3-verse").addClass("enable");
});

function openVolunteerNext(tabClass) {
	$(".volunteer-panel-body .tab").hide();
	$(".volunteer-panel-body ."+tabClass).show();
	
	$(".volunteer-panel-header .volunteer-panel-header-left").hide();
	$(".volunteer-panel-header ."+tabClass).show();
	
}
chartArray = [{
		  name: 'Burden Bearing (minimum 2+)',
		  y: 39,
		  color:"#ff0000"
		}, {
		  name: 'Spiritual Conversation ad hoc',
		  y: 7,
		  color: "#ff8a00"
		}, {
		  name: 'Gospel Presentation',
		  y: 4,
		  color: "#0084ff"
		}, {
		  name: 'Assurance of Salvation',
		  y: 10,
		  color: "#53c826"
		}, {
		  name: 'Not Responsive to message',
		  y: 10,
		  color: "#e8c003"
		}];
chartDataArray = [];
chartColorsArray = [];
$(".analytics-panel-body .analytics-left table").html("");
$.each(chartArray, function(k, v) {
	chartDataArray.push({'name':v.name, 'y':v.y});
	chartColorsArray.push(v.color);
	$(".analytics-panel-body .analytics-left table").append('<tr><td><span class="dot" style="background: '+v.color+';"></span></td><td>'+v.name+'</td><td style="background: '+v.color+';">'+v.y+'</td></tr>');
});
function initializeChart() {
	Highcharts.chart('analytics-chart', {
	  chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie',
		 margin: [0,0,0,15],
		spacingTop: 0,
		spacingBottom: 0,
		spacingLeft: 0,
		spacingRight: 0,
	  },
	  colors: chartColorsArray,
	  title: {
		text: ''
	  },
	  tooltip: {
		pointFormat: '{point.y:.0f}'
	  },
	  accessibility: {
		point: {
		  valueSuffix: ''
		}
	  },
	  exporting: {
		buttons: {
			contextButton: {
				enabled: false
			}    
		}
	},
	  plotOptions: {
		pie: {
		  allowPointSelect: true,
		  cursor: 'pointer',
		  size: '100%',
		  dataLabels: {
			enabled: true,
			format: '{point.y:.0f}',
			distance: -50,
			filter: {
			  property: 'percentage',
			  operator: '>',
			  value: 4
			}
		  }
		}
	  },
	  series: [{
		name: 'Brands',
		colorByPoint: true,
		data: chartDataArray
	  }]
	});
	Highcharts.chart('analytics-chart2', {
	  chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie',
		 margin: [0,0,0,15],
		spacingTop: 0,
		spacingBottom: 0,
		spacingLeft: 0,
		spacingRight: 0,
	  },
	  colors: chartColorsArray,
	  title: {
		text: ''
	  },
	  tooltip: {
		pointFormat: '{point.y:.0f}'
	  },
	  accessibility: {
		point: {
		  valueSuffix: ''
		}
	  },
	  exporting: {
		buttons: {
			contextButton: {
				enabled: false
			}    
		}
	 },
	  plotOptions: {
		pie: {
		  allowPointSelect: true,
		  cursor: 'pointer',
		  size: '100%',
		  dataLabels: {
			enabled: true,
			format: '{point.y:.0f}',
			distance: -50,
			filter: {
			  property: 'percentage',
			  operator: '>',
			  value: 4
			}
		  }
		}
	  },
	  series: [{
		name: 'Brands',
		colorByPoint: true,
		data: chartDataArray
	  }]
	});
	
	Highcharts.chart('container-chart', {
	  chart: {
		type: 'column'
	  },
	  title: {
		text: ''
	  },
	  subtitle: {
		text: ''
	  },
	  accessibility: {
		announceNewData: {
		  enabled: true
		}
	  },
	  xAxis: {
		 type: 'category',
		title: {
		  text: 'Countries'
		}
	  },
	  yAxis: {
		title: {
		  text: 'Chats'
		}

	  },
	  legend: {
		enabled: false
	  },
	  exporting: {
		buttons: {
			contextButton: {
				enabled: false
			}    
		}
	 },
	  plotOptions: {
		series: {
		  borderWidth: 0,
		  dataLabels: {
			enabled: false,
			format: '{point.y:.1f}%'
		  },
		  color: "#db9e35"
		}
	  },

	  tooltip: {
		headerFormat: '',
		pointFormat: '<span>{point.name}</span>: <b>{point.y:.0f} Chats</b><br/>',
	  },

	  series: [
		{
		  name: "Countries",
		  colorByPoint: false,
		  data: [
			{
			  name: "Canada",
			  y: 1500,
			  drilldown: null
			},
			{
			  name: "Mexico",
			  y: 1000,
			  drilldown: null
			},
			{
			  name: "USA",
			  y: 1526,
			  drilldown: null
			},
			{
			  name: "Italy",
			  y: 1200,
			  drilldown: null
			}
		  ]
		}
	  ]
	});
	$(".tab-main > h6").click(function() {
		$(this).parent().find("h6").removeClass("active");
		$(this).addClass("active");
		$(this).parent().parent().find(".tab-body .tab").hide();
		$(this).parent().parent().find(".tab-body ."+$(this).attr("panel-class")).show();
		
	});
}
