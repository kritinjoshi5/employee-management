<template>
    <div>
        <table class="table is-striped is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>Name </th>
                    <th>Email </th>
                    <th>Phone </th>
                    <th>Address </th>
                    <th>Action </th>
                </tr>
            </thead>
            <tbody>
                <!-- loop for dynamically creating user table -->
                <tr v-for="(user, i) in users" :key="i">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.address.street}}, {{user.address.suite}}, {{user.address.city}}, {{user.address.zipcode}}</td>
                    <td>
                        <span class="flex">
                            <button style="outline: none;" @click="$emit('show-user-details', user)">
                                <span class="material-icons">
                                    visibility
                                </span>
                            </button>
                            <button style="outline: none;" @click="$emit('edit-user', user)">
                                <span class="material-icons">
                                    create
                                </span>
                            </button>
                            <button style="outline: none;" @click="$emit('delete-user', user)">
                                <span class="material-icons">
                                    delete
                                </span>
                            </button>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<!-- script for table component -->

<script>
    export default {
        name: 'table-component',
        computed: { // computed property will change whenever the value of the perticular state changes
            users: {
                get() { // getting value of users from the store
                    return this.$store.state.users.users
                }
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>