<script>
import axios from "axios";
import { gmapApi } from "vue2-google-maps";
import { xmlToJson, debounce } from "../helpers";
import MarkerDetail from "./MarkerDetail.vue";
import LoadIndicator from "./LoadIndicator";

export default {
    name: "OverviewMap",
    components: {
        MarkerDetail,
        LoadIndicator
    },
    data() {
        return {
            markers: [],
            currentMarker: null,
            isLoading: false,
            mapStyle: [
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
                    "stylers": [
                        {
                            "color": "#dedede"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
                    "stylers": [
                        {
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
            ],
        };
    },
    mounted() {
        // add event listener for boundaries change and reload data
        this.$refs.mapRef.$mapPromise.then(map => {
            // bounds event listener
            this.google.maps.event.addListener(
                map,
                "bounds_changed",
                debounce(() => {
                    this.loadMarkers(map.getCenter(), map.getBounds());
                }, 1000)
            );
        });
    },
    methods: {
        loadMarkers(center, bounds) {
            const centerString = center.lat() + "," + center.lng();
            const southwestString = bounds.getSouthWest().lat() + "," + bounds.getSouthWest().lng();

            this.isLoading = true;

            axios
                .get(
                    process.env.VUE_APP_API_URL +
                        "https://www.badkartan.se/ajax.php?action=manually_load_venues&center=(" +
                        centerString +
                        ")&southwest=(" +
                        southwestString +
                        ")"
                )
                .then(this.onDataLoaded)
                .catch(this.onError);
        },
        onDataLoaded(data) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.data.data, "text/xml");
            const parsedData = xmlToJson(xmlDoc);

            if (parsedData.markers && parsedData.markers.marker)
                this.markers = parsedData.markers.marker;

            this.isLoading = false;
        },
        onError(err, data) {
            this.isLoading = false;
            console.error(err, data);
        },
        onMarkerClick(marker) {
            this.currentMarker = marker;
        },
        onCloseMarkerDetail() {
            this.currentMarker = null;
        }
    },
    computed: {
        google: gmapApi
    }
};
</script>

<template>
    <div class="map">
        <GmapMap
            ref="mapRef"
            v-bind:center="{ lng: 17.888630429291638, lat: 59.04801589884758 }"
            v-bind:zoom="8"
            v-bind:options="{
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                styles: mapStyle,
            }"
            map-type-id="roadmap"
            style="width: 100%; height: 100%"
        >
            <GmapMarker
                v-for="m in markers"
                v-bind:key="m.attributes.lat + ':' + m.attributes.long"
                v-bind:position="google && new google.maps.LatLng(m.attributes.lat, m.attributes.long)"
                v-bind:clickable="true"
                v-bind:draggable="false"
                v-on:click="onMarkerClick(m)"
            />
        </GmapMap>
        <MarkerDetail
            v-if="currentMarker"
            v-bind:data="currentMarker.attributes"
            v-on:closeMarkerDetail="onCloseMarkerDetail()"
        ></MarkerDetail>
        <div class="map__load-indicator" v-if="isLoading">
            <LoadIndicator />
        </div>
    </div>
</template>

<style scoped>
.map {
    width: 100vw;
    height: 100vh;
}
.map__load-indicator {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.5rem 0;
    background: #fff;
    text-align: center;
}
</style>
