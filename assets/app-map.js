jQuery(function ($) {
    function initMap(element) {

        let maps = [],
            markersArr = [],
            mapStyles = [{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#e9e9e9"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f5f5f5"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#dedede"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                            "saturation": 36
                        },
                        {
                            "color": "#333333"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                            "color": "#f2f2f2"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                            "color": "#fefefe"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                }
            ];

        function Map(id, mapOptions) {
            this.map = new google.maps.Map(document.getElementById(id), mapOptions);
            this.markers = [];
            this.infowindows = [];
            this.clusters = null;
        }

        function addMarker(mapId, location, index, string, image, activeImage, filterVal) {
            maps[mapId].markers[index] = new google.maps.Marker({
                position: location,
                map: maps[mapId].map,
                icon: {
                    url: image
                },
                mainImage: image,
                activeIcon: activeImage,
                desc: string,
                filterValue: filterVal
            });


            var labelDiv = document.createElement("div");
            labelDiv.className = "marker-label";
            labelDiv.innerHTML = '<a class="btn btn-secondary" href="https://www.google.com/maps/place/Uferstra%C3%9Fe+10,+87629+F%C3%BCssen,+%D0%9D%D1%96%D0%BC%D0%B5%D1%87%D1%87%D0%B8%D0%BD%D0%B0/@47.6064573,10.6822594,760m/data=!3m2!1e3!4b1!4m6!3m5!1s0x479c5f13dc0f0c67:0x72ea1017406bacc6!8m2!3d47.6064573!4d10.6822594!16s%2Fg%2F11c6c9m15p?entry=ttu&g_ep=EgoyMDI1MDIyNi4xIKXMDSoASAFQAw%3D%3D" target="_blank"><b>Get directions</b></a>';


            var labelOverlay = new google.maps.OverlayView();
            labelOverlay.onAdd = function () {
                var panes = this.getPanes();
                panes.overlayLayer.appendChild(labelDiv);
            };
            
            labelOverlay.draw = function () {
                var projection = this.getProjection();
                var position = projection.fromLatLngToDivPixel(maps[mapId].markers[index].getPosition());
                labelDiv.style.left = position.x + "px";
                labelDiv.style.top = position.y + "px";
            };

            labelOverlay.setMap(maps[mapId].map);


            google.maps.event.addListener(maps[mapId].markers[index], 'click', function () {
                this.setIcon(this.activeIcon);


                maps[mapId].map.setCenter(location);

                if (winW < 768) {
                    maps[mapId].map.panBy(0, 0);
                } else {
                    maps[mapId].map.panBy(0, 0);
                }

            });
            return maps[mapId].markers[index];
        }

        function initialize(mapInst) {
            let mapId = mapInst.attr('id'),
                lat = mapInst.attr("data-lat"),
                lng = mapInst.attr("data-lng"),
                myLatLng = new google.maps.LatLng(lat, lng),

                zoomOnDesktop = mapInst.attr("data-zoom") ? parseInt(mapInst.attr("data-zoom")) : 12,
                zoomOnMobile = mapInst.attr("data-xs-zoom") ? parseInt(mapInst.attr("data-xs-zoom")) : 10,
                zoomMap = winW < 768 ? zoomOnMobile : zoomOnDesktop;


            const mapUiOptions = {
                zoom: zoomMap,
                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL,
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                },
                scrollwheel: false,
                disableDefaultUI: true,
                streetViewControl: false,
                fullscreenControl: false,
                center: myLatLng,
                styles: mapStyles
            };


            $.ajax({
                url: $(mapInst).attr('data-link'),
                type: 'get',
                dataType: 'json',
                error: function (data) {
                    console.log("File Not Found");
                },
                success: function (data) {
                    for (let i = 0; i < data.length; i++) {

                        const {
                            filterValue,
                            dataRel,
                            dataLat,
                            dataLng,
                            marker,
                            markerActive,
                            mobileMarker,
                            mobileMarkerActive,
                            city,
                            street,
                            googleLink,
                            phone,
                            phoneLink,
                            email,
                            workDaysOne,
                            workDaysTwo,
                            locationImg
                        } = data[i]

                        const imgMarker = winW < 768 ? mobileMarker : marker,
                            imgMarkerActive = winW < 768 ? mobileMarker : marker;



                        const infoWrap = $('<div class="info-box-wrapper">');
                        infoWrap.append($('<div class="btn-close">'));

                        const infoInner = $('<div class="info-box-inner">');

                        if (phone && phoneLink) {
                            const item = $('<div class="cnt-item">');
                            item.append($(`<div class="cnt-img"><img src="img/icons/icon-phone.svg"></div>`));
                            item.append($(`<div class="cnt-info"><a href="tel:${phoneLink}">${phone}</a></div>`));
                            infoInner.append(item);
                        }

                        if (city && street) {
                            const item = $('<div class="cnt-item">');
                            item.append($(`<div class="cnt-img"><img src="img/icons/icon-pin.svg"></div>`));
                            item.append($(`<div class="cnt-info"><a href="${googleLink ? googleLink : '#' }">${city}, ${street}</a></div>`));
                            infoInner.append(item);
                        }

                        if (email) {
                            const item = $('<div class="cnt-item">');
                            item.append($(`<div class="cnt-img"><img src="img/icons/icon-mail.svg"></div>`));
                            item.append($(`<div class="cnt-info"><a href="mailto:${email}">${email}</a></div>`));
                            infoInner.append(item);
                        }

                        if (workDaysOne || workDaysTwo) {
                            const item = $('<div class="cnt-item">');
                            item.append($(`<div class="cnt-img"><img src="img/icons/icon-calendar.svg"></div>`));
                            item.append($(`<div class="cnt-info">${workDaysOne ? '<div>' + workDaysOne + '</div>' : '' }${workDaysTwo ? '<div>' + workDaysTwo + '</div>' : '' }</div>`));
                            infoInner.append(item);
                        }

                        infoWrap.append(infoInner);

                        if (locationImg) {
                            const infoImg = $('<div class="info-box-img">');
                            infoImg.append($(`<img src="${locationImg}">`));
                            infoWrap.append(infoImg);
                        }

                        let markerInst = addMarker(
                            dataRel,
                            new google.maps.LatLng(dataLat, dataLng),
                            i,
                            infoWrap[0].outerHTML,
                            imgMarker,
                            imgMarkerActive,
                            filterValue
                        );

                        markersArr.push(markerInst);
                    }

                    maps[mapId].bounds = new google.maps.LatLngBounds();

                    markersArr.forEach(function (marker) {
                        maps[mapId].bounds.extend(marker.getPosition());
                    });


                    if (lat.length == 0 && lng.length == 0) {
                        maps[mapId].map.fitBounds(maps[mapId].bounds);
                    }

                }
            });


            maps[mapId] = new Map(mapId, mapUiOptions);


            // Close info-box on map
            maps[mapId].map.addListener('click', function () {
                maps[mapId].markers.forEach(function (marker) {
                    marker.active = false;
                    marker.setIcon(marker.mainImage);
                });
            });
        }

        initialize(element);
    }

    $('.map').each(function () {
        initMap($(this))
    });
});