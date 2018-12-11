<template>
  <div class="section">
    <div class="card is-clearfix columns">
        <figure class="card-image is-480x480 column is-one-thirds">
          <img src="https://bulma.io/images/placeholders/480x480.png">
        </figure>
        <div class="card-content column is-two-thirds">
          <h2 class="title is-2">{{ product.title }}</h2>
          <p>
            {{ product.description }}
          </p>
          <p><strong>Category: </strong>{{ product.category_name }}</p>
          <p><strong>Merchant: </strong>{{ product.merchant_name }}</p>

          <div>
            <span class="title is-3"><strong>${{ product.price }} ea.</strong></span>
          </div>
          <div class="select is-rounded is-small">
            <select @change="onSelectQuantity(product.id)" v-model="selected">
              <option v-for="quantity in quantityArray" :value="quantity">{{ quantity }}</option>
            </select>
          </div>
          <div class="is-pulled-right">
            <button class="button is-primary" v-if="!isAddedBtn" @click="addToCart(product.id)">{{ addToCartLabel }}</button>
            <button class="button is-text" v-if="isAddedBtn" @click="removeFromCart(product.id)">{{ removeFromCartLabel }}</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product-detail-component',
  
  data () {
    return {
      addToCartLabel: 'Add to cart',
      removeFromCartLabel: 'Remove from cart',
      product: {},
      selected: 1,
      quantityArray: []
    };
  },

  mounted () {
    this.product = this.$store.getters.getProductById(this.$route.params.id);
    this.selected = this.product.quantity;

    for (let i = 1; i <= 20; i++) {
      this.quantityArray.push(i);
    }
  },

  computed: {
    isAddedBtn () {
      return this.product.isAddedBtn;
    }
  },

  methods: {
    addToCart (id) {
      let data = {
        id: id,
        status: true
      }
      this.$store.commit('addToCart', id);
      this.$store.commit('setAddedBtn', data);
    },
    removeFromCart (id) {
      let data = {
        id: id,
        status: false
      }
      this.$store.commit('removeFromCart', id);
      this.$store.commit('setAddedBtn', data);
    },
    onSelectQuantity (id) {
      let data = {
        id: id,
        quantity: this.selected
      }
      this.$store.commit('quantity', data);
    }
  }
};
</script>
