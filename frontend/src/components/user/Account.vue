<template>
  <div class="section">
    <div class="card">
      <div class="field">
        <h1 class="label">Name</h1>
        <div>
          <h2 class="header">{{ getUserName }}</h2>
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div>
          <p class="header">{{ getUserEmail }}</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  name: 'account-component',
  data () {
    return {

    };
  },
  computed: {
		getUserName () {
			let name = this.$store.getters.getUserName;
			
			if (name === '') {
				return 'user';
			} else {
				return name;
			}
    },
    getUserEmail () {
			let email = this.$store.getters.getUserEmail;
			
			if (email === '') {
				return '';
			} else {
				return email;
			}
		}
	}
};
</script>