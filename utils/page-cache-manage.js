export class pageCacheManage {
  pageCacheList = {}
  pageCacheTimestamp = {}
  cacheTTL = (1000 * 60 * 60 * 24)
  addPageCache = (page, key, cacheTTL) => {
    this.pageCacheList[key] = page;
    if (!this.pageCacheList[key]) {
      if (!cacheTTL) cacheTTL = this.cacheTTL;
      this.pageCacheTimestamp[key] = setTimeout(() => this.clearPageCache(key), cacheTTL);
    }
  }
  getPageCache = (key) => {
    return this.pageCacheList[key];
  }
  clearPageCache = (key) => {
    this.pageCacheList[key] = null;
    this.pageCacheTimestamp[key] = null;
  }
  clearAllPageCache = () => {
    this.pageCacheList = {};
    this.pageCacheTimestamp = {};
  }
  setCacheTTL(cacheTTL = (1000 * 60 * 60 * 24)) {
    this.cacheTTL = cacheTTL;
  }
}

export default new pageCacheManage();