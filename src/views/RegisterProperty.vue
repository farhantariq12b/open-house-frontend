<template>
  <div>
    <div class="container" v-if="!isLoading">
      <h3 class="title has-text-centered has-text-dark">
        Register a new Property
      </h3>
      <div class="box">
        <b-field label="Address">
          <b-input v-model="property.address" required placeholder="Address">
          </b-input>
        </b-field>

        <b-field label="Open Houses">
          <div
            class="buttons"
            v-for="(house, index) of property.open_houses"
            :key="index"
          >
            <b-input
              v-model="house.visitor_amount"
              required
              placeholder="Visitor Amount"
            />

            <b-datepicker
              v-model="house.start_date"
              placeholder="Start Date"
              icon="calendar-today"
              icon-right="close-circle"
              icon-right-clickable
              trap-focus
            >
            </b-datepicker>
          </div>
        </b-field>
        <button class="add-house button" @click="addNew()">
          + Add new house
        </button>

        <button class="button is-dark is-large is-fullwidth" @click="doAction">
          {{ !isEdit ? "Create Property" : "Update Property" }}
        </button>
      </div>
    </div>
    <div class="container" v-else>
      <loader />
    </div>
  </div>
</template>

<script>
import PropertyService from "@/service/modules/properties";
import Loader from '@/components/Loader/Loader.vue';

export default {
  components: { Loader },
  name: "register-property",
  data() {
    return {
      property: {
        open_houses: [{ visitor_amount: null }],
      },
      isEdit: false,
      isLoading: false,
    };
  },
  async mounted() {
    if (this.$route.params?.id) {
      this.isEdit = true;
      await this.getProperty();
    }
  },
  methods: {
    addNew() {
      const { open_houses } = this.property;
      open_houses.push({ visitor_amount: null });
      this.property = {
        ...this.property,
        open_houses,
      };
    },
    doAction() {
      if (this.isEdit) {
        this.updateProperty();
      } else {
        this.registerProperty();
      }
    },
    async getProperty() {
      this.isLoading = true;
      try {
        const resp = await PropertyService.getPropertyById(
          this.$route.params.id
        );
        this.property = {
          ...resp.data.property,
          open_houses: resp.data.property.open_houses.map((house) => ({
            ...house,
            start_date: house.start_date
              ? new Date(house.start_date)
              : undefined,
          })),
        };
      } catch (e) {
        this.$buefy.toast.open({
          message: "Something went wrong while fetching property details",
          type: "is-danger",
        });
        console.log("Error", e);
      }
      this.isLoading = false;
    },
    async registerProperty() {
      this.isLoading = true;
      try {
        await PropertyService.registerProperty(this.property);

        this.$router.push("/");
      } catch (error) {
        if (error?.response?.data) {
          if (error.response.data.msg.address) {
            this.$buefy.toast.open({
              message:
                `Address: ${error.response.data.msg.address}` ||
                "Something went wrong. Please try again!",
              type: "is-danger",
            });
          } else if (error.response.data.msg.open_houses) {
            this.$buefy.toast.open({
              message:
                error.response.data.msg.open_houses ||
                "Something went wrong. Please try again!",
              type: "is-danger",
            });
          } else {
            this.$buefy.toast.open({
              message:
                error.response.data.msg ||
                "Something went wrong. Please try again!",
              type: "is-danger",
            });
          }
        }

        console.log(error);
      }
      this.isLoading = false;
    },
    async updateProperty() {
      this.isLoading = true;
      try {
        await PropertyService.updateProperty(
          this.$route.params.id,
          this.property
        );

        this.$router.push("/");
      } catch (error) {
        if (error?.response?.data) {
          if (error.response.data.msg.address) {
            this.$buefy.toast.open({
              message:
                `Address: ${error.response.data.msg.address}` ||
                "Something went wrong. Please try again!",
              type: "is-danger",
            });
          } else if (error.response.data.msg.open_houses) {
            this.$buefy.toast.open({
              message:
                error.response.data.msg.open_houses ||
                "Something went wrong. Please try again!",
              type: "is-danger",
            });
          } else {
            this.$buefy.toast.open({
              message:
                error.response.data.msg ||
                "Something went wrong. Please try again!",
              type: "is-danger",
            });
          }
        }

        console.log(error);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  & > div {
    margin-right: 10px;
  }
}
.button {
  margin: 10px 0px;
}
</style>
