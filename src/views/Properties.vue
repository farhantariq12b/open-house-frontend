<template>
  <div class="container">
    <section v-if="!isLoading">
      <h2>Properties</h2>
      <b-table
        :data="properties"
        ref="table"
        detailed
        hoverable
        custom-detail-row
        :opened-detailed="['Property Detail']"
        :default-sort="['address', 'asc']"
        detail-key="id"
        :show-detail-icon="showDetailIcon"
      >
        <b-table-column
          field="id"
          :label="columnsVisible['id'].title"
          width="300"
          sortable
          v-slot="props"
        >
          <template v-if="showDetailIcon">
            {{ props.row.id }}
          </template>
          <template v-else>
            <a @click="toggle(props.row)">
              {{ props.row.id }}
            </a>
          </template>
        </b-table-column>

        <b-table-column
          field="address"
          :label="columnsVisible['address'].title"
          centered
          v-slot="props"
        >
          {{ props.row.address }}
        </b-table-column>

        <b-table-column field="address" label="Action" centered v-slot="props">
          <b-button
            @click="
              $router.push({
                name: 'property_detail',
                params: { id: props.row.id },
              })
            "
            type="is-primary"
            >Detail</b-button
          >
        </b-table-column>

        <template slot="detail" slot-scope="props">
          <tr :key="props.row.id + 'header'" class="header">
            <td v-if="showDetailIcon"></td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;ID</td>
            <td class="has-text-centered">Start Date</td>
            <td class="has-text-centered">Visitor Amount</td>
          </tr>
          <!-- eslint-disable-next-line vue/valid-v-for -->
          <tr
            v-for="(item, index) in props.row.open_houses"
            :key="item.id + index + props.row.id"
          >
            <td v-if="showDetailIcon"></td>
            <td>&nbsp;&nbsp;&nbsp;&nbsp;{{ item.id }}</td>
            <td class="has-text-centered">
              {{ item.start_date }}
            </td>
            <td class="has-text-centered">
              {{ item.visitor_amount }}
            </td>
          </tr>
        </template>
      </b-table>
      <b-pagination
        v-model="current"
        order="is-centered"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
        icon-next="chevron-right"
        icon-prev="chevron-left"
        rounded
        :total="total"
        :per-page="perPage"
      >
      </b-pagination>
    </section>
    <div class="content" v-else>
      <loader />
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader/Loader.vue';
import PropertyService from "../service/modules/properties";

export default {
  components: { Loader },
  name: "property-list",
  data() {
    return {
      isLoading: false,
      properties: [],
      total: 0,
      perPage: 5,
      current: 1,
      columnsVisible: {
        id: { title: "ID", display: true },
        address: { title: "Address", display: true },
      },
      showDetailIcon: true,
    };
  },
  created() {
    this.getProperties();
  },
  watch: {
    current() {
      this.getProperties();
    },
  },
  methods: {
    async getProperties() {
      this.isLoading = true;
      try {
        const resp = await PropertyService.getProperties({
          limit: this.perPage,
          offset: this.current,
        });

        this.properties = resp?.data?.properties?.data || [];
        const { total, perPage } = resp?.data?.properties?.pagination || {};

        this.total = total;
        this.perPage = perPage;
      } catch (error) {
        if (error?.response?.status === 401) {
          this.$router.push({ name: "login" });
        }

        console.log(error, "error");
      }
      this.isLoading = false;
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row);
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  font-size: 4rem;
  text-align: center;
}

.header {
  font-weight: bold;
}
</style>
