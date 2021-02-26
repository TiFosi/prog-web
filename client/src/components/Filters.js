import { Button, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

function handleMenuClick(e) {
    console.log("click", e);
}

const DropdownButton = ({ handleClick }) => {
    return (
        <Menu onClick={handleClick}>
            <Menu.Item key="1">1st item</Menu.Item>
        </Menu>
    );
};

export const Filters = () => {
    return (
        <center>
            <Space wrap style={{ marginBottom: "20px" }}>
                <Button type="primary">FR</Button>

                <Dropdown
                    overlay={<DropdownButton handleClick={handleMenuClick} />}
                >
                    <Button>
                        <span>Régions</span>
                        <DownOutlined style={{ marginLeft: "10px" }} />
                    </Button>
                </Dropdown>

                <Dropdown
                    overlay={<DropdownButton handleClick={handleMenuClick} />}
                >
                    <Button>
                        <span>Départements</span>
                        <DownOutlined style={{ marginLeft: "10px" }} />
                    </Button>
                </Dropdown>
            </Space>
        </center>
    );
};
