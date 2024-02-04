import { CalendarOutlined } from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import { Text } from "../text";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { useList } from "@refinedev/core";
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/queries";
import { getDate } from "@/utilities/helpers";
import { Event } from "@/graphql/schema.types";
import dayjs from "dayjs";
const UpcomingEvents = () => {
  const { data, isLoading } = useList({
    resource: "events",
    pagination: { pageSize: 5 },
    sorters: [
      {
        field: "startDate",
        order: "asc",
      },
    ],
    filters: [
      {
        field: "startDate",
        operator: "gte",
        value: dayjs().format("YYYY-MM-DD"),
      },
    ],
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  const events = data?.data ?? [];
  return (
    <Card
      style={{
        height: "100%",
      }}
      headStyle={{
        padding: "8px 16px",
      }}
      bodyStyle={{
        padding: "0 1rem",
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarOutlined />
          <Text
            size="sm"
            style={{
              marginLeft: ".7rem",
            }}
          >
            Upcoming Events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => <UpcomingEventsSkeleton />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={events as []}
          renderItem={(item: Event) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Badge color={item.color} />}
                title={
                  <Text size="xs">{getDate(item.startDate, item.endDate)}</Text>
                }
                description={
                  <Text ellipsis={{ tooltip: true }} strong>
                    {item.title}
                  </Text>
                }
              ></List.Item.Meta>
            </List.Item>
          )}
        ></List>
      )}
    </Card>
  );
};

export default UpcomingEvents;
