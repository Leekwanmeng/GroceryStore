<template>
  <div class="columns is-centered is-multiline">
    <div class="card column is-one-quarter" v-for="product in products" :key="product.id">
      <products-component :product="product"></products-component>
    </div>
    <div class="section" v-if="products.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductsComponent from './Products';
import { getByTitle } from '../filters';

export default {
  name: 'products-list-component',
  
  components: {
    'products-component': ProductsComponent
  },
  
  created: function() {
    // if new refresh (no products yet)
    // this is to prevent refresh of item states
    if (this.$store.getters.getAllProducts.length === 0) {
      // Clears all previous items to prevent duplicates
      this.$store.commit('clearAllItems');

      let uri = 'http://localhost:3000/api/all-items';
      axios.get(uri)
      .then((res) => {
        // console.log(res.data.value);
        res.data.value.forEach(item => {
          // Rename query key entries to be
          // consistent with other components
          if ('item_id' !== 'id') {
            Object.defineProperty(item, 'id',
                Object.getOwnPropertyDescriptor(item, 'item_id'));
            delete item['item_id'];
          }

          if ('item_name' !== 'title') {
            Object.defineProperty(item, 'title',
                Object.getOwnPropertyDescriptor(item, 'item_name'));
            delete item['item_name'];
          }

          if ('item_price' !== 'price') {
            Object.defineProperty(item, 'price',
                Object.getOwnPropertyDescriptor(item, 'item_price'));
            delete item['item_price'];
          }

          item.isAddedToCart = false;
          item.isAddedBtn = false;
          item.quantity = 1;
          // console.log(item);
          this.$store.commit('addItemToProduct', item);
        });
      })
      .catch((err) => {
        console.log(err.response.status);
      });
    }
  },

  data () {
    return {
      id: '',
      noProductLabel: 'No product found',
      productsFiltered: []
    };
  },

  computed: {
    products () {
      if (this.$store.state.userInfo.hasSearched) {
        return this.getProductByTitle();
      } else {
        return this.$store.state.products;
      }
    }
  },

  methods: {
    getProductByTitle () {
      let listOfProducts = this.$store.state.products,
          titleSearched = this.$store.state.userInfo.productTitleSearched;
      
      return this.productsFiltered = getByTitle(listOfProducts, titleSearched);
    }
  }

};
</script>

<style lang="scss" scoped>
  .card {
    margin: 10px;
  }
</style>
