var CORE = window.CORE || {};
CORE.Lib = CORE.Lib || {};

$(document).ready(function () {
    CORE.Lib.Init();
});

CORE.Lib.Init = function () {
    var coreFunctions = new CORE.Lib.Functions();
    coreFunctions.initProjectData();
};

CORE.Lib.Functions = function () {
    function _initProjectData() {
        var reqData = [
            {
                Id: 1,
                Title: 'Project 1',
                Description: 'This is a test project',
                cost: 200,
                expenditure: 150,
                lat: 51.508742,
                lng: -0.120850,
               pplList:[
                    {
                        FirstName: "Anoop",
                        LastName: "Tatti",
                        Role:"PM"
                    },
                    {
                        FirstName: "Joe",
                        LastName: "Bloggs",
                        Role:"PL"
                    }
                ],
                Image1: {
                    Url: "http://www.cityvisitguide.com/images/tower-of-london.jpg"
                },
                Image2: {
                    Url: "http://news.images.itv.com/image/file/566042/stream_img.jpg"
                }

            },
            {
                Id: 2,
                Title: 'Project 2',
                Description: 'This is another test project',
                cost: 100,
                expenditure: 120,
                lat: 51.4289415500026,
                lng: -0.190359597621919,
                pplList:[
                    {
                        FirstName: "Megan",
                        LastName: "Shaw",
                        Role:"PM"
                    },
                    {
                        FirstName: "Joe",
                        LastName: "Bloggs",
                        Role:"PL"
                    }
                ],
                Image1: {
                    Url: "http://www.britainexpress.com/zen/albums/potd/800London-Eye-0259.jpg"
                },
                Image2: {
                    Url: "https://belindawicks.files.wordpress.com/2013/04/city_of_london.jpg"
                }
            },
            {
                Id: 3,
                Title: 'Project 3',
                Description: 'This is a test project 3',
                cost: 500,
                expenditure: 300,
                lat: 51.5135210659125,
                lng: -0.0727070120542743,
                pplList:[
                    {
                        FirstName: "Megan",
                        LastName: "Shaw",
                        Role:"PM"
                    },
                    {
                        FirstName: "Anoop",
                        LastName: "Tatti",
                        Role:"PL"
                    }
                ],

                Image1: {
                    Url: "http://www.thegoring.com/media/1603/parliament-653x355.jpg"
                },
                Image2: {
                    Url: "http://news.images.itv.com/image/file/566042/stream_img.jpg"
                }
            }];


        $.each(reqData, function (index, value) {
            reqData[index].panelChartClass = "panelChartClass" + reqData[index].Id;
            reqData[index].panelMapClass = "panelMapClass" + reqData[index].Id;
            reqData[index].panelImageClass = "panelImageClass" + reqData[index].Id;
        });

        console.log(reqData)

        var viewModel = {
            list: reqData
        };

        ko.applyBindings(viewModel);
        _initPanels(reqData);
    }

    function _initPanels(data) {
        var PanelExamples = document.getElementsByClassName("ms-PanelExample");
        for (var i = 0; i < PanelExamples.length; i++) {

            (function () {
                var PanelExampleButton = PanelExamples[i].querySelector(".pnlbtn");
                var pnlSpanHidden = PanelExamples[i].querySelector(".pnlSpanHidden");
                var PanelExamplePanel = PanelExamples[i].querySelector(".ms-Panel");

                PanelExampleButton.addEventListener("click", function (i) {
                    new fabric['Panel'](PanelExamplePanel);
                    _initCharts(pnlSpanHidden.innerHTML, data[pnlSpanHidden.innerHTML - 1]);
                    _initMap(pnlSpanHidden.innerHTML, data[pnlSpanHidden.innerHTML - 1]);
                    _initSlick(pnlSpanHidden.innerHTML);
                });
            } ());
        }
    }

    function _initCharts(index, spData) {
        var reqClassName = "panelChartClass" + index.toString();
        var ctx = document.getElementsByClassName(reqClassName);
        var cost = spData.cost;
        var expenditure = spData.expenditure;

        var plLabel = "Profit";
        var plValue = cost - expenditure;
        var plLabelColor = "#4EEE94"

        if (plValue < 0) {
            plValue = -(plValue);
            plLabel = "Loss";
            plLabelColor = "#DC143C"
        }

        var chartData = {
            labels: [
                "Cost",
                "Expenditure",
                plLabel
            ],
            datasets: [{
                data: [cost, expenditure, plValue],
                backgroundColor: [
                    "#982395",
                    "#1352A2",
                    plLabelColor
                ],
                hoverBackgroundColor: [
                    "#982395",
                    "#1352A2",
                    plLabelColor
                ]
            }]
        };

        var myDoughnutChart = new Chart(ctx, {
            type: 'doughnut',
            data: chartData,
            options: {
                animation: {
                    animateScale: true
                }
            }
        });
    }

    function _initMap(index, spData) {
        var mapClass = "panelMapClass" + index.toString();
        var mapCanvas = document.getElementById(mapClass);
        var myCenter = new google.maps.LatLng(spData.lat, spData.lng);
        var mapOptions = {
            center: myCenter,
            zoom: 15
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        var marker = new google.maps.Marker({
            position: myCenter,
            animation: google.maps.Animation.BOUNCE
        });
        marker.setMap(map);

    }

    function _initSlick(index) {
        var projectImagesClass = ".panelImageClass" + index.toString();
        $(projectImagesClass).slick({
            autoplay: true,
            lazyLoad: 'ondemand'
        });
    }

    var publics = {
        initProjectData: _initProjectData
    };

    return publics;
};