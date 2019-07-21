<script>
import axios from "axios";
import { gmapApi } from 'vue2-google-maps';
import { xmlToJson, debounce } from '../helpers';
import MarkerDetail from './MarkerDetail.vue';

export default {
    name: "OverviewMap",
    components: {
        MarkerDetail,
    },
    data() {
        return {
            markers: [],
            currentMarker: null,
        }
    },
    mounted() {
        // add event listener for boundaries change and reload data
        this.$refs.mapRef.$mapPromise.then((map) => {
            this.google.maps.event.addListener(map, 'bounds_changed', debounce(() => { 
                    this.loadMarkers(map.getCenter(), map.getBounds());
                 }, 750)
            );
        })
    },
    methods: {
        loadMarkers(center, bounds) {
            const centerString = center.lat() + ',' + center.lng();
            const southwestString = bounds.na.j + ',' + bounds.ga.j;
            axios
                .get(
                    "https://cors-anywhere.herokuapp.com/https://www.badkartan.se/ajax.php?action=manually_load_venues&center=(" + centerString + ")&southwest=(" + southwestString + ")"
                )
                .then(this.onDataLoaded)
                .catch(this.onError);
        },
        onDataLoaded(data) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data.data,"text/xml");
            const parsedData = xmlToJson(xmlDoc);

            if (parsedData.markers && parsedData.markers.marker)
                this.markers = parsedData.markers.marker;
        },
        onError(err, data) {
            console.error(err, data);
        },
        onMarkerClick(marker) {
            console.log(marker);
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
            :center="{ lng: 17.888630429291638, lat: 59.04801589884758 }"
            :zoom="8"
            map-type-id="terrain"
            style="width: 100%; height: 100%"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="google && new google.maps.LatLng(m.attributes.lat, m.attributes.long)"
                :clickable="true"
                :draggable="false"
                @click="onMarkerClick(m)"
            />
        </GmapMap>
        <MarkerDetail 
            v-if="currentMarker" 
            v-bind:data="currentMarker.attributes"
            v-on:closeMarkerDetail="onCloseMarkerDetail()">
        </MarkerDetail>
    </div>
</template>

<style scoped>
.map {
    width: 100vw;
    height: 100vh;
}
</style>
