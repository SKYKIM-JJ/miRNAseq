
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
        categories: [16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0, 26.0, 27.0, 28.0, 29.0, 30.0, 31.0, 32.0, 33.0, 34.0, 35.0, 36.0, 37.0, 38.0, 39.0, 40.0, 41.0, 42.0, 43.0, 44.0, 45.0, 46.0, 47.0, 48.0, 49.0, 50.0, 51.0, 52.0, 53.0]
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
        data: [13, 12, 12, 23, 30, 44, 63, 92, 148, 177, 125, 104, 109, 111, 118, 136, 199, 146, 137, 158, 148, 191, 126, 143, 129, 189, 268, 345, 332, 340, 408, 535, 680, 1061, 1571, 1259, 202945],
    }]
});
        
Highcharts.chart('isomirDivID_1', {
    chart: {
        type: 'pie',
    },
    title: {
        text: 'Cumulative isomiR variant type distribution of the samples'
    },
    exporting: {
        filename: 'isomiR_variants'
    },
    credits: {
        enabled: false
    },
    plotOptions: {
        pie: {
            innerSize: 150,
            depth: 65
        }
    },
    series: [{
        name: 'Variant type',
        data: [
        {name:'iso_3p',y:42,selected:true},{name:'iso_add3p',y:58,selected:true},{name:'iso_snv',y:8,selected:true},{name:'iso_snv_central_supp',y:1,selected:true},
        ]
    }]
});
        
Highcharts.chart('isomirDivID_2', {
    chart: {
        type: 'heatmap',
        marginTop: 50,
        marginBottom: 100
    },
    title: {
        text: 'Read distribution of isomiRs for the top 20 abundant miRNAs: SRR1646467'
    },
    exporting: {
        filename: 'SRR1646467_isomir'
    },
    credits: {
        enabled: false
    },
    xAxis: {
        categories: ['hsa-let-7b-5p', 'hsa-miR-103a-3p', 'hsa-miR-106b-5p', 'hsa-miR-10a-5p', 'hsa-miR-1307-5p', 'hsa-miR-141-3p', 'hsa-miR-151a-5p', 'hsa-miR-18a-5p', 'hsa-miR-191-5p', 'hsa-miR-192-5p', 'hsa-miR-19a-3p', 'hsa-miR-19b-3p', 'hsa-miR-21-5p', 'hsa-miR-210-3p', 'hsa-miR-222-3p', 'hsa-miR-23a-3p', 'hsa-miR-26a-5p', 'hsa-miR-27a-3p', 'hsa-miR-29a-3p', 'hsa-miR-29c-3p'],
        title: "Variant type",
        labels: {
            style: {
                color: 'red',
                fontSize: 10
            }
        }
    },
    yAxis: {
        categories: ['3p: >=5', '3p: +4', '3p: +3', '3p: +2', '3p: +1', 'Canonical', '3p: -1', '3p: -2', 'iso_snv_seed','iso_snv_central_offset', 'iso_snv_central','iso_snv_central_supp', 'iso_snv','5p: -2', '5p: -1','5p: +1','5p: +2','5p: +3','5p: +4','5p: >=5'],
        title: "miRNA - isomiRs (5p -> 3p)",
    },
    colorAxis: {
        min: 0,
        stops: [
            [0, '#e3fdff'],
            [0.5, '#055dff'],
            [0.9, '#000000']
        ]
        /*
        stops: [
            [0, '#F5F5F5'],
            [0.05, '#c0f8fc'],
            [0.1, '#f7cafa'],
            [0.2, '#FAFF56'],
            [0.5, '#FC56FF'],
            [0.7, '#A798FF'],
            [0.9, '#c4463a']
        ]*/
        //minColor: '#b0ceff'
        //maxColor: '#0363ff'
        //minColor: '#FFFFFF',
        //maxColor: Highcharts.getOptions().colors[0]
    },
    legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'middle',
        y: 25,
        symbolHeight: 250
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> has log2(read counts) of <br><b>' +
            this.point.value + '</b> at <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        }
    },
    series: [{
        name: 'variant read counts',
        borderWidth: 1,
        data: [
        
        [0,0,0],[0,1,0.0],[0,2,0],[0,3,0.0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,0],[0,12,0],[0,13,0],[0,14,0],[0,15,0],[0,16,0],[0,17,0],[0,18,0],[0,19,0],
        [1,0,0],[1,1,0.0],[1,2,1.0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,0],[1,11,0],[1,12,0],[1,13,0],[1,14,0],[1,15,0],[1,16,0],[1,17,0],[1,18,0],[1,19,0],
        [2,0,0],[2,1,0.0],[2,2,0],[2,3,0],[2,4,0.0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,0],[2,11,0],[2,12,0],[2,13,0],[2,14,0],[2,15,0],[2,16,0],[2,17,0],[2,18,0],[2,19,0],
        [3,0,0],[3,1,0],[3,2,0],[3,3,0.0],[3,4,0],[3,5,0],[3,6,0],[3,7,0],[3,8,0],[3,9,0],[3,10,0],[3,11,0],[3,12,0],[3,13,0],[3,14,0],[3,15,0],[3,16,0],[3,17,0],[3,18,0],[3,19,0],
        [4,0,0],[4,1,0.0],[4,2,0.0],[4,3,0.0],[4,4,0.0],[4,5,0],[4,6,0],[4,7,0],[4,8,0],[4,9,0],[4,10,0],[4,11,0],[4,12,0],[4,13,0],[4,14,0],[4,15,0],[4,16,0],[4,17,0],[4,18,0],[4,19,0],
        [5,0,0],[5,1,0],[5,2,0],[5,3,0.0],[5,4,0.0],[5,5,0],[5,6,0],[5,7,0],[5,8,0],[5,9,0],[5,10,0],[5,11,0],[5,12,0],[5,13,0],[5,14,0],[5,15,0],[5,16,0],[5,17,0],[5,18,0],[5,19,0],
        [6,0,0],[6,1,0],[6,2,0.0],[6,3,0.0],[6,4,0],[6,5,0],[6,6,0],[6,7,0],[6,8,0],[6,9,0],[6,10,0],[6,11,0],[6,12,0],[6,13,0],[6,14,0],[6,15,0],[6,16,0],[6,17,0],[6,18,0],[6,19,0],
        [7,0,0],[7,1,0],[7,2,0],[7,3,1.6],[7,4,0.0],[7,5,0],[7,6,0],[7,7,0],[7,8,0],[7,9,0],[7,10,0],[7,11,0],[7,12,0],[7,13,0],[7,14,0],[7,15,0],[7,16,0],[7,17,0],[7,18,0],[7,19,0],
        [8,0,0],[8,1,0],[8,2,0],[8,3,0.0],[8,4,1.0],[8,5,0],[8,6,0],[8,7,0],[8,8,0],[8,9,0],[8,10,0],[8,11,0],[8,12,0],[8,13,0],[8,14,0],[8,15,0],[8,16,0],[8,17,0],[8,18,0],[8,19,0],
        [9,0,0],[9,1,0],[9,2,2.3],[9,3,0.0],[9,4,2.0],[9,5,0],[9,6,0],[9,7,0],[9,8,0],[9,9,0],[9,10,0],[9,11,0],[9,12,0],[9,13,0],[9,14,0],[9,15,0],[9,16,0],[9,17,0],[9,18,0],[9,19,0],
        [10,0,0],[10,1,0],[10,2,0],[10,3,0],[10,4,0.0],[10,5,0],[10,6,0],[10,7,0],[10,8,0],[10,9,0],[10,10,0],[10,11,0],[10,12,0.0],[10,13,0],[10,14,0],[10,15,0],[10,16,0],[10,17,0],[10,18,0],[10,19,0],
        [11,0,0],[11,1,0],[11,2,0.0],[11,3,0],[11,4,0],[11,5,0],[11,6,0],[11,7,0],[11,8,0],[11,9,0],[11,10,0],[11,11,0],[11,12,1.0],[11,13,0],[11,14,0],[11,15,0],[11,16,0],[11,17,0],[11,18,0],[11,19,0],
        [12,0,0],[12,1,0],[12,2,0.0],[12,3,2.8],[12,4,3.6],[12,5,0],[12,6,0],[12,7,0],[12,8,0],[12,9,0],[12,10,0],[12,11,0],[12,12,0],[12,13,0],[12,14,0],[12,15,0],[12,16,0],[12,17,0],[12,18,0],[12,19,0],
        [13,0,0],[13,1,0],[13,2,0.0],[13,3,0],[13,4,0],[13,5,0],[13,6,0],[13,7,0],[13,8,0],[13,9,0],[13,10,0],[13,11,0],[13,12,0],[13,13,0],[13,14,0],[13,15,0],[13,16,0],[13,17,0],[13,18,0],[13,19,0],
        [14,0,0],[14,1,0.0],[14,2,0.0],[14,3,0],[14,4,0],[14,5,0],[14,6,0],[14,7,0],[14,8,0],[14,9,0],[14,10,0],[14,11,0],[14,12,0],[14,13,0],[14,14,0],[14,15,0],[14,16,0],[14,17,0],[14,18,0],[14,19,0],
        [15,0,0],[15,1,0.0],[15,2,0.0],[15,3,0],[15,4,0],[15,5,0],[15,6,0],[15,7,0],[15,8,0],[15,9,0],[15,10,0],[15,11,0],[15,12,0],[15,13,0],[15,14,0],[15,15,0],[15,16,0],[15,17,0],[15,18,0],[15,19,0],
        [16,0,0],[16,1,1.6],[16,2,0.0],[16,3,0],[16,4,0],[16,5,0],[16,6,0.0],[16,7,0],[16,8,0],[16,9,0],[16,10,0],[16,11,0],[16,12,0],[16,13,0],[16,14,0],[16,15,0],[16,16,0],[16,17,0],[16,18,0],[16,19,0],
        [17,0,0],[17,1,0],[17,2,0],[17,3,0.0],[17,4,0.0],[17,5,0],[17,6,0],[17,7,0],[17,8,0],[17,9,0],[17,10,0],[17,11,0],[17,12,0],[17,13,0],[17,14,0],[17,15,0],[17,16,0],[17,17,0],[17,18,0],[17,19,0],
        [18,0,0],[18,1,0],[18,2,0.0],[18,3,0],[18,4,0],[18,5,0],[18,6,0],[18,7,0],[18,8,0],[18,9,0],[18,10,0],[18,11,0],[18,12,0.0],[18,13,0],[18,14,0],[18,15,0],[18,16,0],[18,17,0],[18,18,0],[18,19,0],
        [19,0,0],[19,1,0.0],[19,2,0],[19,3,0],[19,4,0],[19,5,0],[19,6,0],[19,7,0],[19,8,0],[19,9,0],[19,10,0],[19,11,0],[19,12,0],[19,13,0],[19,14,0],[19,15,0],[19,16,0],[19,17,0],[19,18,0],[19,19,0],
        ],
        dataLabels: {
            enabled: false,
            color: '#000000'
        }
    }],
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
          { name: 'Hairpin miRNA', data: [6]},  
          { name: 'primary tRNA', data: [1]}, 
          { name: 'mature tRNA', data: [568]}, 
          { name: 'snoRNA', data: [2638]}, 
          { name: 'rRNA', data: [1574]}, 
          { name: 'ncRNA', data: [1298]}, 
          { name: 'mRNA', data: [192]},  
          { name: 'remaining reads', data: [507338]}
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

        