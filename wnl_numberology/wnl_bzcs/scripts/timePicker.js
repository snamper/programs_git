/*eslint-disable*/
$(function() {
    document.querySelector('.wnl_dataPicker').onclick = function () {
		var datePicker = new wnlui.datePicker({
			showLunar: true,
			onChange: function (result) {
				console.log(result);
			},
			onConfirm: function (result) {
                $('body').removeClass('overFlowH');
				console.log(result);
				var isSolar = result.isSolar;
				console.log(isSolar);
				if (isSolar) {
					var year = result.dateObj.lYear;
					var month = result.dateObj.lMonth;
                    var day = result.dateObj.lDay;
                    var leapMonth = calendar.leapMonth(year);
                    //如果存在闰月
                    if(leapMonth != 0) {
                        if(month > leapMonth) {
                            month=month+1;
                        }
                    }
					var displayDate = '公历  ' + year + '年 ' + month + '月 ' + day + '日';
					$('#spBirthDate').val(displayDate);
					console.log(displayDate);
				} else {
					var year = result.dateObj.lYear;
					var month = result.dateObj.IMonthCn;
					var day = result.dateObj.IDayCn;
					var displayDate = '农历  ' + year + '年 ' + month + ' ' + day;
					$('#spBirthDate').val(displayDate);
					console.log(displayDate);
				}
			}
		});
        datePicker.show();
	};
    document.querySelector('.wnl_timePicker').onclick = function() {
        $('body').addClass('overFlowH');
        wnlui.picker([{
				label: '不清楚',
				value: '12:00:00',
			},
			{
				label: '00:00-00:59',
				value: '0:30:00',
			},
			{
				label: '01:00-01:59',
				value: '1:30:00'
			},
			{
				label: '02:00-02:59',
				value: '2:30:00'
            },
            {
				label: '03:00-03:59',
				value: '3:30:00',
			},
			{
				label: '04:00-04:59',
				value: '4:30:00',
			},
			{
				label: '05:00-05:59',
				value: '5:30:00'
			},
			{
				label: '06:00-06:59',
				value: '6:30:00'
            },
            {
				label: '07:00-07:59',
				value: '7:30:00',
			},
			{
				label: '08:00-08:59',
				value: '8:30:00',
			},
			{
				label: '09:00-09:59',
				value: '9:30:00'
			},
			{
				label: '10:00-10:59',
				value: '10:30:00'
            },
            {
				label: '11:00-11:59',
				value: '11:30:00',
			},
			{
				label: '12:00-12:59',
				value: '12:30:00',
			},
			{
				label: '13:00-13:59',
				value: '13:30:00'
			},
			{
				label: '14:00-14:59',
				value: '14:30:00'
            },
            {
				label: '15:00-15:59',
				value: '15:30:00',
			},
			{
				label: '16:00-16:59',
				value: '16:30:00',
			},
			{
				label: '17:00-17:59',
				value: '17:30:00'
			},
			{
				label: '18:00-18:59',
				value: '18:30:00'
            },
            {
				label: '19:00-19:59',
				value: '19:30:00',
			},
			{
				label: '20:00-20:59',
				value: '20:30:00',
			},
			{
				label: '21:00-21:59',
				value: '21:30:00'
			},
			{
				label: '22:00-22:59',
				value: '22:30:00'
            },
            {
				label: '23:00-23:59',
				value: '23:30:00'
			}
		], {
			className: 'custom-classname',
			container: 'body',
			onChange: function(result) {
				console.log(result);
			},
			onConfirm: function(result) {
                $('body').removeClass('overFlowH');
                console.log(result);
                var label=result[0].label;
                console.log(label);
                $('.bornTimeTxt').text(label);
			},
			id: 'singleLinePicker'
		});
    }
})