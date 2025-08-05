import authHoc from '../hoc/authHoc';
import Layout from '../layout/Layout';

function Dashboard() {
  return (
    <Layout>
      <h2>Hello</h2>
    </Layout>
  );
}

export default authHoc(Dashboard);
