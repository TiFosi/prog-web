import { useEffect, useState } from "react";
import ReactMapGl, { Source, Layer } from "react-map-gl";
import { Button, Divider } from "antd";
import { HomeOutlined } from "@ant-design/icons";

import { fetchFromCoronavirusAPI } from "../lib/fetchFromCoronavirusAPI";
import geo from "../lib/geo.json";

const MAPBOXGL_TOKEN =
    "pk.eyJ1IjoidGlmb3NpdG4iLCJhIjoiY2tsbzc3NjF4MHE0ODJ3bm5xbnp3MTcwaSJ9.0arKgyVoTedLpUPSk3Uaog";

const toGeoJSON = (data) => {
    const features = data.allLiveFranceData
        .filter((item) => item.code.startsWith("DEP-"))
        .map((item) => {
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

    return {
        type: "FeatureCollection",
        features,
    };
};

export const Map = () => {
    const [errorPosition, setErrorPosition] = useState(false);
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

    const handleBtnPositionClick = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setViewport((prevViewport) => ({
                    ...prevViewport,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    zoom: 7,
                }));
            },
            (error) => {
                setErrorPosition({
                    msg: "Vous avez décidé de ne pas partager votre position.",
                });
            }
        );
    };

    return (
        <>
            <Divider>Carte des hospitalisations</Divider>
            <div style={{ textAlign: "center" }}>
                {errorPosition && <p>{errorPosition.msg}</p>}
                <Button
                    type="primary"
                    shape="round"
                    icon={<HomeOutlined />}
                    size="large"
                    style={{ marginBottom: "12px" }}
                    onClick={handleBtnPositionClick}
                >
                    Ma position
                </Button>

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
        </>
    );
};
