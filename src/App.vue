<template>
  <div id="app">

    <!-- 输入后端信息 -->
    <Modal
        title="输入基本信息"
        v-model="modalbaseinfo"
        @on-ok="initBaseInfo"
        :closable="false"
        :mask-closable="false">
      <Form :model="baseinfo">
        <FormItem label="后端 URL">
          <Input v-model="baseinfo.backendurl" placeholder="形如 http://localhost:5050"></Input>
        </FormItem>
        <FormItem label="帐号用户名">
          <Input v-model="baseinfo.backendusername" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="帐号密码">
          <Input v-model="baseinfo.backendpassword" placeholder="密码" type="password"></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal
        title="增加新规则"
        v-model="isAddRule"
        @on-ok="addRule">
      <Form :model="baseinfo">
        <FormItem label="aid">
          <Input v-model="submitData.aid" type="number"></Input>
        </FormItem>
        <FormItem label="platform">
          <Input v-model="submitData.platform" type="text"></Input>
        </FormItem>
        <FormItem label="download_url">
          <Input v-model="submitData.download_url" type="text"></Input>
        </FormItem>
        <FormItem label="update_version_code">
          <Input v-model="submitData.update_version_code" type="text"></Input>
        </FormItem>
        <FormItem label="md5">
          <Input v-model="submitData.md5" type="md5"></Input>
        </FormItem>
        <FormItem label="device_id_list">
          <Input v-model="submitData.device_id_list" type="text"></Input>
        </FormItem>
        <FormItem label="max_update_version_code">
          <Input v-model="submitData.max_update_version_code" type="text"></Input>
        </FormItem>
        <FormItem label="min_update_version_code">
          <Input v-model="submitData.min_update_version_code" type="text"></Input>
        </FormItem>
        <FormItem label="max_os_api">
          <Input v-model="submitData.max_os_api" type="number"></Input>
        </FormItem>
        <FormItem label="min_os_api">
          <Input v-model="submitData.min_os_api" type="number"></Input>
        </FormItem>
        <FormItem label="cpu_arch">
          <Input v-model="submitData.cpu_arch" type="md5"></Input>
        </FormItem>
        <FormItem label="channel">
          <Input v-model="submitData.channel" type="text"></Input>
        </FormItem>
        <FormItem label="title">
          <Input v-model="submitData.title" type="text"></Input>
        </FormItem>
        <FormItem label="update_tips">
          <Input v-model="submitData.update_tips" type="text"></Input>
        </FormItem>
      </Form>
    </Modal>


    <div class="layout">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-text">APP版本升级管理后台</div>
          </Menu>
        </Header>
        <Content :style="{padding: '0 50px', height: '2500px'}">

          <Card>
            <p slot="title">
              当前信息
            </p>
            <a href="#" slot="extra" @click.prevent="showBaseInfo">
              重新填写信息
            </a>
            <p>后端 URL：{{ baseinfo.backendurl }}</p>
            <p>帐号用户名：{{ baseinfo.backendusername }}</p>
          </Card>

          <Card>
            <p slot="title">
              规则展示
            </p>
            <a href="#" slot="extra" @click.prevent="isAddRule=true">
              加入规则
            </a>
            <Table stripe border :columns="ruleColumns" :data="rules">
              <template slot-scope="{ row, index }" slot="action">
                <div v-if="rules[index].status >= 0 && rules[index].status <= 1">
                  <Button type="primary" size="small" style="margin-right: 5px" @click="switchStatus(index)">
                    切换可用状态
                  </Button>
                  <Button type="error" size="small" @click="removeStatus(index)">彻底下线</Button>
                </div>
              </template>
            </Table>
            <Page show-sizer show-elevator show-total :style="{padding: '20px 0'}"
                  :total="page.total" :current="page.index" :page-size="page.size"
                  @on-change="pageIndexChange" @on-page-size-change="pageSizeChange"/>
          </Card>
        </Content>
        <Footer class="layout-footer-center">2021 &copy; APP版本升级第九组</Footer>
      </Layout>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      isAddRule: false,
      submitData: {
        aid: 0,
        platform: '',
        download_url: '',
        update_version_code: '',
        md5: '',
        device_id_list: '',
        max_update_version_code: '',
        min_update_version_code: '',
        max_os_api: 0,
        min_os_api: 0,
        cpu_arch: '',
        channel: '',
        title: '',
        update_tips: '',
        status: 0
      },
      modalbaseinfo: true,
      baseinfo: {
        backendurl: '',
        backendusername: '',
        backendpassword: ''
      },
      page: {
        total: 0,
        index: 1,
        size: 10
      },
      rules: [],
      ruleColumns: [
        {
          title: "id",
          key: "id",
          fixed: "left"
        },
        {
          title: "当前状态",
          key: "showStatus",
          fixed: "left"
        },
        {
          title: "aid",
          key: "aid",
        },
        {
          title: "platform",
          key: "platform"
        },
        {
          title: "download_url",
          key: "download_url"
        },
        {
          title: "update_version_code",
          key: "update_version_code"
        },
        {
          title: "md5",
          key: "md5"
        },
        {
          title: "device_id_list",
          key: "device_id_list"
        },
        {
          title: "max_update_version_code",
          key: "max_update_version_code"
        },
        {
          title: "min_update_version_code",
          key: "min_update_version_code"
        },
        {
          title: "max_os_api",
          key: "max_os_api"
        },
        {
          title: "min_os_api",
          key: "min_os_api"
        },
        {
          title: "cpu_arch",
          key: "cpu_arch"
        },
        {
          title: "channel",
          key: "channel"
        },
        {
          title: "title",
          key: "title"
        },
        {
          title: "update_tips",
          key: "update_tips"
        },
        {
          title: "status",
          key: "status"
        },
        {
          title: '操作',
          slot: 'action',
          width: 150,
          fixed: "right"
        }
      ]
    }
  },
  methods: {
    showBaseInfo() {
      this.modalbaseinfo = true;
    },
    status2description(i) {
      if (i === 0) {
        return "正常";
      } else if (i === 1) {
        return "暂停";
      } else {
        return "下线";
      }
    },
    fetchRules() {
      if (this.baseinfo.backendurl == null || this.baseinfo.backendurl === '') {
        return ;
      }
      let _this = this;
      this.axios({
        method: 'get',
        url: _this.baseinfo.backendurl + "/configure_rule/get_rules",
        params: {
          pageNum: _this.page.index,
          pageCount: _this.page.size
        }
      }).then(res => {
        if (res.data.code === 200) {
          _this.rules = res.data.data.rules
          for (let i = 0; i < this.rules.length; i++) {
            this.rules[i].showStatus = this.status2description(this.rules[i].status);
          }
        } else {
          this.$Modal.error({
            title: res.data.data.code,
            content: "拉取规则失败"
          });
        }
      }).catch(error => {
        this.$Modal.error({
          title: "错误",
          content: error
        });
      });
    },
    pageIndexChange(i) {
      this.page.index = i;
      this.fetchRules();
    },
    pageSizeChange(s) {
      this.page.size = s;
      this.fetchRules();
    },
    initBaseInfo() {
      if (this.baseinfo.backendurl == null || this.baseinfo.backendurl === '') {
        return ;
      }
      let _this = this;
      this.axios({
        method: 'get',
        url: _this.baseinfo.backendurl + "/configure_rule/get_num"
      }).then(res => {
        if (res.data.code === 200) {
          this.$Modal.success({
            title: "拉取规则条数成功",
            content: res.data.data.num + " 条"
          });
          _this.page.total = res.data.data.num;
          _this.fetchRules();
        } else {
          this.$Modal.error({
            title: res.data.data.code,
            content: "拉取规则条数失败"
          });
        }
      }).catch(error => {
        this.$Modal.error({
          title: "错误",
          content: error
        });
      });
    },
    switchStatus(index) {
      if (this.rules[index].status < 0 || this.rules[index].status > 1) {
        return ;
      }
      this.$Modal.confirm({
        title: '确认切换可用状态',
        content: '<p>你确定要将 id 为 ' + this.rules[index].id + ' 的数据的状态从 '
            + this.status2description(this.rules[index].status)
            + " 变为 "
            + this.status2description(1 - this.rules[index].status)
            + ' 吗？</p>',
        onOk: () => {
          let _this = this;
          this.axios({
            method: 'post',
            url: _this.baseinfo.backendurl + "/configure_rule/update_ruleStatus",
            params: {
              id : _this.rules[index].id,
              toStatus: 1 - _this.rules[index].status,
              username: _this.baseinfo.backendusername,
              password: this.getsha256(_this.baseinfo.backendusername + _this.baseinfo.backendpassword)
            }
          }).then(res => {
            if (res.data.code === 200) {
              _this.fetchRules();
            } else {
              this.$Modal.error({
                title: res.data.data.code,
                content: "切换可用状态失败"
              });
            }
          }).catch(error => {
            this.$Modal.error({
              title: "错误",
              content: error
            });
          });
        },
        onCancel: () => {
          this.$Message.info('取消切换可用状态');
        }
      });
    },
    removeStatus(index) {
      if (this.rules[index].status < 0 || this.rules[index].status > 1) {
        return ;
      }
      this.$Modal.confirm({
        title: '确认彻底下线',
        content: '<p>你确定要将 id 为 ' + this.rules[index].id + ' 的数据的状态从'
            + this.status2description(this.rules[index].status)
            + " 变为 "
            + this.status2description(1 - this.rules[index].status)
            + ' 吗？</p>',
        onOk: () => {
          let _this = this;
          this.axios({
            method: 'post',
            url: _this.baseinfo.backendurl + "/configure_rule/update_ruleStatus",
            params: {
              id : _this.rules[index].id,
              toStatus: 2,
              username: _this.baseinfo.backendusername,
              password: this.getsha256(_this.baseinfo.backendusername + _this.baseinfo.backendpassword)
            }
          }).then(res => {
            if (res.data.code === 200) {
              _this.fetchRules();
            } else {
              this.$Modal.error({
                title: res.data.data.code,
                content: "切换可用状态失败"
              });
            }
          }).catch(error => {
            this.$Modal.error({
              title: "错误",
              content: error
            });
          });
        },
        onCancel: () => {
          this.$Message.info('取消彻底下线');
        }
      });
    },
    addRule() {
      let _this = this;
      this.axios({
        method: 'post',
        url: _this.baseinfo.backendurl + "/configure_rule",
        data: _this.submitData,
        params: {
            username: _this.baseinfo.backendusername,
            password: this.getsha256(_this.baseinfo.backendusername + _this.baseinfo.backendpassword)
        }
      }).then(res => {
        if (res.data.code === 200) {
          _this.fetchRules();
        } else {
          this.$Modal.error({
            title: "错误 " + res.data.code,
            content: res.data.message
          });
        }
      }).catch(error => {
        this.$Modal.error({
          title: "错误",
          content: error
        });
      });
    },
    getsha256(password){
        let sha256 = require("js-sha256").sha256;
        return sha256(password);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-text {
  float: left;
  position: relative;
  top: 10px;
  left: 10px;
  font-size: 50px;
  color: white;
}
.layout-footer-center {
  text-align: center;
}
.ivu-card {
  margin: 20px 0;
}
</style>