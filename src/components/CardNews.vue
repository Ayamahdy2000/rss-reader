<template>
     <div class="w-100 card">
            <b-img fluid :src="item.enclosure.link" class="card__img"></b-img>
            <div class="card__content">
              <h4 class="card__card-heading">{{ item.title }}</h4>
              <p v-if="item && item.pubDate" class="card__card-date">
                {{ $moment(item.pubDate).format("DD/MM/YYYY") }}
              </p>
            </div>
          </div>
</template>
<script>
export default {
    props:["item"]
}
</script>