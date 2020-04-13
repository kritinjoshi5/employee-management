<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<v-toolbar-title>Employee Records</v-toolbar-title>
			<v-spacer></v-spacer>
			<span>
				<!-- here we use FromComponent as form-component -->
				<!-- 
					:edit is a prop that was declared in FromComponent in props 
					and isEdited was declared in current view
				-->
				<form-component :edit="isEdited" :readonly="isReadOnly" /></span>
			</v-app-bar>
			<v-content>
				<v-progress-linear v-if="loading" indeterminate color="primary"></v-progress-linear>
				<!-- here we use TableComponent as table-component -->
				<!--
					@edit-user is a event that is trigged from table-component
					with some data and then it will call current view function editUser 
					and same with @delete-user 
				-->
				<table-component @edit-user="editUser" @show-user-details="showUserDetails" @delete-user="deleteUser"></table-component>
		</v-content>
	</v-app>
</template>

<script>
	import form from './components/FormComponent'; // Add Employee Component
	import table from './components/TableComponent'; // All Employee Component in table
	import EventBus from './EventBus'; // Eventbus for communition between 2 components
	
	export default {
		name: 'App',
		computed: {
			loading: { // whenever store state of loading changes this "loading" will be affected
				get() {
					return this.$store.state.users.loading
				}
			}
		},
		components: { // using imported component in current view
			'form-component': form,
			'table-component': table,
		},
		mounted() { // initial call whenever component load for the first time
			this.$store.dispatch('users/getAllUsers'); // calling store's action named 'getAllUsers' to get all users available
		},
		data: () => ({ // data that is only scoped to this component
			userData: {},
			isEdited: false,
			isReadOnly: false
		}),
		methods: { // custom functions (methods) for this component
			editUser(user) { // to edit a perticular tuple from users
				this.userData = user
				this.isEdited = true
				EventBus.$emit('user:data', user) // sending data to the form-component using bus-emit
			},
			deleteUser(user) { // to delete a perticular tuple from users
				this.$store.dispatch('users/deleteUser', user.id) // calling store's action named 'deleteUser'
			},
			showUserDetails(user) {
				this.isReadOnly = true
				EventBus.$emit('user:data', user)
			}
		}
	};
</script>


<!-- style that can be used in all over the project -->
<style>
	@import '~bulma/css/bulma.css';
	@import 'https://fonts.googleapis.com/icon?family=Material+Icons';

	body {
		width: 100%;
	}

	.modal-card {
		width: 350px;
		max-width: 50%;
	}

	.flex {
		display: flex;
		flex-direction: row;
	}

	.flex-end {
		place-content: flex-end;
	}
</style>