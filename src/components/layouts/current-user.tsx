import { Button, Popover } from "antd";
import CustomAvatar from "../custom-avatar";
import { useGetIdentity } from "@refinedev/core";

import { User } from "@/graphql/schema.types";

import { Text } from "../text";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import { AccountSettings } from "./account-settings";

const CurrentUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetIdentity<User>();
  console.log(user);
  const content = (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name}
      </Text>
      <Button
        style={{ textAlign: "left" }}
        icon={<SettingOutlined />}
        type="text"
        block
        onClick={() => setIsOpen(true)}
      >
        Account Settings
      </Button>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={content}
      >
        <CustomAvatar
          name={user?.name}
          src={user?.avatarUrl}
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>

      {user && (
        <AccountSettings
          opened={isOpen}
          setOpened={setIsOpen}
          userId={user.id}
        />
      )}
    </>
  );
};

export default CurrentUser;
