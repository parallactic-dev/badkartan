<script>
export default {
    name: 'Comments',
    props:{
        commentsHtml: String,
    }
};
</script>

<template>
    <ul class="comments" v-html="commentsHtml"></ul>
</template>

<style lang="scss">
.comments {
    padding: 1rem 0;
    margin: 3rem 0 0;
    border-top: .0625rem solid #888;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 200;
}
.comments > li {
    display: block;
    margin: 0 0 3rem;
}
.comments > li:last-child {
    display: none;
}

.comments > li .user {
    margin-bottom: 1rem;
}
.comments > li .user a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #333;
    font-size: 1.25rem;
    line-height: 1.1;

}
.comments > li .user img {
    width: 3rem;
    margin-right: 1rem;
    border-radius: 50%;
}
.comments > li .user .name {
    text-decoration: none;
}

.comments > li .comment {
    padding-left: 4rem;
}
.comments > li .comment .user_number_reviews,
.comments > li .comment p .grade,
.comments > li .comment p .grade + img,
.comments > li .comment .meta .alarm {
    display: none;
}
</style>
