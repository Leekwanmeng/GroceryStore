<template>
	<div :class="[ openModal ? 'is-active' : '', 'modal' ]">
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title">{{ modalTitle }}</p>
				<button class="delete" aria-label="close" @click="closeModal(false)"></button>
			</header>
			<section class="modal-card-body">
				<div v-if="!isCheckoutSection">
					<div class="box" v-for="product in products" :key="product.id">
						<button class="is-pulled-right button is-info is-inverted" @click="removeFromCart(product.id)">{{ removeLabel }}</button>
						<p>{{ product.title }}  {{ product.quantity > 0 ?  ` - Quantity: ${product.quantity}` : ''}}</p>
						<p>${{ product.price }}</p>
					</div>
					<div v-if="products.length === 0">
						<p>{{ cartEmptyLabel }}</p>
					</div>
				</div>
				<div v-if="isCheckoutSection">
					<p>Items bought! Order reference: {{ order_id }}</p>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button v-show="products.length > 0 && !isCheckoutSection" class="button is-success" @click="onNextBtn">{{ buyLabel }}</button>
				<button v-if="isCheckoutSection" class="button is-success" @click="closeModal(true)">{{ closeLabel }}</button>
			</footer>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'checkout-component',
    
	data () {
		return {
			modalTitle: 'Checkout',
			removeLabel: 'Remove from cart',
			cartEmptyLabel: 'Your cart is empty',
			closeLabel: 'Close',
			isCheckoutSection: false,
			finalPrice: -1
		}
	},

	computed: {
		products () {
			return this.$store.getters.productsAdded;
		},
		openModal () {
			if (this.$store.getters.isCheckoutModalOpen) {
				return true;
			} else {
				return false;
			}
		},
		buyLabel () {
			let totalProducts = this.products.length,
					productsAdded = this.$store.getters.productsAdded,
					pricesArray = [],
					productLabel = '',
					quantity = 1;

			productsAdded.forEach(product => {

				if (product.quantity >= 1) {
					quantity = product.quantity;
				}

				pricesArray.push((product.price * quantity)); // get the price of every product added and multiply quantity
			});

			this.finalPrice = pricesArray.reduce((a, b) => a + b, 0); // sum the prices
			
			if (totalProducts > 1) { // set plural or singular
				productLabel = 'products';
			} else {
				productLabel = 'product';
			}
			return `Buy ${totalProducts} ${productLabel} at $${this.finalPrice}`;
		},
		isUserLoggedIn () {
			return this.$store.getters.isUserLoggedIn;
		},
		order_id() {
			return this.$store.getters.getOrderID;
		}
	},

	methods: {
		closeModal (reloadPage) {
			let uri = 'http://localhost:3000/api/add-item-to-order';
			// 1 post per item added to cart
			this.products.forEach(item => {
				
				console.log(item.quantity);
				console.log(item.quantity * item.price);
				console.log(item.id);
				console.log(this.$store.getters.getOrderID);
				let itemOrderDetail = {
					'quantity': item.quantity,
					'total_cost': item.quantity * item.price,
					'item_id': item.id,
					'order_id': this.$store.getters.getOrderID
				};
				axios.post(uri, itemOrderDetail)
				.catch((err) => {
					console.log(err.response.status);
				});
			});

			this.$store.commit('showCheckoutModal', false);

			if (reloadPage) {
				window.location.reload();
			}
		},
		removeFromCart (id) {
			let data = {
					id: id,
					status: false
			}
			this.$store.commit('removeFromCart', id);
			this.$store.commit('setAddedBtn', data);
		},
		onNextBtn () {
			if (this.isUserLoggedIn) {
				let id = this.$store.getters.getUserID;
				let uri = 'http://localhost:3000/api/new-order';
				let order = {
					'total_amount':this.finalPrice,
					'customer_id':id
				};
				axios.post(uri, order)
				.then((res) => {
					
					axios.get('http://localhost:3000/api/get-prev-order')
					.then((res) => {
						console.log(res.data.value.order_id);
						// set current order id
					this.$store.commit('setOrderID', res.data.value.order_id);
					})
					.catch((err) => {
						console.log(err.response.status);
					});
					
				})
				.catch((err) => {
					console.log(err.response.status);
				});

				this.isCheckoutSection = true;
			} else {
				this.$store.commit('showCheckoutModal', false);
				this.$store.commit('showLoginModal', true);
			}
		},
		onPrevBtn () {
			this.isCheckoutSection = false;
		}
	}
}
</script>

