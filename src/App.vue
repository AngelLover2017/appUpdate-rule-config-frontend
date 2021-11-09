<template>
  <div id="app">

    <!-- 输入后端信息 -->
    <Modal
        title="输入基本信息"
        v-model="modalbaseinfo"
        :closable="false"
        :mask-closable="false">
      <Form :model="baseinfo">
        <FormItem label="后端 URL">
          <Input v-model="baseinfo.backendurl" placeholder="输入包括端口的 URL"></Input>
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
        <Content :style="{padding: '0 50px'}">

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
            <Page :total="rulesCount" show-sizer show-elevator show-total :style="{padding: '20px 0'}"/>
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
      modalbaseinfo: false,
      baseinfo: {
        backendurl: '',
        backendusername: '',
        backendpassword: ''
      },
      rulesCount: 0,
      rules: [
        {
          name: "Show",
          age: 19
        },
        {
          name: "dfdf",
          age: 323
        }
      ],
      ruleColumns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        }
      ]
    }
  },
  methods: {
    showBaseInfo() {
      this.modalbaseinfo = true;
    },
    addRule() {

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