<script>
import Axios from 'axios';
export default {
    name: 'MarkerDetail',
    props: {
        data: Object,
    },
    data() {
        return {
            markerDescription: null,
            markerComments: null,
        }
    },
    mounted() {
        Axios
            .get('https://cors-anywhere.herokuapp.com/https://www.badkartan.se' + this.data.point_link)
            .then((data) => {
                let site = document.createElement('html');
                site.innerHTML = data.data;
                
                const markerDescription = site.getElementsByClassName('description_text');
                if (markerDescription.length > 0)
                    this.markerDescription = markerDescription[0].innerHTML;

                const markerComments = site.getElementsByClassName('commentlist');
                if (markerComments.length > 0)
                    this.markerComments = markerComments[0].innerHTML;
            })
    },
    methods: {
        onClose() {
            this.$emit('closeMarkerDetail');
        }
    },
    computed: {
        rating() {
            return this.data.point_grade ? parseInt(this.data.point_grade) * 0.0625 : -1;
        },
        ratingInt() {
            return Math.floor(this.rating);
        },
        votes() {
            return this.data.point_grades ? this.data.point_grades.split(' ')[0] : -1;
        }
    }
};
</script>

<template>
    <article class="marker-detail">
        <button class="marker-detail__close-btn" v-on:click="onClose()"></button>
        <div class="marker-detail__img-container" v-bind:style="{backgroundImage: 'url('+ data.point_pic +')'}"></div>
        <div class="marker-detail__content">
            <h1 class="marker-detail__title">{{ data.point_message }}</h1>
            <p class="marker-detail__rating">
                <span class="marker-detail__rating__container" v-if="votes > -1">
                    <ul class="marker-detail__rating__stars">
                        <li 
                            class="marker-detail__rating__star"
                            v-for="index in ratingInt"
                            v-bind:key="index">
                        </li>
                    </ul>
                    {{ rating }} ({{ votes }})
                </span>
                <span class="marker-detail__rating-none" v-if="votes === -1">No ratings yet</span>
            </p>

            <p class="marker-detail__description">
                {{ markerDescription }}
            </p>

            <ul class="marker-detail__comments" v-html="markerComments"></ul>
        </div>
    </article>
</template>

<style scoped>
.marker-detail {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    box-sizing: border-box;
    background: rgba(255, 255, 255, .95);
    overflow-y: auto;
}
.marker-detail__content {
    padding: 1.5rem;
}

.marker-detail__img-container {
    width: 100%; height: 33vh;
    background-position: center;
    background-size: cover;
    background-color: #333;
}

.marker-detail__close-btn {
    position: fixed;
    display: block;
    top: 1.5rem; right: 1.5rem;
    width: 2rem; height: 2rem;
    padding: 0;
    border: 0;
    outline: 0;
    background: rgba(0, 0, 0, .25);
}
.marker-detail__close-btn:before, .marker-detail__close-btn:after {
  position: absolute;
  top: 0;
  left: 1rem;
  content: ' ';
  height: 2rem;
  width: 2px;
  background-color: #FFF;
}
.marker-detail__close-btn:before {
  transform: rotate(45deg);
}
.marker-detail__close-btn:after {
  transform: rotate(-45deg);
}

.marker-detail__rating__stars {
    display: flex;
    padding: 0;
    margin: .5rem -.25rem;
}
.marker-detail__rating__star {
    display: block;
    width: 1rem; height: 1rem;
    background-color: gold;
    margin: .25rem;
}
</style>
