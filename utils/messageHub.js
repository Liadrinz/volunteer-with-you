// plugin/pages.js 
// 缓存pageModel,一个简要实现
export default class MH {
  constructor() {
    this.$$cache = {};
  }

  add(pageModel,key) {
    this.$$cache[key] = pageModel;
  }

  get(pagePath) {
    return this.$$cache[pagePath];
  }
  
  delete(pageModel) {
    try {
      delete this.$$cache[this._getPageModelPath(pageModel)];
    } catch (e) {
    }
  }
}
