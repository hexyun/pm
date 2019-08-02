export default {
  bind() {
    if(this.el.nodeName !== 'IMG') return
    this.img = new Image()
    this.vm.$nextTick(() => {
      const old = this.el.getAttribute('data-src')
      const lazySrc = this.el.getAttribute('lazy-src')
      if(lazySrc) this.el.src = lazySrc
      this.img.src = old
      this.img.onload = ()=> {
        this.el.setAttribute('src', old)
        const w = this.img.naturalWidth || this.img.width
        const h = this.img.naturalHeight || this.img.height
        this.el.width = w
        this.el.height = h
        this.el.parentNode.style.width = `${w}px`
        this.el.parentNode.style.height = `${h}px`
      }
    })
  },
  unbind() {
    this.img = null
  }
};
