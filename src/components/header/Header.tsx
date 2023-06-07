import { Avatar, Dropdown, Navbar, Link as NextLink, Text } from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/moments.png";
import { ProfileContext } from "../../context/profile/profile.context";
import { getProfileByUserId } from "../../services/profile.service";
import MomentsLogo from "../momentsLogo/MomentsLogo";
import NewMomentDrawer from "../newMomentDrawer";
import "./style.css";

function Header() {
  const navigate = useNavigate();

  const { profile, setContextProfile } = useContext(ProfileContext);

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!localStorage.getItem("token")) {
          navigate("/login");
        } else {
          const token = JSON.parse(localStorage.getItem("token") || "");
          const { data, status } = await getProfileByUserId(
            token?.token,
            token?.userId
          );
          if (status === 200) {
            setContextProfile(data);
          }
          if (status === 500) {
            navigate("/login");
          }
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <aside>
        <header>
          <Link to="/" className="brand">
            <img src={logo} alt="Moments" />
            <div className="moments-logo-header">
            <MomentsLogo size={40} />
            </div>
          </Link>
        </header>
        <Navbar containerCss={{
          backgroundColor: "#fbe3a1",
          padding: "0px",
        }}>
        <Navbar.Content
        className="navbar-content-avatar"
          css={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Dropdown placement="right-top">
            <Navbar.Item >
              <Dropdown.Trigger css={{
              backgroundColor: "#f8d571",
            }}>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="xl"
                  src={profile.profilePicture}
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
              <NextLink
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </NextLink>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
        </Navbar>
        <nav>
          <ul className="links">
            <li>
              <NewMomentDrawer />
            </li>
            <li>
              <Link to="/">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-house" />
                  <span>Home</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/new-moment" id="add">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-champagne-glasses" />
                  <span>Postar</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-user"></i>
                  <span>Perfil</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/users">
                <div className="header-button-wrapper">
                  <i className="fa-solid fa-user-group"></i>
                  <span>Usuários</span>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="mobile-header">
        <Link to="/" className="brand-mobile">
          <img src={logo} alt="Moments" />
          <h2>Moments</h2>
        </Link>
      </div>
      <nav className="footer-bar">
        <ul className="foot-links">
          <li>
            <a href="#">
              <i className="fa-solid fa-house"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-champagne-glasses"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user-group"></i>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
