<script>
	import CustomTabBar from '@/components/CustomTabBar.vue'
	export default {
		components: {
		  CustomTabBar
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}

</script>

<style>
	/*每个页面公共css */
	page {
	  background-color: #f8f8f8;
	}
</style>
