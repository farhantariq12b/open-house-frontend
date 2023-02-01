<template>
  <div>
    <section v-if="isAssigning">
      <b-dropdown v-model="selectedUser" multiple aria-role="list">
        <template #trigger>
          <b-button type="is-primary" icon-right="menu-down">
            Selected ({{ selectedUser.length }})
          </b-button>
        </template>

        <b-dropdown-item
          v-for="(user, index) of users"
          :key="index"
          :value="user.id"
          aria-role="listitem"
        >
          <span>{{ user.name }}</span>
        </b-dropdown-item>
      </b-dropdown>

      <a class="button is-light" @click="updateHouse"> Update </a>
    </section>
    <section v-else>
      <a class="button is-light" @click="isAssigning = true"> Assign tenant </a>
    </section>
  </div>
</template>

<script>
import HouseService from "@/service/modules/house";

export default {
  name: "assigned-user",
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    houseId: Number,
  },
  data: () => ({
    isAssigning: false,
    selectedUser: [],
  }),
  methods: {
    async updateHouse() {
      try {
        await HouseService.updateHouse(this.houseId, this.selectedUser);
        this.$emit("refresh");
      } catch (error) {
        if (error.response) {
          this.$buefy.toast.open({
            message:
              error.response.data.message ||
              "Something went wrong while fetching property details",
            type: "is-danger",
          });
        }

        console.log(error);
      }
      this.isAssigning = false;
    },
  },
};
</script>

<style></style>
