
    <template>
        <div style="width: 100%;height: 100%;padding: 0;margin: 0; position: relative;">
            <div id="show_new_map" class="" style="width: 100%;height: 80vh;"></div>
            <div style="position: absolute;bottom: 70px;right: 10px;z-index: 1600;">
                <button class="dt-zoom-out" style="font-size: 20px;padding: 3px 11px;margin-bottom: 2px;background-color: #fff;" @click="zoom_out">Zoom out</button>
                <button class="dt-zoom-in" style="font-size: 20px;padding: 3px 11px;margin-bottom: 2px;background-color: #fff;" @click="zoom_in">Zoom in</button>
            </div>
        </div>
    </template>

    <script setup>
        import Feature from 'ol/Feature.js';
        import Map from 'ol/Map.js';
        import OSM from 'ol/source/OSM.js';
        // import TileLayer from 'ol/layer/Tile.js';
        import View from 'ol/View.js';
        import { Point } from 'ol/geom.js';
        // import { fromLonLat } from 'ol/proj.js';
        import { DragRotateAndZoom, defaults as defaultInteractions } from 'ol/interaction.js';
        import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
        import { Cluster, Vector as VectorSource, XYZ } from 'ol/source.js';
        import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

        var center = ref([104.91601, 11.56245]);
        var zoom = ref(15);
        const map = ref('');

        onMounted(() => {
            /*map = new Map({
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                target: 'map',
                view: new View({
                    // center: [104.9282 ,11.5564],
                    center: [11.566860632975702, 104.9078437600349],
                    zoom: 5,
                }),
            });*/

            // create map
            map.value = new Map({
                interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
                layers: [
                    new TileLayer({
                        source: new OSM(),
                    }),
                ],
                target: 'show_new_map',
                view: new View({
                    center: center.value,
                    zoom: zoom.value,
                    projection: 'EPSG:4326'
                }),
                controls: [] // clear all control button im map.
            });

            // event map change get lat, lng and zoom.
            map.value.on('moveend', function(evt) {
                let get_lat_lng = map.value.getView().getCenter();  // get lng and lat of the map.
                center.value = [get_lat_lng[0], get_lat_lng[1]];
                zoom.value = map.value.getView().getZoom();         // get zoom level of the map.
                console.log(get_lat_lng);
                console.log(zoom.value);

                // create_icon_marker(center.value);
            });

            // add marker
            create_icon_marker(center.value);
        })

        function zoom_out() {
            const view = map.value.getView();
            const zoom = view.getZoom();
            view.setZoom(zoom - 1);
            console.log(zoom - 1);
        }
        function zoom_in() {
            const view = map.value.getView();
            const zoom = view.getZoom();
            view.setZoom(zoom + 1);
            console.log(zoom + 1);
        }

        function create_icon_marker(val_center) {
            var marker = new Feature({
                // geometry: new Point(fromLonLat(center.value)) // fromLonLat = not show maker.
                geometry: new Point(val_center)
            });
            var iconStyle = new Style({
                image: new Icon({
                    anchor: [0.5, 46],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    src: '/icon/marker.svg',
                })
                /*image: new Icon({ // or like this
                    src: '/icon/marker.svg',
                    width: 40,
                    height: 40,
                }),*/
            });
            marker.setStyle(iconStyle);
            var vec_Source = new VectorSource({
                features: [marker]
            });
            var vec_Layer = new VectorLayer({
                source: vec_Source
            });

            map.value.addLayer(vec_Layer); // add marker to map.
        }

        // ------ event click , move or any ------
        // map.on('change', listener)
        // map.on('change:layerGroup', listener)
        // map.on('change:size', listener)
        // map.on('change:target', listener)
        // map.on('change:view', listener)
        // map.on('click', listener)
        // map.on('dblclick', listener)
        // map.on('error', listener)
        // map.on('moveend', listener)
        // map.on('movestart', listener)
        // map.on('pointerdrag', listener)
        // map.on('pointermove', listener)
        // map.on('postcompose', listener)
        // map.on('postrender', listener)
        // map.on('precompose', listener)
        // map.on('propertychange', listener)
        // map.on('rendercomplete', listener)
        // map.on('singleclick', listener)

    </script>
