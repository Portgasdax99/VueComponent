<template>
  <div>
    <div class="row">
      <div class="col-sm-8"></div>
      <div class="col-sm-4 text-right my-3">
        <el-autocomplete
          popper-class="my-autocomplete"
          placeholder="Please input"
        >
          <i class="el-icon-edit el-input__icon" slot="suffix"> </i>
          <template slot-scope="{ item }">
            <div class="value">{{ item.value }}</div>
            <span class="link">{{ item.link }}</span>
          </template>
        </el-autocomplete>
      </div>
    </div>
    <!-- button -->
    <div class="row">
      <div class="col-sm-8"></div>
      <div class="col-sm-4 text-right my-3">
        <el-button type="success" @click="showAddForm()">Add</el-button>
      </div>
    </div>
    <!-- table -->
    <div class="row">
      <el-table border :data="dataAPI" style="width: 100%">
        <!-- count col -->
        <el-table-column type="index" width="50"> </el-table-column>
        <!-- column 1 -->
        <el-table-column label="GroupID" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.groupID }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Picture" width="180">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- col 3 -->
        <el-table-column label="Name" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <!-- col 4 -->
        <el-table-column label="Keyboard" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.keyboard }}</span>
            <i
              style="margin-left: 30px"
              class="el-icon-circle-plus-outline"
            ></i>
          </template>
        </el-table-column>
        <!-- col 5 -->
        <el-table-column label="Industry" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.industry }}</span>
          </template>
        </el-table-column>
        <!-- col 6 -->
        <el-table-column label="Members" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.memebers }}</span>
          </template>
        </el-table-column>
        <!-- 7 -->
        <el-table-column label="Post/Week" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.postperweek }}</span>
          </template>
        </el-table-column>
        <!-- 8 -->
        <el-table-column label="A/Q" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.aAndq }}</span>
          </template>
        </el-table-column>
        <!-- 9 -->
        <el-table-column align="right" label="Operations">
          <template slot-scope="scope">
            <el-button size="mini" @click="putDataToStore(scope.row.id)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="
                deleteRow(scope.$index, dataAPI);
                deleteAPI(scope.row.id);
              "
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="row">
      <dialog-edit></dialog-edit>
    </div>
  </div>
</template>

<script>
import dialogEdit from "../content/Dialog.vue";

import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

const baseURL = "http://localhost:3000/posts";

export default {
  name: "tableCrawl",

  components: { dialogEdit },

  data() {
    return {
      dataAPI: [],
      dialogFormVisible: false,
    };
  },
  async created() {
    try {
      const res = await axios.get(baseURL);
      this.dataAPI = res.data;
    } catch (e) {
      console.error(e);
    }
  },

  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    deleteAPI(id) {
      axios.delete(baseURL + "/" + `${id}`);
      this.dataAPI.splice(id, 1);
    },

    async putDataToStore(id) {
      this.showDialog(id),
        await axios.get(baseURL + "/" + `${id}`).then((response) => {
          this.setData(response.data);
        });
    },

    ...mapMutations(["showDialog", "showAddForm", "setData"]),
    ...mapGetters(["getRowId"]),
  },
};
</script>

<style></style>
