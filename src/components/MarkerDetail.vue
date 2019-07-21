<script>
export default {
    name: 'MarkerDetail',
    props: {
        data: Object,
    },
    methods: {
        onClose() {
            console.log('sdfsdf')
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
                <ul class="marker-detail__rating__stars">
                    <li 
                        class="marker-detail__rating__star"
                        v-for="index in ratingInt"
                        v-bind:key="index">
                    </li>
                </ul>
                {{ rating }} ({{ votes }})</p>
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
    position: absolute;
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
