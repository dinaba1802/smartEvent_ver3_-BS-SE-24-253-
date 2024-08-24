import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { deleteUser, getSiteStats } from "../services/admin.service";
import { useNavigate } from "react-router-dom";
import AdminGuard from "../guards/AdminGuard";

const Admin = () => {
  const [stats, setStats] = useState();
  const nav = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const st = await getSiteStats();
        setStats(st.data);
      } catch (e) {
        alert(e.message);
        nav("/dashboard");
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div>
        <h3>Loading site stats..</h3>
      </div>
    );
  }
  return (
    <div>
      <h1>Admin</h1>
      <div className="p-4">
        <h4 className="p-4 font-bold">Event Request status distribution</h4>
        <Chart
          chartType="PieChart"
          data={[
            ["Request Type", "Requests"],
            ["Approved requests", stats.statusDist.cApproved],
            ["Pending requests", stats.statusDist.cPending],
            ["Declined requests", stats.statusDist.cDenied],
          ]}
          width="100%"
          height="400px"
          legendToggle
          options={{
            is3D: true,
            slices: {
              0: { color: "blue" }, // Pending requests
              1: { color: "yellow" }, // Declined requests
              2: { color: "red" }, // Approved requests
            },
          }}
        />
      </div>

      <div className="p-4">
        <h4 className="p-4 font-bold">Business Type distribution</h4>
        <Chart
          chartType="PieChart"
          data={[
            ["Business Type", "Count"],
            ...Object.entries(stats.businessesByType),
          ]}
          width="100%"
          height="400px"
          legendToggle
          options={{
            is3D: true,
          }}
        />
      </div>

      <div className="p-4">
        <h4 className="p-4 font-bold">All site users</h4>
        <table
          style={{
            borderSpacing: "30px",
            width: "1000px",
            fontSize: "24px",
            marginBlock: "1rem",
          }}
        >
          <thead>
            <tr className="p-2 text-start">
              <th className="text-start p-2">User name</th>
              <th className="text-start p-2">User Type</th>
              <th className="text-start p-2">Actions</th>
            </tr>
          </thead>

          <tbody className="text-start">
            {stats.users.map((u) => (
              <tr
                key={u._id}
                className="p-4"
                style={{ borderBlock: "1px solid lightgray" }}
              >
                <td className="p-4">
                  {u.name} {u.lastName}
                </td>
                <td className="p-4">
                  {u.role}{" "}
                  <b>
                    {u.role === "business"
                      ? u.businessInformation
                        ? ` (${u.businessInformation.businessType}) `
                        : " (Business details N/A)"
                      : ""}
                  </b>
                </td>
                <td className="p-4">
                  <button
                    className="font-bold cursor-pointer"
                    onClick={async () => {
                      const del = confirm(
                        `Are you sure you want to delete user ${u.name} ${u.lastName}?`
                      );
                      if (del) {
                        try {
                          const deleted = await deleteUser({
                            userEmail: u.email,
                          });
                          setStats({
                            ...stats,
                            users: stats.users.filter(
                              (u_) => u_.email !== u.email
                            ),
                          });
                          alert(`Deleted ${u.name} ${u.lastName} successfully`);
                        } catch (e) {
                          alert(e.message);
                        }
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminGuard(Admin);
