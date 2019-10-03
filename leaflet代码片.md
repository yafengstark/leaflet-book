


 - 跳转

map.flyTo([13.87992, 45.9791], 12)

- popup
```javacript
L.marker([51.5, -0.09]).addTo(map)
.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
```

- 批量清除标注

leaflet批量移除地图上的marker可采用分组的方式，然后用分组批量清除，如下所示:

批量生成marker

```
var layers=[];
for(var i = 0;i< result.length;i++){
    var layer = new L.marker([ result[i].lat, result[i].lng ]);
    layers.push(layer);
}
```

marker分组

```var myGroup=L.layerGroup(layers);
maps.addLayer(myGroup);
```

批量移除

```
myGroup.clearLayers();
```

————————————————
版权声明：本文为CSDN博主「qq8618」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/huangsheng_blog/article/details/77855890

- 点击marker, 弹出popup，点击修改按钮，链接跳转到修改界面

- vue 与leaflet结合时， leaflet不支持双向绑定。需要手动监听属性变化（使用watch)，同时操作leaflet 函数.。



## leaflet.markercluster与Vue的结合使用

安装

```
npm install --save vue2-leaflet-editablecirclemarker
```

```
npm install leaflet.markercluster
```

## vue2-leaflet-editablecirclemarker

npm  install --save leaflet-editablecirclemarker

npm install --save vue2-leaflet-editablecirclemarker



## vue2-leaflet-path-transform

- [vue2-leaflet-path-transform](https://github.com/imudin/vue2-leaflet-path-transform) wrapper for [Leaflet.Path.Transform ](https://github.com/w8r/Leaflet.Path.Transform)to allow the user to drag, rotate, and resize vector features





## leaflet矢量切片

- 发布服务

- 加载

  https://blog.csdn.net/geol200709/article/details/84946420

- 





## leaflet 量测





## 填坑

polygon的geometry   先经度，后纬度

