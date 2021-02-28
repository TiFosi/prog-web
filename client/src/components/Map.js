import { useEffect, useState } from "react";
import ReactMapGl, { Source, Layer } from "react-map-gl";

import { fetchFromCoronavirusAPI } from "../lib/fetchFromCoronavirusAPI";
import geo from "../lib/geo.json";

const RegionsMetro = [84, 32, 93, 44, 76, 28, 75, 24, 27, 53, 94, 52, 11];

const MAPBOXGL_TOKEN =
    "pk.eyJ1IjoidGlmb3NpdG4iLCJhIjoiY2tsbzc3NjF4MHE0ODJ3bm5xbnp3MTcwaSJ9.0arKgyVoTedLpUPSk3Uaog";

const toGeoJSON = (data) => {
    // console.log(data.allLiveFranceData);

    const features = data.allLiveFranceData
        .filter((item) => item.code.startsWith("REG-"))
        .map((item) => {
            console.log(item);
            return {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: geo[item.code].center,
                },
                properties: {
                    ...item,
                },
            };
        });

    console.log(features);
    return {
        type: "FeatureCollection",
        features,
    };
};

export const Map = () => {
    const [layerData, setLayerData] = useState(null);

    const [viewport, setViewport] = useState({
        latitude: 46.9,
        longitude: 1.7,
        zoom: 5,
        width: "100%",
        height: "75vh",
    });

    const radiusBounds = [0, 10, 100, 70];

    const circleLayer = {
        id: "circle-layer",
        type: "circle",
        source: "hospitalises",
        filter: [">", "hospitalises", 0],
        paint: {
            "circle-opacity": 0.6,
            "circle-color": "#8393A7",
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["sqrt", ["number", ["get", "hospitalises"]]],
                ...radiusBounds,
            ],
        },
    };

    const countLayer = {
        id: "count-layer",
        type: "symbol",
        source: "hospitalises",
        filter: [">", "hospitalises", 0],
        layout: {
            "text-field": `{hospitalises}`,
            "text-size": 16,
        },
    };

    useEffect(async () => {
        const response = await fetchFromCoronavirusAPI("AllLiveData");
        setLayerData(toGeoJSON(response));
    }, []);

    return (
        <div>
            <ReactMapGl
                {...viewport}
                mapboxApiAccessToken={MAPBOXGL_TOKEN}
                mapStyle="https://etalab-tiles.fr/styles/osm-bright/style.json"
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
            >
                <Source
                    type="geojson"
                    attribution="Données Santé publique France"
                    data={layerData}
                >
                    <Layer key={circleLayer.id} {...circleLayer} />
                    <Layer key={countLayer.id} {...countLayer} />
                </Source>
            </ReactMapGl>
        </div>
    );
};
