<template>
  <div class="container">
    <section class="section" v-if="!isLoading">
      <h1 class="title">Property Details</h1>
      <h2><strong>ID: </strong>{{ property.id }}</h2>
      <h2><strong>Address: </strong>{{ property.address }}</h2>
      <h2><strong>OpenHouses: </strong></h2>
      <b-table :data="property.open_houses">
        <b-table-column field="id" label="ID" v-slot="props">
          {{ props.row.id }}
        </b-table-column>
        <b-table-column
          field="visitor_amount"
          label="Visitor Amount"
          v-slot="props"
        >
          {{ props.row.visitor_amount }}
        </b-table-column>
        <b-table-column field="start_date" label="Start Date" v-slot="props">
          {{ props.row.start_date }}
        </b-table-column>
        <b-table-column
          field="users"
          label="Assigned Tenant"
          centered
          v-slot="props"
        >
          {{ props.row.user_names.join(", ") }}
        </b-table-column>

        <b-table-column field="action" label="Action" centered v-slot="props">
        <assigned-user :users="users" :houseId="props.row.id" @refresh="getPropertyDetail" />
        </b-table-column>
      </b-table>

      <a
        class="button is-light"
        @click="
          $router.push({
            name: 'Edit Property',
            params: { id: property.id },
          })
        "
      >
        Update
      </a>
    </section>
    <div v-else>
      <loader />
    </div>
  </div>
</template>

<script>
import PropertyService from "@/service/modules/properties";
import UserService from "@/service/modules/user";
import AssignedUser from '@/components/AssignedUser.vue';
import Loader from '@/components/Loader/Loader.vue';

export default {
  components: { AssignedUser, Loader },
  name: "property-detail",
  data: () => ({
    property: {},
    users: [],
    isLoading: false
  }),
  async created() {
    await this.getPropertyDetail();
    await this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const resp = await UserService.getUsers();

        this.users = resp?.data?.users || [];
      } catch (error) {
        console.log(error);
      }
    },
    async getPropertyDetail() {
      this.isLoading = true
      try {
        const resp = await PropertyService.getPropertyById(
          this.$route.params.id
        );

        this.property = resp?.data?.property || {};
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false
    },
  },
};
</script>

<style lang="scss" scoped></style>
