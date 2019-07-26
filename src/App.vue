<script>
import OverviewMap from './components/OverviewMap';
import InstallNotice from './components/InstallNotice';

export default {
    name: "app",
    components: {
        OverviewMap,
        InstallNotice
    }
};
</script>

<template>
    <div id="app">
        <OverviewMap />
        <InstallNotice />
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
