

## 目的

leaflet打开多个popup时不会自动关闭，即保持多个popup同时打开的状态。



![](images/多个popup.png)




[leaflet同时打开多个popup]([https://www.giserdqy.com/webgis/leaflet/35262/leaflet%E5%90%8C%E6%97%B6%E6%89%93%E5%BC%80%E5%A4%9A%E4%B8%AApopup/](https://www.giserdqy.com/webgis/leaflet/35262/leaflet同时打开多个popup/))

看到上面这个还要钱，还不如自己写一个开源出来呢。



## 原理



查看leaflet 源码中的popup打开代码，位置在[src/layer/popup.js](https://github.com/Leaflet/Leaflet/blob/master/src/layer/Popup.js)中

```javascript
Map.include({
	// @method openPopup(popup: Popup): this
	// Opens the specified popup while closing the previously opened (to make sure only one is opened at one time for usability).
	// @alternative
	// @method openPopup(content: String|HTMLElement, latlng: LatLng, options?: Popup options): this
	// Creates a popup with the specified content and options and opens it in the given point on a map.
	openPopup: function (popup, latlng, options) {
		if (!(popup instanceof Popup)) {
			popup = new Popup(options).setContent(popup);
		}

		if (latlng) {
			popup.setLatLng(latlng);
		}

		if (this.hasLayer(popup)) {
			return this;
		}

		if (this._popup && this._popup.options.autoClose) {
			this.closePopup();
		}

		this._popup = popup;
		return this.addLayer(popup);
	},
```

 发现openPopup是L.map中的一个方法，且在打开本次的popup之前会调用

```javascript
if (this._popup && this._popup.options.autoClose) {
			this.closePopup();
		}
```

关闭之前 打开的popup。



因此修改如下

```javascript
 Map2 = L.Map.extend({
        // 覆盖源码
        openPopup: function (popup, latlng, options) {
            if (!(popup instanceof L.Popup)) {
                popup = new L.Popup(options).setContent(popup);
            }

            if (latlng) {
                popup.setLatLng(latlng);
            }

            if (this.hasLayer(popup)) {
                return this;
            }

            if (this._popup && this._popup.options.autoClose) {
//                this.closePopup(); 修改了这块
            }

            this._popup = popup;
            return this.addLayer(popup);
        }
    });

    map2 = function (id, options) {
        return new Map2(id, options);
    };

     var leafletMap = map2('mapDiv').setView([51.505, -0.09], 13);
    //图层
    L.tileLayer(url, {
        maxZoom: 18,
        attribution: attr,
        id: 'mapbox.streets'
    }).addTo(leafletMap);

    /**
     *
     */

    L.marker([51.5, -0.09]).addTo(leafletMap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
    L.marker([51.5, -0.08]).addTo(leafletMap)
        .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
```





## 新发现

看源代码
```javascript
if (this._popup && this._popup.options.autoClose) {
			this.closePopup();
		}
```

发现指定autoClose=false也可以达到同样的效果。汗。不过能够读一下源码也是不错的。

## 源代码

[取消自动关闭popup 扩展代码版]([https://github.com/yafengstark/leaflet-book/blob/master/%E6%89%93%E5%BC%80%E4%B8%80%E4%B8%AApopup%E4%B8%8D%E5%85%B3%E9%97%AD%E5%8F%A6%E4%B8%80%E4%B8%AA.html](https://github.com/yafengstark/leaflet-book/blob/master/打开一个popup不关闭另一个.html))

[取消自动关闭popup antoclose版]([https://github.com/yafengstark/leaflet-book/blob/master/%E5%9C%A8%E9%A1%B5%E9%9D%A2%E5%8A%A0%E8%BD%BD%E6%97%B6%E6%89%93%E5%BC%80%E6%89%80%E6%9C%89%E5%BC%B9%E5%87%BA%E7%AA%97%E5%8F%A3popup2.html](https://github.com/yafengstark/leaflet-book/blob/master/在页面加载时打开所有弹出窗口popup2.html))