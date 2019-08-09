Highcharts.chart('3d-doughnut', {
    chart: {
        type: 'pie',
        options3d: {
            enabled: false, // <-- seting 3D or 2D
            alpha: 45
        },
        backgroundColor: 'none',
        // marginTop: 50,
    },
    credits: {
        enabled: false // <-- jangan diganti
    },
    title: {
        text: 'category' // <-- title
    },
    // subtitle: {
    //     text: 'butuh tidurr'
    // },
    plotOptions: {
        pie: {
            innerSize: 100,
            depth: 30
        }
    },
    series: [{
        name: 'Delivered amount',
        data: [
            ['Bananas', 8], // <-- [name , value]
            ['Kiwi', 3],
            ['Mixed nuts', 1],
            ['Oranges', 6],
            ['Apples', 8],
            ['Pears', 4],
            ['Clementines', 4],
            ['Reddish (bag)', 1],
            ['Grapes (bunch)', 1]
        ]
    }]
});