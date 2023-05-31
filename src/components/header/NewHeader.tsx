import { Avatar, Dropdown, Navbar, Text } from "@nextui-org/react";
import { Link } from "react-router-dom";
import MomentsLogo from "../momentsLogo/MomentsLogo.js";
import { Layout } from "./Layout.tsx";
export default function NewHeader() {
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Layout>
      <Navbar isBordered disableBlur="true" containerCss={{
        position: "fixed",
      float: "left",
      top: "0",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      width: "200px",
      height: "100vh",
      transition: "all 0.4s",
      border: "1px solid red",
      background: "#f8d571",
      }}

     >

        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            width: "100%",
            display: "flex",
          }}
        >
          <MomentsLogo size={40} />
        </Navbar.Brand>
        <Navbar.Content
          css={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Dropdown placement="right-top" >
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="xl"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="secondary"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
        <Navbar.Content
          activeColor="secondary"
          variant="highlight-rounded"
          css={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            border: "1px solid red",
            marginBottom: "200px",
            width: "100%",
          }}
        >
          <Navbar.Link isActive as={Link} to="/">
            Home
            </Navbar.Link>
          <Navbar.Link as={Link} to="/profile">
            Customers
          </Navbar.Link>
          <Navbar.Link as={Link} to="#">Pricing</Navbar.Link>
          <Navbar.Link as={Link} to="#">Company</Navbar.Link>
        </Navbar.Content>

      </Navbar>
    </Layout>
  );
}
