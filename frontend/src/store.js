import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [
      {
        id: 1,
        title: 'Apple',
        description: 'Good crunch. Beautiful red coating. Sweet and juicy.',
        price: 1,
        category: 'Fruits',
        merchant: 'Fuji',
        isAddedToCart: false,
        isAddedBtn: false,
        quantity: 1
      },
      {
        id: 2,
        title: 'Banana',
        description: 'Soft and easy on the teeth. Cool curve shape. Comes in a bunch.',
        price: 3,
        category: 'Fruits',
        merchant: 'Dole',
        isAddedToCart: false,
        isAddedBtn: false,
        quantity: 1
      },
      {
        id: 3,
        title: 'Peach',
        description: 'Balanced amount of texture. Succulent and full of flavour.',
        price: 2,
        category: 'Fruits',
        merchant: 'Chamolet',
        isAddedToCart: false,
        isAddedBtn: false,
        quantity: 1
      }
    ],
    userInfo: {
      isLoggedIn: false,
      isSignedUp: false,
      hasSearched: false,
      name: '',
      productTitleSearched: ''
    },
    systemInfo: {
      openLoginModal: false,
      openSignupModal: false,
      openCheckoutModal: false
    }
  },
  
  getters: {
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
