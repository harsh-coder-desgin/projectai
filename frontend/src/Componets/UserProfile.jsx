import "../styles/Form.css"
import { Button } from "./index.js"

//get data form usecontext to know user login or not'
// get data form chat.jsx use usecontext
function UserProfile({
  username = "User",
  onLogout,
}) {
  return (
    <div className="sidebar-footer">
      <div className="user-profile">
        <div className="avatar">
          {username.charAt(0).toUpperCase()}
        </div>

        <div className="user-info">
          <div className="user-name">
            {username}
          </div>
        </div>

       {username !== "User" ? <Button
          className="logout-btn"
          onClick={onLogout}
        >
          Logout
        </Button> : null}
      </div>
    </div>
  );
}

export default UserProfile;