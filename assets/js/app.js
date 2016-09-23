$(function(){
	function compareDates(startDate, endDate, format) {
    var temp, dateStart, dateEnd;
    try {
      dateStart = $.datepicker.parseDate(format, startDate);
      dateEnd = $.datepicker.parseDate(format, endDate);
      if (dateEnd < dateStart) {
        temp = startDate;
        startDate = endDate;
        endDate = temp;
      }
    } catch (ex) {}
    return { start: startDate, end: endDate };
  };
    $.fn.dateRangePicker = function (options) {
    options = $.extend({
      "changeMonth": false,
      "changeYear": false,
      "numberOfMonths": 2,
      "rangeSeparator": " - ",
	  "useHiddenAltFields": false
    }, options || {});

	var myDateRangeTarget = $(this);
    var onSelect = options.onSelect || $.noop;
    var onClose = options.onClose || $.noop;
    var beforeShow = options.beforeShow || $.noop;
    var beforeShowDay = options.beforeShowDay;
    var lastDateRange;

    function storePreviousDateRange(dateText, dateFormat) {
      var start, end;
      dateText = dateText.split(options.rangeSeparator);
      if (dateText.length > 0) {
        start = $.datepicker.parseDate(dateFormat, dateText[0]);
        if (dateText.length > 1) {
          end = $.datepicker.parseDate(dateFormat, dateText[1]);
        }
        lastDateRange = {start: start, end: end};
      } else {
        lastDateRange = null;
      }
    }
		
    options.beforeShow = function(input, inst) {
      var dateFormat = myDateRangeTarget.datepicker("option", "dateFormat");
      storePreviousDateRange($(input).val(), dateFormat);
      beforeShow.apply(myDateRangeTarget, arguments);
    };
		
    options.beforeShowDay = function(date) {
      var out = [true, ""], extraOut;
      if (lastDateRange && lastDateRange.start <= date) {
        if (lastDateRange.end && date <= lastDateRange.end) {
          out[1] = "ui-datepicker-range";
        }
      }

      if (beforeShowDay) {
        extraOut = beforeShowDay.apply(myDateRangeTarget, arguments);
        out[0] = out[0] && extraOut[0];
        out[1] = out[1] + " " + extraOut[1];
        out[2] = extraOut[2];
      }
      return out;
    };

    options.onSelect = function(dateText, inst) {
      var textStart;
      if (!inst.rangeStart) {
        inst.inline = true;
        inst.rangeStart = dateText;
      } else {
        inst.inline = false;
        textStart = inst.rangeStart;
        if (textStart !== dateText) {
          var dateFormat = myDateRangeTarget.datepicker("option", "dateFormat");
          var dateRange = compareDates(textStart, dateText, dateFormat);
          myDateRangeTarget.val(dateRange.start + options.rangeSeparator + dateRange.end);
          inst.rangeStart = null;
					if (options.useHiddenAltFields){
						var myToField = myDateRangeTarget.attr("data-to-field");
						var myFromField = myDateRangeTarget.attr("data-from-field");
						$("#"+myFromField).val(dateRange.start);
						$("#"+myToField).val(dateRange.end);
					}
        }
      }
      onSelect.apply(myDateRangeTarget, arguments);
    };

    options.onClose = function(dateText, inst) {
      inst.rangeStart = null;
      inst.inline = false;
      onClose.apply(myDateRangeTarget, arguments);
    };

    return this.each(function() {
      if (myDateRangeTarget.is("input")) {
        myDateRangeTarget.datepicker(options);
      }
			myDateRangeTarget.wrap("<div class=\"dateRangeWrapper\"></div>");
    });
  };
	
	function floatLabel(inputType){
		$(inputType).each(function(){
			var $this = $(this);
			// on focus add cladd active to label
			$this.focus(function(){
				$this.addClass("active");
			});
			//on blur check field and remove class if needed
			$this.blur(function(){
				if($this.val() === '' || $this.val() === 'blank'){
					$this.removeClass();
				}
			});
		});
	};
	// just add a class of "floatLabel to the input field!"
	floatLabel(".floatLabel");
	
	//$('.datePicker').datepicker();
    //$('#dateRangePicker').dateRangePicker();
	$('#dateRangePicker').dateRangePicker({
		showOn: "focus",
		rangeSeparator: " to ",
		dateFormat: "dd-mm-yy",
		useHiddenAltFields: true,
		constrainInput: true
	});
 
    var dropdowns = $(".dropdown");

    // Onclick on a dropdown, toggle visibility
	dropdowns.find("a.button").click(function(){
		   dropdowns.find("a.button + .dropdown-menu").hide();
		   $(this).next().toggle();
		});

    // Clic handler for dropdown
    dropdowns.find(".dropdown-menu > li > a").click(function(){
		var theSpan = $(this).parents(".dropdown").find("a.button span");

		// Remove selected class
		$(this).parents(".dropdown").find('.dropdown-menu > li > a').each(function(){
		$(this).removeClass('selected');
	  });
	// Update selected value
	theSpan.html($(this).html());

	// If back to default, remove selected class else addclass on right element
	if($(this).hasClass('default')){
    theSpan.removeClass('selected')
  }
	else{
		theSpan.addClass('selected');
		$(this).addClass('selected');
	}
  
	// Close dropdown
	$(this).parents(".dropdown-menu ").hide();
});
    // Close all dropdown onclick on another element
    $(document).bind('click', function(e){
	   if (! $(e.target).parents().hasClass("dropdown")) $(".dropdown .dropdown-menu").hide();
    });

});



//$(function(){
//   $('.datePicker').datepicker();
//});

// cd();

// function cd(){
//      var date = new Date();
//    var currentDate = date.getDate();
//    var currentYear = date.getFullYear();
//    var monthNames = $('.hasDatepicker').datepicker( "option", "monthNames" );
//    var dayNames = $('.hasDatepicker').datepicker( "option", "dayNames" );
//    var currentMonth = monthNames[date.getMonth()];
//    var currentDay = dayNames[date.getDay()];
//    var dh  = $('.ui-datepicker').height();

//   var current =  '<div class="datepicker-current"><p class="current-day">'+currentDay+'</p><h3 class="current-date">' + currentDate +'</h3><div class="month-info"><span class="current-month">'+currentMonth+'</span><span class="current-year">'+currentYear+'</span></div></div>';
//   // console.log(current);
  
//     $('.datepicker-current').remove();
//     $('.ui-datepicker').append(current);
//     $('.datepicker-current').css("height" , dh);
  
// }

// $(document).on("click", '.ui-corner-all , .hasDatepicker' ,   function(){
//   cd()
// });