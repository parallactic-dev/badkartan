<script>
import Axios from 'axios';
import Comments from './Comments.vue';
import LoadIndicator from './LoadIndicator';

export default {
    name: 'MarkerDetail',
    components: {
        Comments,
        LoadIndicator,
    },
    props: {
        data: Object,
    },
    data() {
        return {
            markerDescription: null,
            markerComments: null,
            isLoading: true,
        }
    },
    mounted() {
        Axios
            .get(process.env.VUE_APP_API_URL + 'https://www.badkartan.se' + this.data.point_link)
            .then((data) => {
                let site = document.createElement('html');
                site.innerHTML = data.data;
                
                const markerDescription = site.getElementsByClassName('description_text');
                if (markerDescription.length > 0)
                    this.markerDescription = markerDescription[0].innerHTML;

                const markerComments = site.getElementsByClassName('commentlist');
                if (markerComments.length > 0)
                    this.markerComments = markerComments[0].innerHTML;

                this.isLoading = false;
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
                    {{ rating }} ({{ votes }} votes)
                </span>
                <span class="marker-detail__rating-none" v-if="votes === -1">No ratings yet</span>
            </p>

            <span v-if="!isLoading">
                <p class="marker-detail__description">
                    {{ markerDescription }}
                </p>
                <Comments v-bind:commentsHtml="markerComments" />
            </span>
            <LoadIndicator v-if="isLoading" />
        </div>
    </article>
</template>

<style scoped>
.marker-detail {
    position: fixed;
    top: 0; left: 0;
    width: calc(100vw - 1rem); height: calc(100vh - 1rem);
    margin: .5rem;
    border-radius: .75rem;
    box-sizing: border-box;
    background: rgba(255, 255, 255, .95);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
.marker-detail__content {
    padding: 1.5rem;
}
.marker-detail__title {
    font-weight: 200;
    font-size: 2rem;
    margin: 1.5rem 0 0;
}

.marker-detail__img-container {
    width: 100%; height: 28vh;
    background-position: center;
    background-size: cover;
    background-color: #888;
}

.marker-detail__close-btn {
    position: fixed;
    display: block;
    top: 1.5rem; right: 1.5rem;
    width: 2.2rem; height: 2.2rem;
    padding: 0;
    border: 0;
    outline: 0;
    background: rgba(255, 255, 255, .5);
    border-radius: 50%;
}
.marker-detail__close-btn:before, .marker-detail__close-btn:after {
  position: absolute;
  top: .2rem;
  left: 1.1rem;
  content: ' ';
  height: 1.75rem;
  width: .0625rem;
  background-color: #888;
}
.marker-detail__close-btn:before {
  transform: rotate(45deg);
}
.marker-detail__close-btn:after {
  transform: rotate(-45deg);
}

.marker-detail__rating {
    margin: 1.5rem 0;
    border-top: .0625rem solid #888;
    border-bottom: .0625rem solid #888;
}
.marker-detail__rating__container {
    display: flex;
    align-items: center;
}
.marker-detail__rating__stars,
.marker-detail__rating-none {
    display: flex;
    padding: 0;
    margin: .5rem .5rem .5rem -.1rem;
}
.marker-detail__rating__star {
    display: block;
    width: 1.7rem; height: 1.8rem;
    background: no-repeat url(~@/assets/icons/star.svg) center;
    background-size: contain;
    margin: .1rem;
}

.marker-detail__description {
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 200;
}
</style>
