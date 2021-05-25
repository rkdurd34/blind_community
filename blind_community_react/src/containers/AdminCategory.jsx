import React from 'react'

import Layout from '../components/AdminLayout'

const AdminCategory = ({ history, auth, title }) => {

    return (
        <Layout history={history} auth={auth} title={title}>
            <p>메인화면</p>
        </Layout>
    )
}

export default AdminCategory