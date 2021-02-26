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
            if (opt.id === parseInt(match?.params?.id)) {
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
            let [regions, departements] = await Promise.all([
                fetchFromBackend("regions"),
                fetchFromBackend("departements"),
            ]);

            setRegions(
                (() => {
                    let dumpData = [];
                    for (let index = 1; index <= 50; index++) {
                        dumpData.push({
                            id: index,
                            name: "Reg." + Math.round(Math.random() * 100),
                        });
                    }
                    return dumpData;
                })()
            );
            setDepartements(
                (() => {
                    let dumpData = [];
                    for (let index = 1; index <= 82; index++) {
                        dumpData.push({
                            id: index,
                            name: "Dep." + Math.round(Math.random() * 100),
                        });
                    }
                    return dumpData;
                })()
            );
            setLoaded(true);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleHomeBtnClick = () => {
        history.push("/");
    };

    return (
        <Spin spinning={!loaded} tip="Chargement...">
            <center>
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
            </center>
        </Spin>
    );
};
