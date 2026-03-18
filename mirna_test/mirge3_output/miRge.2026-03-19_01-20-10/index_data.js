
var chart = Highcharts.chart('readLengthID_1', {
    title: {
        text: 'SRR1646467: Read Length Distribution'
    },
    chart: {
        marginRight: 80,
        zoomType: 'xy'
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: [np.float64(16.0), np.float64(17.0), np.float64(18.0), np.float64(19.0), np.float64(20.0), np.float64(21.0), np.float64(22.0), np.float64(23.0), np.float64(24.0), np.float64(25.0), np.float64(26.0), np.float64(27.0), np.float64(28.0), np.float64(29.0), np.float64(30.0), np.float64(31.0), np.float64(32.0), np.float64(33.0), np.float64(34.0), np.float64(35.0), np.float64(36.0), np.float64(37.0), np.float64(38.0), np.float64(39.0), np.float64(40.0), np.float64(41.0), np.float64(42.0), np.float64(43.0), np.float64(44.0), np.float64(45.0), np.float64(46.0), np.float64(47.0), np.float64(48.0), np.float64(49.0), np.float64(50.0), np.float64(51.0), np.float64(52.0), np.float64(53.0)]
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Frequency'
        }
    },
    series: [{
        name: 'Read length',
        pointWidth: 10,
        type: 'column',
        colorByPoint: false,
        data: [13, 12, 12, 22, 30, 41, 63, 92, 150, 175, 117, 101, 104, 115, 120, 139, 201, 143, 141, 154, 153, 189, 128, 140, 131, 193, 271, 346, 330, 333, 400, 534, 683, 1057, 1192, 1260, 203342],
    }]
});
        
Highcharts.chart('smallRNADist', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Read distribution'
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: ['SRR1646467']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Total read distribution'
        }
    },
    legend: {
        reversed: true
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
    },
    plotOptions: {
        series: {
            stacking: 'percent'
        }
    },
    series: 
        [ { name: 'mature miRNA', data: [0.0]},
          { name: 'Hairpin miRNA', data: [np.int64(6)]},  
          { name: 'primary tRNA', data: [np.int64(1)]}, 
          { name: 'mature tRNA', data: [np.int64(567)]}, 
          { name: 'snoRNA', data: [np.int64(2637)]}, 
          { name: 'rRNA', data: [np.int64(1543)]}, 
          { name: 'ncRNA', data: [np.int64(1296)]}, 
          { name: 'mRNA', data: [np.int64(189)]},  
          { name: 'remaining reads', data: [507381]}
        ]
    
});
        
var chart = Highcharts.chart('exprnDivID_1', {
    chart: {
        type: 'tilemap',
        inverted: true,
        height: '60%',
    },

    title: {
        text: 'SRR1646467'
    },
	subtitle: {
        text: 'Read Per Million (RPM) values of 40 most abundant miRNAs'
    },
    credits: {
        enabled: false
    },
    
    xAxis: {
        visible: false
    },

    yAxis: {
        visible: false
    },
    exporting: {
        buttons: {
            contextButton: {
                menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"]
            }
        }
    },
    colorAxis: {
        dataClasses: [{
            from: 0,
            to: 2000,
            color: '#DCDCDC',
            name: '< 2k RPM' 
        }, {
            from: 2000,
            to: 5000,
            color: '#D6EAF8', //#C0C0C0
            name: '2 - 5k RPM'
        }, {
            from: 5000,
            to: 15000,
            color: '#F9EDB3',
            name: '5 - 15k RPM'
        }, {
            from: 15000,
            to: 25000,
            color: '#FFC428',
            name: '15 - 25k RPM'
        }, {
            from: 25000,
            to: 35000,
            color: '#FF7987',
            name: '25 - 35k RPM'
        },{
            from: 35000,
            color: '#FF2371',
            name: '> 35k RPM'
        }]
    },
    tooltip: {
        headerFormat: '',
        pointFormat: 'The RPM of <b> {point.name}</b> is <b>{point.value}</b>'
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.hc-a2}',
                color: '#000000',
                style: {
                    textOutline: false,
                    fontSize: 9
                }
            }
        }
    },
    series: [{
        name: '',
		pointPadding: 1.2,
        data: [ 
        {
            'hc-a2': 'let:7a:2:3p',
            name: 'hsa-let-7a-2-3p',
            x: 0,
            y: 0,
            value: 0.0
        },
        {
            'hc-a2': 'let:7a:3p',
            name: 'hsa-let-7a-3p',
            x: 0,
            y: 1,
            value: 0.0
        },
        {
            'hc-a2': 'let:7a:5p',
            name: 'hsa-let-7a-5p/7c-5p',
            x: 0,
            y: 2,
            value: 0.0
        },
        {
            'hc-a2': 'let:7b:3p',
            name: 'hsa-let-7b-3p',
            x: 0,
            y: 3,
            value: 0.0
        },
        {
            'hc-a2': 'let:7b:5p',
            name: 'hsa-let-7b-5p',
            x: 0,
            y: 4,
            value: 0.0
        },
        {
            'hc-a2': 'let:7c:3p',
            name: 'hsa-let-7c-3p',
            x: 0,
            y: 5,
            value: 0.0
        },
        {
            'hc-a2': 'let:7d:3p',
            name: 'hsa-let-7d-3p',
            x: 0,
            y: 6,
            value: 0.0
        },
        {
            'hc-a2': 'let:7d:5p',
            name: 'hsa-let-7d-5p',
            x: 0,
            y: 7,
            value: 0.0
        },
        {
            'hc-a2': 'let:7e:3p',
            name: 'hsa-let-7e-3p',
            x: 1,
            y: 0,
            value: 0.0
        },
        {
            'hc-a2': 'let:7e:5p',
            name: 'hsa-let-7e-5p',
            x: 1,
            y: 1,
            value: 0.0
        },
        {
            'hc-a2': 'let:7f:1:3p',
            name: 'hsa-let-7f-1-3p',
            x: 1,
            y: 2,
            value: 0.0
        },
        {
            'hc-a2': 'let:7f:2:3p',
            name: 'hsa-let-7f-2-3p',
            x: 1,
            y: 3,
            value: 0.0
        },
        {
            'hc-a2': 'let:7f:5p',
            name: 'hsa-let-7f-5p',
            x: 1,
            y: 4,
            value: 0.0
        },
        {
            'hc-a2': 'let:7g:3p',
            name: 'hsa-let-7g-3p',
            x: 1,
            y: 5,
            value: 0.0
        },
        {
            'hc-a2': 'let:7g:5p',
            name: 'hsa-let-7g-5p',
            x: 1,
            y: 6,
            value: 0.0
        },
        {
            'hc-a2': 'let:7i:3p',
            name: 'hsa-let-7i-3p',
            x: 1,
            y: 7,
            value: 0.0
        },
        {
            'hc-a2': 'let:7i:5p',
            name: 'hsa-let-7i-5p',
            x: 2,
            y: 0,
            value: 0.0
        },
        {
            'hc-a2': 'miR:1:3p',
            name: 'hsa-miR-1-3p',
            x: 2,
            y: 1,
            value: 0.0
        },
        {
            'hc-a2': 'miR:1:5p',
            name: 'hsa-miR-1-5p',
            x: 2,
            y: 2,
            value: 0.0
        },
        {
            'hc-a2': 'miR:100:3p',
            name: 'hsa-miR-100-3p',
            x: 2,
            y: 3,
            value: 0.0
        },
        {
            'hc-a2': 'miR:100:5p',
            name: 'hsa-miR-100-5p',
            x: 2,
            y: 4,
            value: 0.0
        },
        {
            'hc-a2': 'miR:101:2:5p',
            name: 'hsa-miR-101-2-5p',
            x: 2,
            y: 5,
            value: 0.0
        },
        {
            'hc-a2': 'miR:101:3p',
            name: 'hsa-miR-101-3p',
            x: 2,
            y: 6,
            value: 0.0
        },
        {
            'hc-a2': 'miR:101:5p',
            name: 'hsa-miR-101-5p',
            x: 2,
            y: 7,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10226',
            name: 'hsa-miR-10226',
            x: 3,
            y: 0,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10392:3p',
            name: 'hsa-miR-10392-3p',
            x: 3,
            y: 1,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10392:5p',
            name: 'hsa-miR-10392-5p',
            x: 3,
            y: 2,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10393:3p',
            name: 'hsa-miR-10393-3p',
            x: 3,
            y: 3,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10393:5p',
            name: 'hsa-miR-10393-5p',
            x: 3,
            y: 4,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10394:3p',
            name: 'hsa-miR-10394-3p',
            x: 3,
            y: 5,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10394:5p',
            name: 'hsa-miR-10394-5p',
            x: 3,
            y: 6,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10395:3p',
            name: 'hsa-miR-10395-3p',
            x: 3,
            y: 7,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10395:5p',
            name: 'hsa-miR-10395-5p',
            x: 4,
            y: 0,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10396a:3p',
            name: 'hsa-miR-10396a-3p/10396b-3p',
            x: 4,
            y: 1,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10396a:5p',
            name: 'hsa-miR-10396a-5p/10396b-5p',
            x: 4,
            y: 2,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10397:3p',
            name: 'hsa-miR-10397-3p',
            x: 4,
            y: 3,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10397:5p',
            name: 'hsa-miR-10397-5p',
            x: 4,
            y: 4,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10398:3p',
            name: 'hsa-miR-10398-3p',
            x: 4,
            y: 5,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10398:5p',
            name: 'hsa-miR-10398-5p',
            x: 4,
            y: 6,
            value: 0.0
        },
        {
            'hc-a2': 'miR:10399:3p',
            name: 'hsa-miR-10399-3p',
            x: 4,
            y: 7,
            value: 0.0
        }]
    }]
});

        