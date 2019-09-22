const makeCfg = () => ({
  urls: {
    base: ".",
    get api() {
      return `${this.base}/api/`;
    },
    get data() {
      return `${this.base}/data/`;
    }
  }
});
const cfg = {};
cfg.production = makeCfg();
cfg.development = makeCfg();
cfg.development.urls.base = "http://svyatsy.bro-dev.tk";

module.exports = cfg[process.env.NODE_ENV];
