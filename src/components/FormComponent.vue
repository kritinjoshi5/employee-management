<template>
	<v-container>
		<v-dialog v-model="dialog" width="500">
			<template v-slot:activator="{ on }">
				<v-btn color="lighten-2" dark v-on="on" @click="clearData()">
					Add Employee
				</v-btn>
			</template>
			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>
					Add Employee
				</v-card-title>
				<v-stepper v-model="step" alt-labels>
					<v-stepper-header>
						<v-stepper-step step="1" editable>
							Personal Details
						</v-stepper-step>
						<v-divider></v-divider>
						<v-stepper-step step="2" editable @click="el = 2">
							Company Details
						</v-stepper-step>
					</v-stepper-header>
					<v-stepper-items>
						<v-stepper-content step="1">
							<v-text-field :readonly="readonly || false" v-model="formData.name" label="Name" hide-details="auto"></v-text-field>
							<v-text-field :readonly="readonly || false" v-model="formData.email" label="Email" hide-details="auto"></v-text-field>
							<v-text-field :readonly="readonly || false" v-model="formData.phone" label="Phone" hide-details="auto"></v-text-field>
							<div class="flex">
								<v-text-field style="margin-right: 8px;" :readonly="readonly || false" v-model="formData.address.street"
									label="street" hide-details="auto"></v-text-field>
								<v-text-field :readonly="readonly || false" v-model="formData.address.suite" label="suite" hide-details="auto">
								</v-text-field>
							</div>
							<div class="flex">
								<v-text-field style="margin-right: 8px;" :readonly="readonly || false" v-model="formData.address.city" label="city"
									hide-details="auto"></v-text-field>
								<v-text-field :readonly="readonly || false" v-model="formData.address.zipcode" label="zipcode" hide-details="auto">
								</v-text-field>
							</div>
							<v-divider></v-divider>
							<div>
								<v-btn color="primary" @click="step = 2">
									Next
								</v-btn>
								<v-btn text @click="closeDialog()">Cancel</v-btn>
							</div>
						</v-stepper-content>
						<v-stepper-content step="2">
							<v-text-field :readonly="readonly || false" v-model="formData.username" label="User Name" hide-details="auto">
							</v-text-field>
							<v-text-field :readonly="readonly || false" v-model="formData.company.name" label="Company Name" hide-details="auto">
							</v-text-field>
							<v-text-field :readonly="readonly || false" v-model="formData.company.catchPhrase" label="Company catchPhrase"
								hide-details="auto">
							</v-text-field>
							<v-text-field :readonly="readonly || false" v-model="formData.company.bs" label="Company BS" hide-details="auto">
							</v-text-field>
							<v-text-field :readonly="readonly || false" v-model="formData.website" label="Website" hide-details="auto">
							</v-text-field>
							<v-divider></v-divider>
							<div>
								<v-btn color="primary" v-if="!readonly" @click="addUser(formData)">
									Save
								</v-btn>
								<v-btn text @click="closeDialog()">Cancel</v-btn>
							</div>
						</v-stepper-content>
					</v-stepper-items>
				</v-stepper>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
	import EventBus from '../EventBus'

	let defalutForm = {
		name: "",
		email: "",
		phone: "",
		company: {},
		address: {},
		website: "",
		username: "",

	}

	export default {
		name: 'form-component',
		props: { // props is used to get data from the parent component
			edit: Boolean,
			readonly: Boolean
		},
		computed: {
			formData: {
				get() {
					return this.form
				}
			},
		},
		methods: {
			addUser(user) {
				if (!this.edit) {
					this.$store.dispatch('users/addUser', user); // calling store's action named 'addUser' to save user
				} else {
					this.$store.dispatch('users/updateUser', user) // calling store's action named 'updateUser' to update selected user
				}
				this.closeDialog()
			},
			closeDialog() { // to close dialog box
				this.dialog = false
			},
			clearData() { // clear data of form if it is already filled
				this.form = defalutForm
				this.step = 1
			}
		},
		data() {
			return {
				form: defalutForm,
				dialog: true,
				step: 1
			}
		},
		mounted() {
			let that = this
			EventBus.$on('user:data', (user) => { // turn on Event bus with giving a name 'edit:user:data' to make communication
				that.dialog = true
				this.form = user
			})
		},
		beforeDestroy() {
			EventBus.$off('user:data'); // turn of Event bus 'edit:user:data' to be on safe side and prevent memory leak
		}
	}
</script>