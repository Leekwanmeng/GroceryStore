import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      name: '',
      email: '',
      id: -1,
      productTitleSearched: '',
      order_id: 1
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openCheckoutModal: false
    }
  },
  
  getters: {
    getAllProducts: state => {
      return state.products;
    },
    productsAdded: state => {
      return state.products.filter(el => {
        return el.isAddedToCart;
      });
    },
    getProductById: state => id => {
      return state.products.find(product => product.id == id);
    },
    isUserLoggedIn: state => {
      return state.userInfo.isLoggedIn;
    },
    isUserSignedUp: state => {
      return state.userInfo.isSignedUp;
    },
    getUserName: state => {
      return state.userInfo.name;
    },
    getUserEmail: state => {
      return state.userInfo.email;
    },
    getUserID: state => {
      return state.userInfo.id;
    },
    getOrderID: state => {
      return state.userInfo.order_id;
    },
    isLoginModalOpen: state => {
      return state.systemInfo.openLoginModal;
    },
    isSignupModalOpen: state => {
      return state.systemInfo.openSignupModal;
    },
    isCheckoutModalOpen: state => {
      return state.systemInfo.openCheckoutModal;
    },
    quantity: state => {
      return state.products.quantity;
    }
  },
  
  mutations: {
    clearAllItems: (state) => {
      state.products = [];
    },
    addItemToProduct: (state, item) => {
      state.products.push(item);
    },
    addToCart: (state, id) => {
      state.products.forEach(el => {
        if (id === el.id) {
          el.isAddedToCart = true;
        }
      });
    },
    setAddedBtn: (state, data) => {
      state.products.forEach(el => {
        if (data.id === el.id) {
          el.isAddedBtn = data.status;
        }
      });
    },
    removeFromCart: (state, id) => {
      state.products.forEach(el => {
        if (id === el.id) {
          el.isAddedToCart = false;
        }
      });
    },
    isUserLoggedIn: (state, isUserLoggedIn) => {
      state.userInfo.isLoggedIn = isUserLoggedIn;
    },
    isUserSignedUp: (state, isSignedUp) => {
      state.userInfo.isSignedUp = isSignedUp;
    },
    setHasUserSearched: (state, hasSearched) => {
      state.userInfo.hasSearched = hasSearched;
    },
    setUserName: (state, name) => {
      state.userInfo.name = name;
    },
    setUserEmail: (state, email) => {
      state.userInfo.email = email;
    },
    setUserID: (state, id) => {
      state.userInfo.id = id;
    },
    setOrderID: (state, order_id) => {
      state.userInfo.order_id = order_id;
    },
    setProductTitleSearched: (state, titleSearched) => {
      state.userInfo.productTitleSearched = titleSearched;
    },
    showLoginModal: (state, show) => {
      state.systemInfo.openLoginModal = show;
    },
    showSignupModal: (state, show) => {
      state.systemInfo.openSignupModal = show;
    },
    showCheckoutModal: (state, show) => {
      state.systemInfo.openCheckoutModal = show;
    },
    quantity: (state, data) => {
      state.products.forEach(el => {
        if (data.id === el.id) {
          el.quantity = data.quantity;
        }
      });
    }
  },
  
  actions: {

  }
});
