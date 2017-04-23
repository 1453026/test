$(function() {

    // Area Chart
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2016 Q1',
            nike: 2666,
            jordan: null,
            adidas: 2647
        }, {
            period: '2016 Q2',
            nike: 2778,
            jordan: 2294,
            adidas: 2441
        }, {
            period: '2016 Q3',
            nike: 13586,
            jordan: 5632,
            adidas: 8509
        }, {
            period: '2016 Q4',
            nike: 3767,
            jordan: 3597,
            adidas: 5689
        }, {
            period: '2017 Q1',
            nike: 13586,
            jordan: 5632,
            adidas: 8509
        }],
        xkey: 'period',
        ykeys: ['nike', 'jordan', 'adidas'],
        labels: ['nike', 'jordan', 'adidas'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
    //Donut chart
    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Online Sales",
            value: 50
        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }],
        resize: true
    });

});