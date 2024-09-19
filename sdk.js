(function (w, d) {

    if (window._pickupInstance)
        return;

    function getParameterByName(name, url) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    window._pickupInstance = true;    
    var server = window._pickupSettings && window._pickupSettings.server ? window._pickupSettings.server : 'https://www.pickuppoint.co.il';

    var ver = "113.128";
    var tempgkey = getParameterByName('gkey', document.currentScript.src);
    var service = window._pickupSettings && window._pickupSettings.type ? window._pickupSettings.type : "all";
    var gkey = window._pickupSettings && window._pickupSettings.gkey ? window._pickupSettings.gkey : (tempgkey ? tempgkey : "AIzaSyD62c5ORojhBdtNA1glgJfhQkd-y22IMns");
    var Gmap = {
        init: function () {
            var _self = this;

            if (typeof google === 'object' && typeof google.maps === 'object') {
                if (typeof google.maps.places === 'object') {
                    _self.ready();
                }
                else {
                    var ht = document.head;
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "https://maps.googleapis.com/maps/api/js?libraries=places&language=he&key=" + gkey;
                    script.onload = _self.ready;
                    ht.appendChild(script);
                }
            }
            else {
                var ht = document.head;
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = "https://maps.googleapis.com/maps/api/js?libraries=places&language=he&key=" + gkey;
                script.onload = _self.ready;
                ht.appendChild(script);
            }

        },
        ready: function () {

            var ht = document.head;
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = server + "/api/ups-pickups.sdk.dep.js";
            //script.onload = function (e) { addCSS(server, '/api/pickups.0.5.css'); };
            script.onload = function (e) { addCSS(server, '/api/pickups.0.5.min.css?rel=' + ver); };
            ht.appendChild(script);
        }
    }
    if (typeof jQuery == 'undefined' || jQuery.fn.jquery != '2.1.4') {
        try {
            var jq = document.createElement('script');
            jq.type = 'text/javascript';

            jq.src = server + '/api/jquery-2.1.4.min.js';
            jq.onload = __initjq;
            document.head.appendChild(jq);
        }
        catch (e) {
            console.log("Exception: " + e);
        }
    } else {
        $jp = jQuery ? jQuery : window.jQuery;
        ___initjq();
    }
    function __initjq() {
        $jp = jQuery.noConflict(true);
        ___initjq();
    }
    function ___initjq() {
        // Check if script has been loaded to avoid collisions
        /*if ($("script[src*='ups-pickups.sdk.all.js']").length > 1)
             return;*/

        Gmap.init();
    }

    function addCSS(url, path) {
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = url + path;
        css.onload = function () { pluginBody($jp, w, d); };
        document.head.appendChild(css);
    }

    function pluginBody($, window, document) {
        var pluginName = "ShopLocator",
            defaults = {
                pluginStyle: "cosmic",
                paginationStyle: 1,
                preloader: false,
                json: null,
                map: {
                    center: [31.9887374, 34.9010247],
                    MapType: google.maps.MapTypeId.ROADMAP, //MapTypeId.ROADMAP, MapTypeId.SATELLITE, MapTypeId.HYBRID, MapTypeId.TERRAIN
                    disableDefaultUI: false,
                    mapStyle: [],
                    draggable: true,
                    disableDoubleClickZoom: false,
                    maxZoom: "",
                    minZoom: "",
                    scrollwheel: true,
                    zoom: 3,
                    allMarkersInViewport: true
                },
                infoBubble: {
                    visible: false,
                    padding: 0,
                    borderRadius: 4,
                    borderWidth: 0,
                    borderColor: "#fff",
                    backgroundColor: "#fff",
                    shadowStyle: 0,
                    minHeight: null,
                    maxHeight: 100,
                    minWidth: 200,
                    maxWidth: null,
                    arrowStyle: 0,
                    arrowSize: 10,
                    arrowPosition: 50,
                    hideCloseButton: false,
                    closeSrc: server + "/Content/assets/plugins/shoplocator/closeButton.svg",
                    offsetTop: 2,
                    offsetRight: 2,
                    disableAutoPan: false,
                    //getDirectionsButton: true,
                    //directionsUseGeolocation: true
                },
                markersIcon: server + "/Content/assets/plugins/shoplocator/lollipop/images/marker.png",
                marker: {
                    latlng: [52.2296760, 21.0122290],
                    animation: false, //google.maps.Animation.DROP, google.maps.Animation.BOUNCE
                    //animation: google.maps.Animation.BOUNCE,
                    title: "CreateIT",
                    street: "",
                    zip: "",
                    city: ""
                },
                cluster: {
                    enable: false,
                    clusterClass: "cluster",
                    gridSize: 50,
                    maxZoom: 11,
                    style: {
                        anchorIcon: [0, 0],
                        anchorText: [0, 0],
                        backgroundPosition: "0 0",
                        fontFamily: 'Arial,sans-serif',
                        fontStyle: 'normal',
                        textColor: 'white',
                        fontWeight: 'bold',
                        textSize: 18,
                        heightSM: 60,
                        widthSM: 54,
                        heightMD: 60,
                        widthMD: 54,
                        heightBIG: 60,
                        widthBIG: 54,
                        iconSmall: server + "/Content/assets/plugins/shoplocator/lollipop/images/clusterSmall.png",
                        iconMedium: server + "/Content/assets/plugins/shoplocator/lollipop/images/clusterMedium.png",
                        iconBig: server + "/Content/assets/plugins/shoplocator/lollipop/images/clusterBig.png"
                    }
                },
                sidebar: {
                    visible: false,
                    selectSection: {
                        visible: false,
                        pathToJSONDirectory: server + "/Home/GetPointsData/",
                        difFiles: [["First Region", "markers"], ["Second Region", "diffmarkers"]],
                        fileTypes: "json"
                    },
                    searchBox: {
                        visible: true,
                        findPlaceBy: "cities",
                        searchByCountry: [false, "us"],
                        search: true,
                        searchRadius: 20,
                        placeHolder: "nheuo akl"
                    },
                    results: {
                        visibleInFirstPage: true,
                        pageSize: 10,
                        currentPage: 1,
                        paginationItems: 5
                    }
                }
            };

        var openInfoWindow;

        // The actual plugin constructor
        function Plugin(element, options) {

            this.block = null;
            this.modal = null;
            this.bodySrc = {};
            // this.element = $('#pickup'); // element;
            // jQuery has an extend method which merges the contents of two or
            // more objects, storing the result in the first object. The first object
            // is generally empty as we don't want to alter the default options for
            // future instances of the plugin
            this.settings = $.extend(true, {}, defaults, options);
            this._defaults = defaults;
            this._name = pluginName;
            this._searchInput = null;
            this._mapCanvas = null;
            this._infoWindow = null;
            this._preloader = null;
            this._markers = null;
            this._lastZoom = 10;
            this._lastMarker = null;
            this._bounds = null;
            this._isDefaultCalled = false;
            this.initButton();
            this._service = "all";
            this._previousService = "all";
            this._cluster = null;
            this._data = [];
            this._stores = [];
            this._lockers = [];
            this._drops = [];
            this._searchPosition = null;
            this._homeMarker = null;
            this._allPoints = null;
            this._radius = null;
            this._searchBox = null;
            this._modalSize = '10%';
        }

        // Avoid Plugin.prototype conflicts
        $.extend(Plugin.prototype, {
            initButton: function () {
                var _self = this;
                this.settings.choose = function (address) {
                    var e = document.createEvent("HTMLEvents");
                    e.initEvent("pickups-after-choosen", false, true);
                    e.detail = address;
                    document.body.dispatchEvent(e);
                    _self.closeModal();
                }
            },
            onClick: function () {
                var e = document.createEvent("HTMLEvents");
                e.initEvent("pickups-before-open", false, true);
                document.body.dispatchEvent(e);
                this.show();
            },
            init: function (service) {

                this._service = service;

                this.setUpModalWindow();
                this.setUpScriptBody(this.element[0], this.settings);
                this.setUpMap(this.element[0], this.settings);
            },
            show: function () {
                var _self = this;
                $(window).unbind('resize');
                $(window).on('resize', { passive: true }, function ($) {
                    _self.calculateSizes(true);
                });

                $('body').css({ 'overflow': 'hidden', 'position': 'static', 'width': '100%' });

                if (!this.block) {
                    this.block = $('<div class="pickups-block"><div class="row-pickups"></div></div>');
                    $('body').append(this.block);

                    this.block.css({
                        'position': 'fixed',
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'background-color': 'rgba(0,0,0,0.6)',
                        'z-index': '1',
                        'display': 'none',
                        'overflow': 'hidden',
                        'flex-direction': 'column'
                    });
                }
                this.block.show();
                this.modal.show();
                ///calc search items to fit container only when modal shown                
                this.calculateSizes();
                //this.resultsInPage(_self, _self.element[0], _self.settings);

                this.showMarkers();
                $('div.pkp-header').show();

                setTimeout(function () {
                    //window.PickupsSDK.calculateSizes(true);
                    //alway start on full screen
                    _self._modalSize = '10%';
                    _self.resizeModal();
                }, 300);

            },
            closeModal: function () {

                if (this._homeMarker != null)
                    this._homeMarker.setMap(null);
                this.closeFullscreen();
                if (this.block == null) return;

                //if (this._searchBox.getPlace() != null) {
                $('#searchGmaps').val("");
                google.maps.event.trigger(this._searchBox, 'place_changed');
                this._lastZoom = 10;
                //}


                this._infoWindow.close();
                $('body').css({ 'overflow': this.bodySrc.overflow, 'position': this.bodySrc.position });
                $('body').scrollTop(this.bodySrc.scrollY);
                
                $(this.modal).hide();

                //var _self = this;
                this.block.fadeOut();
            },
            closeFullscreen: function () {
                if (document.fullscreenElement) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) { /* Safari */
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) { /* IE11 */
                        document.msExitFullscreen();
                    }
                }
            },
            setAddressFromCoord: function (lat, lng, isGPS) {
                var _self = this;

                var latlng = new google.maps.LatLng(lat, lng);
                var rgeocoder = new google.maps.Geocoder();

                rgeocoder.geocode({ 'location': latlng }, function (results, status) {
                    if (status !== 'OK') {
                        _self.navigateCurrent();
                        return;
                    }

                    var addr = results[0].formatted_address;

                    if (!isGPS && !(addr.includes("Israel") || addr.includes("ישראל"))) {
                        console.log("Out of bounds");
                        _self.navigateCurrent();
                        return;
                    }

                    $('#searchGmaps').val(results[0].formatted_address);
                    _self._mapCanvas.setCenter(latlng);

                    var markerDetails = new Object();

                    markerDetails.getPlace = function () {
                        var position = new Object();
                        position.geometry = new Object();
                        position.geometry.location = new Object();
                        position.geometry.location.lat = function () { return lat };
                        position.geometry.location.lng = function () { return lng };
                        position.name = $('#searchGmaps').val();
                        return position;
                    };

                    _self._homeMarker = _self.createMarkers(_self._mapCanvas, null, markerDetails, _self.settings, true);
                    _self.setSearchPosition(lat, lng);
                });
            },
            setDefaults: function (json) {
                var _self = this;
                _self._isDefaultCalled = true;

                if (json) {
                    var address = JSON.parse(json);

                    if (typeof (address.location) == 'object') {
                        // navigate by GPS point
                        if (typeof (address.location.lat) == 'number' && typeof (address.location.lng) == 'number') {
                            _self.setAddressFromCoord(address.location.lat, address.location.lng, false);
                        } else {

                            address.location.city = (typeof (address.location.city) == 'string') ? address.location.city.trim() : "";
                            address.location.street = (typeof (address.location.street) == 'string') ? address.location.street.trim() : "";
                            address.location.house = address.location.house ? address.location.house.toString().trim() : "";

                            // if (address.location.city.length > 0) trackEvents("Default Address", address.location.city, address.location.street + ((address.location.house.length > 0) ? " " + address.location.house : ""));

                            var request = address.location.city;
                            if (request.length > 0 && address.location.street.length > 0) {
                                var street = address.location.street;

                                if (address.location.house.length > 0) {
                                    street += " " + address.location.house;
                                }
                                request = street + ", " + request;
                            }

                            if (request.length > 0) {

                                geocoder = new google.maps.Geocoder();
                                geocoder.geocode({ 'address': request }, function (results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        var lt = results[0].geometry.location.lat();
                                        var lg = results[0].geometry.location.lng();
                                        var address = results[0].formatted_address;

                                        if (!(address.includes("Israel") || address.includes("ישראל"))) {
                                            _self.navigateCurrent();
                                            return;
                                        }
                                        _self.setSearchPosition(lt, lg, address);

                                        var markerDetails = new Object();
                                        markerDetails.getPlace = function () {
                                            var position = new Object();
                                            position.geometry = new Object();
                                            position.geometry.location = new Object();
                                            position.geometry.location.lat = function () { return lt };
                                            position.geometry.location.lng = function () { return lg };
                                            position.name = address;
                                            return position;
                                        };

                                        _self._homeMarker = _self.createMarkers(_self._mapCanvas, null, markerDetails, _self.settings, true);
                                    } else {
                                        _self.navigateCurrent();
                                    }
                                });
                            }
                            else {
                                _self.navigateCurrent();
                            }

                        }
                    }
                    else {
                        _self.navigateCurrent();
                    }
                }
                else {
                    _self.navigateCurrent();
                }
            },
            navigateCurrent: function () {
                var _self = this;
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        _self.setAddressFromCoord(position.coords.latitude, position.coords.longitude, true);
                        _self.setSearchPosition(position.coords.latitude, position.coords.longitude);
                    }, function () {
                    });
                } else {
                    // Browser doesn't support Geolocation
                    console.log("Error: Your browser doesn't support geolocation.")
                }
            },
            showModalWindow: function () {
            },
            setUpModalWindow: function () {
                var _self = this;

                if ($('div.pickups-block').length > 0) {
                    if (typeof (_self.element) == "undefined") {
                        $('div.pickups-block').remove();
                        $('#pickups_body').remove();

                    } else return;
                }


                if ($('#pickups_body').length > 0) {
                    this.element = $('#pickups_body');
                    return;
                }

                this.bodySrc.overflow = $('body').css('overflow');
                this.bodySrc.position = $('body').css('position');
                this.bodySrc.scrollY = $('body').scrollTop();


                var h = $(window).height();
                var w = $(window).width();


                this.modal = $('<div class="pickups-modal"><div class="pkp-header"><span><a id="pickupbtnmn" class="pickup_close" onclick="window.PickupsSDK.closeModal();" >×</a><a class="changeSize" onclick="window.PickupsSDK.resizeModal();"><img src="' + server + '/api/icons/icon_22x22_resize_maximize.png" /></a></span><h4 style="direction:rtl">שירות PickUp - אוספים את המשלוח בדרך הביתה</h4></div><div id="pickups_body"></div></div>');

                $('body').append(this.modal);

                var modalCss = {
                    'position': 'fixed',   // relative	// absolute   
                    'background-color': '#fff',
                    'border': '0 solid #8dc642',
                    'margin': 'auto',
                    '-webkit-transition': 'all 0.5s ease',
                    'transition': 'all 0.3s ease',
                    'z-index': '99999999999',
                    '-webkit-border-radius': '1px',
                    '-webkit-box-shadow': '-1px 2px 24px rgba(0, 0, 0, 0.91)',
                    '-webkit-overflow-scrolling': 'touch',
                    'display': 'none',
                    'overflow': 'hidden'
                };

                //this.resizeModal();
                this.modal.css(modalCss);
                this.element = $('#pickups_body');
            },
            calculate5kmZoom: function () {
                var area = Math.min($('#map_canvas').height(), $('#map_canvas').width()); //Get smallest pixel area
                var zoom = 14 - Math.ceil((Math.log(5) * 496 / area) / Math.log(2));
                return zoom;
            },
            calculateSizes: function (resizeMap) {
                var modal_height = window.innerHeight;
                var modal_width = window.innerWidth;
                var reduction, map_reduction;
                //var itemHeight = 0;

                if (this._modalSize == '10%') {
                    modal_width *= 0.8;
                    modal_height *= 0.8;
                }

                if (window.innerWidth < 1024) {
                    reduction = $('.ct-googleMap--searchContainer').outerHeight() +
                        $('.ct-googleMap--searchContainer+nav').outerHeight() +
                        $('.ct-googleMap--sidebar .Navigation').outerHeight() + 50;

                    //Mobile
                    if (window.innerWidth > window.innerHeight) //Landscape
                    {//reduction = 200;
                    }
                    else {
                        //reduction = 235;
                        $('#infoBubbleContent').css('min-height', 'auto');
                    } //Header, input and title

                    //if (window.innerWidth < window.innerHeight) //Portrait
                    //    itemHeight = 25;

                    $('.ct-googleMap--MapCol').css('width', '100%');
                    $('.ct-googleMap--SidebarCol').css('width', '100%');

                } else {
                    //Desktop

                    reduction = $('.ct-googleMap--searchContainer').outerHeight() + $('.pkp-header').outerHeight() + 90;
                    //reduction = 225;

                    var sideBar_width = Math.min(Math.max(modal_width * 0.25, 350), modal_width * 0.4);

                    $('.ct-googleMap--MapCol').css('width', modal_width - sideBar_width);
                    $('.ct-googleMap--SidebarCol').css('width', sideBar_width);
                }

                map_reduction = reduction - 70;
                var section_height = modal_height - reduction + ((window.innerWidth > innerHeight) ? 25 : 0) - 46;
                var activePageClass = '.page' + $('.NavPage.active').attr('rel');
                var titleHeight = $(activePageClass + ' .ct-googleMap--sidebarItemTitle').height();

                if (titleHeight == null)
                    titleHeight = $('.ct-googleMap--sidebarItemTitle').height();
                ///check max number of elements in single page
                var resultContainer = $('.ct-googleMap--results');
                var itemHeight = resultContainer.find('.ct-googleMap--sidebarItem:first-child').outerHeight(true);
                if (itemHeight) {
                    var pageSize = parseInt(resultContainer.height() / itemHeight);
                    if (pageSize != this.settings.sidebar.results.pageSize) {
                        this.settings.sidebar.results.pageSize = parseInt(resultContainer.height() / itemHeight);
                        this.resultsInPage(this, this.element[0], this.settings);
                    }
                }

                if (this._mapCanvas && resizeMap) {
                    var context = this;
                    setTimeout(function () {
                        var cent = context._mapCanvas.getCenter();
                        google.maps.event.trigger(context._mapCanvas, "resize");
                        context._mapCanvas.setCenter(cent);
                    }, 250);
                }
            },
            getPointType: function (id) {
                var type = 'store';
                if (id) {
                    if (id.startsWith("PKPL")) {
                        type = 'locker';
                    }
                    else if (id.startsWith("PKPD")) {
                        type = 'drop';
                    }
                }
                return type;
            },
            getPointTypeByData: function (data) {
                if (data.type) {
                    return data.type;
                } else {
                    var type = 'store';
                    if (data.iid) {
                        if (data.iid.startsWith("PKPL")) {
                            type = 'locker';
                        }
                        else if (data.iid.startsWith("PKPD")) {
                            type = 'drop';
                        }
                    }
                    data.type = type;
                    return type;
                }
            },
            resizeModal: function () {
                var add_css;

                switch (this._modalSize) {
                    case '10%':
                        add_css =
                        {
                            'left': '0',
                            'right': '0',
                            'top': '0',
                            'bottom': '0',
                            //'max-height': '100vh'
                        }
                        $('.changeSize img').attr('src', server + '/api/icons/icon_22x22_resize_minimize.png');
                        this._modalSize = '0';
                        break;
                    case '0':
                        add_css =
                        {
                            'left': '10%',
                            'right': '10%',
                            'top': '10%',
                            'bottom': '10%'
                        }
                        $('.changeSize img').attr('src', server + '/api/icons/icon_22x22_resize_maximize.png');
                        this._modalSize = '10%';
                        break;
                }

                $('.pickups-modal').css(add_css);

                this.calculateSizes(true);
            },
            //Prepares DOM body for plugin elements
            setUpScriptBody: function (element, settings) {
                var _self = this;
                var sidebarBody;
                $(element).addClass(settings.pluginStyle);
                if (settings.sidebar.visible == true) {
                    var logo = '';
                    if (this._service == 'drops') {
                        logo = server + "/api/icons/pickup_drop-off_logo_white.png"
                    }
                    else {
                        logo = server + "/api/icons/logo-blue-bg-big.png"
                    }
                    $('#pickups_body').append("<div class='ct-googleMap--searchContainer' style='background-image: url(\"" + logo + "\");'><input type='text' class='ct-googleMap--search' id='searchGmaps'  placeholder='" + settings.sidebar.searchBox.placeHolder + "' style='background-image: url(" + server + "/api/icons/icon-search.png);' />\
                    <div id='map_selection_toggles' style='height: 32px'>" +

                        ((this._service == 'all') ? "<div>" +
                            "<input  style='margin-left: 5px;' value='all' class='subservice selecteds' id='allpoints' type='radio' checked='1' />" +
                            "<label for='allpoints'>הכל</label></div>" +

                            "<div>" +
                            "<input value='stores' class='subservice' id='pickuppopints' type='radio' />\
                    <div><img style='margin: 0 5px;' src='" + server + "/api/icons/icon_18x18_x3_store_white.png' height='18' width='18' /></div>" +
                            "<label for='pickuppopints'>חנויות</label></div>" +

                            "<div>" +
                            "<input value='lockers' class='subservice' id='lockerpoints' type='radio' />\
                    <div><img style='margin: 0 5px;' src='" + server + "/api/icons/icon_18x18_x3_locker_white.png' /></div>" +
                            "<label for='lockerpoints'>לוקרים</label></div>" +

                            "</div>" : "") +
                        "</div>");

                    var pickup_tabs = "\
                        <nav>\
                            <ul class='pickup-btn-tabs'>\
                                <li role='presentation' onClick='' class='active point_list'>רשימה</li>\
                                <li role='presentation' onClick='' class='point_map'>מפה</li>\
                            </ul>\
                        </nav>";

                    var pickup_content = "\
                        <div class='ct-googleMap--Points'>\
                            <div class='ct-googleMap--SidebarCol'>\
                                <div class='ct-googleMap--sidebar'>\
                                </div>\
                            </div>\
                            <div class='ct-googleMap--MapCol'>\
                                <div class='ct-googleMap ct-js-googleMap' id='map_canvas'>\
                                </div>\
                            </div>\
                        </div>";

                    $('#pickups_body').append(pickup_tabs + pickup_content);


                    $('.point_list').on('click', function () {

                        $(this).addClass('active');
                        $('.point_map').removeClass('active');

                        $('.ct-googleMap--SidebarCol').css('z-index', 1);
                        $('.ct-googleMap--MapCol').css('z-index', 0);
                    });

                    $(document).on('click', '.pickup-showinmap,.point_map', function () {
                        $('.point_map').addClass('active');
                        $('.point_list').removeClass('active');

                        $('.ct-googleMap--SidebarCol').css('z-index', 0);
                        $('.ct-googleMap--MapCol').css('z-index', 1);
                    });
                    $('.point_list').trigger('click');

                    sidebarBody = $(element).find('.ct-googleMap--sidebar');
                    if (settings.sidebar.selectSection.visible == true) {

                        if (this._service == "all")
                            sidebarBody.append("");


                        sidebarBody.append("<div class='ct-googleMap--selectContainer''>" + "<select class='ct-googleMap--select' style='display: none'></select>" + "</div>");

                        this.createSelectSection(element, settings);

                        $("input.subservice").on("change", function () {

                            $("input.selecteds").removeAttr("checked").removeAttr("disabled").removeClass("selecteds");
                            _self._previousService = _self._service;
                            _self._service = $(this).val();
                            $(this).attr("checked", "1").addClass("selecteds");

                            _self.resetByService();

                        });
                    }
                    if (settings.sidebar.searchBox.visible == true || settings.sidebar.searchBox.search == true) {

                        if (settings.sidebar.searchBox.search == true) {

                            sidebarBody.append("<div class='ct-googleMap--resultsCounter'></div>" + "<div class='ct-googleMap--results ct-googleMap--results-loader'></div>");

                        } else if (settings.sidebar.results.visibleInFirstPage == true) {
                            sidebarBody.append("<div class='ct-googleMap--results'></div>")
                        }
                    }
                    $(window).unbind('resize');
                    $(window).resize(function ($) {
                        _self.calculateSizes(true);
                    });
                } else {
                    element.innerHTML = "<div class='ct-googleMap ct-js-googleMap' id='map_canvas'>";
                }
            },
            resetByService: function () {
                //console.time('resetByService');
                _self = this;
                //console.time('filterMarkers');
                switch (_self._service) {
                    case "all":
                        switch (_self._previousService) {
                            case "lockers": $.each(this._stores, function (i, o) { _self._cluster.addMarker(o); }); break;
                            case "stores": $.each(this._lockers, function (i, o) { _self._cluster.addMarker(o); }); break;
                            case "drops": $.each(this._drops, function (i, o) { _self._cluster.addMarker(o); }); break;
                        }
                        break;
                    case "lockers":
                        _self._cluster.clearMarkers();
                        $.each(this._lockers, function (i, o) { _self._cluster.addMarker(o); });
                        break;
                    case "stores":
                        _self._cluster.clearMarkers();
                        $.each(this._stores, function (i, o) { _self._cluster.addMarker(o); });
                        break;
                    case "drops":
                        _self._cluster.clearMarkers();
                        $.each(this._drops, function (i, o) { _self._cluster.addMarker(o); });
                        break;
                }
                //console.timeEnd('filterMarkers');
                var sidebarItem = $(this.element[0]).find('.ct-googleMap--sidebarItem');
                var resultsCounter = $(this.element[0]).find('.ct-googleMap--resultsCounter');
                sidebarItem.remove();
                var r = $(this.element[0]).find('.ct-googleMap--results');
                r.addClass("ct-googleMap--results-loader");
                //console.time('showSearchResult');
                this.showSearchResult(_self, _self.searchBox, _self._data, _self._markers, this.element[0], this._mapCanvas, this._bounds, this.settings);
                //console.timeEnd('showSearchResult');

                r.removeClass("ct-googleMap--results-loader");
                _self.updateLogo();
                //console.timeEnd('resetByService');
            },
            startByService: function (service) {
                _self = this;
                if (!service || service == '') {
                    service = 'all';
                }
                var clearClusterer = true;
                var gmarkers = [];
                if (_self._service != service) {
                    _self._service = service;
                    if(_self._markers && _self._markers.length){                        
                        _self.resetByService();
                    }else{
                        _self._markers = null;                    
                        _self.refetchData(_self, _self.element[0], _self._mapCanvas, _self._bounds, _self.settings, clearClusterer, gmarkers);
                        _self.updateLogo();
                    }
                }
                //_self.resetByService();
                if (service != 'all') {
                    $('#map_selection_toggles div').hide();
                } else {
                    $('#map_selection_toggles div').show();
                }
            },
            updateLogo:function(){
                if(_self._service){                    
                    var logo = '';
                    if (this._service == 'drops') {
                        logo = server + "/api/icons/pickup_drop-off_logo_white.png"
                    }
                    else {
                        logo = server + "/api/icons/logo-blue-bg-big.png"
                    }
                    $('#pickups_body .ct-googleMap--searchContainer').css('background-image','url("' + logo + '")');                    
                }
            },
            //Create map with added options, call marker function
            setUpMap: function (element, settings) {
                var selectorMap = $(element).find('.ct-js-googleMap');

                var infoWindow, mapCanvas1, bounds, draggable;
                if (window.screen.width < 998) {
                    draggable = true
                } else {
                    draggable = settings.map.draggable
                }
                this._lastMarker = new google.maps.LatLng(settings.map.center[0], settings.map.center[1]);
                this._mapCanvas = new google.maps.Map(selectorMap[0], {
                    center: new google.maps.LatLng(settings.map.center[0], settings.map.center[1]),
                    mapTypeId: settings.map.MapType,
                    mapTypeControl: false,
                    streetViewControl: false,
                    styles: settings.map.mapStyle,
                    disableDefaultUI: settings.map.disableDefaultUI,
                    draggable: draggable,
                    disableDoubleClickZoom: settings.map.disableDoubleClickZoom,
                    maxZoom: settings.map.maxZoom,
                    minZoom: settings.map.minZoom,
                    scrollwheel: settings.map.scrollwheel,
                    zoom: settings.map.zoom
                });

                var _context = this;
                google.maps.event.addListenerOnce(_context._mapCanvas, 'idle', function () { google.maps.event.trigger(_context._mapCanvas, 'resize'); });


                if (settings.infoBubble.visible == true) {
                    infoWindow = new google.maps.InfoWindow();
                    this._infoWindow = infoWindow;
                }

                //Mapping markers on the map
                bounds = new google.maps.LatLngBounds();
                this._bounds = bounds;
                this.displayMarkers(this, element, this._mapCanvas, bounds, settings);
            },
            showSearchResult: function (constructor, searchBox, data, arrayMarker, element, map, bounds, settings) {
                var _self = this;
                var dataMarkers, marker, cluster, clusterStyles, clusterOptions;

                arrayMarker = [];
                dataMarkers = data;
                //this._bounds = new google.maps.LatLngBounds();

                if (searchBox)
                    this.searchBox = searchBox;

                var filterKey = '';
                if (this._service == "lockers") {
                    filterKey = 'PKPL';
                } else if (this._service == "stores") {
                    filterKey = 'PKPS';
                }
                else if (this._service == "drops") {
                    filterKey = 'PKPD';
                }
                var showedMarkers = [];
                for (var i = 0; dataMarkers.length > i; i++) {
                    var e = dataMarkers[i];
                    if (e.stat == false) {
                        continue;
                    }
                    else {
                        if (filterKey == '' && e.iid.indexOf("PKPD") === 0) {
                            continue;
                        } else if (e.iid.indexOf(filterKey) !== 0) {
                            continue;
                        }
                    }

                    if (settings != null && settings.sidebar.visible == true && settings.sidebar.results.visibleInFirstPage == true) {
                        if (i != 0 && dataMarkers[i].dist > _self._radius) {
                            break;
                        }
                        if (_self._markers) {
                            var marker = _self._markers.find(function (m) { return m.pickupData.iid === dataMarkers[i].iid; });
                            if (marker) {
                                marker.pickupData = e;
                                showedMarkers.push(marker);
                            }
                        }
                    }
                }
                constructor.createSidebarItems(_self._mfapCanvas, showedMarkers, element, settings);

                this.calculateSizes();
                constructor.resultsInPage(constructor, element, settings);

                if (settings.map.allMarkersInViewport == true && self._markers != null) {

                    _self._lastMarker = new google.maps.LatLng(dataMarkers[0].lat, dataMarkers[0].lng);
                    _self.showMarkers();
                }

                if (_self._markers == null) _self._markers = arrayMarker;

                return cluster
            },
            //JSon function for different files
            JSonMainFunction: function (constructor, searchBox, data, arrayMarker, element, map, bounds, settings) {
                var _self = this;
                var clearClusterer;
                var dataMarkers, marker, cluster, clusterStyles, clusterOptions;
                //var gmarkers = [];
                clusterStyles = [
                    {
                        anchorIcon: settings.cluster.style.anchorIcon,
                        anchorText: settings.cluster.style.anchorText,
                        backgroundPosition: settings.cluster.style.backgroundPosition,
                        fontFamily: settings.cluster.style.fontFamily,
                        fontStyle: settings.cluster.style.fontStyle,
                        textColor: settings.cluster.style.textColor,
                        fontWeight: settings.cluster.style.fontWeight,
                        textSize: settings.cluster.style.textSize,
                        url: settings.cluster.style.iconSmall,
                        height: settings.cluster.style.heightSM,
                        width: settings.cluster.style.widthSM
                    },
                    {
                        anchorIcon: settings.cluster.style.anchorIcon,
                        anchorText: settings.cluster.style.anchorText,
                        backgroundPosition: settings.cluster.style.backgroundPosition,
                        fontFamily: settings.cluster.style.fontFamily,
                        fontStyle: settings.cluster.style.fontStyle,
                        textColor: settings.cluster.style.textColor,
                        fontWeight: settings.cluster.style.fontWeight,
                        textSize: settings.cluster.style.textSize,
                        url: settings.cluster.style.iconMedium,
                        height: settings.cluster.style.heightMD,
                        width: settings.cluster.style.widthMD
                    },
                    {
                        anchorIcon: settings.cluster.style.anchorIcon,
                        anchorText: settings.cluster.style.anchorText,
                        backgroundPosition: settings.cluster.style.backgroundPosition,
                        fontFamily: settings.cluster.style.fontFamily,
                        fontStyle: settings.cluster.style.fontStyle,
                        textColor: settings.cluster.style.textColor,
                        fontWeight: settings.cluster.style.fontWeight,
                        textSize: settings.cluster.style.textSize,
                        url: settings.cluster.style.iconBig,
                        height: settings.cluster.style.heightBIG,
                        width: settings.cluster.style.widthBIG
                    }
                ];
                clusterOptions = {
                    clusterClass: settings.cluster.clusterClass,
                    gridSize: settings.cluster.gridSize,
                    maxZoom: settings.cluster.maxZoom,
                    styles: clusterStyles
                };

                //$(element).find('.ct-googleMap--search').val('');
                arrayMarker = [];
                dataMarkers = data;
                this._bounds = new google.maps.LatLngBounds();

                //console.time("filteredDataMarkers");

                var filterKey = '';
                if (this._service == "lockers") {
                    filterKey = 'PKPL';
                } else if (this._service == "stores") {
                    filterKey = 'PKPS';
                }
                else if (this._service == "drops") {
                    filterKey = 'PKPD';
                }

                for (var i = 0; dataMarkers.length > i; i++) {
                    var e = dataMarkers[i];
                    if (e.stat == false) {
                        continue;
                    }
                    else {
                        if (filterKey == '' && e.iid.indexOf("PKPD") === 0) {
                            continue;
                        } else if (e.iid.indexOf(filterKey) !== 0) {
                            continue;
                        }
                    }
                    if (_self._markers == null) {
                        marker = constructor.createMarkers(_self._mapCanvas, searchBox, dataMarkers[i], settings, false);
                        _self._bounds.extend(marker.getPosition());
                        arrayMarker.push(marker);
                    }
                }

                //console.timeEnd("filteredDataMarkers");

                constructor.createSidebarItems(_self._mapCanvas, arrayMarker, element, settings);


                ///calc search items to fit container only when not modal
                if ($('#pickups_body').length > 0) {
                    this.calculateSizes();
                    constructor.resultsInPage(constructor, element, settings);
                }

                if (settings.cluster.enable == true && _self._markers == null) {
                    clearClusterer = true;
                    cluster = new MarkerClusterer(_self._mapCanvas, arrayMarker, clusterOptions);
                }
                else cluster = constructor._cluster;

                // some logic
                if (settings.map.allMarkersInViewport == true && self._markers != null) {

                    _self._lastMarker = new google.maps.LatLng(dataMarkers[0].lat, dataMarkers[0].lng);
                    _self.showMarkers();
                }

                if (_self._markers == null) _self._markers = arrayMarker;

                if (_self._lockers.length == 0)
                    $.each(_self._markers, function (i, o) {
                        if (o.pickupData.iid.startsWith("PKPL")) {
                            _self._lockers.push(o);
                        }
                        else if (o.pickupData.iid.startsWith("PKPD")) {
                            _self._drops.push(o);
                        }
                        else if (o.pickupData.iid.startsWith("PKPS")) {
                            _self._stores.push(o);
                        }
                        else {
                            console.log(o.pickupData.iid);
                        }
                    });

                return cluster
            },
            showMarkers: function (markers) {
                _self = this;
                window.setTimeout(function () {
                    _self._mapCanvas.setZoom(_self._lastZoom);
                    google.maps.event.trigger(_self._mapCanvas, 'resize');
                    _self._mapCanvas.setCenter(_self._lastMarker);

                }, 100);
            },
            setSearchPosition: function (lat, lng, formatted_address) {
                var selectDOM, bounds, sidebarItem, selectValue, marker, cluster, clearClusterer, searchBox, optionsSearchBox;

                sidebarItem = $(this.element).find('.ct-googleMap--sidebarItem');
                sidebarItem.remove();

                var searchLocationPosition = new google.maps.LatLng(lat, lng);

                //bounds = new google.maps.LatLngBounds();
                this.performLocationSearch(searchLocationPosition, this, this.element, this.settings.sidebar.searchBox, selectDOM, this._mapCanvas, bounds, this.settings);

                if (typeof (formatted_address) == 'string') $(this.element).find('.ct-googleMap--search').val(formatted_address);
            },
            performLocationSearch: function (searchLocationPosition, constructor, element, searchBox, selectDOM, map, bounds, settings) {
                var context = this;
                var _self = constructor;
                var gmarkers = [], clearClusterer = false;
                //var cluster;
                var results = $(this.element).find('.ct-googleMap--results');
                results.addClass("ct-googleMap--results-loader");
                if (searchLocationPosition == "Init")
                    searchLocationPosition =
                    {
                        lat: function () { return context.settings.map.center[0] },
                        lng: function () { return context.settings.map.center[1] },
                        center: true
                    };
                var options = {
                    lat: searchLocationPosition.lat(),
                    lng: searchLocationPosition.lng()
                };
                if (this._service == 'drops') {
                    options.types = '4';
                }
                //else if (this._service == 'stores') {
                //    options.types = '1';
                //}
                //else if (this._service == 'lockers') {
                //    options.types = '2';
                //}
                $.post(server + "/Home/PostFreeText",
                    options,
                    function (data) {

                        _self._data = data;
                        var dataToSend = [];
                        _self._searchPosition = searchLocationPosition;

                        if (searchLocationPosition.center == true) {
                            dataToSend = _self._allPoints;
                            window.setTimeout(function () { _self._mapCanvas.setZoom(10); }, 101);
                        } else {
                            dataToSend = _self._data;
                            _self._mapCanvas.setZoom(_self.calculate5kmZoom());
                            //_self._mapCanvas.setZoom(14);
                        }

                        _self.showSearchResult(_self, searchBox, dataToSend, gmarkers, element, map, bounds, settings);
                        results.removeClass("ct-googleMap--results-loader");
                    }
                );


                _self._lastMarker = new google.maps.LatLng(searchLocationPosition.lat(), searchLocationPosition.lng());
                _self._lastZoom = 12;
                _self.showMarkers();
            },
            placeChanged: function (constructor, element, map, settings, searchBox, selectDOM, bounds) {

                $('#infoBubbleSpan').html("<br />אתה נמצא ב:<br/><br/>" + $('#searchGmaps').val());
                var selectDOM, sidebarItem, selectValue, marker, clearClusterer, searchBox, optionsSearchBox;

                sidebarItem = $(element).find('.ct-googleMap--sidebarItem');
                sidebarItem.remove();

                selectValue = selectDOM.val();

                $(element).find('.ct-googleMap--resultsCounter').html('');
                if (settings.preloader == true) {
                    var $preloader = $(element).find('.ct-preloader');
                    $preloader.removeClass('make-hidden');
                }

                var place = searchBox.getPlace();
                var sb = $('#searchGmaps');
                if (place.geometry == null || sb.val() == "")
                    if (place.name == "" || sb.val() == "") {
                        this._homeMarker = null;
                        constructor.performLocationSearch("Init", constructor, element, searchBox, selectDOM, map, bounds, settings);
                    }
                    else console.log("There was an error: ", place);
                else {
                    var searchLocationPosition = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());

                    this._homeMarker = this.createMarkers(this._mapCanvas, null, searchBox, settings, true);
                    this._homeMarker.title = $('#searchGmaps').val();
                    constructor.performLocationSearch(searchLocationPosition, constructor, element, searchBox, selectDOM, map, bounds, settings);
                }
            },

            //Add markers to map
            displayMarkers: function (constructor, element, map, bounds, settings) {
                var _self = this;
                var gmarkers = [];
                var selectDOM, sidebarItem, selectValue, marker, clearClusterer, searchBox, optionsSearchBox;
                selectDOM = $(element).find('.ct-googleMap--select');
                if (settings.preloader == true) {
                    var $preloader = $(element).find('.ct-preloader');
                    this._preloader = $preloader;
                }
                if (settings.sidebar.searchBox.visible == true || settings.sidebar.searchBox.search == true) {

                    if (settings.sidebar.searchBox.searchByCountry[0] == true) {
                        optionsSearchBox = {
                            types: ["(" + settings.sidebar.searchBox.findPlaceBy + ")"],
                            componentRestrictions: { country: settings.sidebar.searchBox.searchByCountry[1] }
                        };
                    } else {
                        optionsSearchBox = {
                            types: ["(" + settings.sidebar.searchBox.findPlaceBy + ")"]
                        };
                    }

                    // Create the search box and link it to the UI element.
                    if (constructor._searchInput == null) {
                        constructor._searchInput = $(element).find('.ct-googleMap--search');
                        constructor._searchInput.on("click", function () {
                            $(this).select();
                        });

                        //var myPosition = [];
                        // searchBox = new google.maps.places.Autocomplete(constructor._searchInput[0]);

                        var searchBoxInput = document.getElementById('searchGmaps');
                        searchBox = new google.maps.places.Autocomplete(searchBoxInput, {
                            fields: ["name", "geometry.location", "place_id"]
                        });
                        this._searchBox = searchBox;

                        //Add listener to the input for autocomplete and search.
                        (function pacSelectFirst(input) {
                            // store the original event binding function
                            var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;
                            function addEventListenerWrapper(type, listener) {
                                // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
                                // and then trigger the original listener.
                                if (type == "keydown") {
                                    var orig_listener = listener;
                                    listener = function (event) {
                                        var suggestion_selected = $(".pac-item-selected").length > 0;
                                        if (event.which == 13 && !suggestion_selected) {
                                            var simulated_downarrow = $.Event("keydown", { keyCode: 40, which: 40 })
                                            orig_listener.apply(input, [simulated_downarrow]);
                                        }

                                        orig_listener.apply(input, [event]);
                                    };
                                }

                                // add the modified listener
                                _addEventListener.apply(input, [type, listener]);
                            }

                            if (input.addEventListener)
                                input.addEventListener = addEventListenerWrapper;
                            else if (input.attachEvent)
                                input.attachEvent = addEventListenerWrapper;

                        })(searchBoxInput);

                        google.maps.event.addListener(searchBox, 'place_changed', function (e) {
                            var place = searchBox.getPlace();
                            if (!place)
                                return;

                            if (_self._homeMarker != null)
                                if ($('#searchGmaps').val() == "") {

                                    _self._homeMarker.setMap(null);

                                    this._searchPosition = null;
                                } else {
                                    var pos = place.geometry.location;
                                    var latlng = new google.maps.LatLng(pos.lat(), pos.lng());
                                    _self._homeMarker.setPosition(latlng);
                                    _self._homeMarker.pickupData.lat = pos.lat();
                                    _self._homeMarker.pickupData.lng = pos.lng();
                                }

                            constructor.placeChanged(constructor, element, map, settings, searchBox, selectDOM, bounds);
                        });
                    }

                }
                if (settings.sidebar.selectSection.visible == true && settings.sidebar.visible == true) {

                    $(selectDOM)
                        .change(function () {
                            $(this).find('option:selected').each(function () {
                                _self.refetchData(constructor, element, map, bounds, settings, clearClusterer, gmarkers);
                            })
                        })
                        .trigger("change");

                } else {

                    if (settings.json == null) {
                        var singleMarker = [
                            { "lat": settings.marker.latlng[0], "lng": settings.marker.latlng[1], "title": settings.marker.title, "street": settings.marker.street, "city": settings.marker.city, "zip": settings.marker.zip },
                        ];
                        marker = constructor.createMarkers(map, searchBox, singleMarker[0], settings, false);
                        gmarkers.push(marker);
                        if (settings.map.allMarkersInViewport == true) {
                            bounds.extend(marker.position);
                            map.fitBounds(bounds);
                        }
                        if (settings.sidebar.visible == true && settings.sidebar.searchBox.visible == true || settings.sidebar.searchBox.search == true) {
                            constructor.searchPlace(constructor, searchBox, map, gmarkers, element, settings);
                        }
                    } else {
                        $.ajax({
                            url: settings.json,
                            async: true,
                            dataType: 'json',
                            success: function (data) {

                                if (clearClusterer == true) {
                                    _self._cluster.clearMarkers();
                                    clearClusterer = false;
                                }
                                _self._cluster = constructor.JSonMainFunction(constructor, searchBox, data, gmarkers, element, map, bounds, settings);
                                clearClusterer = true;
                                if (settings.preloader == true) {
                                    var $preloader = $(element).find('.ct-preloader');
                                    $preloader.addClass('make-hidden');
                                }
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                console.log('ERROR', textStatus, errorThrown);
                            }
                        });
                    }
                }
            },
            refetchData: function (constructor, element, map, bounds, settings, clearClusterer, gmarkers) {
                _self = this;

                var sidebarItem = $(element).find('.ct-googleMap--sidebarItem');
                sidebarItem.remove();
                var selectValue = 'PKPSG1'; // selectDOM.val();
                $(element).find('.ct-googleMap--resultsCounter').html('');
                if (settings.preloader == true) {
                    var $preloader = $(element).find('.ct-preloader');
                    $preloader.removeClass('make-hidden');
                }

                var fetchTime = 0;
                var fetchData = function () {
                    var url = settings.sidebar.selectSection.pathToJSONDirectory + selectValue;
                    $.ajax({
                        url: url,
                        dataType: 'json',
                        async: true,
                        success: function (data) {
                            if (clearClusterer == true) {
                                _self._cluster.clearMarkers();
                                clearClusterer = false;
                            }
                            _self._data = data.data;
                            _self._allPoints = data.data;
                            _self._radius = data.radius;
                            _self._cluster = constructor.JSonMainFunction(constructor, _self._searchBox, data.data, gmarkers, element, map, bounds, settings);
                            clearClusterer = true;
                            if (settings.preloader == true) {
                                var $preloader = $(element).find('.ct-preloader');
                                $preloader.addClass('make-hidden');
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            //console.log('ERROR', textStatus, errorThrown);
                            setTimeout(function () {
                                if (fetchTime < 5) {
                                    fetchTime++;
                                    fetchData();
                                } else {
                                    //alert(errorThrown);
                                }
                            }, 1000);

                        }
                    });
                };
                fetchData();
            },

            markerClick: function (map, marker, markerPosition, e, settings) {

                this.currentMarker = marker.pickupData;
                map.setCenter(markerPosition);
                var contentString = "";

                var fixedZip = marker.pickupData.zip;
                if (!marker.pickupData.search && marker.pickupData.iid.startsWith("PKPL")) {
                    if (marker.pickupData.zip.includes('פתיחה:')) {
                        var op = marker.pickupData.zip.split('פתיחה:');
                        fixedZip = op[0] + 'פתיחה: <br />' + op[1];
                    } else if (marker.pickupData.zip.includes('פתיחה')) {
                        var op = marker.pickupData.zip.split('פתיחה');
                        fixedZip = op[0] + 'פתיחה: <br />' + op[1];
                    }

                    if (fixedZip.includes('0 ')) {
                        var sp = fixedZip.split('0 ');
                        fixedZip = sp[0] + "0 <br />" + sp[1];
                    } else if (fixedZip.includes('5 ')) {
                        var sp = fixedZip.split('5 ');
                        fixedZip = sp[0] + "5 <br />" + sp[1];
                    }
                }

                var point_icon;
                var src;
                var btn = '';
                var misc = '';
                if (marker.pickupData.search) {
                    point_icon = '';
                    src = server + '/api/icons/logo_small.png';
                    marker.pickupData.title = "<span id='infoBubbleSpan' style='text-align: center;'><br />" + "אתה נמצא ב:<br/><br/>" + marker.title + "</span>";
                } else {
                    point_icon = '<img class="" alt="" src="' + server + '/api/icons/icon_18x18_' + this.getPointTypeByData(marker.pickupData) + '.png' + '" height="18" width="18">';
                    src = server + '/api/icons/' + this.getPointTypeByData(marker.pickupData) + '_logo.png';
                    btn = '<div><a onClick="window.PickupsSDK.insertSelectChoosenMarker()" class="ct-button--direction" target="_blank" style="background-color: #25408f; color: white; display: inline-block;font-weight: 500;">בחר</a></div></div></div>';
                    misc = '<span>' + marker.pickupData.street + ', ' + marker.pickupData.city + '</span><br /><br />\
                                     <div id="time_link"><div id="time_info">' + fixedZip + '</div>' + btn;
                }

                contentString += '<div id="infoBubbleContent" class="ct-googleMap--customInfoWindow">\
                                     <img src="' + src + '"> \
                                     <span class="infoBubble_icon">' + point_icon + '\
                                     <h4>' + marker.pickupData.title + '</h4></span>' + misc;

                this._infoWindow.setContent(contentString);
                this._infoWindow.open(map, marker);
                $("#bodyContent").data("address", marker.pickupData);

            },
            insertSelectChoosenMarker: function (marker) {
                if (marker)
                    this.currentMarker = marker;

                this.settings.choose(this.currentMarker);
            },
            createMarkers: function (map, searchBox, markerTable, settings, isHome) {
                var _self = this;
                var getDirectinButton;
                var icn;
                if (isHome) {
                    if (this._homeMarker != null)
                        this._homeMarker.setMap(null);

                    var position = markerTable.getPlace();
                    markerTable =
                    {
                        "lat": position.geometry.location.lat(),
                        "lng": position.geometry.location.lng(),
                        "title": position.name,
                        "street": "",
                        "city": "",
                        "zip": "",
                        "search": true
                    };
                    icn = new google.maps.MarkerImage(server + '/api/icons/icon_34x44_pin_home_orange.png');
                }
                else {
                    icn = new google.maps.MarkerImage(server + '/api/icons/icon_32x38_pin_' + this.getPointTypeByData(markerTable) + '.png');
                }

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(markerTable.lat, markerTable.lng),
                    animation: settings.marker.animation,
                    map: map,
                    title: markerTable.title,
                    icon: icn,
                    pickupData: markerTable
                });

                if (isHome)
                    marker.setZIndex(99999);

                var markerPosition = marker.getPosition();
                marker.addListener("click", (e) => {
                    _self.markerClick(map, marker, markerPosition, e, settings);
                });
                _self._infoWindow.addListener("domready", () => {
                    var child = $('.gm-style-iw').children().first();
                    child.css('overflow', 'hidden');
                    ///find next child
                    child.children().first().css('overflow', 'hidden');
                });
                return marker;
            },
            //Extend displayMarkers function, full setup of marker
            createMarker: function (map, searchBox, markerTable, settings) {
                var getDirectinButton;
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(markerTable.lat, markerTable.lng),
                    animation: settings.marker.animation,
                    map: map,
                    title: markerTable.title,
                    icon: new google.maps.MarkerImage(settings.markersIcon)
                });
                var markerPosition = marker.getPosition();
                //if (settings.infoBubble.getDirectionsButton == true) {
                //    getDirectinButton = "<a address='" + markerTable.iid + "' class='ct-button--direction make-hidden' target='_blank'>" + settings.infoBubble.getDirectionsButtonName + "</a>";
                //    var a = $("#" + markerTable.iid);
                //    if (a.length == 0) {
                //        var o = $("<a class='pickUpsMarkers' />");
                //        o.attr("id", markerTable.iid);

                //        $("body").append(o);
                //        o.data("address", markerTable);
                //    }
                //}
                if (settings.infoBubble.visible == true) {
                    var infoBubble = new InfoBubble({
                        visible: settings.infoBubble.visible,
                        content: "<div class = 'ct-googleMap--InfoWindowBody' style='text-align: center;'>" +
                            "<span>" + markerTable.title + "</span>" +
                            "<span>" + markerTable.street + "</span>" +
                            "<span style='margin-bottom: 20px;'>" + markerTable.zip + " - " + markerTable.city + "</span>" +
                            getDirectinButton +
                            "</div>",
                        backgroundClassName: 'ct-googleMap--customInfoWindow',
                        padding: settings.infoBubble.padding,
                        borderRadius: settings.infoBubble.borderRadius,
                        borderWidth: settings.infoBubble.borderWidth,
                        borderColor: settings.infoBubble.borderColor,
                        backgroundColor: settings.infoBubble.backgroundColor,
                        shadowStyle: settings.infoBubble.shadowStyle,
                        minHeight: settings.infoBubble.minHeight,
                        maxHeight: settings.infoBubble.maxHeight,
                        minWidth: settings.infoBubble.minWidth,
                        maxWidth: settings.infoBubble.maxWidth,
                        arrowStyle: settings.infoBubble.arrowStyle,
                        arrowSize: settings.infoBubble.arrowSize,
                        arrowPosition: settings.infoBubble.arrowPosition,
                        hideCloseButton: settings.infoBubble.hideCloseButton,
                        closeSrc: settings.infoBubble.closeSrc,
                        offsetTop: settings.infoBubble.offsetTop,
                        offsetRight: settings.infoBubble.offsetRight,
                        disableAutoPan: settings.infoBubble.disableAutoPan
                    });

                    google.maps.event.addListener(marker, "click", function () {
                        if (openInfoWindow) {
                            openInfoWindow.close();
                        }
                        infoBubble.open(map, marker);
                        openInfoWindow = infoBubble;
                    });
                    //if (settings.infoBubble.getDirectionsButton == true) {
                    //    if (settings.infoBubble.directionsUseGeolocation == false && settings.sidebar.searchBox.visible == true && settings.sidebar.visible == true) {
                    //        var place, directionsLat, directionsLng;
                    //        var makeVis = false;
                    //        google.maps.event.addListener(searchBox, 'places_changed', function () {
                    //            place = searchBox.getPlace();
                    //            directionsLat = place.geometry.location.lat();
                    //            directionsLng = place.geometry.location.lng();
                    //            makeVis = true;
                    //        });
                    //    }

                    //    google.maps.event.addListener(infoBubble, "domready", function () {
                    //        var directionButton = $('a.ct-button--direction');
                    //        directionButton.removeClass('make-hidden');
                    //        directionButton.click(function () {
                    //            settings.choose($("#" + $(this).attr("address")).data("address"));
                    //        });
                    //    });
                    //}
                }
                marker.addEventListener("click", function (e) {
                    map.setCenter(markerPosition);

                });

                return marker;
            },
            insertSelectChoosenMarkerById: function (id) {
                this.insertSelectChoosenMarker($("#" + id).data("address"));
            },
            //Sidebar buttons of map markers
            createSidebarButtons: function (map, marker, element, settings, additionDesc, iid) {
                //Creates a sidebar button
                var _this = this;
                var ul = $(element).find('.ct-googleMap--results');
                var li = document.createElement("div");
                li.id = iid;
                li.className = "ct-googleMap--sidebarItem";
                google.maps.event.clearListeners(li, 'click');

                var addressList = $('.ct-googleMap--search').val().split(", ");

                /*if (listLength < 16 || addressList.length < 3)
                {*/

                var point_icon = '/api/icons/icon_18x18_' + this.getPointTypeByData(marker.pickupData) + '.png';
                li.innerHTML = (typeof (additionDesc) == 'string') ? "\
                    <span class='ct-googleMap--sidebarItemTitle'>\
                        <img class='pickup-row-icon lndscp' alt='' src='" + server + point_icon + "' height='18' width='18'><span class='l-name lndscp'>" + marker.getTitle() + "</span>" + additionDesc +
                    "<div class='pickup-btn-container'>\
                            <a address='" + iid + "' class='ct-button--direction ct-button--directionex pickup-btn-choose'>בחר\
                            </a>\
                            <a class='pickup-showinmap'>\
                                <img alt='' src='" + server + "/api/icons/icon_18x18_x3_map_white.png' width='18' height='18' style='float: right'>\
                                <span style='font-size: 12px; line-height: 10px; text-align: right;'>הצג<br>במפה\
                                </span>\
                            </a>\
                        </div></span>" : "<span class='ct-googleMap--sidebarItemTitle'>" + marker.getTitle() + "</span>";
                ul.append(li);
                $('.ct-googleMap--sidebarItem .pickup-btn-choose').unbind('click');
                $('.ct-googleMap--sidebarItem .pickup-btn-choose').click(function (e) {
                    e.preventDefault();
                    window.PickupsSDK.insertSelectChoosenMarkerById($(this).attr("address"));
                });
                //}
                //Trigger a click event to marker when the button is clicked.
                li.addEventListener("click", ($event) => {
                    const currentLi = $($event.target ?? $event.currentTarget).closest('.ct-googleMap--sidebarItem');
                    _this.currentMarker = $(currentLi).data("address");

                    google.maps.event.trigger(marker, "click");

                    _this._mapCanvas.setZoom(14);
                    _this._mapCanvas.setCenter(marker.getPosition());

                });

                return li;
            },
            createSidebarItems: function (map, markers, element, settings) {
                //console.time('createSidebarItems');

                var showDistance = (this._defaults || (this._searchBox && this._searchBox.getPlace().name != ''));
                //var distWithUnit = "";

                //distWithUnit = (dataMarkers[i].dist != null && (this._defaults || (this._searchBox && this._searchBox.getPlace().name != ''))) ? " (" + dataMarkers[i].dist + ' ק"מ' + ")." : "";

                //var li = constructor.createSidebarButtons(_self._mfapCanvas, marker, element, settings, "<small>" + dataMarkers[i].street + ", " + dataMarkers[i].city + distWithUnit + "</small>", dataMarkers[i].iid);
                //$(li).data("address", dataMarkers[i]);                        

                //Creates a sidebar button
                var _this = this;
                var ul = $(element).find('.ct-googleMap--results');
                for (var i = 0; i < markers.length; i++) {
                    var marker = markers[i];
                    var additionDesc = "<small><label></label>" + marker.pickupData.street + ", " + marker.pickupData.city + "</small>";
                    if (showDistance && marker.pickupData.dist != null) {
                        additionDesc += " (" + marker.pickupData.dist + ' ק"מ' + ").";
                    }
                    var li = document.createElement("div");
                    li.id = marker.pickupData.iid;
                    li.className = "ct-googleMap--sidebarItem";
                    google.maps.event.clearListeners(li, 'click');

                    var point_icon = '/api/icons/icon_18x18_' + this.getPointTypeByData(marker.pickupData) + '.png';
                    li.innerHTML = (typeof (additionDesc) == 'string') ? "\
                    <span class='ct-googleMap--sidebarItemTitle'>\
                        <img class='pickup-row-icon lndscp' alt='' src='" + server + point_icon + "' height='18' width='18'><span class='l-name lndscp'>" + marker.getTitle() + additionDesc + "</span>" +
                        "<div class='pickup-btn-container'>\
                            <a address='" + marker.pickupData.iid + "' class='ct-button--direction ct-button--directionex pickup-btn-choose'>בחר\
                            </a>\
                            <a class='pickup-showinmap'>\
                                <img alt='' src='" + server + "/api/icons/icon_18x18_x3_map_white.png' width='18' height='18' style='float: right'>\
                                <span style='font-size: 12px; line-height: 10px; text-align: right;'>הצג<br>במפה\
                                </span>\
                            </a>\
                        </div></span>" : "<span class='ct-googleMap--sidebarItemTitle'>" + marker.getTitle() + "</span>";
                    ul.append(li);

                    //Trigger a click event to marker when the button is clicked.
                    li.addEventListener("click", ($event) => {
                        const currentLi = $($event.target ?? $event.currentTarget).closest('.ct-googleMap--sidebarItem');
                        _this.currentMarker = currentLi.data("address");
                        var marker = _this._markers.find(function (e) {
                            return e.pickupData.iid === _this.currentMarker.iid;
                        });
                        google.maps.event.trigger(marker, "click");

                        _this._mapCanvas.setZoom(14);
                        _this._mapCanvas.setCenter(marker.getPosition());

                    });

                    $(li).data("address", marker.pickupData);
                }
                $('.ct-googleMap--sidebarItem .pickup-btn-choose').unbind('click');
                $('.ct-googleMap--sidebarItem .pickup-btn-choose').click(function (e) {
                    e.preventDefault();
                    window.PickupsSDK.insertSelectChoosenMarkerById($(this).attr("address"));
                });
                //console.timeEnd('createSidebarItems');
            },
            //Google map search function.
            searchPlace: function (constructor, searchBox, map, markerTable, element, settings) {
                var locations = [];

                var marker;
                // Listen for the event fired when the user selects an item from the
                // pick list. Retrieve the matching places for that item.

                google.maps.event.addListener(searchBox, 'place_changed', function (e) {

                    sidebarItem = $(element).find('.ct-googleMap--sidebarItem');
                    sidebarItem.remove();

                    var place = searchBox.getPlace();
                    var searchLocationPosition = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
                    if (settings.sidebar.searchBox.search == true) {

                        var r = $(this.element).find('.ct-googleMap--results');
                        r.addClass("ct-googleMap--results-loader");
                        var options = {
                            lat: searchLocationPosition.lat(),
                            lng: searchLocationPosition.lng()
                        };
                        if (this._service == 'drops') {
                            options.types = '4';
                        }
                        $.post(server + "/Home/PostFreeText",
                            options,
                            function (data, status) {


                                var result = JSON.parse(data);
                                for (var i = 0; i < result.Points.length; i++) {
                                    //this.displaySearchResults()
                                    var ul = $(element).find('.ct-googleMap--results');
                                    var li = document.createElement("div");
                                    markerTable.title = result.Points[i].LocationDescription;
                                    li.className = "ct-googleMap--sidebarItem";
                                    google.maps.event.clearListeners(li, 'click');

                                    li.innerHTML = "<span class='ct-googleMap--sidebarItemTitle'>" + result.Points[i].CityName + " " + result.Points[i].LocationDescription + "</span>";
                                    ul.append(li);
                                }
                                r.removeClass("ct-googleMap--results-loader");
                            }

                        )
                    }

                    map.setCenter(place.geometry.location);

                    if (place.length == 0)
                        return;

                    var lat = place.geometry.location.lat();
                    var lng = place.geometry.location.lng();

                    map.setZoom(14);
                });
            },
            //This function makes all pages of results with pagination, extends displaySearchResults function.
            resultsInPage: function (constructor, element, settings) {
                var pageSize = settings.sidebar.results.pageSize;
                var currentPage = settings.sidebar.results.currentPage;
                var pageCounter = 1;
                var sidebarResults = $(element).find('.ct-googleMap--results');
                var pageNav = "<ul class='Navigation'>";
                var pageNavPages = "<li class='paginationCounter' style='overflow: hidden; height: 32px; padding-top: 5px; direction: ltr'>";

                constructor.sidebarClear(pageCounter, element);

                if (settings.paginationStyle != 1) {
                    pageNavPages += "</li>";
                } else {
                    pageNavPages += "<a rel='1' class='NavPage' style='display: inline-block; width: 26px; height: 26px; font-size: 17px; padding: 0 0'>" + 1 + "</a>";
                }

                sidebarResults.children().each(function (i) {
                    var className = 'ct-googleMap--sidebarItem ';
                    if (i < pageCounter * pageSize && i >= (pageCounter - 1) * pageSize) {
                        className += "page" + pageCounter;
                    }
                    else {
                        className += "page" + (pageCounter + 1);
                        if (settings.paginationStyle == 1) {
                            pageNavPages += "<a rel='" + (pageCounter + 1) + "' class='NavPage' style='display: inline-block; width: 26px; height: 26px; font-size: 17px; padding: 0 0'>" + (pageCounter + 1) + "</a>";
                            //pageNavPages += "";
                        }
                        pageCounter++;
                    }
                    $(this).attr("class", className);
                });
                if (settings.paginationStyle == 1) {
                    pageNavPages += "</li>";
                }

                // show/hide the appropriate regions
                sidebarResults.children().hide();
                sidebarResults.children(".page" + currentPage).show();

                if (pageCounter <= 1) {
                    return;
                }

                //Build pager navigation

                var i = 1;

                pageNav += "<li class='NavigationPrev NavigationDisable Navigation" + (i + 1) + "'><a rel='" + (i + 1) + "'>" + "</a></li>";
                pageNav += pageNavPages;
                pageNav += "<li class='NavigationNext Navigation" + i + "'><a rel='" + i + "' >" + "</a></li>";
                pageNav += "</ul>";

                $('#pickups_body').find('.ct-googleMap--sidebar').append(pageNav);

                constructor.pagination(constructor, sidebarResults, pageCounter, pageSize, currentPage, element, settings);
            },
            //Create pagination, extends resultsInPage function
            pagination: function (constructor, sidebarResults, pageCounter, pageSize, currentPage, element, settings) {

                var context = this;
                var i = 1;
                var k = 1;
                var goToPage;
                var paginationCounter = 1;
                var paginationCounterElement = $(element).find('.paginationCounter');
                var NavigationPrev = $(element).find('.NavigationPrev');
                var NavigationNext = $(element).find('.NavigationNext');

                if (settings.paginationStyle == 2) {
                    constructor.counterElements(sidebarResults, paginationCounterElement, pageCounter, pageSize, currentPage, element);
                }

                if (settings.paginationStyle == 1) {
                    paginationCounterElement.children().each(function (i) {
                        if (i < paginationCounter * settings.sidebar.results.paginationItems && i >= (paginationCounter - 1) * settings.sidebar.results.paginationItems) {
                            $(this).addClass("paginationPage" + paginationCounter);
                        } else {
                            $(this).addClass("paginationPage" + (paginationCounter + 1));
                            paginationCounter = paginationCounter + 1;
                        }
                    });
                    paginationCounterElement.children().hide();
                    paginationCounterElement.children(".paginationPage" + currentPage).show();
                    $(element).find(".NavPage[rel='" + currentPage + "']").addClass('active');

                    $(element).find('.NavPage').on("click", function () {
                        var whatPage = $(this).attr('rel');
                        $(this).addClass('active').siblings().removeClass('active');
                        goToPage = true;
                        if (whatPage < i) {
                            i = whatPage;
                            NavigationPrev.trigger("click");
                        } else {
                            i = whatPage;
                            NavigationNext.trigger("click");
                        }
                    });
                }

                $(element).find('.NavigationPrev').on("click", function () {

                    if (goToPage == true) {
                        sidebarResults.children().hide();
                        sidebarResults.find(".page" + i).show();
                        if (i == 1) {
                            $(this).addClass('NavigationDisable');
                        }
                        NavigationNext.removeClass('NavigationDisable');
                        goToPage = false
                    } else {
                        if (i == 1) {
                            i = 1;
                            sidebarResults.children().hide();
                            sidebarResults.find(".page" + i).show();
                        } else {
                            if (i == 2) {
                                $(this).addClass('NavigationDisable');
                            }
                            NavigationNext.removeClass('NavigationDisable');
                            i = i - 1;
                            sidebarResults.children().hide();
                            sidebarResults.find(".page" + i).show();
                        }
                        if (settings.paginationStyle != 1) {
                            paginationCounterElement.children().hide();
                            paginationCounterElement.children(".paginationCount" + i).show();
                        } else {
                            if (i < k * settings.sidebar.results.paginationItems && i == (k - 1) * settings.sidebar.results.paginationItems) {
                                k = k - 1;
                                paginationCounterElement.children().hide();
                                paginationCounterElement.children(".paginationPage" + k).show();
                            } else {
                                if (i < k * settings.sidebar.results.paginationItems && i >= (k - 1) * settings.sidebar.results.paginationItems) {
                                    paginationCounterElement.children().hide();
                                    paginationCounterElement.children(".paginationPage" + k).show();
                                } else {
                                    k = k - 1;
                                    paginationCounterElement.children().hide();
                                    paginationCounterElement.children(".paginationPage" + k).show();
                                }
                            }
                            $(element).find(".NavPage[rel='" + i + "']").addClass('active').siblings().removeClass('active');
                        }
                    }
                    //context.updateDistance(false);
                });
                $(element).find('.NavigationNext').on("click", function () {

                    ($('.page' + i).each(function () { $(this).addClass("sideBarVisible"); }));

                    if (goToPage == true) {
                        sidebarResults.children().hide();
                        sidebarResults.find(".page" + i).show();
                        if (i == pageCounter) {
                            $(this).addClass('NavigationDisable');
                        }
                        NavigationPrev.removeClass('NavigationDisable');
                        goToPage = false
                    } else {
                        if (i == pageCounter) {
                            i = pageCounter;
                            sidebarResults.children().hide();
                            sidebarResults.find(".page" + i).show();
                        }
                        else {
                            if (i == pageCounter - 1) {
                                $(this).addClass('NavigationDisable');
                            }
                            NavigationPrev.removeClass('NavigationDisable');
                            i = parseInt((i), 10) + 1;
                            sidebarResults.children().hide();
                            sidebarResults.find(".page" + i).show();
                        }
                        if (settings.paginationStyle != 1) {
                            paginationCounterElement.children().hide();
                            paginationCounterElement.children(".paginationCount" + i).show();
                        } else {
                            if (i < k * settings.sidebar.results.paginationItems && i >= (k - 1) * settings.sidebar.results.paginationItems || i == k * settings.sidebar.results.paginationItems) {
                                paginationCounterElement.children().hide();
                                paginationCounterElement.children(".paginationPage" + k).show();
                            } else {
                                k++;
                                paginationCounterElement.children().hide();
                                paginationCounterElement.children(".paginationPage" + k).show();
                            }
                            $(element).find(".NavPage[rel='" + i + "']").addClass('active').siblings().removeClass('active');
                        }
                    }
                    //context.updateDistance(false);
                });


            },
            //Count how much items is found, extends pagination function
            counterElements: function (sidebarResults, paginationCounterElement, pageCounter, pageSize, currentPage, element) {
                var tableResults = [];

                for (var j = 0; pageCounter > j; j++) {
                    tableResults.push($(element).find('.page' + (1 + j)).length);
                    if (tableResults[j] > 1) {
                        paginationCounterElement.append("<span class='paginationCount" + (j + 1) + "'>" + (1 + j * pageSize) + " - " + (tableResults[j] + j * pageSize) + " of " + sidebarResults.children().length + "</span>");
                    }
                    else {
                        paginationCounterElement.append("<span class='paginationCount" + (j + 1) + "'>" + (tableResults[j] + j * pageSize) + " of " + sidebarResults.children().length + "</span>");
                    }
                }
                paginationCounterElement.children().hide();
                $(element).find(".paginationCount" + currentPage).show();
            },
            //Create select with multiple json files
            createSelectSection: function (element, settings) {

                var difFiles = settings.sidebar.selectSection.difFiles;
                var sidebarSelect = $(element).find('.ct-googleMap--select');
                for (var k = 0; difFiles.length > k; k++) {
                    var outP = "<option value='" + difFiles[k][1] + "'>" + difFiles[k][0] + "</option>";
                    sidebarSelect.append(outP);
                }
            },
            sidebarClear: function (pageCounter, element) {
                $(element).find('.Navigation').remove();
                pageCounter = 1;
            }
        });

        // A really lightweight plugin wrapper around the constructor,
        // preventing against multiple instantiations
        $.fn[pluginName] = function (options) {
            return this.each(function () {
                if (!$.data(this, "plugin_" + pluginName)) {
                    var plugin = new Plugin(this, options);
                    $.data(this, "plugin_" + pluginName, plugin);
                    this.addon = function () {
                        return plugin;
                    }
                }
            });
        };

        $(
            function () {
                window.PickupsSDK = new Plugin(this,
                    {
                        "pluginStyle": "cosmic",
                        "paginationStyle": 1,
                        "infoBubble":
                        {
                            "visible": true,
                            "arrowPosition": 50,
                            "minHeight": 112,
                            "maxHeight": null,
                            "minWidth": 170,
                            "maxWidth": 250
                        },
                        "markersIcon": server + "/Content/assets/plugins/shoplocator/cosmic/images/marker.png",
                        "map":
                        {
                            "zoom": 10,
                            "allMarkersInViewport": true,
                            "center": [31.9887374, 34.9010247]
                        },
                        "cluster":
                        {
                            "enable": true,
                            "gridSize": 50,
                            "style":
                            {
                                "textColor": "#4757a3",
                                "textSize": 18,
                                "heightSM": 42,
                                "widthSM": 42,
                                "heightMD": 56,
                                "widthMD": 56,
                                "heightBIG": 75,
                                "widthBIG": 75,
                                "iconSmall": server + "/Content/assets/plugins/shoplocator/cosmic/images/clusterSmall.png",
                                "iconMedium": server + "/Content/assets/plugins/shoplocator/cosmic/images/clusterMedium.png",
                                "iconBig": server + "/Content/assets/plugins/shoplocator/cosmic/images/clusterBig.png"
                            }
                        },
                        "sidebar":
                        {
                            "visible": true,
                            "selectSection":
                            {
                                "visible": true,
                                "difFiles": []
                            },
                            "searchBox":
                            {
                                "visible": true,
                                "search": false,
                                "searchByCountry": [false, "il"],
                                "placeHolder": "נא הזן כתובת"
                            },
                            "results": { "pageSize": 8 }
                        }
                    });
                setTimeout(function () { window.PickupsSDK.init(service); }, 100);
            }
        );
    }
})(window, document);
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
}
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}