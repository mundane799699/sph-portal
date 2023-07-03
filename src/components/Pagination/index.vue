<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="changePageNo(pageNo-1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1" @click="changePageNo(1)" :class="{active: pageNo===1}">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button v-for="(page, index) in filteredPages" :key="index" @click="changePageNo(page)" :class="{active: pageNo===page}">{{page}}</button>

    <button v-if="startNumAndEndNum.end<totalPage-1">···</button>
    <button v-if="startNumAndEndNum.end<totalPage" @click="changePageNo(totalPage)" :class="{active: pageNo===totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo===totalPage" @click="changePageNo(pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      const { continues, pageNo, totalPage } = this;
      let start = 0,
        end = 0;
      // 总页数没有连续页码多
      if (continues > totalPage) {
        start = 0;
        end = this.totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        end = pageNo + parseInt(continues / 2);
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
    filteredPages() {
      const pages = [];
      for (let i = this.startNumAndEndNum.start; i <= this.startNumAndEndNum.end; i++) {
        if (i >= this.startNumAndEndNum.start) {
          pages.push(i);
        }
      }
      return pages;
    }
  },
  methods: {
    changePageNo(pageNo) {
      this.$emit('getPageNo', pageNo);
    }
  }
};
</script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background: skyblue;
}
</style>
  