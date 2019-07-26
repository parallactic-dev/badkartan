<script>
import { setTimeout } from 'timers';
export default {
    name: "InstallNotice",
    data() {
        return {
            isStandAlone: true,
            isChrome: false,
            isSafari: false,
        }
    },
    mounted() {
        this.determinBrowser();
        setTimeout(() => {
            this.isStandAlone = this.checkIfStandAlone();
        }, 2000)
        console.log(this.isChrome)
    },
    methods: {
        checkIfStandAlone() {
            return window.matchMedia("(display-mode: standalone)").matches;
        },
        determinBrowser() {
            this.userAgent = navigator.userAgent.toLowerCase();
            const uaString = this.userAgent;

            this.isChrome = /chrome/.test(uaString);
            this.isSafari = /safari/.test(uaString);

            if ((this.isChrome) && (this.isSafari)) { this.isSafari = false; }
        }
    }
};
</script>

<template>
    <article class="install-notice" v-if="!isStandAlone && isSafari">
        <h1 class="install-notice__title">Add a shortcut to your home screen</h1>
        <button class="install-notice__close-btn" v-on:click="onClose()"></button>
        <ol class="install-notice__instructions">
            <li class="install-notice__instruction">
                Tab the share button
                <img
                    class="nudgeImage"
                    height="22"
                    alt="Share Button Image"
                    src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy5
3My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMC44OCAyNy4yNSI+PGRlZnM+PHN0eWxlPi
5jbHMtMXtmaWxsOm5vbmU7c3Ryb2tlOiMyMzFmMjA7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZT5TY
WZhcmlfU2hhcmU8L3RpdGxlPjxwb2x5bGluZSBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTMuMTMg
OCAyMC4zOCA4IDIwLjM4IDI2Ljc1IDAuNSAyNi43NSAwLjUgOCA3LjUgOCIvPjxsaW5lIGNsYXN
zPSJjbHMtMSIgeDE9IjEwLjQ0IiB5MT0iMTciIHgyPSIxMC40NCIvPjxsaW5lIGNsYXNzPSJjbH
MtMSIgeDE9IjEwLjQ4IiB5MT0iMC4zOCIgeDI9IjE1LjI4IiB5Mj0iNS4xOCIvPjxsaW5lIGNsY
XNzPSJjbHMtMSIgeDE9IjEwLjQ0IiB5MT0iMC4zOCIgeDI9IjUuNjQiIHkyPSI1LjE4Ii8+PC9z
dmc+"
                />
                at the bottom of the browser
            </li>
            <li class="install-notice__instruction">
                Tab «Add to Home Screen» button
                <img
                    class="nudgeImage"
                    height="22"
                    alt="Add to Home Screen button Image"
                    src="data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy5
3My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzNSAzNSI+PHRpdGxlPlNhZmFyaV9BMkhTPC
90aXRsZT48cmVjdCB3aWR0aD0iMzUiIGhlaWdodD0iMzUiIHJ4PSI4IiByeT0iOCIgc3R5bGU9I
mZpbGw6IzhmOGY4ZiIvPjxsaW5lIHgxPSIyNC43NSIgeTE9IjE3LjUiIHgyPSIxMC4yNSIgeTI9
IjE3LjUiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjJweCIvPjx
saW5lIHgxPSIxNy41IiB5MT0iMTAuMjUiIHgyPSIxNy41IiB5Mj0iMjQuNzUiIHN0eWxlPSJmaW
xsOm5vbmU7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjJweCIvPjwvc3ZnPg=="
                />
            </li>
        </ol>
    </article>
</template>

<style lang="scss" scoped>
@import "../styles/common";

.install-notice {
    position: fixed;
    bottom: 0;
    left: 0;
    width: calc(100% - 1rem);
    box-sizing: border-box;
    margin: 0.5rem;
    padding: 1rem;
    background: #fff;
}
.install-notice__title {
    margin: 0 0 1rem;
    padding-right: 4rem;
    font-size: 1.3rem;
    font-weight: 300;
}
.install-notice__instructions {
    margin: 0;
    padding: 0 0 0 1rem;
}
.install-notice__close-btn {
    @extend .close-btn;
    top: 0.8rem;
    right: 0.8rem;
}
</style>
