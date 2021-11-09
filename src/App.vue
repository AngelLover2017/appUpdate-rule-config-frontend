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
            <p>帐号用户名：{{ baseinfo.backendpassword }}</p>
          </Card>

          <Card>
            <p slot="title">
              规则展示
            </p>
            <a href="#" slot="extra" @click.prevent="addRule">
              加入规则
            </a>
            <Table stripe border :columns="ruleColumns" :data="rules"/>
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
        }
      ]
    }
  },
  methods: {
    showBaseInfo() {
      this.modalbaseinfo = true;
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