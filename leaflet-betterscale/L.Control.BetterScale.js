L.Control.BetterScale = L.Control.extend({
    options: {
        position: "bottomleft",
        maxWidth: 150,
        metric: !1,
        imperial: !0,
        updateWhenIdle: !1 //控制移动时更新还是移动地图结束后更新
    },
    onAdd: function (t) {
        this._map = t;
        var parentClazzName = "leaflet-control-better-scale",
            // 创建一个div元素，create(<String> tagName, <String> className?, <HTMLElement> container?)
            // 整个控件
            betterScaleDiv = L.DomUtil.create("div", parentClazzName),
            options = this.options,
            //创建一个ruler,
            s = L.DomUtil.create("div", parentClazzName + "-ruler", betterScaleDiv);
        L.DomUtil.create("div", parentClazzName + "-ruler-block " + parentClazzName + "-upper-first-piece", s),
            L.DomUtil.create("div", parentClazzName + "-ruler-block " + parentClazzName + "-upper-second-piece", s),
            L.DomUtil.create("div", parentClazzName + "-ruler-block " + parentClazzName + "-lower-first-piece", s),
            L.DomUtil.create("div", parentClazzName + "-ruler-block " + parentClazzName + "-lower-second-piece", s);
        return this._addScales(options, parentClazzName, betterScaleDiv), this.ScaleContainer = betterScaleDiv, t.on(options.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), betterScaleDiv
    },
    onRemove: function (t) {
        t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
    },
    /**
     * 创建文本div块
     *
     * @param t
     * @param e
     * @param i
     * @private
     */
    _addScales: function (t, e, i) {
        this._iScale = L.DomUtil.create("div", e + "-label-div", i),
            this._iScaleLabel = L.DomUtil.create("div", e + "-label", this._iScale),
            this._iScaleFirstNumber = L.DomUtil.create("div", e + "-label " + e + "-first-number", this._iScale),
            this._iScaleSecondNumber = L.DomUtil.create("div", e + "-label " + e + "-second-number", this._iScale)
    },
    _update: function () {
        var t = this._map.getBounds(),
            e = t.getCenter().lat,
            i = 6378137 * Math.PI * Math.cos(e * Math.PI / 180),
            n = i * (t.getNorthEast().lng - t.getSouthWest().lng) / 180,
            o = this._map.getSize(),
            s = this.options,
            a = 0;
        o.x > 0 && (a = n * (s.maxWidth / o.x)), this._updateScales(s, a)
    },
    _updateScales: function (t, e) {
        t.metric && e && this._updateMetric(e), t.imperial && e && this._updateImperial(e)
    },
    _updateMetric_old: function (t) {
        var e = this._getRoundNum(t);
        this._iScale.style.width = this._getScaleWidth(e / t) + "px", this._iScaleLabel.innerHTML = 1e3 > e ? e + " m" : e / 1e3 + " km"
    },
    _updateMetric: function (t) {
        var e, i, n, o, s, a = t,
            r = this._iScaleFirstNumber,
            h = this._iScaleSecondNumber,
            l = this._iScale,
            u = this._iScaleLabel;
        u.innerHTML = "0", a > 500 ? (e = a / 1000, i = this._getRoundNum(e), o = this._getRoundNum(e / 2), l.style.width = this._getScaleWidth(i / e) + "px", r.innerHTML = o, h.innerHTML = i + "km") : (n = this._getRoundNum(a), s = this._getRoundNum(a / 2), l.style.width = this._getScaleWidth(n / a) + "px", r.innerHTML = s, h.innerHTML = n + "m")
    },
    _updateImperial: function (t) {
        var e, i, n, o, s, a = 3.2808399 * t,
            r = this._iScaleFirstNumber,
            h = this._iScaleSecondNumber,
            l = this._iScale,
            u = this._iScaleLabel;
        u.innerHTML = "0", a > 2640 ? (e = a / 5280, i = this._getRoundNum(e), o = this._getRoundNum(e / 2), l.style.width = this._getScaleWidth(i / e) + "px", r.innerHTML = o, h.innerHTML = i + "mi") : (n = this._getRoundNum(a), s = this._getRoundNum(a / 2), l.style.width = this._getScaleWidth(n / a) + "px", r.innerHTML = s, h.innerHTML = n + "ft")
    },
    _getScaleWidth: function (t) {
        return Math.round(this.options.maxWidth * t) - 10
    },
    _getRoundNum: function (t) {
        if (t >= 2) {
            var e = Math.pow(10, (Math.floor(t) + "").length - 1),
                i = t / e;
            return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i
        }
        return (Math.round(100 * t) / 100).toFixed(1)
    }
});

L.control.betterscale = function (options) {
    return new L.Control.BetterScale(options)
};
