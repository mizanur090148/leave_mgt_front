import { ApexOptions } from 'apexcharts';
export const growthChart:ApexOptions = {
    series: [{
        name: 'Growth',
        data: [22, 14, 23, 8, 14, 12, 2, 14, 18, 35, 18, 8, 24]
    }],
    chart: {
        height: 150,
        type: 'line',
        stacked: true,
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 4,
            color: 'var(--theme-deafult)',
            opacity: 0.22
        },
    },
    grid: {
        show: true,
        borderColor: '#000000',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: false,
            },
        },
        yaxis: {    
            lines: {
                show: false,
            },
        },
    },

    colors: ["#5527FF"],
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    xaxis: {
        type: 'category',
        categories: ['0', '', '10k', '', '20k', '', '30k', '', '40k', '', '50k', '', '60k', ''],
        tickAmount: 10,
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        },
        tooltip: {
            enabled: false,
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            gradientToColors: ['#5527FF'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            colorStops: [
                {
                    offset: 0,
                    color: "var(--theme-deafult)",
                    opacity: 1
                },
                {
                    offset: 100,
                    color: "#48A3D7",
                    opacity: 1
                },
            ]
        },
    },
    yaxis: {
        min: -10,
        max: 40,
        labels: {
            show: false
        }
    }
};

export const generalGrowthChart:ApexOptions = {
    series: [{
        name: 'Growth',
        data: [22, 14, 23, 8, 14, 12, 2, 14, 18, 35, 18, 8, 24]
    }],
    chart: {
        height: 180,
        type: 'line',
        stacked: true,
        toolbar: {
            show: false
        },
        dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 4,
            color: 'var(--theme-deafult)',
            opacity: 0.22
        },
    },
    grid: {
        show: true,
        borderColor: '#000000',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
            lines: {
                show: false,
            },
        },
        yaxis: {    
            lines: {
                show: false,
            },
        },
    },

    colors: ["#5527FF"],
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    xaxis: {
        type: 'category',
        categories: ['0', '', '10k', '', '20k', '', '30k', '', '40k', '', '50k', '', '60k', ''],
        tickAmount: 10,
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        },
        tooltip: {
            enabled: false,
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            gradientToColors: ['#5527FF'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            colorStops: [
                {
                    offset: 0,
                    color: "var(--theme-deafult)",
                    opacity: 1
                },
                {
                    offset: 100,
                    color: "#48A3D7",
                    opacity: 1
                },
            ]
        },
    },
    yaxis: {
        min: -10,
        max: 40,
        labels: {
            show: false
        }
    }
};


export const shiftsOptionChart:ApexOptions =  {
        labels: ["Shoes", "Grocery", "other", "other"],
        series: [30, 25, 35, 55],
        chart: {
            type: "donut",
            height: 200,
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        stroke: {
            width: 6,
        },
        plotOptions: {
            pie: {
                expandOnClick: false,
                donut: {
                    size: "83%",
                    labels: {
                        show: true,
                        name: {
                            offsetY: 4,
                        },
                        total: {
                            show: true,
                            fontSize: "20px",
                            fontFamily: "Outfit', sans-serif",
                            fontWeight: 600,
                            label: "$ 34,098",
                            formatter: () => "Total Overviewt",
                        },
                    },
                },
            },
        },
        states: {
            normal: {
                filter: {
                    type: "none",
                },
            },
            hover: {
                filter: {
                    type: "none",
                },
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: "none",
                },
            },
        },
        colors: ["#48A3D7", "#D77748", "#C95E9E", "#7A70BA"],
    };

export const customerChartData:ApexOptions = {
    series: [{
        type: 'bar',
        data: [350, 180, 240, 470, 200, 570, 300, 200]
    }, {
        type: 'bar',
        data: [500, 390, 280, 140, 290, 190, 390, 90]
    },
    {
        type: 'line',
        data: [350, 180, 240, 470, 200, 570, 300, 200]
    }],
    chart: {
        height: 350,
        toolbar: {
            show: false
        },
    },
    markers: {
        size: 6,
        strokeColors: "#ffffff",
        strokeWidth: 3,
        offsetX: -3,
        strokeOpacity: 1,
        fillOpacity: 1,
        hover: {
            size: 6
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '60%',
            borderRadius: 6,
            dataLabels: {
                position: 'top',
            },
        }
    },
    grid: {
        show: true,
        strokeDashArray: 5,
        position: 'back',
        xaxis: {
            lines: {
                show: false
            }
        },
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
            fontSize: '14px',
            fontWeight: 600,
            colors: ['#fff']
        }
    },
    stroke: {
        show: true,
        width: [4, 4, 3],
        colors: ['#ffffff', '#ffffff', "var(--theme-deafult)"]
    },
    colors: ["var(--theme-deafult)", "#48A3D7"],
    tooltip: {
        shared: true,
        intersect: false
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug'],
        axisBorder: {
            show: false
        },
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#3D434A',
            },
        },
    },
    responsive: [
        {
            breakpoint: 1588,
            options: {
                chart: {
                    height: 376,
                },
            }
        },
        {
            breakpoint: 1400,
            options: {
                series: [{
                    type: 'bar',
                    data: [350, 180, 240, 470, 200]
                }, {
                    type: 'bar',
                    data: [500, 390, 280, 140, 290]
                },
                {
                    type: 'line',
                    data: [350, 180, 240, 470, 200]
                }],
            }
        },
        {
            breakpoint: 1401,
            options: {
                chart: {
                    height: 376,
                },
            }

        },
        {
            breakpoint: 1200,
            options: {
                series: [{
                    type: 'bar',
                    data: [350, 180, 240, 470, 200, 570, 300, 200]
                }, {
                    type: 'bar',
                    data: [500, 390, 280, 140, 290, 190, 390, 90]
                },
                {
                    type: 'line',
                    data: [350, 180, 240, 470, 200, 570, 300, 200]
                }],
                chart: {
                    height: 310,
                },
            }
        },
        {
            breakpoint: 550,
            options: {
                series: [{
                    type: 'bar',
                    data: [350, 180, 240, 470]
                }, {
                    type: 'bar',
                    data: [500, 390, 280, 140]
                },
                {
                    type: 'line',
                    data: [350, 180, 240, 470]
                }],
            }
        },
    ]
};

export const salesChartData:ApexOptions = {
    series: [{
        name: 'TEAM A',
        type: 'area',
        data: [20, 50, 60, 180, 90, 340, 120, 250, 190, 100, 180, 380, 190, 220, 100, 90, 140, 70, 130, 90, 100, 50, 10]
    }, {
        name: 'TEAM B',
        type: 'line',
        data: [20, 70, 30, 100, 120, 220, 250, 100, 200, 300, 330, 270, 300, 200, 180, 220, 130, 300, 220, 180, 40, 70, 10]
    }],
    chart: {
        height: 270, 
        type: 'line',
        toolbar: {
            show: false,
        },
        
        dropShadow: {
            enabled: true,
            top: 4,
            left: 1,
            blur: 2,
            // color: ["var(--theme-deafult)", '#8D8D8D'],
            opacity: 0.6
        },

    },
    stroke: {
        curve: 'smooth',
        width: [3, 3],
        dashArray: [0, 4]

    },
    grid: {
        show: true,
        borderColor: 'rgba(106, 113, 133, 0.30)',
        strokeDashArray: 3,
    },
    fill: {
        type: 'solid',
        opacity: [0, 1],
    },
    colors: ["#7A70BA"],

    labels: ['Jan', '', 'Feb', '', 'Mar', '', 'Apr', '', 'May', '', 'Jun', '', 'Jul', '', 'Aug', '', 'Sep', '', 'Oct', '', 'Nov', '', 'Dec'],
    markers: {
        size: [3, 0],
        colors: ['#3D434A'],
        strokeWidth: [0, 0],
    },
    responsive: [
        {
            breakpoint: 991,
            options: {
                chart: {
                    height: 300
                }
            }
        },
        {
            breakpoint: 1500,
            options: {
                chart: {
                    height: 325
                }
            }
        }
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0) + " points";
                }
                return y;
            }
        }
    },
    annotations: {
        xaxis: [{
            x: 550,
            strokeDashArray: 5,
            borderWidth: 3,
            borderColor: '#7a70ba69',
        },
        ],
        points: [{
            x: 550,
            y: 330,
            marker: {
                size: 8,
                fillColor: "var(--theme-deafult)",
                strokeColor: "#ffffff",
                strokeWidth: 4,
                radius: 5,
            },
            label: {
                borderWidth: 1,
                offsetY: 0,
                text: '32.10k',
                style: {
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Outfit, sans-serif',
                }
            }
        }],
    },
    legend: {
        show: false,
    },
    // colors: ["var(--theme-deafult)", '#8D8D8D'],
    xaxis: {
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
        axisBorder: {
            show: false
        },
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return value + "k";
            },
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#3D434A',
            },
        },
    }
};


export const radialChart_1:ApexOptions = {
    series: [75],
    chart: {
        height: 90,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '35%',
            },
            track: {
                background: 'var(--theme-deafult)',
                opacity: 0.2,
            },
            dataLabels: {
                value: {
                    color: "var(--tag-text-color--edit)",
                    fontSize: "12px",
                    show: true,
                    offsetY: -12,
                }
            }
        },
    },
    colors: ["var(--theme-deafult)"],

    stroke: {
        lineCap: "round",
    },
}

// radial 2
export const radialChart_2:ApexOptions = {
    series: [50],
    chart: {
        height: 90,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '35%',
            },
            track: {
                background: 'var(--theme-deafult)',
                opacity: 0.2,
            },
            dataLabels: {
                value: {
                    color: "var(--tag-text-color--edit)",
                    fontSize: "12px",
                    show: true,
                    offsetY: -12,
                }
            }
        },
    },
    colors: ["#48A3D7"],

    stroke: {
        lineCap: "round",
    },
}
// radial 3
export const radialChart_3:ApexOptions = {
    series: [25],
    chart: {
        height: 90,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '35%',
            },
            track: {
                background: 'var(--theme-deafult)',
                opacity: 0.2,
            },
            dataLabels: {
                value: {
                    color: "var(--tag-text-color--edit)",
                    fontSize: "12px",
                    show: true,
                    offsetY: -12,
                }
            }
        },
    },
    colors: ["#D77748"],

    stroke: {
        lineCap: "round",
    },
}
// radial 4
export const radialChart_4:ApexOptions = {
    series: [86],
    chart: {
        height: 90,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '35%',
            },
            track: {
                background: 'var(--theme-deafult)',
                opacity: 0.2,
            },
            dataLabels: {
                value: {
                    color: "var(--tag-text-color--edit)",
                    fontSize: "12px",
                    show: true,
                    offsetY: -12,
                }
            }
        },
    },
    colors: ["#C95E9E"],

    stroke: {
        lineCap: "round",
    },
}


export const totalProjectChart:ApexOptions = {
    series: [{
        name: 'PRODUCT A',
        data: [20, 36, 24, 10, 22, 43, 55, 41, 67, 22, 43]
    }, {
        name: 'PRODUCT B',
        data: [35, 20, 38, 38, 13, 27, 23, 20, 8, 13, 27]
    }, {
        name: 'PRODUCT C',
        data: [14, 16, 42, 46, 21, 14, 17, 15, 15, 21, 14]
    },],
    chart: {
        type: 'bar',
        height: 220,
        stacked: true,
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    responsive: [{
        breakpoint: 1501,
        options: {
            chart: {
                height: 270,
            }

        }
    }],
    colors: ["var(--theme-deafult)", "#48A3D7", '#D77748'],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 2,
            columnWidth: '35%'
        },
    },
    xaxis: {
        categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
            '01/05/2011 GMT', '01/06/2011 GMT'
        ],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        opacity: 1
    }
};

export const projectChart:ApexOptions = {
    series: [
        {
            name: "Earning",
            type: "area",
            data: [43, 43, 48, 43, 57, 50, 34, 52, 40, 40, 40, 46, 52, 40, 40, 30, 42, 37, 42, 38, 38, 38],
        },
    ],
    chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
            show: false,
        },
        dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            color: "#000",
            opacity: 0.08,
        },
    },
    stroke: {
        width: [4, 2, 2],
        curve: "straight",
    },
    grid: {
        show: true,
        borderColor: "var(--chart-border)",
        strokeDashArray: 6,
    },
    plotOptions: {
        bar: {
            columnWidth: "50%",
        },
    },
    colors: ["var(--theme-deafult)", "#54BA4A", "#FF3364"],
    fill: {
        type: "gradient",
        gradient: {
            shade: "light",
            type: "vertical",
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 0],
        },
    },
    annotations: {
        xaxis: [{
            x: 312,
            strokeDashArray: 5,
            borderWidth: 3,
            borderColor: "var(--theme-deafult)",
        },
        ],
        points: [{
            x: 312,
            y: 52,
            marker: {
                size: 8,
                fillColor: "var(--theme-deafult)",
                strokeColor: "#ffffff",
                strokeWidth: 4,
                radius: 5,
            },
            label: {
                borderWidth: 1,
                offsetY: 0,
                text: '43.10k',
                style: {
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Outfit, sans-serif',
                }
            }
        }],
    },
    labels: [
        "Jan",
        "",
        "Feb",
        "",
        "Feb",
        "",
        "Apr",
        "",
        "Mar",
        "",
        "Jun",
        "",
        "Apr",
        "",
        "Aug",
        "Sep",
        "May",
        "Nov",
        "Aug",
        "Sep",
        "Jun",
        "Nov",
    ],
    xaxis: {
        type: "category",
        tickAmount: 4,
        tickPlacement: "between",
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            color: "var(--chart-border)",
        },
        axisTicks: {
            show: false,
        },
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
    },
    legend: {
        show: false,
    },
    yaxis: {
        min: 0,
        tickAmount: 6,
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#3D434A',
            },
        },
    },
    tooltip: {
        shared: false,
        intersect: false,
    },
    responsive: [
        {
            breakpoint: 1797,
            options: {
                chart: {
                    height: 380,
                },
            },
        },
        {
            breakpoint: 1501,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ]
};

export const orderChart:ApexOptions = {
    series: [
        {
            name: "Revenue",
            data: [ 30, 40, 18, 25, 18, 10, 20, 35, 22, 40, 30, 38, 20, 35, 11, 28, 40, 11, 28, 40, 11, 28, 40, 11, 28, 40, 11,  28, 40, 11, 28, 40, 11]
        }
    ],
    chart: {
        type: "bar",
        height: 180,
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: "70%",
        },
    },
    colors: ["#48A3D7"],
    grid: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
    },
    xaxis: {
        categories: [
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
        ],
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        labels: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    fill: {
        opacity: 0.3,
    },
    tooltip: {
        enabled: false,
    },
    states: {
        normal: {
            filter: {
                type: "none",
            },
        },
        hover: {
            filter: {
                type: "none",
            },
        },
        active: {
            allowMultipleDataPointsSelection: false,
            filter: {
                type: "none",
            },
        },
    },
    // responsive: [
    //     {
    //         breakpoint: 1768,
    //         options: {
    //             chart: {
    //                 height: 190,
    //             },
    //         },
    //     },
    //     {
    //         breakpoint: 405,
    //         options: {
    //             chart: {
    //                 height: 150,
    //             },
    //         },
    //     },
    // ],
};

export const admissionRatioChart : ApexOptions = {
    series: [
        {
            name: '',
            data: [30, 29.31, 29.7, 29.7, 31.32, 31.65, 31.13, 29.8, 31.79, 31.67, 32.39, 30.63, 32.89, 31.99, 31.23, 31.57, 30.84, 31.07, 31.41, 31.17, 34, 34.50, 34.50, 32.53, 31.37, 32.43, 32.44, 30.2, 30.14, 30.65, 30.4, 30.65, 31.43, 31.89, 31.38, 30.64, 31.02, 30.33, 32.95, 31.89, 30.01, 30.88, 30.69, 30.58, 32.02, 32.14, 30.37, 30.51, 32.65, 32.64, 32.27, 32.1, 32.91, 30.65, 30.8, 31.92
            ],
        },
    ],
    chart: {
        type: 'area',
        height: 90,
        offsetY: -10,
        offsetX: 0,
        toolbar: {
            show: false,
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    grid: {
        show: false,
        borderColor: 'var(--light)',
        padding: {
            top: 5,
            right: 0,
            bottom: -30,
            left: 0,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0,
            opacityTo: 0,
            stops: [0, 0, 0]
        }
    },
    dataLabels: {
        enabled: false,
    },
    colors: ["var(--theme-deafult)"],
    xaxis: {
        labels: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        opposite: false,
        min: 29,
        max: 35,
        logBase: 100,
        tickAmount: 4,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
            show: false,
            offsetX: -12,
            offsetY: -15,
            rotate: 0,
        },
    },
    legend: {
        horizontalAlign: 'left',
    },
};

export const orderValueChart:ApexOptions = {
    series: [
        {
            name: '',
            data: [30, 32.31, 31.47, 30.69, 29.32, 31.65, 31.13, 31.77, 31.79, 31.67, 32.39, 32.63, 32.89, 31.99, 31.23, 31.57, 30.84, 31.07, 31.41, 31.17, 32.37, 32.19, 32.51, 32.53, 31.37, 30.43, 30.44, 30.2,
                30.14, 30.65, 30.4, 30.65, 31.43, 31.89, 31.38, 30.64, 30.02, 30.33, 30.95, 31.89, 31.01, 30.88, 30.69, 30.58, 32.02, 32.14, 32.37, 32.51, 32.65, 32.64, 32.27, 32.1, 32.91, 33.65, 33.8, 33.92
            ],
        },
    ],
    chart: {
        type: 'area',
        height: 90,
        offsetY: -10,
        offsetX: 0,
        toolbar: {
            show: false,
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    grid: {
        show: false,
        borderColor: 'var(--light)',
        padding: {
            top: 5,
            right: 0,
            bottom: -30,
            left: 0,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 80, 100]
        }
    },
    dataLabels: {
        enabled: false,
    },
    colors: ["#48A3D7"],
    xaxis: {
        labels: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        opposite: false,
        min: 29,
        max: 35,
        logBase: 100,
        tickAmount: 4,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
            show: false,
            offsetX: -12,
            offsetY: -15,
            rotate: 0,
        },
    },
    legend: {
        horizontalAlign: 'left',
    },
    responsive: [

    ],
};

export const dailyOrderChart:ApexOptions = {
    series: [
        {
            name: '',
            data: [30, 29.31, 29.7, 29.7, 31.32, 31.65, 31.13, 29.8, 31.79, 31.67, 32.39, 30.63, 32.89, 31.99, 31.23, 31.57, 30.84, 31.07, 31.41, 31.17, 34, 34.50, 34.50, 32.53, 31.37, 32.43, 32.44, 30.2,
                30.14, 30.65, 30.4, 30.65, 31.43, 31.89, 31.38, 30.64, 31.02, 30.33, 32.95, 31.89, 30.01, 30.88, 30.69, 30.58, 32.02, 32.14, 30.37, 30.51, 32.65, 32.64, 32.27, 32.1, 32.91, 30.65, 30.8, 31.92
            ],
        },
    ],
    chart: {
        type: 'area',
        height: 90,
        offsetY: -10,
        offsetX: 0,
        toolbar: {
            show: false,
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    grid: {
        show: false,
        borderColor: 'var(--light)',
        padding: {
            top: 5,
            right: 0,
            bottom: -30,
            left: 0,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 90, 100]
        }
    },
    dataLabels: {
        enabled: false,
    },
    colors: ['#D77748'],
    xaxis: {
        labels: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        opposite: false,
        min: 29,
        max: 35,
        logBase: 100,
        tickAmount: 4,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
            show: false,
            offsetX: -12,
            offsetY: -15,
            rotate: 0,
        },
    },
    legend: {
        horizontalAlign: 'left',
    },
    responsive: [

    ],
};

export const dailyRevenueChart:ApexOptions = {
    series: [
        {
            name: '',
            data: [29, 30.31, 30.7, 31.69, 31.32, 31.65, 31.13, 31.77, 31.79, 31.67, 32.39, 32.63, 32.89, 31.99, 31.23, 31.57, 30.84, 31.07, 31.41, 31.17, 32.37, 32.19, 32.51, 32.53, 31.37, 30.43, 30.44, 30.2,
                30.14, 30.65, 30.4, 30.65, 31.43, 31.89, 31.38, 30.64, 30.02, 30.33, 30.95, 31.89, 31.01, 30.88, 30.69, 30.58, 32.02, 32.14, 32.37, 32.51, 32.65, 32.64, 32.27, 32.1, 32.91, 33.65, 33.8, 33.92
            ],
        },
    ],
    chart: {
        type: 'area',
        height: 90,
        offsetY: -10,
        offsetX: 0,
        toolbar: {
            show: false,
        },
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    grid: {
        show: false,
        borderColor: 'var(--light)',
        padding: {
            top: 5,
            right: 0,
            bottom: -30,
            left: 0,
        },
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 90, 100]
        }
    },
    dataLabels: {
        enabled: false,
    },
    colors: ['#C95E9E'],
    xaxis: {
        labels: {
            show: false,
        },
        tooltip: {
            enabled: false,
        },
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        opposite: false,
        min: 29,
        max: 35,
        logBase: 100,
        tickAmount: 4,
        forceNiceScale: false,
        floating: false,
        decimalsInFloat: undefined,
        labels: {
            show: false,
            offsetX: -12,
            offsetY: -15,
            rotate: 0,
        },
    },
    legend: {
        horizontalAlign: 'left',
    },
    responsive: [

    ],
};


export const salesOverviewChart:ApexOptions = {
    series: [
        {
            data: [
                {
                    x: 'Jan',
                    y: [140, 360],
                },
                {
                    x: '',
                    y: [180, 400],
                },
                {
                    x: 'Feb',
                    y: [160, 400],
                },
                {
                    x: '',
                    y: [180, 420],
                },
                {
                    x: 'Mar',
                    y: [160, 480],
                },
                {
                    x: '',
                    y: [160, 300],
                },
                {
                    x: 'Apr',
                    y: [190, 400],
                },
                {
                    x: '',
                    y: [140, 300],
                },
                {
                    x: 'May',
                    y: [200, 420],
                },
                {
                    x: '',
                    y: [180, 280],
                },
                {
                    x: 'Jun',
                    y: [170, 410],
                },
                {
                    x: '',
                    y: [160, 380],
                },
                {
                    x: 'Jul',
                    y: [200, 450],
                },
                {
                    x: '',
                    y: [170, 470],
                },
                {
                    x: 'Aug',
                    y: [180, 420],
                },
            ],
        },
    ],
    chart: {
        type: 'rangeBar',
        height: 350,
        toolbar: {
            show: false,
        },
    },
    legend: {
        show: false,
    },
    grid: {
        show: true,
        borderColor: 'rgba(106, 113, 133, 0.30)',
        strokeDashArray: 3,
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            gradientToColors: ["var(--theme-deafult)"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [65, 35]
        }
    },
    tooltip: {
        enabled: false,
    },
    colors: ['#48A3D7'],
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '40%',
            borderRadius: 4,
        },
    },
    dataLabels: {
        enabled: false,
    },

    yaxis: {
        logBase: 100,
        tickAmount: 4,
        min: 100,
        max: 500,
        labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 34,

            formatter: (value) => {
                return `${value}k`;
            },

            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#3D434A',
            },
        },
    },
    xaxis: {
        categories: ['Jan', '', 'Feb', '', 'Mar', '', 'Apr', '', 'May', '', 'Jun', '', 'Jul', '', 'Aug'],
        labels: {
            minHeight: undefined,
            maxHeight: 24,
            offsetX: 0,
            offsetY: 0,

            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        },
        tooltip: {
            enabled: false,
        },
    },
    responsive: [
        {
            breakpoint: 1401,
            options: {
                series: [
                    {
                        data: [
                            {
                                x: 'Jan',
                                y: [140, 360],
                            },
                            {
                                x: '',
                                y: [180, 400],
                            },
                            {
                                x: 'Feb',
                                y: [160, 400],
                            },
                            {
                                x: '',
                                y: [180, 420],
                            },
                            {
                                x: 'Mar',
                                y: [160, 480],
                            },
                            {
                                x: '',
                                y: [160, 300],
                            },
                            {
                                x: 'Apr',
                                y: [190, 400],
                            },
                            {
                                x: '',
                                y: [140, 300],
                            }
                        ],
                    },
                ],
            },
        },
        {
            breakpoint: 1199,
            options: {
                series: [
                    {
                        data: [
                            {
                                x: 'Jan',
                                y: [140, 360],
                            },
                            {
                                x: '',
                                y: [180, 400],
                            },
                            {
                                x: 'Feb',
                                y: [160, 400],
                            },
                            {
                                x: '',
                                y: [180, 420],
                            },
                            {
                                x: 'Mar',
                                y: [160, 480],
                            },
                            {
                                x: '',
                                y: [160, 300],
                            },
                            {
                                x: 'Apr',
                                y: [190, 400],
                            },
                            {
                                x: '',
                                y: [140, 300],
                            },
                            {
                                x: 'May',
                                y: [200, 420],
                            },
                            {
                                x: '',
                                y: [180, 280],
                            },
                            {
                                x: 'Jun',
                                y: [170, 410],
                            },
                            {
                                x: '',
                                y: [160, 380],
                            },
                            {
                                x: 'Jul',
                                y: [200, 450],
                            },
                            {
                                x: '',
                                y: [170, 470],
                            },
                            {
                                x: 'Aug',
                                y: [180, 420],
                            },
                        ],
                    },
                ],
            },
        },
        {
            breakpoint: 1199,
            options: {
                chart: {
                    height: 275,
                },
            },
        },
        {
            breakpoint: 500,
            options: {
                series: [
                    {
                        data: [
                            {
                                x: 'Jan',
                                y: [140, 360],
                            },
                            {
                                x: '',
                                y: [180, 400],
                            },
                            {
                                x: 'Feb',
                                y: [160, 400],
                            },
                            {
                                x: '',
                                y: [180, 420],
                            },
                            {
                                x: 'Mar',
                                y: [160, 480],
                            },
                            {
                                x: '',
                                y: [160, 300],
                            },
                            {
                                x: 'Apr',
                                y: [190, 400],
                            },
                            {
                                x: '',
                                y: [140, 300],
                            },
                            {
                                x: 'May',
                                y: [200, 420],
                            }
                        ],
                    },
                ],
            },
        },
    ],
};

export const revenueChartData:ApexOptions = {

    series: [80, 30, 22, 15],
      chart: {
        width: 390,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      responsive: [{
        breakpoint: 1330,
            options: {
                chart: {
                    width: 210,
                },
            },
        },],
      plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: "83%",
                labels: {
                    show: true,
                    name: {
                        offsetY: 4,
                    },
                    total: {
                        show: true,
                        fontSize: "20px",
                        fontFamily: "Outfit', sans-serif",
                        fontWeight: 600,
                        label: "Jeans",
                        formatter: () => "480",
                    },
                },
            },
        },
    },
      legend: {
        position: 'bottom',
        offsetY: 0,
        height: 50,
      },
      colors: ["var(--theme-deafult)","#D77748","#C95E9E" ,"#48A3D7"],
    }
    



export const studyStatisticChart:ApexOptions = {
    series: [
        {
            name: 'series1',
            data: [4.6, 3.6, 2, 3, 4, 2.4, 2.8, 4.3, 2, 1.6],
        },
        {
            name: 'series2',
            data: [1.5, 2, 3.8, 3.5, 2.2, 3.5, 4, 3, 1.5, 3.8],
        },
    ],
    chart: {
        height: 230,
        type: 'area',
        offsetY: 12,
        offsetX: -15,
        toolbar: {
            show: false,
        },
    },
    dataLabels: {
        enabled: false,
    },
    colors: ["var(--theme-deafult)", "#48A3D7"],

    stroke: {
        curve: 'smooth',
        width: 2,
    },
    grid: {
        show: true,
        strokeDashArray: 5,
        position: 'back',
        xaxis: {
            lines: {
                show: false
            }
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [5, 100, 100, 100]
        },
    },
    annotations: {
        xaxis: [{
            x: 312,
            strokeDashArray: 5,
            borderWidth: 3,
            borderColor: "var(--theme-deafult)",
        },
        ],
        points: [{
            x: 312,
            y: 4.5,
            marker: {
                size: 8,
                fillColor: "var(--theme-deafult)",
                strokeColor: "#ffffff",
                strokeWidth: 4,
                radius: 5,
            },
            label: {
                borderWidth: 1,
                offsetY: 0,
                text: '7h a week on average in Apr',
                style: {
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Outfit, sans-serif',
                }
            }
        }],
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#3D434A',
            },

            formatter: (value) => {
                return `${value}h`;
            },
        },
    },
    responsive: [
        {
            breakpoint: 1657,
            options: {
                chart: {
                    height: 185,
                },
            }
        },
    ]         
  
  };


export const visitorChartData:ApexOptions = {
    series: [
      {
        name: "Active",
        data: [18, 50, 65, 18, 28, 70, 15, 35],
      },
      {
        name: "Bounce",
        data: [35, 70, 30, 60, 25, 45, 50, 50],
      },
    ],
    chart: {
      type: "bar",
      height: 220,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 6,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "var(--chart-border)",
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: ["#48A3D7", "var(--theme-deafult)"],
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
      tickAmount: 4,
      tickPlacement: "between",
      labels: {
        style: {
          fontFamily: "Rubik, sans-serif",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        style: {
          fontFamily: "Rubik, sans-serif",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Rubik, sans-serif",
      fontSize: "14px",
      fontWeight: 500,
      labels: {
        colors: "var(--chart-text-color)",
      },
      markers: {
        width: 6,
        height: 6,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1366,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "80%",
            },
          },
          grid: {
            padding: {
              right: 0,
            },
          },
        },
      },
      {
        breakpoint: 1200,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "50%",
            },
          },
          grid: {
            padding: {
              right: 0,
            },
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          plotOptions: {
            bar: {
              columnWidth: "60%",
            },
          },
          grid: {
            padding: {
              right: 5,
            },
          },
        },
      },
    ],
  };
    
export const activelyHoursChart:ApexOptions = {
    series: [{
        name: 'PRODUCT A',
        data: [2, 4, 3.8, 3, 4, 3, 2]
    }, {
        name: 'PRODUCT B',
        data: [5, 4, 5, 5, 4, 5, 5]
    }, {
        name: 'PRODUCT C',
        data: [7, 6, 6, 7, 6, 4, 7]
    }, {
        name: 'PRODUCT C',
        data: [8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9]
    },],
    chart: {
        type: 'bar',
        height: 345,
        stacked: true,
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    stroke: {
        show: true,
        width: [4, 4, 4, 4],
        colors: ['#ffffff', '#ffffff', '#ffffff', '#ffffff']
    },
    responsive: [{
        breakpoint: 480,
        options: {

            legend: {
                show: false,
            }
        }

    },
    {
        breakpoint: 1200,
        options: {
            chart: {
                height: 200,
            },
            series: [{
                name: 'PRODUCT A',
                data: [2, 4, 3.8, 3, 4, 3, 2]
            }, {
                name: 'PRODUCT B',
                data: [5, 4, 5, 5, 4, 5, 5]
            }, {
                name: 'PRODUCT C',
                data: [7, 6, 6, 7, 6, 4, 7]
            }, {
                name: 'PRODUCT C',
                data: [1, 2, 2, 1, 2, 2, 1]
            },],
        }

    },
    {
        breakpoint: 768,
        options: {
            chart: {
                height: 345,
            },
            series: [{
                name: 'PRODUCT A',
                data: [2, 4, 3.8, 3, 4, 3, 2]
            }, {
                name: 'PRODUCT B',
                data: [5, 4, 5, 5, 4, 5, 5]
            }, {
                name: 'PRODUCT C',
                data: [7, 6, 6, 7, 6, 4, 7]
            }, {
                name: 'PRODUCT C',
                data: [8.9, 8.9, 8.9, 8.9, 8.9, 8.9, 8.9]
            },],
        }

    },
    {
        breakpoint: 436,
        options: {
            chart: {
                height: 345,
            },
            series: [{
                name: 'PRODUCT A',
                data: [2, 4, 3.8, 3, 4]
            }, {
                name: 'PRODUCT B',
                data: [5, 4, 5, 5, 4]
            }, {
                name: 'PRODUCT C',
                data: [7, 6, 6, 7, 6]
            }, {
                name: 'PRODUCT C',
                data: [8.9, 8.9, 8.9, 8.9, 8.9]
            },],
        }

    },],

    colors: ['#C95E9E', '#D77748', "#48A3D7", "var(--theme-deafult)"],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 2,
            columnWidth: '38%',
        },
    },
    grid: {
        show: true,
        strokeDashArray: 5,
        position: 'back',
        xaxis: {
            lines: {
                show: false
            }
        },
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Feb', 'Feb'],
        labels: {
            show: true,
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        },
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        opacity: 1
    },
    yaxis: {
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#3D434A',
            },
        },
    }
};

export const monthlyChartData:ApexOptions = {
    series: [{
        name: 'Website Blog',
        type: 'column',
        data: [20, 38, 18, 30, 50, 32, 60, 39, 79, 50, 40, 50, 40, 24, 65, 42]
    }, {
        name: 'Social Media',
        type: 'line',
        data: [10, 22, 36, 49, 62, 78, 90, 98, 97, 90, 78, 62, 49, 36, 22, 10]
    }],
    chart: {
        height: 315,
        type: 'line',
        offsetX: -15,
        toolbar: {
            show: false
        },
    },
    stroke: {
        width: [0, 3]
    },
    grid: {
        show: true,
        borderColor: 'rgba(106, 113, 133, 0.30)',
        strokeDashArray: 3,
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        type: 'gradient',
        opacity: 1,
        gradient: {
            shade: 'light',
            type: "vertical",
            gradientToColors: ["#c0bcdf"],
            opacityFrom: 1,
            opacityTo: 0,
            stops: [0, 80, 100],
        },
    },
    markers: {
        discrete: [{
            seriesIndex: 1,
            dataPointIndex: 0,
            fillColor: "var(--theme-deafult)",
            strokeColor: '#fff',
            size: 5,
            shape: "circle"
        }, {
            seriesIndex: 1,
            dataPointIndex: 7,
            fillColor: "var(--theme-deafult)",
            strokeColor: '#fff',
            size: 5,
            shape: "circle"
        }, {
            seriesIndex: 1,
            dataPointIndex: 12,
            fillColor: "var(--theme-deafult)",
            strokeColor: '#fff',
            size: 5,
            shape: "circle"
        }, {
            seriesIndex: 1,
            dataPointIndex: 15,
            fillColor: "var(--theme-deafult)",
            strokeColor: '#fff',
            size: 5,
            shape: "circle"
        },],
    },
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 4,
            columnWidth: '60%',
        },
    },
    colors: ["var(--theme-deafult)", "#48A3D7"],
    legend: {
        show: false,
    },
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    xaxis: {
        categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '08', '09', '10', '11'],
        labels: {
            show: true,
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
        axisBorder: {
            show: false
        },
    },
    yaxis: {
        labels: {
            show: true,
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#3D434A',
            },

            formatter: (value) => {
                return `${value}%`;
            },
        },
    },
};

export const scheduleChart:ApexOptions = {
    series: [
        {
            data: [
                {
                    x: "Branding",
                    y: [
                        new Date("2022-01-01").getTime(),
                        new Date("2022-01-30").getTime(),
                    ],
                    fillColor: "var(--theme-deafult)",
                },
                {
                    x: "Web Design",
                    y: [
                        new Date("2022-02-20").getTime(),
                        new Date("2022-03-20").getTime(),
                    ],
                    fillColor: "#48A3D7",
                },
                {
                    x: "UX research",
                    y: [
                        new Date("2022-01-25").getTime(),
                        new Date("2022-02-25").getTime(),
                    ],
                    fillColor: "#D77748",
                },
                {
                    x: "Mobile Design",
                    y: [
                        new Date("2022-01-01").getTime(),
                        new Date("2022-02-01").getTime(),
                    ],
                    fillColor: "#C95E9E",
                },
                {
                    x: "NFT Website",
                    y: [
                        new Date("2022-02-20").getTime(),
                        new Date("2022-03-20").getTime(),
                    ],
                    fillColor: "#0DA759",
                },
                {
                    x: "Logo Design",
                    y: [
                        new Date("2022-01-25").getTime(),
                        new Date("2022-02-25").getTime(),
                    ],
                    fillColor: "var(--theme-deafult)",
                },
            ],
        },
    ],
    chart: {
        height: 355,
        type: "rangeBar",
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            distributed: true,
            barHeight: "40%",
            dataLabels: {
                hideOverflowingLabels: false,
            },
        },
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            var label = opts.w.globals.labels[opts.dataPointIndex];
            return label;
        },
        textAnchor: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
            fontSize: '16px',
            fontFamily: 'Outfit, sans-serif',
        },
        background: {
            enabled: true,
            padding: 6,
            borderRadius: 12,
            borderWidth: 0,
            borderColor: "var(--white)",
            opacity: 0,
        },
    },
    xaxis: {
        type: "datetime",
        position: "top",
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#8D8D8D',
            },
        },
    },
    yaxis: {
        labels: {
            style: {
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 500,
                colors: '#3D434A',
            },
        },

        tooltip: {
            enabled: false,
        },
    },
    grid: {
        show: false,
        row: {
            colors: ["#F4F7F9", "#fff"],
            opacity: 1,
        },
    },
    responsive: [
        {
            breakpoint: 576,
            options: {
                yaxis: {
                    labels: {
                        show: false,
                    },
                },
                grid: {
                    padding: {
                        left: -10,
                    },
                },
            },
        },
    ],
};
