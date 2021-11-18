<style rel="stylesheet" lang="scss" module>
  $color-border: #f9e4e4;
  $color-bg1: #fff7f7;
  $color-bg2: #feecec;
  $color-white: #fff;
  .header {
    display: flex;
    justify-content: center;
    height: 200px;
    background: $color-bg1;
    margin: -32px -34px 0;
    border-radius: 0 0 50% 50%;
    margin-bottom: 228px;
    flex-wrap: wrap;
    .circle {
      position: absolute;
      height: 115px;
      border-radius: 50%;
      width: 115px;
      background: $color-bg2;
      top: -57px;
    }
    .tip {
      font-size: 18px;
      color: #364B66;
      text-align: center;
      letter-spacing: -0.48px;
      width: 100%;
      margin-top: 85px;
    }
    .qrCode {
      height: 221px;
      width: 221px;
      border: 4px solid $color-border;
      margin-top: 20px;
      background: $color-white;
      text-align: center;
      line-height: 221px;
    }
  }
</style>

<template>
  <section :class="$style.module">
    <cd-panel title="产品服务"
      borderer>
      <el-row>
        <el-col :span="2"
          :class="[$style.icon,
                  product.status === 'REAL_NAME' ? $style.success : $style.warning]">
          <mkt-icon :type="product.status === 'REAL_NAME' ? 'success' : 'warning'"
            style="font-size:30px;"></mkt-icon>
        </el-col>
        <el-col :class="$style.title"
          :span="3">
          票据秒贴
        </el-col>
        <el-col :span="5"
          :class="[$style.status, {
            [$style.success]: product.status === 'REAL_NAME',
        }]">
          {{ product.statusDesc }}
        </el-col>
        <el-col :class="$style.detail"
          :span="9">
          线上询价，贴现试算，极速贴现
        </el-col>
        <el-col :class="$style.action"
          :span="5">
          <cd-text-action style="margin-right:4px"
            @click="viewProduct">查看产品</cd-text-action>
          <span :class="$style.actionAplit">|</span>
          <cd-text-action v-if="product.status === 'INACTIVATED'"
            style="margin-left:4px"
            @click="waitRegister()">立即开通</cd-text-action>
          <cd-text-action v-else-if="showApply"
            style="margin-left:4px"
            @click="realNameApply()">实名信息</cd-text-action>
          <cd-text-action v-else-if="showInfo"
            style="margin-left:4px"
            @click="realNameDisplay()">实名信息</cd-text-action>
          <cd-text-action v-else-if="showAgain"
            style="margin-left:4px"
            @click="realNameApply()">再次实名</cd-text-action>
        </el-col>
      </el-row>
    </cd-panel>
    <cd-panel v-if="showForm"
      hide-header
      borderest>
      <el-row>
        <el-col :class="$style.tip"
          :span="16"
          :offset="1">
          <mkt-icon type="tip"
            style="color:#4184E8;font-size:14px;"></mkt-icon>
          <span :class="$style.tipTitle">【提示】:</span>
          最多可支持填写5次，若5次后仍未验证通过，则实名认证会冻结，需要联系客服处理
        </el-col>
      </el-row>
      <el-form v-cdd-animate-end="animationend"
        ref="form"
        :class="{
          [$style.shake]: shake,
      }">
        <el-row style="margin: 45px 0;">
          <el-col :span="10"
            :offset="6"
            style="text-align:center">
            <el-form-item label="打款金额（元）"
              label-width="160px">
              <cd-input-money v-model="amount"
                :disabled="count === 0"
                placeholder="请输入对公账户收到的打款金额"
                size="medium"
                @focus="inputFocus"></cd-input-money>
              <span v-if="hasError"
                :class="$style.errorText">验证不通过</span>
            </el-form-item>
          </el-col>
          <el-col :span="8"
            :class="$style.count">
            <span v-if="count > 0">(剩余{{ count }}次)</span>
            <span v-else>(验证次数已用完，请联系客服)</span>
          </el-col>
        </el-row>
        <div v-if="count > 0"
          style="text-align:center">
          <cd-button elevation
            plain
            type="primary"
            @click="reset">重 置</cd-button>
          <CdButton :disabled="!amount"
            elevation
            type="primary"
            @click="confirm">确 认</CdButton>
        </div>
      </el-form>
    </cd-panel>
    <md-agreement :visible.sync="agreementVisible"
      @agree="agree"></md-agreement>
  </section>
</template>

<script lang="es6" id="123">
  import { CdModal } from '@candy/ui/component';

  export default {
    components: { CdModal },
    props: {
      qrCodeVisible: {
        type: Boolean,
      },
      qrCodeUrl: {
        type: String,
        required: true,
      },
    },
    data() {
      return {};
    },
    methods: {
      async handleClose() {
        this.$emit('close');
      },
    },
    created() {
    },
  };
  </script>
