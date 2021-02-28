import { useEffect, useState, useRef } from "react";
import { Button, Space, Spin, Select, Input } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";

import { fetchFromBackend } from "../lib/fetchFromBackend";

const { Option } = Select;

const SelectGroup = ({ placeholder, route, options }) => {
    const match = useRouteMatch(`${route}/:id`);
    const history = useHistory();
    const select = useRef(null);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        options.forEach((opt) => {
            if (opt.id == match?.params?.id) {
                setSelectedOption(opt.id);
            }
        });
    }, [options]);

    const handleChange = (selected) => {
        setSelectedOption(selected);
        history.push(route + "/" + selected);
        select.current.blur();
    };

    return (
        <Input.Group compact>
            <Button type={match ? "primary" : ""}>
                {route == "/reg"
                    ? "Par Région"
                    : route == "/dep"
                    ? "Par Département"
                    : "NR"}
            </Button>
            <Select
                ref={select}
                showSearch
                style={{ width: 100 }}
                placeholder={placeholder}
                optionFilterProp="children"
                showAction={["focus"]}
                onChange={handleChange}
                value={selectedOption}
            >
                {options?.map((option) => (
                    <Option key={option.id} value={option.id}>
                        {option.name}
                    </Option>
                ))}
            </Select>
        </Input.Group>
    );
};

export const Filters = () => {
    const [regions, setRegions] = useState([]);
    const [departements, setDepartements] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const history = useHistory();
    const isHome = useRouteMatch("/");

    useEffect(async () => {
        try {
            const [regions, departements] = await Promise.all([
                fetchFromBackend("region"),
                fetchFromBackend("departement"),
            ]);

            setRegions(
                regions.map((region) => ({ id: region._id, name: region.name }))
            );
            setDepartements(
                departements.map((dep) => ({ id: dep._id, name: dep.name }))
            );
            setLoaded(true);
        } catch (err) {
            console.log(`### ${err}`);
        }
    }, []);

    const handleHomeBtnClick = () => {
        history.push("/");
    };

    return (
        <Spin spinning={!loaded} tip="Chargement...">
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <Space wrap style={{ marginBottom: "20px" }}>
                    <Button
                        type={isHome?.isExact ? "primary" : ""}
                        onClick={handleHomeBtnClick}
                    >
                        France
                    </Button>

                    <SelectGroup
                        options={regions}
                        placeholder="Sélectionnez une région..."
                        route="/reg"
                    />

                    <SelectGroup
                        options={departements}
                        placeholder="Sélectionnez un département..."
                        route="/dep"
                    />
                </Space>
            </div>
        </Spin>
    );
};
