<style lang="scss" rel="stylesheet/scss" module>
.chartBox {
  padding-right: 80px;
  border-right: 1px solid #E9EEF6;
  height: 200px;
}
.textBox {
  height: 200px;
  text-align: center;
}
.card {
  display: inline-block;
  width: 340px;
  @include _mSingleLine(80px);
  &:first-of-type {
    background-color: #F4F8FE;
  }
  &:last-of-type {
    background-color: #FDF9F9;
    margin-top: 34px;
  }
}
.icon {
  font-size: 40px;
}
.text {
  margin-left: 20px;
  display: inline-block;
  line-height: 30px;
  vertical-align: middle;
  text-align: left;
  margin-top: -16px;
  > span {
    color: #444 !important;
  }
}
.money, .unit {
  color: $_moneyColor;
  font-weight: bold;
}
.money {
  font-size: 24px;
}
.unit {
  margin-left: 8px;
}
</style>
<template>
<hscf-panel line borderer :title="title"
  :class="$style.repaymentOverviewChart">
  <el-row>
    <el-col :span="12" :class="$style.chartBox">
      <cd-chart v-if="chartOptions"
                :options="chartOptions" style="height:100%"></cd-chart>
    </el-col>
    <el-col :span="12" :class="$style.textBox">
      <cd-tile :class="$style.card">
        <hscf-icon type="money" :class="$style.icon" style="color: #3BA0EC"></hscf-icon>
        <p :class="$style.text">
          <cd-text type="money" color="#3BA0EC" :data="remainingAmount"></cd-text>
          <span :class="$style.unit">CNY</span><br>
          <cd-text-value outstand :data="'应还合计'"></cd-text-value>
        </p>
      </cd-tile>
      <cd-tile :class="$style.card">
        <hscf-icon type="jinggao" color="#FF5256" :class="[$style.icon, '_errorColor']"></hscf-icon>
        <p :class="$style.text">
          <cd-text type="money" :data="overDueAmount"></cd-text>
          <span :class="$style.unit">CNY</span><br>
          <cd-text-value outstand :data="'逾期未还'"></cd-text-value>
        </p>
      </cd-tile>
    </el-col>
  </el-row>
</hscf-panel>
</template>
<script>
import {
  HscfPanel,
  CdTile,
  CdText,
  CdTextValue,
  HscfIcon,
} from 'comp@';
import CdChart from '@candy/ui/component/cd-chart';
import { financeApi } from 'api@';

export default {
  name: 'main-repaymentOverviewChart',
  components: {
    HscfPanel,
    CdChart,
    CdTile,
    CdText,
    CdTextValue,
    HscfIcon,
  },
  props: ['remainingAmount', 'title', 'overDueAmount'],
  data() {
    return {
      quotaChartData: {},
      chartOptions: '',
    };
  },
  methods: {
    async quotaCharts() {
      this.quotaChartData = await financeApi.quotaChart(this.orgId_());
      this.chartOptions = {
        color: ['#6CC39D', '#5BB4C8', '#EDC23F', '#DA7438', '#9D91FF', '#77BAFF'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c}元 ({d}%)',
        },
        legend: {
          textStyle: {
            fontWeight: 'bold',
            color: ' #364B66',
          },
          orient: 'vertical',
          x: 'right',
          y: 'middle',
          data: ['7日内', '8-15日', '16-30日', '31-90日', '90日外', '逾期'],
        },
        series: [
          {
            name: '应还总额账龄分布图',
            type: 'pie',
            radius: ['50%', '80%'],
            selectedMode: 'single',
            avoidLabelOverlap: false,
            center: ['40%', '50%'],
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: this.quotaChartData.pieChartResultSet[0].y, name: '7日内' },
              { value: this.quotaChartData.pieChartResultSet[1].y, name: '8-15日' },
              { value: this.quotaChartData.pieChartResultSet[2].y, name: '16-30日' },
              { value: this.quotaChartData.pieChartResultSet[3].y, name: '31-90日' },
              { value: this.quotaChartData.pieChartResultSet[4].y, name: '90日外' },
              { value: this.quotaChartData.pieChartResultSet[5].y, name: '逾期' },
            ],
          },
        ],
      };
    },
  },
  created() {
    this.quotaCharts();
  },
};
</script>
