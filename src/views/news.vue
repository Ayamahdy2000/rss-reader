<template>
  <div class="news">
    <b-container>
      <h2 class="news__heading">
      <span class="news__heading-firstWord" id="firstWord"></span>
      <span id="secondWord"></span>
      </h2>

      <b-row class="gx-2">
        <b-col
          :lg="index === 0 || index === toBeShown.length - 1 ? '8' : '4'"
          :md="index === 0 ? '12' : '6'"
          :sm="index === 0 || index === toBeShown.length - 1 ? '12' : '6'"
          class="mb-2"
          v-for="(item, index) in toBeShown"
          :key="index"
        >
          <div class="w-100 card">
            <b-img fluid :src="item.enclosure.link" class="card__img"></b-img>
            <div class="card__content">
              <h4 class="card__card-heading">{{ item.title }}</h4>
              <p v-if="item && item.pubDate" class="card__card-date">
                {{ $moment(item.pubDate).format("DD/MM/YYYY") }}
              </p>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <button @click="nextPage" class="news__btn">View More</button>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      articles: [],
      news: {},
      currentPage: 1,
    };
  },
  mounted() {
    this.getArticles();
  },
  computed: {
    toBeShown() {
      return this.articles.slice(0, this.currentPage * 7);
    },
    totalPages() {
      return Math.ceil(this.articles.length / 7);
    },
  },
  methods: {
    getArticles() {
      const loading = this.$vs.loading({
        type: "points",
        color: "#ffe400",
      });
      axios
        .get(
          "https://api.rss2json.com/v1/api.json?rss_url=http://rss.cnn.com/rss/edition.rss"
        )
        .then((res) => {
          this.articles = res.data.items;
          this.news = res.data.feed;
          let length = res.data.feed.title.length;
          let firstWord = res.data.feed.title.substring(0, 3);
          let secondWord = res.data.feed.title.substring(3, length);
          console.log(firstWord);
          console.log(secondWord);
          document.getElementById("firstWord").innerHTML = firstWord
          document.getElementById("secondWord").innerHTML = secondWord
        })
        .finally(() => loading.close());
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>