import authHoc from '../hoc/authHoc';
import Layout from '../layout/Layout';

function Dashboard() {
  const role = localStorage.getItem("role");

  return (
    <Layout>
      <h2>Welcome to {role} panel</h2>
    </Layout>
  );
}

export default authHoc(Dashboard);
