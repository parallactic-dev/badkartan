<script>
import OverviewMap from './components/OverviewMap.vue';

export default {
    name: "app",
    components: {
        OverviewMap
    }
};
</script>

<template>
    <div id="app">
        <OverviewMap />
    </div>
</template>

<style lang="scss">
@import './styles/fonts';
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
body {
    margin: 0;
    font-family: Inter, Arial, Helvetica, sans-serif;
}
</style>
